import { useState } from "react";
import { Upload as UploadIcon, FileImage, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_URL = "http://localhost:5000"; // Add this constant

type ProcessingStage = {
  name: string;
  status: "pending" | "processing" | "complete";
};

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stages, setStages] = useState<ProcessingStage[]>([
    { name: "File Validation", status: "pending" },
    { name: "Format Conversion", status: "pending" },
    { name: "Normalization", status: "pending" },
    { name: "Noise Reduction", status: "pending" },
    { name: "Slice Alignment", status: "pending" },
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      
      // Store image
      const imageUrl = `data:image/png;base64,${data.image}`;
      localStorage.setItem("segmentationResult", imageUrl);
      
      // Store stats
      localStorage.setItem("tumorStats", JSON.stringify(data.stats));
      
      // Navigate to segmentation page
      navigate("/segmentation");
    } catch (error) {
      toast.error("Error processing image");
      console.error(error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      toast.success("File uploaded successfully");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast.success("File uploaded successfully");
    }
  };

  const simulateProcessing = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      await handleFileUpload(file);
    } catch (error) {
      toast.error("Processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Upload & Preprocessing</h1>
          <p className="text-lg text-muted-foreground">
            Upload brain MRI scans in DICOM or NIfTI format for automated preprocessing and analysis
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="border-border shadow-medium">
            <CardHeader>
              <CardTitle>Upload MRI Scan</CardTitle>
              <CardDescription>
                Supported formats: DICOM (.dcm), NIfTI (.nii, .nii.gz) | Maximum file size: 500MB
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                  isDragging
                    ? "border-primary bg-primary/5 scale-105"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  {file ? (
                    <>
                      <div className="bg-success/10 p-4 rounded-full">
                        <FileImage className="h-12 w-12 text-success" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFile(null);
                          setStages(stages.map(s => ({ ...s, status: "pending" })));
                          setProgress(0);
                        }}
                      >
                        Remove File
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="bg-primary/10 p-4 rounded-full">
                        <UploadIcon className="h-12 w-12 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold mb-1">
                          Drag and drop your MRI scan here
                        </p>
                        <p className="text-sm text-muted-foreground">or click to browse files</p>
                      </div>
                      <label>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".dcm,.nii,.nii.gz"
                          className="hidden"
                        />
                        <Button asChild>
                          <span>Select File</span>
                        </Button>
                      </label>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Status */}
          {file && (
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle>Preprocessing Pipeline</CardTitle>
                <CardDescription>
                  Automated processing to prepare your scan for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {stages.map((stage, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {stage.status === "complete" ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : stage.status === "processing" ? (
                          <Loader2 className="h-5 w-5 text-primary animate-spin" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-muted" />
                        )}
                      </div>
                      <span
                        className={`font-medium ${
                          stage.status === "complete"
                            ? "text-foreground"
                            : stage.status === "processing"
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {stage.name}
                      </span>
                    </div>
                  ))}
                </div>

                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="font-semibold">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                <Button
                  onClick={simulateProcessing}
                  disabled={isProcessing}
                  className="w-full bg-gradient-primary"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Start Preprocessing"
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
