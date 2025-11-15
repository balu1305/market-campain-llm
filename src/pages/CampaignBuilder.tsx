import { useState } from "react";
import {
  Target,
  Users,
  Mail,
  Share2,
  Image,
  Wand2,
  Save,
  Play,
  Eye,
  ChevronDown,
  Calendar,
  DollarSign,
} from "lucide-react";

const CampaignBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: "",
    objective: "",
    persona: "",
    budget: "",
    startDate: "",
    endDate: "",
    channels: [],
    contentType: [],
    tone: "",
    keywords: "",
  });

  const steps = [
    { id: 1, title: "Campaign Setup", icon: <Target className="w-5 h-5" /> },
    {
      id: 2,
      title: "Audience & Targeting",
      icon: <Users className="w-5 h-5" />,
    },
    { id: 3, title: "Content Strategy", icon: <Wand2 className="w-5 h-5" /> },
    { id: 4, title: "Review & Launch", icon: <Play className="w-5 h-5" /> },
  ];

  const objectives = [
    {
      id: "awareness",
      label: "Brand Awareness",
      description: "Increase visibility and recognition",
    },
    {
      id: "engagement",
      label: "Engagement",
      description: "Drive interactions and conversations",
    },
    {
      id: "leads",
      label: "Lead Generation",
      description: "Capture potential customer information",
    },
    {
      id: "sales",
      label: "Sales",
      description: "Drive direct purchases and conversions",
    },
    {
      id: "retention",
      label: "Customer Retention",
      description: "Keep existing customers engaged",
    },
  ];

  const personas = [
    { id: "students", label: "Budget-Conscious Students", avatar: "🎓" },
    { id: "luxury", label: "Luxury Tech Enthusiasts", avatar: "💎" },
    { id: "families", label: "Eco-Friendly Families", avatar: "🌱" },
  ];

  const channels = [
    {
      id: "email",
      label: "Email Marketing",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      id: "social",
      label: "Social Media",
      icon: <Share2 className="w-5 h-5" />,
    },
    {
      id: "display",
      label: "Display Ads",
      icon: <Image className="w-5 h-5" />,
    },
    { id: "search", label: "Search Ads", icon: <Target className="w-5 h-5" /> },
  ];

  const contentTypes = [
    { id: "blog", label: "Blog Posts" },
    { id: "video", label: "Video Content" },
    { id: "infographic", label: "Infographics" },
    { id: "social-post", label: "Social Media Posts" },
    { id: "email-template", label: "Email Templates" },
    { id: "landing-page", label: "Landing Pages" },
  ];

  const tones = [
    { id: "professional", label: "Professional" },
    { id: "casual", label: "Casual & Friendly" },
    { id: "humorous", label: "Humorous" },
    { id: "urgent", label: "Urgent" },
    { id: "inspirational", label: "Inspirational" },
  ];

  const handleInputChange = (field, value) => {
    setCampaignData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, value) => {
    setCampaignData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Campaign Name
        </label>
        <input
          type="text"
          value={campaignData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter campaign name..."
          className="w-full bg-[#1A1A1A] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Campaign Objective
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {objectives.map((objective) => (
            <div
              key={objective.id}
              onClick={() => handleInputChange("objective", objective.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                campaignData.objective === objective.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 bg-gray-800 hover:border-gray-600"
              }`}
            >
              <h3 className="text-white font-medium">{objective.label}</h3>
              <p className="text-gray-400 text-sm mt-1">
                {objective.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={campaignData.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
            className="w-full bg-[#1A1A1A] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            End Date
          </label>
          <input
            type="date"
            value={campaignData.endDate}
            onChange={(e) => handleInputChange("endDate", e.target.value)}
            className="w-full bg-[#1A1A1A] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Budget ($)
        </label>
        <input
          type="number"
          value={campaignData.budget}
          onChange={(e) => handleInputChange("budget", e.target.value)}
          placeholder="Enter budget amount..."
          className="w-full bg-[#1A1A1A] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Target Persona
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personas.map((persona) => (
            <div
              key={persona.id}
              onClick={() => handleInputChange("persona", persona.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                campaignData.persona === persona.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 bg-gray-800 hover:border-gray-600"
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{persona.avatar}</div>
                <h3 className="text-white font-medium">{persona.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Marketing Channels
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {channels.map((channel) => (
            <div
              key={channel.id}
              onClick={() => handleArrayChange("channels", channel.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                campaignData.channels.includes(channel.id)
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 bg-gray-800 hover:border-gray-600"
              }`}
            >
              <div className="flex items-center gap-3">
                {channel.icon}
                <span className="text-white">{channel.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Content Types
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {contentTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => handleArrayChange("contentType", type.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors text-center ${
                campaignData.contentType.includes(type.id)
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 bg-gray-800 hover:border-gray-600"
              }`}
            >
              <span className="text-white text-sm">{type.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Tone of Voice
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {tones.map((tone) => (
            <div
              key={tone.id}
              onClick={() => handleInputChange("tone", tone.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors text-center ${
                campaignData.tone === tone.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 bg-gray-800 hover:border-gray-600"
              }`}
            >
              <span className="text-white">{tone.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Keywords & Topics
        </label>
        <textarea
          value={campaignData.keywords}
          onChange={(e) => handleInputChange("keywords", e.target.value)}
          placeholder="Enter keywords, topics, or themes separated by commas..."
          rows={4}
          className="w-full bg-[#1A1A1A] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">
          Campaign Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-400">Name:</span>
            <span className="text-white ml-2">
              {campaignData.name || "Not set"}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Objective:</span>
            <span className="text-white ml-2">
              {objectives.find((o) => o.id === campaignData.objective)?.label ||
                "Not set"}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Persona:</span>
            <span className="text-white ml-2">
              {personas.find((p) => p.id === campaignData.persona)?.label ||
                "Not set"}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Budget:</span>
            <span className="text-white ml-2">
              ${campaignData.budget || "Not set"}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Duration:</span>
            <span className="text-white ml-2">
              {campaignData.startDate && campaignData.endDate
                ? `${campaignData.startDate} to ${campaignData.endDate}`
                : "Not set"}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Channels:</span>
            <span className="text-white ml-2">
              {campaignData.channels.length > 0
                ? campaignData.channels.join(", ")
                : "None selected"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-green-800/20 border border-green-700 rounded-lg p-4">
        <h4 className="text-green-400 font-medium mb-2">Ready to Launch!</h4>
        <p className="text-gray-300 text-sm">
          Your campaign is configured and ready to generate content. Click
          "Generate Campaign" to create your marketing materials.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Campaign Builder</h1>
            <p className="text-gray-400 mt-1">
              Create AI-powered marketing campaigns in minutes
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>
        </div>

        {/* Step Progress */}
        <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-3 cursor-pointer ${
                    currentStep === step.id
                      ? "text-blue-500"
                      : currentStep > step.id
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <div
                    className={`p-2 rounded-full ${
                      currentStep === step.id
                        ? "bg-blue-500"
                        : currentStep > step.id
                        ? "bg-green-500"
                        : "bg-gray-700"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="font-medium hidden md:block">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-4 ${
                      currentStep > step.id ? "bg-green-500" : "bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
          >
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Next
            </button>
          ) : (
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Wand2 className="w-4 h-4" />
              Generate Campaign
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignBuilder;
