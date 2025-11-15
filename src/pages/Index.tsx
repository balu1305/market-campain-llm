import { useState, useEffect } from "react";
import { PromoBar } from "../components/PromoBar";
import { Sidebar } from "../components/Sidebar";
import Header from "../components/Header";
import { Copy, Check, Mail, Share2, Image, ChevronDown } from "lucide-react";

// Campaign data for different personas
const campaignData = {
  "Budget-Conscious Students": {
    emailCampaign: {
      subject: "🎓 Student Discounts Up to 70% Off - Limited Time!",
      body: "Hey there, smart saver! 📚 We know every dollar counts when you're in school. That's why we've created exclusive student discounts just for you. Get up to 70% off on study essentials, tech gadgets, and more. Use code STUDENT70 at checkout. Valid student ID required. Offer expires in 48 hours!",
      qualityScore: 89,
    },
    socialMedia: {
      posts: [
        {
          platform: "Instagram",
          content:
            "📚✨ Broke but make it academic? We got you! Student discount = more money for ramen 🍜 #StudentLife #BudgetFriendly #Study",
          qualityScore: 92,
        },
        {
          platform: "TikTok",
          content:
            "POV: You're a student but still want nice things 💅 Our student discounts said 'say less' 🎓 #StudentDeals #BudgetHacks",
          qualityScore: 88,
        },
      ],
    },
    adVisuals: [
      {
        url: "/lovable-uploads/12cd0679-f352-498e-a6ad-9faaa1ffbec9.png",
        title: "Student Budget Hero",
        qualityScore: 85,
      },
      {
        url: "/lovable-uploads/142dea30-a410-4e79-84d0-70189e8fcd07.png",
        title: "Campus Savings",
        qualityScore: 91,
      },
    ],
  },
  "Luxury Tech Enthusiasts": {
    emailCampaign: {
      subject: "Exclusive Preview: The Future of Premium Technology",
      body: "Dear Technology Connoisseur, You're among the first to experience our latest premium collection. Crafted with aerospace-grade materials and cutting-edge innovation, these pieces represent the pinnacle of technological excellence. Limited to 500 units worldwide. Priority access expires in 72 hours.",
      qualityScore: 94,
    },
    socialMedia: {
      posts: [
        {
          platform: "LinkedIn",
          content:
            "Innovation meets luxury. Our latest collection redefines what's possible in premium technology. #Innovation #LuxuryTech #Premium",
          qualityScore: 96,
        },
        {
          platform: "Instagram",
          content:
            "When technology becomes art 🎨 Limited edition. Unlimited possibilities. ✨ #LuxuryTech #Innovation #Exclusive",
          qualityScore: 93,
        },
      ],
    },
    adVisuals: [
      {
        url: "/lovable-uploads/22f4141e-f83e-4b85-8c93-672e181d999b.png",
        title: "Premium Tech Showcase",
        qualityScore: 97,
      },
      {
        url: "/lovable-uploads/e9db2be9-f0a3-4506-b387-ce20bea67ba9.png",
        title: "Luxury Innovation",
        qualityScore: 94,
      },
    ],
  },
  "Eco-Friendly Families": {
    emailCampaign: {
      subject: "🌱 Creating a Greener Tomorrow, Together as a Family",
      body: "Hi Green Family! 🌍 Teaching kids about sustainability while keeping life convenient? We're here to help! Our eco-friendly family products are safe, sustainable, and kid-approved. From biodegradable lunch boxes to solar-powered toys, we make going green fun for the whole family. Plus, every purchase plants a tree! 🌳",
      qualityScore: 91,
    },
    socialMedia: {
      posts: [
        {
          platform: "Facebook",
          content:
            "Teaching little ones big lessons about our planet 🌱 Every small choice makes a big difference for their future 💚 #EcoFamily #SustainableLiving #FutureEarth",
          qualityScore: 89,
        },
        {
          platform: "Instagram",
          content:
            "Raising tomorrow's earth heroes 🌍👶 Sustainable choices that don't compromise on fun! #EcoKids #GreenFamily #SustainableParenting",
          qualityScore: 92,
        },
      ],
    },
    adVisuals: [
      {
        url: "/lovable-uploads/4255fa40-8036-4424-a210-e3bcd99754df.png",
        title: "Green Family Living",
        qualityScore: 88,
      },
      {
        url: "/lovable-uploads/b67f802d-430a-4e5a-8755-b61e10470d58.png",
        title: "Eco-Friendly Kids",
        qualityScore: 90,
      },
    ],
  },
};

type Persona = keyof typeof campaignData;
type Tab = "Email Campaign" | "Social Media" | "Ad Visuals";

