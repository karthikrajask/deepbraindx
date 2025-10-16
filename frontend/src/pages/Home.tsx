import { Link } from "react-router-dom";
import { Upload, Activity, Layers, FileText, ArrowRight, Brain, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Upload,
    title: "Upload & Preprocessing",
    description: "Securely upload MRI scans in DICOM/NIfTI formats with automated preprocessing",
    link: "/upload",
    color: "primary",
  },
  {
    icon: Activity,
    title: "Disease Classification",
    description: "AI-powered classification for stroke, hemorrhage, neurodegeneration, and tumors",
    link: "/classification",
    color: "accent",
  },
  {
    icon: Layers,
    title: "Region Segmentation",
    description: "Precise identification and visualization of affected brain regions",
    link: "/segmentation",
    color: "warning",
  },
  {
    icon: FileText,
    title: "Diagnostic Reports",
    description: "Comprehensive reports with 3D visualizations and exportable formats",
    link: "/report",
    color: "critical",
  },
];

const capabilities = [
  {
    icon: Brain,
    title: "Advanced AI Models",
    description: "Powered by state-of-the-art U-Net and MONAI pipelines for accurate analysis",
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Fast preprocessing and analysis with immediate results and confidence scores",
  },
  {
    icon: Shield,
    title: "Clinical Grade",
    description: "Built for clinical workflows with HIPAA-compliant security standards",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Diagnostic Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Advanced Brain MRI
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Analysis & Diagnosis
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            DeepBrainDx combines cutting-edge artificial intelligence with medical imaging to provide
            rapid, accurate diagnosis of brain conditions including stroke, hemorrhage, neurodegeneration,
            and tumors.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/upload">
              <Button size="lg" className="bg-gradient-primary shadow-medium hover:shadow-strong transition-all">
                Start Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/classification">
              <Button size="lg" variant="outline" className="border-2">
                View Demo Results
              </Button>
            </Link>
          </div>
        </div>

        {/* Capabilities */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <Card key={capability.title} className="border-border hover:shadow-medium transition-all">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{capability.title}</h3>
                  <p className="text-muted-foreground text-sm">{capability.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} to={feature.link}>
                <Card className="border-border hover:shadow-medium hover:border-primary/30 transition-all group h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="bg-gradient-primary p-3 rounded-lg group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardTitle className="text-xl mt-4">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-primary font-medium text-sm group-hover:underline">
                      Learn more →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                98.5%
              </div>
              <div className="text-sm text-muted-foreground">Classification Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                &lt;2min
              </div>
              <div className="text-sm text-muted-foreground">Average Processing Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                4
              </div>
              <div className="text-sm text-muted-foreground">Disease Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                3D
              </div>
              <div className="text-sm text-muted-foreground">Interactive Visualization</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
