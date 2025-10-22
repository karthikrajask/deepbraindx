# DeepBrainDx: AI-Powered Medical Image Diagnostic Simulator

**DeepBrainDx** is a prototype AI system designed for rapid and detailed diagnostic support in medical imaging, specifically focusing on brain scans (MRI/CT). This project demonstrates the potential for deep learning models to not only detect critical conditions like Aneurysms, Tumors, and Strokes but also to provide structured, multi-label sub-diagnosis and clinical summary reports.

-----

## Project Overview

While the initial implementation focuses on a **Streamlit simulation** based on file naming conventions (for robust demonstration without live model execution), the underlying architecture is built on two distinct types of deep learning models: **Detection** (YOLOv8) and **Segmentation** (U-Net).

### Key Features and Underlying Models:

| Condition | Primary Model Type | Role |
| :--- | :--- | :--- |
| **Aneurysm, Tumor, General Detection** | **YOLOv8 (Detection)** | Pinpoints and classifies the bounding box of the lesion. |
| **Stroke Analysis** | **U-Net (Segmentation)** | Precisely outlines the shape, extent, and volume of the stroke area. |

### Key Simulated Features (Implemented in App):

  * **Intelligent Label Extraction:** Diagnoses the primary condition (`Aneurysm`, `Tumor`, `Stroke`) purely from the input image filename.
  * **Subtype Breakdown & Re-labeling:** Provides a detailed, two-part sub-diagnosis for complex diseases:
      * `Stroke` $\rightarrow$ **Haemorrhage** and **Ischemic**
      * `Tumor` $\rightarrow$ **Malignant** and **Benign**
      * `Aneurysm` $\rightarrow$ **Saccular** and **Mycotic**
  * **Single-Sheet Summary Report:** Generates a comprehensive report containing:
      * A dynamic **Simulated Accuracy** score (90-95% range).
      * A **Subtype Likelihood Graph** showing confidence breakdown.
      * Specific **Clinical Action Summaries** tailored to the diagnosed disease.

-----

##  Technology Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **User Interface** | `streamlit` | Creates the interactive web application and report interface. |
| **Detection Model** | `ultralytics` (YOLOv8) | Target framework for object detection (`best.pt` / `.onnx`). |
| **Segmentation Model** | **U-Net** (or derivatives) | Dedicated architecture for pixel-level stroke analysis (Conceptual/Deployment focus). |
| **Data Simulation** | `pandas`, `numpy`, `random` | Handles data structure and dynamic simulation of scores/metrics. |
| **Visualization** | `matplotlib` | Generates the custom subtype likelihood comparison graphs in the report. |

-----

##  Getting Started

### Prerequisites

You need Python 3.8+ installed.

### Installation

Clone the repository and install the necessary dependencies.

1.  **Clone the repository:**

    ```bash
    git clone <your_repository_url>
    cd DeepBrainDx
    ```

2.  **Install requirements:**

    ```bash
    pip install -r requirements.txt
    ```

    *(Note: The `requirements.txt` should contain libraries like `streamlit`, `ultralytics`, `torch`, `matplotlib`, `scikit-learn`, and `pandas` for the full environment.)*

### Running the Simulator

1.  **Start the Streamlit application:**
    ```bash
    streamlit run streamlit_app.py
    ```
2.  Open the URL displayed in your terminal (usually `http://localhost:8501`).
3.  **Test the Simulator:** Upload any image file named using one of the keywords (e.g., `aneurysm_scan.jpg`, `tumor_biopsy.png`, or `stroke_case_1.jpeg`) to view the complete diagnostic report.

-----

##  Important Note on Simulation

This current version is a **demonstration of the output interface and reporting features only**. All diagnostic text, subtype breakdowns, confidence scores, and model accuracy metrics are **simulated** based on the presence of keywords in the uploaded filename.

For a production environment, the U-Net and YOLO model loading and prediction logic would be executed in the backend.
