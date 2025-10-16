import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, AlertTriangle, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const classificationResults = {
  prediction: "Stroke",
  confidence: 94.5,
  timestamp: new Date().toLocaleString(),
  probabilities: [
    { disease: "Stroke", probability: 94.5, color: "critical" },
    { disease: "Hemorrhage", probability: 3.2, color: "warning" },
    { disease: "Neurodegeneration", probability: 1.8, color: "muted" },
    { disease: "Tumor", probability: 0.5, color: "muted" },
  ],
  metadata: {
    processingTime: "1.8s",
    imageSlices: 128,
    resolution: "256x256x128",
  },
};

export default function Classification() {
  const topPrediction = classificationResults.probabilities[0];
  const isAbnormal = topPrediction.disease !== "Normal";

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Disease Classification</h1>
          <p className="text-lg text-muted-foreground">
            AI-powered analysis results with confidence scores and probability distribution
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Result Card */}
          <Card className="lg:col-span-2 border-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                Classification Result
              </CardTitle>
              <CardDescription>Analysis completed at {classificationResults.timestamp}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary Result */}
              <div className="bg-gradient-subtle rounded-xl p-6 border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Detected Condition</p>
                    <h2 className="text-3xl font-bold text-foreground">
                      {classificationResults.prediction}
                    </h2>
                  </div>
                  {isAbnormal ? (
                    <AlertCircle className="h-8 w-8 text-critical" />
                  ) : (
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Confidence Level</span>
                    <span className="text-2xl font-bold text-primary">
                      {classificationResults.confidence}%
                    </span>
                  </div>
                  <Progress value={classificationResults.confidence} className="h-3" />
                  <div className="flex items-center gap-2 mt-3">
                    {classificationResults.confidence > 90 ? (
                      <Badge className="bg-success">High Confidence</Badge>
                    ) : classificationResults.confidence > 70 ? (
                      <Badge className="bg-warning">Moderate Confidence</Badge>
                    ) : (
                      <Badge variant="outline">Low Confidence</Badge>
                    )}
                    {isAbnormal && <Badge variant="destructive">Abnormality Detected</Badge>}
                  </div>
                </div>
              </div>

              {/* Probability Distribution */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Probability Distribution</h3>
                <div className="space-y-4">
                  {classificationResults.probabilities.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.disease}</span>
                        <span className="text-sm font-semibold">{item.probability}%</span>
                      </div>
                      <Progress
                        value={item.probability}
                        className={`h-2 ${
                          index === 0 ? "bg-critical/20" : ""
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Link to="/segmentation" className="flex-1">
                  <Button className="w-full bg-gradient-primary" size="lg">
                    View Segmentation
                  </Button>
                </Link>
                <Link to="/report" className="flex-1">
                  <Button variant="outline" className="w-full" size="lg">
                    Generate Report
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Metadata Card */}
            <Card className="border-border shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Scan Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Processing Time</p>
                  <p className="font-semibold">{classificationResults.metadata.processingTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Image Slices</p>
                  <p className="font-semibold">{classificationResults.metadata.imageSlices}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resolution</p>
                  <p className="font-semibold">{classificationResults.metadata.resolution}</p>
                </div>
              </CardContent>
            </Card>

            {/* Clinical Alert */}
            {isAbnormal && (
              <Card className="border-critical/50 bg-critical/5 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-critical">
                    <AlertTriangle className="h-5 w-5" />
                    Clinical Alert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Abnormality detected with high confidence. Immediate review by a qualified
                    radiologist is recommended. This AI-assisted diagnosis should be used as a
                    decision support tool only.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Model Info */}
            <Card className="border-border shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Model Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Architecture</p>
                  <p className="font-semibold">3D ResNet-50</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Training Dataset</p>
                  <p className="font-semibold">50,000+ annotated scans</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Validation Accuracy</p>
                  <p className="font-semibold">98.5%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
