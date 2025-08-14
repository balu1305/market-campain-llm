import { useState } from "react";
import { Share2, Plus, Edit, Copy, Check, Eye, Calendar, Heart, MessageCircle, Repeat2, BarChart3 } from "lucide-react";

const SocialMedia = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [copiedText, setCopiedText] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const socialPosts = [
    {
      id: 1,
      platform: "Instagram",
      persona: "Budget-Conscious Students",
      content: "📚✨ Broke but make it academic? We got you! Student discount = more money for ramen 🍜 #StudentLife #BudgetFriendly #Study #College #Savings",
      scheduledTime: "2025-08-15T14:30:00",
      status: "published",
      engagement: {
        likes: 2340,
        comments: 89,
        shares: 156,
        reach: 45200
      },
      hashtags: ["#StudentLife", "#BudgetFriendly", "#Study", "#College", "#Savings"],
      image: "/lovable-uploads/12cd0679-f352-498e-a6ad-9faaa1ffbec9.png",
      performance: "high"
    },
    {
      id: 2,
      platform: "TikTok",
      persona: "Budget-Conscious Students",
      content: "POV: You're a student but still want nice things 💅 Our student discounts said 'say less' 🎓 #StudentDeals #BudgetHacks #College #Student #Discounts",
      scheduledTime: "2025-08-16T16:00:00",
      status: "scheduled",
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0,
        reach: 0
      },
      hashtags: ["#StudentDeals", "#BudgetHacks", "#College", "#Student", "#Discounts"],
      image: "/lovable-uploads/142dea30-a410-4e79-84d0-70189e8fcd07.png",
      performance: "pending"
    },
    {
      id: 3,
      platform: "LinkedIn",
      persona: "Luxury Tech Enthusiasts",
      content: "Innovation meets luxury. Our latest collection redefines what's possible in premium technology. #Innovation #LuxuryTech #Premium #Technology #Future",
      scheduledTime: "2025-08-14T09:00:00",
      status: "published",
      engagement: {
        likes: 890,
        comments: 45,
        shares: 234,
        reach: 12500
      },
      hashtags: ["#Innovation", "#LuxuryTech", "#Premium", "#Technology", "#Future"],
      image: "/lovable-uploads/22f4141e-f83e-4b85-8c93-672e181d999b.png",
      performance: "medium"
    },
    {
      id: 4,
      platform: "Instagram",
      persona: "Luxury Tech Enthusiasts",
      content: "When technology becomes art 🎨 Limited edition. Unlimited possibilities. ✨ #LuxuryTech #Innovation #Exclusive #Art #Premium",
      scheduledTime: "2025-08-15T11:00:00",
      status: "published",
      engagement: {
        likes: 3450,
        comments: 167,
        shares: 89,
        reach: 28900
      },
      hashtags: ["#LuxuryTech", "#Innovation", "#Exclusive", "#Art", "#Premium"],
      image: "/lovable-uploads/e9db2be9-f0a3-4506-b387-ce20bea67ba9.png",
      performance: "high"
    },
    {
      id: 5,
      platform: "Facebook",
      persona: "Eco-Friendly Families",
      content: "Teaching little ones big lessons about our planet 🌱 Every small choice makes a big difference for their future 💚 #EcoFamily #SustainableLiving #FutureEarth #GreenParenting",
      scheduledTime: "2025-08-13T10:30:00",
      status: "published",
      engagement: {
        likes: 1250,
        comments: 78,
        shares: 345,
        reach: 18700
      },
      hashtags: ["#EcoFamily", "#SustainableLiving", "#FutureEarth", "#GreenParenting"],
      image: "/lovable-uploads/4255fa40-8036-4424-a210-e3bcd99754df.png",
      performance: "high"
    },
    {
      id: 6,
      platform: "Instagram",
      persona: "Eco-Friendly Families",
      content: "Raising tomorrow's earth heroes 🌍👶 Sustainable choices that don't compromise on fun! #EcoKids #GreenFamily #SustainableParenting #EcoFriendly",
      scheduledTime: "2025-08-16T15:00:00",
      status: "draft",
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0,
        reach: 0
      },
      hashtags: ["#EcoKids", "#GreenFamily", "#SustainableParenting", "#EcoFriendly"],
      image: "/lovable-uploads/b67f802d-430a-4e5a-8755-b61e10470d58.png",
      performance: "pending"
    }
  ];

  const platforms = [
    { id: "all", name: "All Platforms", color: "bg-gray-600" },
    { id: "Instagram", name: "Instagram", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { id: "Facebook", name: "Facebook", color: "bg-blue-600" },
    { id: "LinkedIn", name: "LinkedIn", color: "bg-blue-700" },
    { id: "TikTok", name: "TikTok", color: "bg-black" },
    { id: "Twitter", name: "Twitter", color: "bg-blue-500" }
  ];

  const copyToClipboard = async (text, identifier) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(identifier);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-600';
      case 'scheduled': return 'bg-blue-600';
      case 'draft': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'high': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const filteredPosts = socialPosts.filter(post => {
    const matchesPlatform = selectedPlatform === "all" || post.platform === selectedPlatform;
    const matchesTab = activeTab === "all" || post.status === activeTab;
    return matchesPlatform && matchesTab;
  });

  const totalEngagement = socialPosts.reduce((acc, post) => ({
    likes: acc.likes + post.engagement.likes,
    comments: acc.comments + post.engagement.comments,
    shares: acc.shares + post.engagement.shares,
    reach: acc.reach + post.engagement.reach
  }), { likes: 0, comments: 0, shares: 0, reach: 0 });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Social Media</h1>
          <p className="text-gray-400 mt-1">Manage your social media content across all platforms</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Create Post
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-red-500" />
            <div>
              <p className="text-gray-400 text-sm">Total Likes</p>
              <p className="text-2xl font-bold text-white">{totalEngagement.likes.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-gray-400 text-sm">Comments</p>
              <p className="text-2xl font-bold text-white">{totalEngagement.comments.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center gap-3">
            <Repeat2 className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-gray-400 text-sm">Shares</p>
              <p className="text-2xl font-bold text-white">{totalEngagement.shares.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-purple-500" />
            <div>
              <p className="text-gray-400 text-sm">Total Reach</p>
              <p className="text-2xl font-bold text-white">{totalEngagement.reach.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">Platform:</span>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-[#1A1A1A] border border-gray-700 text-white px-3 py-2 rounded-lg"
          >
            {platforms.map(platform => (
              <option key={platform.id} value={platform.id}>{platform.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex bg-[#1A1A1A] rounded-lg border border-gray-800">
          {["all", "published", "scheduled", "draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              } ${tab === "all" ? 'rounded-l-lg' : tab === "draft" ? 'rounded-r-lg' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-[#1A1A1A] rounded-lg border border-gray-800 overflow-hidden">
            {/* Post Image */}
            <div className="aspect-square bg-gray-800">
              <img 
                src={post.image} 
                alt="Post content"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Post Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs text-white ${platforms.find(p => p.id === post.platform)?.color || 'bg-gray-600'}`}>
                    {post.platform}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                </div>
                <span className={`text-sm font-medium ${getPerformanceColor(post.performance)}`}>
                  {post.performance !== 'pending' && `${post.performance} perf.`}
                </span>
              </div>
              
              <p className="text-gray-300 text-sm mb-3 line-clamp-3">{post.content}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {post.hashtags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-blue-400 text-xs">{tag}</span>
                ))}
                {post.hashtags.length > 3 && (
                  <span className="text-gray-500 text-xs">+{post.hashtags.length - 3}</span>
                )}
              </div>
              
              {post.status === 'published' && (
                <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-400 mb-3">
                  <div>
                    <div className="text-white font-semibold">{post.engagement.likes}</div>
                    <div>Likes</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{post.engagement.comments}</div>
                    <div>Comments</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{post.engagement.shares}</div>
                    <div>Shares</div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">
                  {post.status === 'scheduled' ? 'Scheduled: ' : 'Posted: '}
                  {new Date(post.scheduledTime).toLocaleDateString()}
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(post.content, `post-${post.id}`)}
                    className={`p-1 rounded transition-colors ${
                      copiedText === `post-${post.id}`
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {copiedText === `post-${post.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="p-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                  <button className="p-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors">
                    <Edit className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded text-sm text-white ${platforms.find(p => p.id === selectedPost.platform)?.color || 'bg-gray-600'}`}>
                  {selectedPost.platform}
                </span>
                <h2 className="text-xl font-bold text-white">Post Details</h2>
              </div>
              <button 
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Post Content */}
              <div>
                <div className="aspect-square bg-gray-800 rounded-lg mb-4">
                  <img 
                    src={selectedPost.image} 
                    alt="Post content"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">Caption</h3>
                    <button
                      onClick={() => copyToClipboard(selectedPost.content, 'modal-content')}
                      className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
                        copiedText === 'modal-content'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      {copiedText === 'modal-content' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedText === 'modal-content' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-gray-300">{selectedPost.content}</p>
                  
                  <div className="mt-3">
                    <h4 className="text-white text-sm font-medium mb-2">Hashtags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.hashtags.map((tag, index) => (
                        <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Details & Analytics */}
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Post Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Target Persona:</span>
                      <span className="text-white">{selectedPost.persona}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(selectedPost.status)}`}>
                        {selectedPost.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        {selectedPost.status === 'scheduled' ? 'Scheduled Time:' : 'Published:'}
                      </span>
                      <span className="text-white">
                        {new Date(selectedPost.scheduledTime).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedPost.status === 'published' && (
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-white mb-3">Engagement Analytics</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="text-gray-400">Likes</span>
                        </div>
                        <span className="text-white font-semibold">{selectedPost.engagement.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-400">Comments</span>
                        </div>
                        <span className="text-white font-semibold">{selectedPost.engagement.comments.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Repeat2 className="w-4 h-4 text-green-500" />
                          <span className="text-gray-400">Shares</span>
                        </div>
                        <span className="text-white font-semibold">{selectedPost.engagement.shares.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-purple-500" />
                          <span className="text-gray-400">Reach</span>
                        </div>
                        <span className="text-white font-semibold">{selectedPost.engagement.reach.toLocaleString()}</span>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-700">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Engagement Rate:</span>
                          <span className="text-green-500 font-semibold">
                            {((selectedPost.engagement.likes + selectedPost.engagement.comments + selectedPost.engagement.shares) / selectedPost.engagement.reach * 100).toFixed(1)}%
                          </span>
                        </div>
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

export default SocialMedia;
