import { useState } from "react";
import { Shield, Database, Activity, Users, Brain, Upload, Download, Trash2, Edit, Check, X, TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// Mock data
const systemStats = {
  totalScans: 15847,
  activeUsers: 234,
  modelAccuracy: 96.8,
  avgProcessingTime: 2.4,
  storageUsed: 68,
  datasetsCount: 12,
};

const modelPerformance = [
  { disease: "Stroke", accuracy: 97.2, precision: 96.8, recall: 97.5, f1Score: 97.1 },
  { disease: "Hemorrhage", accuracy: 98.1, precision: 97.9, recall: 98.3, f1Score: 98.1 },
  { disease: "Neurodegeneration", accuracy: 95.4, precision: 94.9, recall: 96.1, f1Score: 95.5 },
  { disease: "Tumor", accuracy: 96.9, precision: 96.5, recall: 97.2, f1Score: 96.8 },
  { disease: "Normal", accuracy: 98.5, precision: 98.2, recall: 98.7, f1Score: 98.4 },
];

const datasets = [
  { id: 1, name: "BraTS 2023", scans: 3500, size: "124 GB", status: "Active", lastUpdated: "2024-03-15" },
  { id: 2, name: "ADNI Alzheimer's", scans: 2800, size: "98 GB", status: "Active", lastUpdated: "2024-03-10" },
  { id: 3, name: "Stroke Dataset v2", scans: 1200, size: "45 GB", status: "Processing", lastUpdated: "2024-03-18" },
  { id: 4, name: "Hemorrhage Cases", scans: 890, size: "32 GB", status: "Active", lastUpdated: "2024-03-12" },
  { id: 5, name: "Validation Set", scans: 450, size: "18 GB", status: "Inactive", lastUpdated: "2024-02-28" },
];

const users = [
  { id: 1, name: "Dr. Sarah Johnson", email: "sarah.j@hospital.com", role: "Radiologist", scans: 342, lastActive: "2 hours ago", status: "Active" },
  { id: 2, name: "Dr. Michael Chen", email: "m.chen@medical.org", role: "Neurologist", scans: 287, lastActive: "1 day ago", status: "Active" },
  { id: 3, name: "Dr. Emily Rodriguez", email: "emily.r@clinic.com", role: "Researcher", scans: 156, lastActive: "3 hours ago", status: "Active" },
  { id: 4, name: "Dr. James Wilson", email: "j.wilson@hospital.com", role: "Admin", scans: 89, lastActive: "5 minutes ago", status: "Active" },
  { id: 5, name: "Dr. Lisa Anderson", email: "l.anderson@medical.org", role: "Radiologist", scans: 198, lastActive: "1 week ago", status: "Inactive" },
];

const recentActivity = [
  { id: 1, action: "New dataset uploaded", user: "Dr. James Wilson", timestamp: "10 minutes ago", type: "dataset" },
  { id: 2, action: "Model retrained - Stroke detection", user: "System", timestamp: "2 hours ago", type: "model" },
  { id: 3, action: "User role updated", user: "Dr. Sarah Johnson", timestamp: "5 hours ago", type: "user" },
  { id: 4, action: "Performance threshold alert", user: "System", timestamp: "1 day ago", type: "alert" },
  { id: 5, action: "Dataset validation completed", user: "System", timestamp: "2 days ago", type: "dataset" },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">System management and monitoring</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Scans Processed</CardTitle>
                  <Activity className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{systemStats.totalScans.toLocaleString()}</div>
                  <p className="text-xs text-success flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3" />
                    <span>+12.5% from last month</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{systemStats.activeUsers}</div>
                  <p className="text-xs text-success flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3" />
                    <span>+8.2% from last month</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Model Accuracy</CardTitle>
                  <Brain className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{systemStats.modelAccuracy}%</div>
                  <Progress value={systemStats.modelAccuracy} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Processing Time</CardTitle>
                  <BarChart3 className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{systemStats.avgProcessingTime}s</div>
                  <p className="text-xs text-success flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3" />
                    <span>15% faster than target</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Storage Usage</CardTitle>
                  <Database className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{systemStats.storageUsed}%</div>
                  <Progress value={systemStats.storageUsed} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Datasets</CardTitle>
                  <Database className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{systemStats.datasetsCount}</div>
                  <p className="text-xs text-muted-foreground mt-2">317 GB total storage</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system events and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'model' ? 'bg-primary/10 text-primary' :
                        activity.type === 'dataset' ? 'bg-success/10 text-success' :
                        activity.type === 'alert' ? 'bg-warning/10 text-warning' :
                        'bg-accent/10 text-accent'
                      }`}>
                        {activity.type === 'model' ? <Brain className="h-4 w-4" /> :
                         activity.type === 'dataset' ? <Database className="h-4 w-4" /> :
                         activity.type === 'alert' ? <Activity className="h-4 w-4" /> :
                         <Users className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.user}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Datasets Tab */}
          <TabsContent value="datasets" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Dataset Management</CardTitle>
                    <CardDescription>Manage and monitor training datasets</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Dataset
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dataset Name</TableHead>
                      <TableHead>Scans</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {datasets.map((dataset) => (
                      <TableRow key={dataset.id}>
                        <TableCell className="font-medium">{dataset.name}</TableCell>
                        <TableCell>{dataset.scans.toLocaleString()}</TableCell>
                        <TableCell>{dataset.size}</TableCell>
                        <TableCell>
                          <Badge variant={
                            dataset.status === 'Active' ? 'default' :
                            dataset.status === 'Processing' ? 'secondary' :
                            'outline'
                          }>
                            {dataset.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{dataset.lastUpdated}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Models Tab */}
          <TabsContent value="models" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Model Performance</CardTitle>
                    <CardDescription>Monitor and update disease classification models</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Brain className="h-4 w-4" />
                    Retrain Models
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Disease Category</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>Precision</TableHead>
                      <TableHead>Recall</TableHead>
                      <TableHead>F1-Score</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modelPerformance.map((model) => (
                      <TableRow key={model.disease}>
                        <TableCell className="font-medium">{model.disease}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{model.accuracy}%</span>
                            <Progress value={model.accuracy} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>{model.precision}%</TableCell>
                        <TableCell>{model.recall}%</TableCell>
                        <TableCell>{model.f1Score}%</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="default" className="gap-1">
                            <Check className="h-3 w-3" />
                            Optimal
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Training Status</CardTitle>
                  <CardDescription>Current training progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Stroke Detection Model</span>
                      <span className="text-sm text-muted-foreground">Epoch 145/150</span>
                    </div>
                    <Progress value={96.7} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Segmentation U-Net</span>
                      <span className="text-sm text-muted-foreground">Epoch 89/100</span>
                    </div>
                    <Progress value={89} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Disease Categories</CardTitle>
                  <CardDescription>Manage supported disease types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Stroke', 'Hemorrhage', 'Neurodegeneration', 'Tumor', 'Normal'].map((disease) => (
                      <div key={disease} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-success" />
                          <span className="font-medium">{disease}</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">Add New Category</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user access and permissions</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Search users..." className="w-64" />
                    <Button className="gap-2">
                      <Users className="h-4 w-4" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Scans Analyzed</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.scans}</TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'Active' ? 'default' : 'outline'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              {user.status === 'Active' ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
