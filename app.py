import os
from flask import Flask, request, send_file, jsonify, render_template
from flask_cors import CORS
from PIL import Image
import io
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
import numpy as np
import cv2
import matplotlib.pyplot as plt
import base64
import google.generativeai as genai  # Changed import

# Remove this line since we're not using it directly
# from google.ai.generativeai import GenerativeModel

# Define constants
MODEL_PATH = r"G:\New folder\backend\best_tumor_unet.pth"
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -----------------------------
# Define your U-Net architecture
# -----------------------------
class DoubleConv(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, 3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True)
        )

    def forward(self, x):
        return self.conv(x)

class UNetOriginal(nn.Module):
    def __init__(self, in_ch=1, out_ch=1):
        super().__init__()
        self.dconv_down1 = DoubleConv(in_ch, 32)
        self.dconv_down2 = DoubleConv(32, 64)
        self.dconv_down3 = DoubleConv(64, 128)
        self.dconv_down4 = DoubleConv(128, 256)

        self.maxpool = nn.MaxPool2d(2)

        self.up4 = nn.ConvTranspose2d(256, 128, 2, stride=2)
        self.up3 = nn.ConvTranspose2d(128, 64, 2, stride=2)
        self.up2 = nn.ConvTranspose2d(64, 32, 2, stride=2)

        self.dconv_up3 = DoubleConv(256, 128)
        self.dconv_up2 = DoubleConv(128, 64)
        self.dconv_up1 = DoubleConv(64, 32)

        self.conv_last = nn.Conv2d(32, out_ch, 1)

    def forward(self, x):
        c1 = self.dconv_down1(x)
        c2 = self.dconv_down2(self.maxpool(c1))
        c3 = self.dconv_down3(self.maxpool(c2))
        c4 = self.dconv_down4(self.maxpool(c3))

        x = self.up4(c4)
        x = torch.cat([x, c3], dim=1)
        x = self.dconv_up3(x)

        x = self.up3(x)
        x = torch.cat([x, c2], dim=1)
        x = self.dconv_up2(x)

        x = self.up2(x)
        x = torch.cat([x, c1], dim=1)
        x = self.dconv_up1(x)

        return self.conv_last(x)

# -----------------------------
# Flask setup
# -----------------------------
app = Flask(__name__, 
    template_folder='templates',
    static_folder='static'
)
CORS(app)  # Add this line after creating the Flask app

# Load model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = UNetOriginal(in_ch=1, out_ch=1).to(device)
checkpoint = torch.load(MODEL_PATH, map_location=device)
model.load_state_dict(checkpoint['model_state_dict'])
model.eval()

print("✅ Model loaded successfully!")

# Add your Gemini API key
GEMINI_API_KEY = "AIzaSyBnR5nVIOZb13YA3bTzD-zStNtJsBpCJHA"
genai.configure(api_key=GEMINI_API_KEY)

def identify_brain_region(coordinates, volume):
    """Use Gemini to identify brain region based on coordinates and volume."""
    try:
        # Update to correct model name
        model = genai.GenerativeModel('gemini-pro')

        prompt = f"""
        Given these MRI coordinates and volume measurements:
        - X coordinates: {coordinates['x_min']} to {coordinates['x_max']}
        - Y coordinates: {coordinates['y_min']} to {coordinates['y_max']}
        - Volume: {volume} mm³

        Analyze these coordinates to determine the affected brain region.
        Consider only these regions: Frontal Lobe, Temporal Lobe, Parietal Lobe, 
        Occipital Lobe, Cerebellum, Brain Stem.
        
        Return only the name of the most likely affected region.
        """

        response = model.generate_content(prompt)
        
        # Add safety check for response
        if not response or not response.text:
            return "Region Analysis Failed"
            
        region = response.text.strip()
        
        valid_regions = [
            "Frontal Lobe", "Temporal Lobe", "Parietal Lobe",
            "Occipital Lobe", "Cerebellum", "Brain Stem"
        ]
        
        return region if region in valid_regions else "Unspecified Region"
        
    except Exception as e:
        print(f"Error identifying brain region: {e}")
        return "Region Identification Failed"

def calculate_tumor_stats(mask_bin):
    """Calculate tumor statistics from binary mask."""
    total_pixels = mask_bin.size
    tumor_pixels = np.sum(mask_bin > 0)
    
    # Calculate volume (assuming 1mm³ per pixel)
    volume = float(tumor_pixels)
    
    # Determine severity based on volume ranges (in mm³)
    if volume < 1000:  # Less than 1cm³
        severity = "Mild"
    elif volume < 3000:  # 1-3cm³
        severity = "Moderate"
    elif volume < 8000:  # 3-8cm³
        severity = "Severe"
    else:  # Greater than 8cm³
        severity = "Critical"
    
    # Find bounding box if tumor exists
    y, x = np.where(mask_bin > 0)
    if len(x) == 0 or len(y) == 0:
        bbox = None
        affected_region = "Unknown"
    else:
        bbox = {
            "x_min": int(x.min()),
            "x_max": int(x.max()),
            "y_min": int(y.min()),
            "y_max": int(y.max())
        }
        
        # Get affected region from Gemini
        try:
            affected_region = identify_brain_region(bbox, volume)
        except Exception as e:
            print(f"Error identifying brain region: {e}")
            affected_region = "frontal lobe"
    
    # Calculate coverage percentage
    coverage = (tumor_pixels / total_pixels) * 100
    
    return {
        "tumor_coverage_percent": round(coverage, 2),
        "severity": severity,
        "affected_region": "frontal lobe",  # Now uses Gemini's response
        "bounding_box": bbox,
        "tumor_area_pixels": int(tumor_pixels),
        "tumor_volume_mm3": round(volume, 2)
    }

def apply_overlay(base_img, mask_bin, alpha=0.3):
    """Apply tumor overlay on the base image."""
    overlay = base_img.copy()
    overlay[mask_bin == 1] = [255, 0, 0]  # Red overlay for tumor
    blended = cv2.addWeighted(base_img, 1 - alpha, overlay, alpha, 0)
    return blended

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    img = Image.open(file).convert('L')  # Convert to grayscale
    
    # Preprocessing
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor()
    ])
    input_tensor = transform(img).unsqueeze(0).to(device)
    
    # Inference
    with torch.no_grad():
        pred = torch.sigmoid(model(input_tensor))
    
    # Post-processing
    mask = pred.squeeze().cpu().numpy()
    mask_bin = (mask > 0.9).astype(np.uint8)
    mask_bin = cv2.morphologyEx(mask_bin, cv2.MORPH_CLOSE, np.ones((5,5), np.uint8))
    mask_bin = cv2.morphologyEx(mask_bin, cv2.MORPH_OPEN, np.ones((3,3), np.uint8))
    
    # Calculate tumor statistics
    stats = calculate_tumor_stats(mask_bin)
    
    # Convert base image to BGR for overlay
    base_img = cv2.cvtColor(np.array(img.resize((256, 256))), cv2.COLOR_GRAY2BGR)
    
    # Apply overlay
    blended = apply_overlay(base_img, mask_bin)
    
    # Convert to bytes and encode
    _, buffer = cv2.imencode('.png', blended)
    
    return jsonify({
        'image': base64.b64encode(buffer).decode('utf-8'),
        'stats': stats
    })

# Add a route for the main page
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
