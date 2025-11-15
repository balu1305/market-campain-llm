import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Mail,
  Share2,
  MousePointer,
  Eye,
  DollarSign,
  Calendar,
  Filter,
  Download,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [selectedMetric, setSelectedMetric] = useState("all");

  const overviewStats = [
    {
      title: "Total Impressions",
      value: "2.4M",
      change: "+18.2%",
      trend: "up",
      icon: <Eye className="h-4 w-4" />,
      color: "blue",
    },
    {
      title: "Click-through Rate",
      value: "3.8%",
      change: "+0.5%",
      trend: "up",
      icon: <MousePointer className="h-4 w-4" />,
      color: "green",
    },
    {
      title: "Conversion Rate",
      value: "2.1%",
      change: "-0.3%",
      trend: "down",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "orange",
    },
    {
      title: "Revenue Generated",
      value: "$45,230",
      change: "+12.4%",
      trend: "up",
      icon: <DollarSign className="h-4 w-4" />,
      color: "purple",
    },
  ];

  const channelPerformance = [
    {
      channel: "Email Marketing",
      impressions: "856K",
      clicks: "32.4K",
      ctr: "3.8%",
      conversions: "1,240",
      revenue: "$18,450",
      growth: "+15.2%",
    },
    {
      channel: "Social Media",
      impressions: "1.2M",
      clicks: "42.1K",
      ctr: "3.5%",
      conversions: "980",
      revenue: "$14,700",
      growth: "+22.8%",
    },
    {
      channel: "Google Ads",
      impressions: "340K",
      clicks: "18.7K",
      ctr: "5.5%",
      conversions: "756",
      revenue: "$12,080",
      growth: "+8.1%",
    },
  ];

  const topCampaigns = [
    {
      name: "Summer Sale 2024",
      type: "Email",
      impressions: "245K",
      clicks: "12.3K",
      conversions: "456",
      revenue: "$8,920",
      roi: "340%",
    },
    {
      name: "Product Launch - Smart Watch",
      type: "Social",
      impressions: "180K",
      clicks: "8.9K",
      conversions: "234",
      revenue: "$5,680",
      roi: "275%",
    },
    {
      name: "Black Friday Preview",
      type: "Multi-channel",
      impressions: "320K",
      clicks: "15.6K",
      conversions: "678",
      revenue: "$12,340",
      roi: "410%",
    },
    {
      name: "Newsletter Signup Drive",
      type: "Email",
      impressions: "95K",
      clicks: "4.2K",
      conversions: "189",
      revenue: "$2,150",
      roi: "185%",
    },
  ];

  const audienceInsights = [
    {
      segment: "Tech Enthusiasts",
      size: "34.2K",
      engagement: "8.7%",
      topChannel: "Social Media",
      avgOrderValue: "$156",
    },
    {
      segment: "Budget Shoppers",
      size: "28.1K",
      engagement: "6.2%",
      topChannel: "Email",
      avgOrderValue: "$89",
    },
    {
      segment: "Premium Buyers",
      size: "12.8K",
      engagement: "12.4%",
      topChannel: "Google Ads",
      avgOrderValue: "$284",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Track your marketing performance and insights
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
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                    {stat.icon}
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Channel Performance */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Channel Performance</CardTitle>
                <CardDescription>
                  Compare performance across different marketing channels
                </CardDescription>
              </div>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Metrics</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="conversions">Conversions</SelectItem>
                  <SelectItem value="ctr">Click Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Channel
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Impressions
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Clicks
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      CTR
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Conversions
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Revenue
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Growth
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {channelPerformance.map((channel, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {channel.channel === "Email Marketing" && (
                            <Mail className="h-4 w-4 text-blue-500" />
                          )}
                          {channel.channel === "Social Media" && (
                            <Share2 className="h-4 w-4 text-purple-500" />
                          )}
                          {channel.channel === "Google Ads" && (
                            <BarChart3 className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{channel.channel}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {channel.impressions}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {channel.clicks}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{channel.ctr}</Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {channel.conversions}
                      </td>
                      <td className="py-3 px-4 font-medium text-green-600">
                        {channel.revenue}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-green-600 font-medium">
                          {channel.growth}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Campaigns</CardTitle>
              <CardDescription>
                Your best campaigns by ROI and revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCampaigns.map((campaign, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {campaign.name}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {campaign.type} • {campaign.impressions} impressions
                      </div>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>{campaign.clicks} clicks</span>
                        <span>{campaign.conversions} conversions</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        {campaign.revenue}
                      </div>
                      <div className="text-sm">
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-200"
                        >
                          {campaign.roi} ROI
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Audience Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Audience Insights</CardTitle>
              <CardDescription>
                Understanding your customer segments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {audienceInsights.map((segment, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">
                        {segment.segment}
                      </h4>
                      <Badge variant="secondary">{segment.size} users</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Engagement Rate:</span>
                        <div className="font-medium">{segment.engagement}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Top Channel:</span>
                        <div className="font-medium">{segment.topChannel}</div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Avg. Order Value:</span>
                        <div className="font-medium text-green-600">
                          {segment.avgOrderValue}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
