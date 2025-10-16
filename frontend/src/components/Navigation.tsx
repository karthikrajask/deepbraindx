import { Link, useLocation } from "react-router-dom";
import { Brain, Upload, Activity, Layers, FileText, Home, Shield, Microscope } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/upload", label: "Upload & Preprocessing", icon: Upload },
  { path: "/classification", label: "Classification", icon: Activity },
  { path: "/segmentation", label: "Segmentation", icon: Layers },
  { path: "/report", label: "Report", icon: FileText },
  { path: "/admin", label: "Admin", icon: Shield },
  { path: "/research", label: "Research", icon: Microscope },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-card border-b border-border shadow-soft sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-primary rounded-lg transition-transform group-hover:scale-105">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                DeepBrainDx
              </h1>
              <p className="text-xs text-muted-foreground">AI-Powered Brain MRI Analysis</p>
            </div>
          </Link>

          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
                    "hover:bg-secondary/80",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
