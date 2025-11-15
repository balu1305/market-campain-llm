import React, { useState } from "react";
import {
  TestTube,
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  CheckCircle,
  Clock,
  BarChart3,
  Target,
  Users,
  Mail,
  Share2,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ABTests = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedTest, setSelectedTest] = useState(null);

  const abTests = [
    {
      id: 1,
      name: "Subject Line Optimization",
      type: "Email",
      status: "Running",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      progress: 67,
      significance: 95,
      variants: [
        {
          name: "Variant A",
          description: "🚀 Unlock Your Marketing Potential",
          participants: 2450,
          conversions: 196,
          conversionRate: 8.0,
          isControl: true,
        },
        {
          name: "Variant B",
          description: "Transform Your Marketing Today",
          participants: 2398,
          conversions: 168,
          conversionRate: 7.0,
          isControl: false,
        },
      ],
      winner: "A",
      confidenceLevel: 95,
      lift: "+14.3%",
    },
    {
      id: 2,
      name: "CTA Button Colors",
      type: "Landing Page",
      status: "Completed",
      startDate: "2024-01-01",
      endDate: "2024-01-30",
      progress: 100,
      significance: 98,
      variants: [
        {
          name: "Blue Button",
          description: "Primary blue CTA button",
          participants: 5240,
          conversions: 420,
          conversionRate: 8.0,
          isControl: true,
        },
        {
          name: "Green Button",
          description: "Green CTA button",
          participants: 5180,
          conversions: 518,
          conversionRate: 10.0,
          isControl: false,
        },
      ],
      winner: "B",
      confidenceLevel: 98,
      lift: "+25.0%",
    },
    {
      id: 3,
      name: "Email Send Time",
      type: "Email",
      status: "Running",
      startDate: "2024-01-20",
      endDate: "2024-02-20",
      progress: 45,
      significance: 87,
      variants: [
        {
          name: "Morning (9 AM)",
          description: "Send emails at 9:00 AM",
          participants: 1890,
          conversions: 151,
          conversionRate: 8.0,
          isControl: true,
        },
        {
          name: "Evening (6 PM)",
          description: "Send emails at 6:00 PM",
          participants: 1845,
          conversions: 166,
          conversionRate: 9.0,
          isControl: false,
        },
      ],
      winner: "B",
      confidenceLevel: 87,
      lift: "+12.5%",
    },
    {
      id: 4,
      name: "Social Media Ad Copy",
      type: "Social",
      status: "Draft",
      startDate: "2024-02-01",
      endDate: "2024-03-01",
      progress: 0,
      significance: 0,
      variants: [
        {
          name: "Emotional Appeal",
          description: "Transform your life with our solution",
          participants: 0,
          conversions: 0,
          conversionRate: 0,
          isControl: true,
        },
        {
          name: "Feature Focused",
          description: "Advanced features for better results",
          participants: 0,
          conversions: 0,
          conversionRate: 0,
          isControl: false,
        },
      ],
      winner: null,
      confidenceLevel: 0,
      lift: "TBD",
    },
    {
      id: 5,
      name: "Pricing Page Layout",
      type: "Landing Page",
      status: "Paused",
      startDate: "2024-01-10",
      endDate: "2024-02-10",
      progress: 30,
      significance: 72,
      variants: [
        {
          name: "3-Column Layout",
          description: "Traditional 3-tier pricing display",
          participants: 1240,
          conversions: 87,
          conversionRate: 7.0,
          isControl: true,
        },
        {
          name: "Single Column",
          description: "Simplified single pricing option",
          participants: 1198,
          conversions: 96,
          conversionRate: 8.0,
          isControl: false,
        },
      ],
      winner: "B",
      confidenceLevel: 72,
      lift: "+14.3%",
    },
  ];

  const testStats = {
    totalTests: abTests.length,
    runningTests: abTests.filter((test) => test.status === "Running").length,
    completedTests: abTests.filter((test) => test.status === "Completed")
      .length,
    averageLift: "+16.8%",
  };

  const filteredTests = abTests.filter((test) => {
    if (selectedFilter === "all") return true;
    return test.status.toLowerCase() === selectedFilter.toLowerCase();
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Running":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Paused":
        return "bg-yellow-100 text-yellow-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Running":
        return <Play className="h-4 w-4" />;
      case "Completed":
        return <CheckCircle className="h-4 w-4" />;
      case "Paused":
        return <Pause className="h-4 w-4" />;
      case "Draft":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Email":
        return <Mail className="h-4 w-4" />;
      case "Landing Page":
        return <Target className="h-4 w-4" />;
      case "Social":
        return <Share2 className="h-4 w-4" />;
      default:
        return <TestTube className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">A/B Testing</h1>
            <p className="text-gray-600 mt-1">
              Optimize your campaigns with data-driven testing
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="gap-2">
              <TestTube className="h-4 w-4" />
              Create New Test
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TestTube className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {testStats.totalTests}
                  </div>
                  <div className="text-sm text-gray-600">Total Tests</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Play className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {testStats.runningTests}
                  </div>
                  <div className="text-sm text-gray-600">Currently Running</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {testStats.completedTests}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {testStats.averageLift}
                  </div>
                  <div className="text-sm text-gray-600">Average Lift</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tests</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tests List */}
        <div className="space-y-4">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getTypeIcon(test.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {test.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{test.type}</Badge>
                        <Badge className={getStatusColor(test.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(test.status)}
                            {test.status}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {test.status === "Running" && (
                      <div className="text-sm text-gray-600">
                        {test.progress}% Complete
                      </div>
                    )}
                    {test.winner && (
                      <div className="text-sm">
                        <span className="text-green-600 font-medium">
                          Winner: Variant {test.winner}
                        </span>
                        <div className="text-green-600 font-bold">
                          {test.lift}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {test.status === "Running" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Test Progress</span>
                      <span>{test.progress}%</span>
                    </div>
                    <Progress value={test.progress} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {test.variants.map((variant, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg ${
                        test.winner === (index === 0 ? "A" : "B")
                          ? "border-green-500 bg-green-50"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{variant.name}</span>
                          {variant.isControl && (
                            <Badge variant="outline" className="text-xs">
                              Control
                            </Badge>
                          )}
                          {test.winner === (index === 0 ? "A" : "B") && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Winner
                            </Badge>
                          )}
                        </div>
                        {variant.conversionRate > 0 && (
                          <div className="text-right">
                            <div className="text-lg font-bold">
                              {variant.conversionRate}%
                            </div>
                            <div className="text-xs text-gray-600">
                              Conv. Rate
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        {variant.description}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Participants:</span>
                          <div className="font-medium">
                            {variant.participants.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Conversions:</span>
                          <div className="font-medium">
                            {variant.conversions.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>Started: {test.startDate}</span>
                      <span>Ends: {test.endDate}</span>
                      {test.significance > 0 && (
                        <span>Confidence: {test.significance}%</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>{test.name}</DialogTitle>
                            <DialogDescription>
                              Detailed A/B test results and analytics
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold">
                                  {test.significance}%
                                </div>
                                <div className="text-sm text-gray-600">
                                  Statistical Significance
                                </div>
                              </div>
                              <div className="text-center p-4 border rounded-lg">
                                <div className="text-2xl font-bold text-green-600">
                                  {test.lift}
                                </div>
                                <div className="text-sm text-gray-600">
                                  Performance Lift
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              {test.variants.map((variant, index) => (
                                <div
                                  key={index}
                                  className="p-4 border rounded-lg"
                                >
                                  <h4 className="font-medium mb-2">
                                    {variant.name}
                                  </h4>
                                  <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                      <span className="text-gray-600">
                                        Participants:
                                      </span>
                                      <div className="font-medium">
                                        {variant.participants.toLocaleString()}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">
                                        Conversions:
                                      </span>
                                      <div className="font-medium">
                                        {variant.conversions.toLocaleString()}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">
                                        Conv. Rate:
                                      </span>
                                      <div className="font-medium">
                                        {variant.conversionRate}%
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {test.status === "Running" && (
                        <Button variant="outline" size="sm" className="gap-1">
                          <Pause className="h-3 w-3" />
                          Pause
                        </Button>
                      )}
                      {test.status === "Paused" && (
                        <Button size="sm" className="gap-1">
                          <Play className="h-3 w-3" />
                          Resume
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No tests found</h3>
                <p>
                  Create your first A/B test to start optimizing your campaigns.
                </p>
                <Button className="mt-4 gap-2">
                  <TestTube className="h-4 w-4" />
                  Create Your First Test
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ABTests;
