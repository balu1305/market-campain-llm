import { useState } from "react";
import {
  Mail,
  Plus,
  Edit,
  Copy,
  Check,
  Eye,
  Send,
  Filter,
  Search,
  Calendar,
  BarChart3,
  Users,
} from "lucide-react";

const EmailCampaigns = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [copiedText, setCopiedText] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const emailCampaigns = [
    {
      id: 1,
      name: "Student Summer Sale Blast",
      subject: "🎓 Student Discounts Up to 70% Off - Limited Time!",
      persona: "Budget-Conscious Students",
      status: "sent",
      sentDate: "2025-08-10",
      recipients: 15420,
      openRate: "24.5%",
      clickRate: "4.2%",
      conversionRate: "2.1%",
      revenue: "$3,420",
      content: `Hey there, smart saver! 📚 

We know every dollar counts when you're in school. That's why we've created exclusive student discounts just for you.

Get up to 70% off on:
• Study essentials & textbooks
• Tech gadgets & accessories  
• Dorm room furniture
• Food & beverages

Use code STUDENT70 at checkout. Valid student ID required.

⏰ Offer expires in 48 hours!

Shop now and save big!`,
      performance: "high",
    },
    {
      id: 2,
      name: "Luxury Tech Launch",
      subject: "Exclusive Preview: The Future of Premium Technology",
      persona: "Luxury Tech Enthusiasts",
      status: "scheduled",
      sentDate: "2025-08-16",
      recipients: 5200,
      openRate: "18.3%",
      clickRate: "2.8%",
      conversionRate: "5.4%",
      revenue: "$12,500",
      content: `Dear Technology Connoisseur,

You're among the first to experience our latest premium collection.

Crafted with aerospace-grade materials and cutting-edge innovation, these pieces represent the pinnacle of technological excellence.

🔹 Limited to 500 units worldwide
🔹 Handcrafted precision engineering
🔹 Exclusive member-only access
🔹 Complimentary white-glove setup

Priority access expires in 72 hours.

Reserve yours today.`,
      performance: "medium",
    },
    {
      id: 3,
      name: "Eco Family Newsletter",
      subject: "🌱 Creating a Greener Tomorrow, Together as a Family",
      persona: "Eco-Friendly Families",
      status: "draft",
      sentDate: null,
      recipients: 8900,
      openRate: "22.1%",
      clickRate: "5.1%",
      conversionRate: "3.7%",
      revenue: "$2,850",
      content: `Hi Green Family! 🌍

Teaching kids about sustainability while keeping life convenient? We're here to help!

Our eco-friendly family products are safe, sustainable, and kid-approved:

🌱 Biodegradable lunch boxes
🌱 Solar-powered educational toys
🌱 Organic cotton clothing
🌱 Non-toxic art supplies

Plus, every purchase plants a tree! 🌳

Your children will love them, and the planet will thank you.

Make the switch today!`,
      performance: "high",
    },
  ];

  const copyToClipboard = async (text, identifier) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(identifier);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "sent":
        return "bg-green-600";
      case "scheduled":
        return "bg-blue-600";
      case "draft":
        return "bg-gray-600";
      default:
        return "bg-gray-600";
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case "high":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const filteredCampaigns = emailCampaigns.filter((campaign) => {
    const matchesStatus =
      filterStatus === "all" || campaign.status === filterStatus;
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Email Campaigns</h1>
            <p className="text-gray-400 mt-1">
              Manage and optimize your email marketing campaigns
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Create Email Campaign
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-gray-400 text-sm">Total Campaigns</p>
                <p className="text-2xl font-bold text-white">24</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-gray-400 text-sm">Total Recipients</p>
                <p className="text-2xl font-bold text-white">89.5K</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-purple-500" />
              <div>
                <p className="text-gray-400 text-sm">Avg Open Rate</p>
                <p className="text-2xl font-bold text-white">21.6%</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-yellow-500" />
              <div>
                <p className="text-gray-400 text-sm">Avg Click Rate</p>
                <p className="text-2xl font-bold text-white">4.0%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#1A1A1A] border border-gray-700 text-white px-3 py-2 rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Campaigns List */}
        <div className="bg-[#1A1A1A] rounded-lg border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-xl font-semibold text-white">
              Email Campaigns
            </h3>
          </div>
          <div className="divide-y divide-gray-800">
            {filteredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="p-6 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-white">
                        {campaign.name}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(
                          campaign.status
                        )}`}
                      >
                        {campaign.status}
                      </span>
                      <span
                        className={`text-sm font-medium ${getPerformanceColor(
                          campaign.performance
                        )}`}
                      >
                        {campaign.performance} performance
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      To: {campaign.persona}
                    </p>
                    <p className="text-gray-300 text-sm">{campaign.subject}</p>

                    {campaign.status === "sent" && (
                      <div className="flex items-center gap-6 mt-3 text-sm">
                        <span className="text-gray-400">
                          Sent:{" "}
                          {new Date(campaign.sentDate).toLocaleDateString()}
                        </span>
                        <span className="text-gray-400">
                          Recipients: {campaign.recipients.toLocaleString()}
                        </span>
                        <span className="text-gray-400">
                          Open: {campaign.openRate}
                        </span>
                        <span className="text-gray-400">
                          Click: {campaign.clickRate}
                        </span>
                        <span className="text-gray-400">
                          Revenue: {campaign.revenue}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          campaign.subject,
                          `subject-${campaign.id}`
                        )
                      }
                      className={`p-2 rounded-lg transition-colors ${
                        copiedText === `subject-${campaign.id}`
                          ? "bg-green-600 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      }`}
                    >
                      {copiedText === `subject-${campaign.id}` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedCampaign(campaign)}
                      className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    {campaign.status === "draft" && (
                      <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Preview Modal */}
        {selectedCampaign && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {selectedCampaign.name}
                </h2>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Email Content */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">Subject Line</h3>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            selectedCampaign.subject,
                            "modal-subject"
                          )
                        }
                        className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
                          copiedText === "modal-subject"
                            ? "bg-green-600 text-white"
                            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        }`}
                      >
                        {copiedText === "modal-subject" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        {copiedText === "modal-subject" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="text-gray-300">{selectedCampaign.subject}</p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">
                        Email Content
                      </h3>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            selectedCampaign.content,
                            "modal-content"
                          )
                        }
                        className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
                          copiedText === "modal-content"
                            ? "bg-green-600 text-white"
                            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        }`}
                      >
                        {copiedText === "modal-content" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        {copiedText === "modal-content" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <div className="text-gray-300 whitespace-pre-line">
                      {selectedCampaign.content}
                    </div>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-white mb-3">
                      Campaign Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Target Persona:</span>
                        <span className="text-white">
                          {selectedCampaign.persona}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span
                          className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(
                            selectedCampaign.status
                          )}`}
                        >
                          {selectedCampaign.status}
                        </span>
                      </div>
                      {selectedCampaign.sentDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Sent Date:</span>
                          <span className="text-white">
                            {new Date(
                              selectedCampaign.sentDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Recipients:</span>
                        <span className="text-white">
                          {selectedCampaign.recipients.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedCampaign.status === "sent" && (
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h3 className="font-semibold text-white mb-3">
                        Performance
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Open Rate</span>
                            <span className="text-white">
                              {selectedCampaign.openRate}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: selectedCampaign.openRate }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Click Rate</span>
                            <span className="text-white">
                              {selectedCampaign.clickRate}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: selectedCampaign.clickRate }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Conversion</span>
                            <span className="text-white">
                              {selectedCampaign.conversionRate}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: selectedCampaign.conversionRate }}
                            ></div>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-gray-700">
                          <span className="text-gray-400 text-sm">
                            Revenue Generated:
                          </span>
                          <span className="text-green-500 font-semibold ml-2">
                            {selectedCampaign.revenue}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailCampaigns;
