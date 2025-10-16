import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Layers, Maximize2, Download, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";

const segmentationData = {
  affectedRegion: "Left Middle Cerebral Artery Territory",
  volume: "45.3 cm³",
  severity: "Moderate",
  sliceCount: 128,
  affectedSlices: 42,
  coordinates: {
    x: "112-156",
    y: "98-142",
    z: "64-106",
  },
};

interface TumorStats {
  tumor_coverage_percent: number;
  severity: string;
  affected_region: string;
  bounding_box: {
    x_min: number;
    x_max: number;
    y_min: number;
    y_max: number;
  } | null;
  tumor_area_pixels: number;
  tumor_volume_mm3: number;
}

export default function Segmentation() {
  const [activeView, setActiveView] = useState("axial");
  const [sliceIndex, setSliceIndex] = useState(64);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [tumorStats, setTumorStats] = useState<TumorStats | null>(null);

  useEffect(() => {
    const savedStats = localStorage.getItem("tumorStats");
    const savedImage = localStorage.getItem("segmentationResult");
    
    if (savedStats) {
      setTumorStats(JSON.parse(savedStats));
    }
    if (savedImage) {
      setProcessedImage(savedImage);
    }

    return () => {
      if (savedImage) {
        URL.revokeObjectURL(savedImage);
        localStorage.removeItem("segmentationResult");
        localStorage.removeItem("tumorStats");
      }
    };
  }, []);

  // Add helper function to format volume
  const formatVolume = (volume: number) => {
    if (volume > 1000) {
      return `${(volume / 1000).toFixed(2)} cm³`;
    }
    return `${volume.toFixed(2)} mm³`;
  };

  // Add the getSeverityColor function at the top level
  const getSeverityColor = (severity: string | undefined) => {
    switch (severity?.toLowerCase()) {
      case 'mild':
        return 'bg-green-500/10 text-green-500';
      case 'moderate':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'severe':
        return 'bg-orange-500/10 text-orange-500';
      case 'critical':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-neutral-500/10 text-neutral-500';
    }
  };

  // Update the Affected Region Card
  const AffectedRegionCard = () => (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">Affected Region</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Location</p>
          <p className="font-semibold">{tumorStats?.affected_region || "Not detected"}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Volume</p>
            <p className="font-semibold text-lg">
              {tumorStats ? formatVolume(tumorStats.tumor_volume_mm3) : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Severity</p>
            <Badge className={getSeverityColor(tumorStats?.severity)}>
              {tumorStats?.severity || "Unknown"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Update the Coordinates Card
  const CoordinatesCard = () => (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">Spatial Coordinates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tumorStats?.bounding_box ? (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted/50 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">X-axis</p>
              <p className="font-semibold text-sm">
                {`${tumorStats.bounding_box.x_min}-${tumorStats.bounding_box.x_max}`}
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Y-axis</p>
              <p className="font-semibold text-sm">
                {`${tumorStats.bounding_box.y_min}-${tumorStats.bounding_box.y_max}`}
              </p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Size</p>
              <p className="font-semibold text-sm">
                {`${tumorStats.tumor_area_pixels} px`}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            No coordinates available
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Update the Statistics Card
  const StatisticsCard = () => (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">Segmentation Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tumorStats ? (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Coverage</span>
              <span className="font-semibold">{tumorStats.tumor_coverage_percent}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Volume</span>
              <span className="font-semibold">{tumorStats.tumor_volume_mm3} mm³</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Severity</span>
              <Badge 
                className={`bg-${tumorStats.severity ? tumorStats.severity.toLowerCase() : 'neutral'}`}
              >
                {tumorStats.severity || 'Unknown'}
              </Badge>
            </div>
            {tumorStats.bounding_box && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Bounding Box</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>X: {tumorStats.bounding_box.x_min} - {tumorStats.bounding_box.x_max}</div>
                  <div>Y: {tumorStats.bounding_box.y_min} - {tumorStats.bounding_box.y_max}</div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-muted-foreground">
            No statistics available
          </div>
        )}
      </CardContent>
    </Card>
  );

  // In your Segmentation component where you process the tumor stats
  const saveSegmentationDetails = (stats: TumorStats) => {
    const details = {
      region: stats.affected_region,
      volume_mm3: stats.tumor_volume_mm3,
      severity: stats.severity,
      bounding_box: stats.bounding_box,
      tumor_area_pixels: stats.tumor_area_pixels,
      coverage_percent: stats.tumor_coverage_percent
    };

    localStorage.setItem('segmentationDetails', JSON.stringify(details));
  };

  // Call this when you receive the stats
  useEffect(() => {
    if (tumorStats) {
      saveSegmentationDetails(tumorStats);
    }
  }, [tumorStats]);

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Region Segmentation</h1>
          <p className="text-lg text-muted-foreground">
            Precise visualization and analysis of affected brain regions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Visualization */}
          <Card className="lg:col-span-2 border-border shadow-medium">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-6 w-6 text-primary" />
                    3D Segmentation View
                  </CardTitle>
                  <CardDescription>Interactive visualization of affected regions</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RotateCw className="h-4 w-4 mr-2" />
                    Reset View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Fullscreen
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeView} onValueChange={setActiveView}>
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger value="axial">Axial</TabsTrigger>
                  <TabsTrigger value="sagittal">Sagittal</TabsTrigger>
                  <TabsTrigger value="coronal">Coronal</TabsTrigger>
                  <TabsTrigger value="3d">3D View</TabsTrigger>
                </TabsList>

                <TabsContent value="axial" className="space-y-4">
                  <div className="bg-muted/30 rounded-lg aspect-square flex items-center justify-center border-2 border-border relative overflow-hidden">
                    {processedImage ? (
                      <img
                        src={processedImage}
                        alt="Segmented Brain Scan"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <p>No image processed</p>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-card/90 backdrop-blur px-3 py-2 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Slice {sliceIndex}/{segmentationData.sliceCount}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Slice Navigation:</span>
                    <input
                      type="range"
                      min="1"
                      max={segmentationData.sliceCount}
                      value={sliceIndex}
                      onChange={(e) => setSliceIndex(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-semibold min-w-[3rem]">{sliceIndex}</span>
                  </div>
                </TabsContent>

                <TabsContent value="sagittal" className="space-y-4">
                  <div className="bg-muted/30 rounded-lg aspect-square flex items-center justify-center border-2 border-border">
                    <div className="text-center">
                      <p className="text-muted-foreground">Sagittal View</p>
                      <p className="text-sm text-muted-foreground">Interactive 3D visualization</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="coronal" className="space-y-4">
                  <div className="bg-muted/30 rounded-lg aspect-square flex items-center justify-center border-2 border-border">
                    <div className="text-center">
                      <p className="text-muted-foreground">Coronal View</p>
                      <p className="text-sm text-muted-foreground">Interactive 3D visualization</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="3d" className="space-y-4">
                  <div className="bg-gradient-to-br from-muted/30 via-background to-muted/30 rounded-lg aspect-square flex items-center justify-center border-2 border-border relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent animate-pulse" />
                    <div className="text-center relative z-10">
                      <div className="bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <Layers className="h-10 w-10 text-primary" />
                      </div>
                      <p className="text-lg font-semibold mb-2">3D Interactive View</p>
                      <p className="text-sm text-muted-foreground">Rotate, zoom, and explore the affected region</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Export Segmentation
                  </Button>
                  <Link to="/report" className="flex-1">
                    <Button className="w-full bg-gradient-primary">
                      Generate Report
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Segmentation Details */}
          <div className="space-y-6">
            <AffectedRegionCard />
            <CoordinatesCard />
            <StatisticsCard />

            {/* Pipeline Info */}
            <Card className="border-border shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Segmentation Pipeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-semibold">U-Net + MONAI</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Precision</p>
                  <p className="font-semibold">97.3%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Processing Time</p>
                  <p className="font-semibold">2.1s</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
