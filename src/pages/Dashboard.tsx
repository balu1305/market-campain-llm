import { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  Target,
  Mail,
  Share2,
  TrendingUp,
  Eye,
  MousePointer,
  DollarSign,
  Calendar,
} from "lucide-react";
import { useCampaignStats, useDashboardCampaigns } from '../hooks/useCampaigns.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const { user } = useAuth();
  const { stats, isLoading: statsLoading, error: statsError } = useCampaignStats();
  const { campaigns: recentCampaigns, isLoading: campaignsLoading } = useDashboardCampaigns();

  // Transform API stats to match UI format
  const transformedStats = stats ? [
    {
      title: "Active Campaigns",
      value: stats.activeCampaigns?.toString() || "0",
      change: "+2.5%", // This could come from API comparison
      trend: "up",
      icon: <Target className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Total Campaigns", 
      value: stats.totalCampaigns?.toString() || "0",
      change: "+18.2%",
      trend: "up",
      icon: <Eye className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Content Generated",
      value: stats.contentGenerated?.toString() || "0",
      change: "+0.8%",
      trend: "up",
      icon: <MousePointer className="w-6 h-6 text-purple-500" />,
    },
    {
      title: "Average Budget",
      value: stats.averageBudget ? `$${stats.averageBudget.toLocaleString()}` : "$0",
      change: "+12.4%",
      trend: "up",
      icon: <DollarSign className="w-6 h-6 text-yellow-500" />,
    },
  ] : [];

  // Transform recent campaigns from API or use fallback
  const displayCampaigns = recentCampaigns.length > 0 ? recentCampaigns.map(campaign => ({
    id: campaign.id,
    name: campaign.name,
    persona: campaign.persona?.name || 'Unknown Persona',
    status: campaign.status,
    performance: "High", // This could be calculated from campaign metrics
    reach: "N/A", // This would come from campaign analytics
    ctr: "N/A", // This would come from campaign analytics
  })) : [
    {
      id: 1,
      name: "Student Summer Sale",
      persona: "Budget-Conscious Students", 
      status: "Active",
      performance: "High",
      reach: "45K",
      ctr: "4.2%",
    },
    {
      id: 2,
      name: "Luxury Tech Launch",
      persona: "Luxury Tech Enthusiasts",
      status: "Active", 
      performance: "Medium",
      reach: "12K",
      ctr: "2.8%",
    },
    {
      id: 3,
      name: "Eco Family Products",
      persona: "Eco-Friendly Families",
      status: "Completed",
      performance: "High",
      reach: "32K",
      ctr: "5.1%",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: "Review A/B test results for email campaign",
      deadline: "Today, 3:00 PM",
      priority: "High",
    },
    {
      id: 2,
      task: "Update social media content calendar",
      deadline: "Tomorrow, 10:00 AM",
      priority: "Medium",
    },
    {
      id: 3,
      task: "Analyze performance metrics for Q3",
      deadline: "Aug 18, 2025",
      priority: "Low",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Welcome back! Here's what's happening with your campaigns.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-[#1A1A1A] border border-gray-700 text-white px-3 py-2 rounded-lg"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsLoading ? (
            // Loading state
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800 animate-pulse"
              >
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/3"></div>
              </div>
            ))
          ) : statsError ? (
            <div className="col-span-full text-red-500 text-center py-4">
              Error loading stats: {statsError}
            </div>
          ) : (
            transformedStats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm mt-1 ${ 
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.change} from last period
                    </p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">{stat.icon}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Campaigns */}
          <div className="lg:col-span-2 bg-[#1A1A1A] rounded-lg border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xl font-semibold text-white">
                Recent Campaigns
              </h3>
            </div>
            <div className="p-6">
              {campaignsLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="p-4 bg-gray-800 rounded-lg animate-pulse">
                      <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-1/6"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {displayCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                      <h4 className="font-medium text-white">
                        {campaign.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {campaign.persona}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          campaign.status === "Active"
                            ? "bg-green-600 text-white"
                            : "bg-gray-600 text-gray-300"
                        }`}
                      >
                        {campaign.status}
                      </span>
                      <span className="text-gray-300">
                        {campaign.reach} reach
                      </span>
                      <span className="text-gray-300">{campaign.ctr} CTR</span>
                    </div>
                  </div>
                ))}
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-[#1A1A1A] rounded-lg border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xl font-semibold text-white">
                Upcoming Tasks
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-white text-sm">{task.task}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-400">
                            {task.deadline}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          task.priority === "High"
                            ? "bg-red-600 text-white"
                            : task.priority === "Medium"
                            ? "bg-yellow-600 text-white"
                            : "bg-gray-600 text-gray-300"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              <Target className="w-5 h-5 text-white" />
              <span className="text-white font-medium">
                Create New Campaign
              </span>
            </button>
            <button className="flex items-center gap-3 p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
              <BarChart3 className="w-5 h-5 text-white" />
              <span className="text-white font-medium">View Analytics</span>
            </button>
            <button className="flex items-center gap-3 p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
              <Users className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Manage Personas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
