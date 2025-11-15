import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Users,
  Mail,
  Share2,
  BarChart3,
  Clock,
  Calendar,
  Filter,
  RefreshCw,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Performance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [selectedMetric, setSelectedMetric] = useState("overview");

  const performanceMetrics = [
    {
      title: "Overall Performance Score",
      score: 87,
      change: "+5.2%",
      trend: "up",
      description: "Combined score across all campaigns",
    },
    {
      title: "Email Performance",
      score: 92,
      change: "+3.8%",
      trend: "up",
      description: "Open rates, click rates, conversions",
    },
    {
      title: "Social Media Performance",
      score: 78,
      change: "-1.2%",
      trend: "down",
      description: "Engagement, reach, shares",
    },
    {
      title: "ROI Performance",
      score: 94,
      change: "+12.4%",
      trend: "up",
      description: "Return on investment across channels",
    },
  ];

  const kpiMetrics = [
    {
      name: "Customer Acquisition Cost",
      value: "$23.50",
      target: "$25.00",
      progress: 94,
      trend: "down",
      change: "-6.2%",
    },
    {
      name: "Customer Lifetime Value",
      value: "$456.30",
      target: "$400.00",
      progress: 114,
      trend: "up",
      change: "+14.1%",
    },
    {
      name: "Monthly Recurring Revenue",
      value: "$28,450",
      target: "$30,000",
      progress: 95,
      trend: "up",
      change: "+8.7%",
    },
    {
      name: "Churn Rate",
      value: "2.3%",
      target: "3.0%",
      progress: 77,
      trend: "down",
      change: "-0.7%",
    },
  ];

  const campaignPerformance = [
    {
      name: "Summer Sale 2024",
      type: "Email",
      status: "Active",
      performance: 94,
      revenue: "$18,430",
      conversions: 456,
      roi: "380%",
      startDate: "2024-07-01",
    },
    {
      name: "Social Media Boost",
      type: "Social",
      status: "Completed",
      performance: 82,
      revenue: "$12,890",
      conversions: 234,
      roi: "260%",
      startDate: "2024-06-15",
    },
    {
      name: "Product Launch Campaign",
      type: "Multi-channel",
      status: "Active",
      performance: 88,
      revenue: "$25,670",
      conversions: 567,
      roi: "420%",
      startDate: "2024-06-20",
    },
    {
      name: "Newsletter Optimization",
      type: "Email",
      status: "Paused",
      performance: 76,
      revenue: "$8,450",
      conversions: 189,
      roi: "180%",
      startDate: "2024-06-01",
    },
  ];

  const timelineData = [
    {
      date: "Week 1",
      emailPerformance: 85,
      socialPerformance: 72,
      overallPerformance: 78,
    },
    {
      date: "Week 2",
      emailPerformance: 88,
      socialPerformance: 75,
      overallPerformance: 81,
    },
    {
      date: "Week 3",
      emailPerformance: 91,
      socialPerformance: 78,
      overallPerformance: 84,
    },
    {
      date: "Week 4",
      emailPerformance: 92,
      socialPerformance: 78,
      overallPerformance: 87,
    },
  ];

  const benchmarkData = [
    {
      metric: "Email Open Rate",
      yourPerformance: "24.8%",
      industryAverage: "21.3%",
      performance: "above",
      difference: "+3.5%",
    },
    {
      metric: "Click Through Rate",
      yourPerformance: "3.8%",
      industryAverage: "2.9%",
      performance: "above",
      difference: "+0.9%",
    },
    {
      metric: "Social Engagement",
      yourPerformance: "5.2%",
      industryAverage: "6.1%",
      performance: "below",
      difference: "-0.9%",
    },
    {
      metric: "Conversion Rate",
      yourPerformance: "2.1%",
      industryAverage: "1.8%",
      performance: "above",
      difference: "+0.3%",
    },
  ];

  const getPerformanceColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceBg = (score) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 70) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Performance Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor and analyze your marketing performance
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Performance Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2 rounded-lg ${getPerformanceBg(
                      metric.score
                    )}`}
                  >
                    <Award className="h-5 w-5" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <div className="space-y-2">
                  <div
                    className={`text-3xl font-bold ${getPerformanceColor(
                      metric.score
                    )}`}
                  >
                    {metric.score}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {metric.title}
                  </div>
                  <div className="text-xs text-gray-600">
                    {metric.description}
                  </div>
                  <Progress value={metric.score} className="h-2 mt-3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="kpis">KPIs</TabsTrigger>
            <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Timeline</CardTitle>
                  <CardDescription>
                    Track performance trends over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timelineData.map((week, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>{week.date}</span>
                          <span className="text-gray-600">
                            Overall: {week.overallPerformance}%
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Email</span>
                            <span>{week.emailPerformance}%</span>
                          </div>
                          <Progress
                            value={week.emailPerformance}
                            className="h-1"
                          />
                          <div className="flex justify-between text-xs">
                            <span>Social</span>
                            <span>{week.socialPerformance}%</span>
                          </div>
                          <Progress
                            value={week.socialPerformance}
                            className="h-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Content</CardTitle>
                  <CardDescription>
                    Your best performing pieces this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Mail className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          Summer Sale Announcement
                        </div>
                        <div className="text-xs text-gray-600">
                          Email Campaign
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        94% Score
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Share2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          Product Demo Video
                        </div>
                        <div className="text-xs text-gray-600">
                          Social Media
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        89% Score
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <BarChart3 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          Customer Success Story
                        </div>
                        <div className="text-xs text-gray-600">Blog Post</div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">
                        87% Score
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>
                  Detailed performance metrics for all campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Campaign
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Type
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Performance
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Revenue
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Conversions
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          ROI
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaignPerformance.map((campaign, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">{campaign.name}</div>
                              <div className="text-sm text-gray-600">
                                Started {campaign.startDate}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary">{campaign.type}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                campaign.status === "Active"
                                  ? "default"
                                  : campaign.status === "Completed"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {campaign.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={campaign.performance}
                                className="w-16 h-2"
                              />
                              <span
                                className={`text-sm font-medium ${getPerformanceColor(
                                  campaign.performance
                                )}`}
                              >
                                {campaign.performance}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium text-green-600">
                            {campaign.revenue}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {campaign.conversions}
                          </td>
                          <td className="py-3 px-4 font-medium">
                            {campaign.roi}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kpis">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {kpiMetrics.map((kpi, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{kpi.name}</CardTitle>
                    <CardDescription>Target: {kpi.target}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{kpi.value}</div>
                        <div
                          className={`flex items-center gap-1 text-sm ${
                            kpi.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {kpi.trend === "up" ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {kpi.change}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress to Target</span>
                          <span>{kpi.progress}%</span>
                        </div>
                        <Progress value={kpi.progress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="benchmarks">
            <Card>
              <CardHeader>
                <CardTitle>Industry Benchmarks</CardTitle>
                <CardDescription>
                  Compare your performance against industry standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benchmarkData.map((benchmark, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{benchmark.metric}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Your performance: {benchmark.yourPerformance} |
                          Industry avg: {benchmark.industryAverage}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            benchmark.performance === "above"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {benchmark.performance === "above"
                            ? "Above Average"
                            : "Below Average"}
                        </Badge>
                        <div
                          className={`text-sm font-medium mt-1 ${
                            benchmark.performance === "above"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {benchmark.difference}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Performance;
