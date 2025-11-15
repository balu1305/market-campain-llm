import { useState, useEffect } from "react";
import { Copy, Check, Mail, Share2, Image, ChevronDown, Wand2 } from "lucide-react";
import { usePersonas } from '../hooks/usePersonas.jsx';
import { contentService } from '../services/content.jsx';

const Index = () => {
  const [selectedPersona, setSelectedPersona] = useState("");
  const [activeTab, setActiveTab] = useState("email");
  const [copiedStates, setCopiedStates] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({});
  
  // Fetch personas from API
  const { personas, isLoading: personasLoading, error: personasError } = usePersonas();
  
  // Set first persona as default when personas load
  useEffect(() => {
    if (personas.length > 0 && !selectedPersona) {
      setSelectedPersona(personas[0].name);
    }
  }, [personas, selectedPersona]);

  // Fallback campaign data for demo/offline mode
  const fallbackCampaignData = {
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
            content: "📚✨ Broke but make it academic? We got you! Student discount = more money for ramen 🍜 #StudentLife #BudgetFriendly #Study",
            qualityScore: 92,
          },
          {
            platform: "TikTok",
            content: "POV: You're a student but still want nice things 💅 Our student discounts said 'say less' 🎓 #StudentDeals #BudgetHacks",
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
            content: "Innovation meets luxury. Our latest collection redefines what's possible in premium technology. #Innovation #LuxuryTech #Premium",
            qualityScore: 96,
          },
          {
            platform: "Instagram",
            content: "When technology becomes art 🎨 Limited edition. Unlimited possibilities. ✨ #LuxuryTech #Innovation #Exclusive",
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
            content: "Teaching little ones big lessons about our planet 🌱 Every small choice makes a big difference for their future 💚 #EcoFamily #SustainableLiving #FutureEarth",
            qualityScore: 89,
          },
          {
            platform: "Instagram",
            content: "Raising tomorrow's earth heroes 🌍👶 Sustainable choices that don't compromise on fun! #EcoKids #GreenFamily #SustainableParenting",
            qualityScore: 92,
          },
        ],
      },
      adVisuals: [
        {
          url: "/lovable-uploads/8c5f1b5e-1a2b-4c3d-9e8f-1a2b3c4d5e6f.png",
          title: "Eco Family Values",
          qualityScore: 90,
        },
      ],
    },
  };

  // Generate content using API
  const generateContentForPersona = async (personaName) => {
    setIsGenerating(true);
    try {
      const persona = personas.find(p => p.name === personaName);
      if (!persona) {
        throw new Error('Persona not found');
      }

      // Generate email content
      const emailContent = await contentService.generateEmail({
        personaId: persona.id,
        customInstructions: `Generate marketing content for ${personaName}`
      });

      // Generate social media content
      const socialContent = await contentService.generateSocial({
        personaId: persona.id,
        platform: 'instagram',
        customInstructions: `Generate social media content for ${personaName}`
      });

      // Store generated content
      setGeneratedContent(prev => ({
        ...prev,
        [personaName]: {
          emailCampaign: {
            subject: emailContent.subjectLine,
            body: emailContent.contentBody,
            qualityScore: emailContent.qualityScore,
          },
          socialMedia: {
            posts: [{
              platform: socialContent.platform,
              content: socialContent.contentBody,
              qualityScore: socialContent.qualityScore,
            }]
          },
          adVisuals: [] // Ad visuals would be generated separately
        }
      }));
    } catch (error) {
      console.error('Content generation failed:', error);
      // Fall back to hardcoded data on error
    } finally {
      setIsGenerating(false);
    }
  };

  // Get current campaign data (generated or fallback)
  const getCurrentCampaignData = () => {
    if (generatedContent[selectedPersona]) {
      return generatedContent[selectedPersona];
    }
    return fallbackCampaignData[selectedPersona] || {};
  };

  const currentCampaign = getCurrentCampaignData();

  const copyToClipboard = async (text, identifier) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates({ ...copiedStates, [identifier]: true });
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [identifier]: false });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getQualityScoreColor = (score) => {
    if (score >= 90) return "text-green-500";
    if (score >= 75) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header with Promo Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center py-2 text-sm">
        🚀 NEW: AI-powered marketing campaigns that convert like crazy
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              AI Marketing Campaign Generator
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Generate targeted marketing campaigns for different customer personas
            </p>
            
            {/* Persona Selector */}
            <div className="max-w-md mx-auto">
              <label className="block text-left font-medium mb-2">
                Select Target Persona
              </label>
              <div className="relative">
                <select
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value)}
                  className="appearance-none px-4 py-2 pr-8 rounded-lg border bg-[#1A1A1A] border-gray-700 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                  {personasLoading ? (
                    <option>Loading personas...</option>
                  ) : personasError ? (
                    <option>Error loading personas</option>
                  ) : (
                    personas.map((persona) => (
                      <option key={persona.id} value={persona.name}>
                        {persona.name}
                      </option>
                    ))
                  )}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
              
              {/* Generate Content Button */}
              <button
                onClick={() => generateContentForPersona(selectedPersona)}
                disabled={isGenerating || !selectedPersona}
                className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-lg transition-colors mx-auto"
              >
                <Wand2 size={16} />
                {isGenerating ? 'Generating...' : 'Generate AI Content'}
              </button>
            </div>
          </div>

          {/* Tabbed Interface */}
          <div className="mb-6">
            <div className="flex space-x-1 mb-6 justify-center">
              {["email", "social", "visuals"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-[#1A1A1A] text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {tab === "email" && <Mail className="inline w-4 h-4 mr-2" />}
                  {tab === "social" && <Share2 className="inline w-4 h-4 mr-2" />}
                  {tab === "visuals" && <Image className="inline w-4 h-4 mr-2" />}
                  {tab === "email" ? "Email Campaign" : 
                   tab === "social" ? "Social Media" : 
                   tab === "visuals" ? "Ad Visuals" : tab}
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="space-y-6">
              {isGenerating && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Generating content...</p>
                </div>
              )}
              
              {/* Email Campaign Tab */}
              {activeTab === "email" && currentCampaign.emailCampaign && (
                <div className="space-y-4">
                  {/* Email Subject */}
                  <div className="p-6 rounded-lg border bg-[#1A1A1A] border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">Email Subject</h3>
                      <button
                        onClick={() => copyToClipboard(currentCampaign.emailCampaign.subject, "email-subject")}
                        className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
                          copiedStates["email-subject"]
                            ? "bg-green-600 text-white"
                            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        }`}
                      >
                        {copiedStates["email-subject"] ? (
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
                    <p className="text-gray-300 mb-2">
                      {currentCampaign.emailCampaign.subject}
                    </p>
                    <div className="text-sm">
                      Quality Score:{" "}
                      <span className={getQualityScoreColor(currentCampaign.emailCampaign.qualityScore)}>
                        {currentCampaign.emailCampaign.qualityScore}%
                      </span>
                    </div>
                  </div>

                  {/* Email Body */}
                  <div className="p-6 rounded-lg border bg-[#1A1A1A] border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">Email Body</h3>
                      <button
                        onClick={() => copyToClipboard(currentCampaign.emailCampaign.body, "email-body")}
                        className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
                          copiedStates["email-body"]
                            ? "bg-green-600 text-white"
                            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        }`}
                      >
                        {copiedStates["email-body"] ? (
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
                    <p className="text-gray-300">{currentCampaign.emailCampaign.body}</p>
                  </div>
                </div>
              )}

              {/* Social Media Tab */}
              {activeTab === "social" && currentCampaign.socialMedia && (
                <div className="space-y-4">
                  {currentCampaign.socialMedia.posts?.map((post, index) => (
                    <div key={index} className="p-6 rounded-lg border bg-[#1A1A1A] border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">
                          {post.platform} Post
                        </h3>
                        <button
                          onClick={() => copyToClipboard(post.content, `social-${index}`)}
                          className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
                            copiedStates[`social-${index}`]
                              ? "bg-green-600 text-white"
                              : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                          }`}
                        >
                          {copiedStates[`social-${index}`] ? (
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
                      <p className="text-gray-300 mb-2">{post.content}</p>
                      <div className="text-sm">
                        Quality Score:{" "}
                        <span className={getQualityScoreColor(post.qualityScore)}>
                          {post.qualityScore}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Ad Visuals Tab */}
              {activeTab === "visuals" && currentCampaign.adVisuals && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentCampaign.adVisuals?.map((visual, index) => (
                    <div key={index} className="p-6 rounded-lg border bg-[#1A1A1A] border-gray-700">
                      <h3 className="text-lg font-semibold mb-4">{visual.title}</h3>
                      <div className="bg-gray-800 rounded-lg p-4 mb-4">
                        <img
                          src={visual.url}
                          alt={visual.title}
                          className="w-full h-48 object-cover rounded"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <div className="text-sm">
                        Quality Score:{" "}
                        <span className={getQualityScoreColor(visual.qualityScore)}>
                          {visual.qualityScore}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Content State */}
              {!currentCampaign.emailCampaign && !currentCampaign.socialMedia && !currentCampaign.adVisuals && !isGenerating && (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No content available for this persona.</p>
                  <button
                    onClick={() => generateContentForPersona(selectedPersona)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Generate Content
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;