const Index = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(
    "Budget-Conscious Students"
  );
  const [activeTab, setActiveTab] = useState<Tab>("Email Campaign");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = async (text: string, identifier: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(identifier);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getQualityScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 75) return "text-yellow-500";
    return "text-red-500";
  };

  const currentData = campaignData[selectedPersona];

  return (
    <div className="min-h-screen flex flex-col dark">
      <PromoBar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 overflow-auto">
            <main className="py-8 px-12 bg-[#0A0A0A] text-white">
              {/* Top Bar Controls */}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">
                  AI Marketing Campaign Generator
                </h1>

                <div className="flex items-center gap-4">
                  {/* Persona Selector */}
                  <div className="relative">
                    <select
                      value={selectedPersona}
                      onChange={(e) =>
                        setSelectedPersona(e.target.value as Persona)
                      }
                      className="appearance-none px-4 py-2 pr-8 rounded-lg border bg-[#1A1A1A] border-gray-700 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.keys(campaignData).map((persona) => (
                        <option key={persona} value={persona}>
                          {persona}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Tabbed Interface */}
              <div className="mb-6">
                <div className="flex space-x-1 mb-6">
                  {(
                    ["Email Campaign", "Social Media", "Ad Visuals"] as Tab[]
                  ).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        activeTab === tab
                          ? "bg-blue-600 text-white"
                          : "bg-[#1A1A1A] text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {tab === "Email Campaign" && (
                        <Mail className="inline w-4 h-4 mr-2" />
                      )}
                      {tab === "Social Media" && (
                        <Share2 className="inline w-4 h-4 mr-2" />
                      )}
                      {tab === "Ad Visuals" && (
                        <Image className="inline w-4 h-4 mr-2" />
                      )}
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Content Display */}
                <div className="space-y-6">
                  {activeTab === "Email Campaign" && (
                    <div className="space-y-4">
                      {/* Email Subject */}
                      <div className="p-6 rounded-lg border bg-[#1A1A1A] border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">
                            Email Subject
                          </h3>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                currentData.emailCampaign.subject,
                                "email-subject"
                              )
                            }
                            className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
                              copiedText === "email-subject"
                                ? "bg-green-600 text-white"
                                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                            }`}
                          >
                            {copiedText === "email-subject" ? (
                              <>
                                <Check size={14} />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy size={14} />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-sm text-gray-300">
                          {currentData.emailCampaign.subject}
                        </p>
                        <div className="mt-2">
                          <span
                            className={`text-sm font-medium ${getQualityScoreColor(
                              currentData.emailCampaign.qualityScore
                            )}`}
                          >
                            Quality Score:{" "}
                            {currentData.emailCampaign.qualityScore}%
                          </span>
                        </div>
                      </div>

                      {/* Email Body */}
                      <div className="p-6 rounded-lg border bg-[#1A1A1A] border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">Email Body</h3>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                currentData.emailCampaign.body,
                                "email-body"
                              )
                            }
                            className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
                              copiedText === "email-body"
                                ? "bg-green-600 text-white"
                                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                            }`}
                          >
                            {copiedText === "email-body" ? (
                              <>
                                <Check size={14} />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy size={14} />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-sm text-gray-300">
                          {currentData.emailCampaign.body}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "Social Media" && (
                    <div className="space-y-4">
                      {currentData.socialMedia.posts.map((post, index) => (
                        <div
                          key={index}
                          className="p-6 rounded-lg border bg-[#1A1A1A] border-gray-700"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">
                              {post.platform} Post
                            </h3>
                            <button
                              onClick={() =>
                                copyToClipboard(post.content, `social-${index}`)
                              }
                              className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
                                copiedText === `social-${index}`
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                              }`}
                            >
                              {copiedText === `social-${index}` ? (
                                <>
                                  <Check size={14} />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy size={14} />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">
                            {post.content}
                          </p>
                          <div>
                            <span
                              className={`text-sm font-medium ${getQualityScoreColor(
                                post.qualityScore
                              )}`}
                            >
                              Quality Score: {post.qualityScore}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "Ad Visuals" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentData.adVisuals.map((visual, index) => (
                        <div
                          key={index}
                          className="p-6 rounded-lg border bg-[#1A1A1A] border-gray-700"
                        >
                          <img
                            src={visual.url}
                            alt={visual.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h3 className="text-lg font-semibold mb-2">
                            {visual.title}
                          </h3>
                          <div>
                            <span
                              className={`text-sm font-medium ${getQualityScoreColor(
                                visual.qualityScore
                              )}`}
                            >
                              Quality Score: {visual.qualityScore}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
