import { useState } from "react";
import { Microscope, LineChart, BarChart3, PieChart, Download, Filter, TrendingUp, Users, Brain, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data for research analytics
const studyOverview = {
  totalCases: 8547,
  validatedCases: 7892,
  pendingValidation: 655,
  averageConfidence: 94.2,
  diseaseDistribution: [
    { disease: "Stroke", count: 2145, percentage: 25.1 },
    { disease: "Hemorrhage", count: 1876, percentage: 21.9 },
    { disease: "Neurodegeneration", count: 1534, percentage: 17.9 },
    { disease: "Tumor", count: 1298, percentage: 15.2 },
    { disease: "Normal", count: 1694, percentage: 19.9 },
  ],
};

const validationQueue = [
  { id: "MRI-8547", disease: "Stroke", confidence: 89.4, region: "Left MCA", uploaded: "2024-03-18", status: "Pending" },
  { id: "MRI-8546", disease: "Tumor", confidence: 92.1, region: "Frontal Lobe", uploaded: "2024-03-18", status: "Pending" },
  { id: "MRI-8545", disease: "Hemorrhage", confidence: 87.8, region: "Basal Ganglia", uploaded: "2024-03-17", status: "In Review" },
  { id: "MRI-8544", disease: "Neurodegeneration", confidence: 91.3, region: "Hippocampus", uploaded: "2024-03-17", status: "Pending" },
  { id: "MRI-8543", disease: "Stroke", confidence: 88.9, region: "Right Hemisphere", uploaded: "2024-03-17", status: "Pending" },
];

const diseaseProgression = [
  { stage: "Early", strokeCount: 456, hemorrhageCount: 234, tumorCount: 189, neurodegCount: 298 },
  { stage: "Moderate", strokeCount: 892, hemorrhageCount: 567, tumorCount: 423, neurodegCount: 612 },
  { stage: "Advanced", strokeCount: 797, hemorrhageCount: 1075, tumorCount: 686, neurodegCount: 624 },
];

const statisticalMetrics = [
  { metric: "Sensitivity", stroke: 96.8, hemorrhage: 97.9, neurodeg: 94.2, tumor: 95.7 },
  { metric: "Specificity", stroke: 97.2, hemorrhage: 98.1, neurodeg: 95.8, tumor: 96.3 },
  { metric: "PPV", stroke: 95.9, hemorrhage: 97.4, neurodeg: 93.7, tumor: 94.9 },
  { metric: "NPV", stroke: 97.8, hemorrhage: 98.5, neurodeg: 96.1, tumor: 96.8 },
];

const recentPublications = [
  { title: "Deep Learning for Stroke Detection in MRI", citations: 234, year: 2024, impact: "High" },
  { title: "Automated Hemorrhage Segmentation Using U-Net", citations: 189, year: 2024, impact: "High" },
  { title: "Multi-Modal Brain Tumor Classification", citations: 156, year: 2023, impact: "Medium" },
  { title: "AI-Assisted Neurodegeneration Diagnosis", citations: 142, year: 2023, impact: "Medium" },
];

const cohortAnalysis = [
  { ageGroup: "18-30", total: 823, stroke: 45, hemorrhage: 67, tumor: 123, neurodeg: 12 },
  { ageGroup: "31-45", total: 1456, stroke: 234, hemorrhage: 189, tumor: 267, neurodeg: 89 },
  { ageGroup: "46-60", total: 2891, stroke: 678, hemorrhage: 456, tumor: 398, neurodeg: 456 },
  { ageGroup: "61-75", total: 2345, stroke: 789, hemorrhage: 567, tumor: 312, neurodeg: 678 },
  { ageGroup: "75+", total: 1032, stroke: 399, hemorrhage: 597, tumor: 198, neurodeg: 299 },
];

const Research = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDisease, setSelectedDisease] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Microscope className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Research Dashboard
              </h1>
              <p className="text-muted-foreground">Advanced analytics and validation tools for clinical research</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[700px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
            <TabsTrigger value="progression">Progression</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            {/* Study Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Cases</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{studyOverview.totalCases.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-2">Across all disease categories</p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Validated Cases</CardTitle>
                  <Brain className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{studyOverview.validatedCases.toLocaleString()}</div>
                  <Progress value={(studyOverview.validatedCases / studyOverview.totalCases) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Validation</CardTitle>
                  <AlertCircle className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{studyOverview.pendingValidation}</div>
                  <p className="text-xs text-warning mt-2">Requires expert review</p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Confidence</CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{studyOverview.averageConfidence}%</div>
                  <Progress value={studyOverview.averageConfidence} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Disease Distribution */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Disease Distribution Analysis</CardTitle>
                    <CardDescription>Breakdown of cases across disease categories</CardDescription>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyOverview.diseaseDistribution.map((item) => (
                    <div key={item.disease} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <PieChart className="h-4 w-4 text-primary" />
                          <span className="font-medium">{item.disease}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{item.count.toLocaleString()} cases</span>
                          <Badge variant="secondary">{item.percentage}%</Badge>
                        </div>
                      </div>
                      <Progress value={item.percentage * 4} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Publications */}
            <Card>
              <CardHeader>
                <CardTitle>Related Research Publications</CardTitle>
                <CardDescription>Recent studies and citations in the field</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Publication Title</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Citations</TableHead>
                      <TableHead>Impact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPublications.map((pub, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{pub.title}</TableCell>
                        <TableCell>{pub.year}</TableCell>
                        <TableCell>{pub.citations}</TableCell>
                        <TableCell>
                          <Badge variant={pub.impact === 'High' ? 'default' : 'secondary'}>
                            {pub.impact}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Validation Tab */}
          <TabsContent value="validation" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Validation Queue</CardTitle>
                    <CardDescription>Cases requiring expert validation</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedDisease} onValueChange={setSelectedDisease}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by disease" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Diseases</SelectItem>
                        <SelectItem value="stroke">Stroke</SelectItem>
                        <SelectItem value="hemorrhage">Hemorrhage</SelectItem>
                        <SelectItem value="tumor">Tumor</SelectItem>
                        <SelectItem value="neurodegeneration">Neurodegeneration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case ID</TableHead>
                      <TableHead>Disease</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Affected Region</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validationQueue.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.disease}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{item.confidence}%</span>
                            <Progress value={item.confidence} className="w-16" />
                          </div>
                        </TableCell>
                        <TableCell>{item.region}</TableCell>
                        <TableCell>{item.uploaded}</TableCell>
                        <TableCell>
                          <Badge variant={item.status === 'Pending' ? 'secondary' : 'default'}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm">Review</Button>
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
                  <CardTitle>Validation Criteria</CardTitle>
                  <CardDescription>Expert review guidelines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Minimum Confidence Threshold</Label>
                    <Input type="number" placeholder="90" defaultValue="90" />
                  </div>
                  <div className="space-y-2">
                    <Label>Review Priority</Label>
                    <Select defaultValue="confidence">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confidence">Low Confidence First</SelectItem>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="disease">By Disease Type</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Apply Filters</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Validation Statistics</CardTitle>
                  <CardDescription>Review performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Agreement Rate</span>
                    <span className="text-2xl font-bold">96.2%</span>
                  </div>
                  <Progress value={96.2} />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Inter-rater Reliability</span>
                    <span className="text-2xl font-bold">0.94</span>
                  </div>
                  <Progress value={94} />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Review Time</span>
                    <span className="text-2xl font-bold">4.2 min</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Disease Progression Tab */}
          <TabsContent value="progression" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Disease Progression Analysis</CardTitle>
                    <CardDescription>Severity distribution across disease categories</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Stage</TableHead>
                      <TableHead>Stroke</TableHead>
                      <TableHead>Hemorrhage</TableHead>
                      <TableHead>Tumor</TableHead>
                      <TableHead>Neurodegeneration</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {diseaseProgression.map((row) => {
                      const total = row.strokeCount + row.hemorrhageCount + row.tumorCount + row.neurodegCount;
                      return (
                        <TableRow key={row.stage}>
                          <TableCell className="font-medium">{row.stage}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{row.strokeCount}</span>
                              <Progress value={(row.strokeCount / total) * 100} className="w-16" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{row.hemorrhageCount}</span>
                              <Progress value={(row.hemorrhageCount / total) * 100} className="w-16" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{row.tumorCount}</span>
                              <Progress value={(row.tumorCount / total) * 100} className="w-16" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{row.neurodegCount}</span>
                              <Progress value={(row.neurodegCount / total) * 100} className="w-16" />
                            </div>
                          </TableCell>
                          <TableCell className="font-bold">{total}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    Temporal Analysis
                  </CardTitle>
                  <CardDescription>Disease progression over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-secondary/20 rounded-lg">
                    <p className="text-muted-foreground">Temporal progression chart visualization</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Severity Distribution
                  </CardTitle>
                  <CardDescription>Cases by severity level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-secondary/20 rounded-lg">
                    <p className="text-muted-foreground">Severity distribution chart visualization</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Statistical Performance Metrics</CardTitle>
                <CardDescription>Diagnostic accuracy across disease categories</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Stroke</TableHead>
                      <TableHead>Hemorrhage</TableHead>
                      <TableHead>Neurodegeneration</TableHead>
                      <TableHead>Tumor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statisticalMetrics.map((row) => (
                      <TableRow key={row.metric}>
                        <TableCell className="font-medium">{row.metric}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{row.stroke}%</span>
                            <Progress value={row.stroke} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{row.hemorrhage}%</span>
                            <Progress value={row.hemorrhage} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{row.neurodeg}%</span>
                            <Progress value={row.neurodeg} className="w-20" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{row.tumor}%</span>
                            <Progress value={row.tumor} className="w-20" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>ROC Analysis</CardTitle>
                  <CardDescription>Receiver Operating Characteristic</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">AUC Score</span>
                      <span className="font-bold">0.982</span>
                    </div>
                    <Progress value={98.2} />
                    <p className="text-xs text-success">Excellent discrimination</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Confusion Matrix</CardTitle>
                  <CardDescription>Classification accuracy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">True Positives</span>
                      <span className="font-bold">7,521</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">False Positives</span>
                      <span className="font-bold">203</span>
                    </div>
                    <p className="text-xs text-muted-foreground">97.4% accuracy</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Confidence Intervals</CardTitle>
                  <CardDescription>95% CI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Lower Bound</span>
                      <span className="font-bold">94.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Upper Bound</span>
                      <span className="font-bold">98.1%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Narrow CI range</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cohorts Tab */}
          <TabsContent value="cohorts" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Cohort Analysis</CardTitle>
                    <CardDescription>Disease distribution by age group</CardDescription>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Age Group</TableHead>
                      <TableHead>Total Cases</TableHead>
                      <TableHead>Stroke</TableHead>
                      <TableHead>Hemorrhage</TableHead>
                      <TableHead>Tumor</TableHead>
                      <TableHead>Neurodegeneration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cohortAnalysis.map((cohort) => (
                      <TableRow key={cohort.ageGroup}>
                        <TableCell className="font-medium">{cohort.ageGroup}</TableCell>
                        <TableCell className="font-bold">{cohort.total.toLocaleString()}</TableCell>
                        <TableCell>{cohort.stroke}</TableCell>
                        <TableCell>{cohort.hemorrhage}</TableCell>
                        <TableCell>{cohort.tumor}</TableCell>
                        <TableCell>{cohort.neurodeg}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Demographics Overview</CardTitle>
                  <CardDescription>Patient population characteristics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Male</span>
                      <span className="text-sm font-medium">4,892 (57.2%)</span>
                    </div>
                    <Progress value={57.2} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Female</span>
                      <span className="text-sm font-medium">3,655 (42.8%)</span>
                    </div>
                    <Progress value={42.8} />
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Median Age: 58 years</p>
                    <p className="text-sm text-muted-foreground">Age Range: 18-94 years</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Factors Analysis</CardTitle>
                  <CardDescription>Prevalence of comorbidities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Hypertension</span>
                      <span className="text-sm font-medium">4,234 (49.5%)</span>
                    </div>
                    <Progress value={49.5} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Diabetes</span>
                      <span className="text-sm font-medium">2,145 (25.1%)</span>
                    </div>
                    <Progress value={25.1} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Smoking History</span>
                      <span className="text-sm font-medium">3,298 (38.6%)</span>
                    </div>
                    <Progress value={38.6} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Research;
