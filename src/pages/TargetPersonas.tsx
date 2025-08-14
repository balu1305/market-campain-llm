import { useState } from "react";
import { Users, Plus, Edit, Trash2, Eye, Target, DollarSign, TrendingUp, Heart, GraduationCap, Leaf } from "lucide-react";

const TargetPersonas = () => {
  const [selectedPersona, setSelectedPersona] = useState(null);

  const personas = [
    {
      id: 1,
      name: "Budget-Conscious Students",
      description: "College students looking for affordable products and services",
      icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
      demographics: {
        age: "18-25",
        income: "$0-$20K",
        location: "Urban/College towns",
        education: "Undergraduate/Graduate"
      },
      psychographics: {
        values: ["Value for money", "Convenience", "Social acceptance"],
        interests: ["Technology", "Social media", "Entertainment", "Food"],
        behaviors: ["Price comparison", "Social media influence", "Group buying"]
      },
      painPoints: [
        "Limited budget",
        "Need for discounts",
        "Time constraints",
        "Social pressure"
      ],
      goals: [
        "Save money",
        "Get good grades",
        "Build social connections",
        "Prepare for career"
      ],
      preferredChannels: ["Instagram", "TikTok", "Email", "Campus advertising"],
      campaigns: 8,
      avgCTR: "4.2%",
      conversion: "3.1%",
      lifetimeValue: "$150"
    },
    {
      id: 2,
      name: "Luxury Tech Enthusiasts",
      description: "High-income professionals seeking premium technology products",
      icon: <Target className="w-8 h-8 text-purple-500" />,
      demographics: {
        age: "30-50",
        income: "$100K+",
        location: "Metropolitan areas",
        education: "Bachelor's/Advanced degrees"
      },
      psychographics: {
        values: ["Quality", "Innovation", "Status", "Performance"],
        interests: ["Latest technology", "Luxury brands", "Innovation", "Investment"],
        behaviors: ["Early adopter", "Research-driven", "Brand loyal"]
      },
      painPoints: [
        "Too many options",
        "Authenticity concerns",
        "Time to research",
        "Value justification"
      ],
      goals: [
        "Stay ahead of trends",
        "Maximize productivity",
        "Express status",
        "Invest in quality"
      ],
      preferredChannels: ["LinkedIn", "Premium publications", "Email", "Exclusive events"],
      campaigns: 5,
      avgCTR: "2.8%",
      conversion: "8.5%",
      lifetimeValue: "$2,500"
    },
    {
      id: 3,
      name: "Eco-Friendly Families",
      description: "Environmentally conscious families with children",
      icon: <Leaf className="w-8 h-8 text-green-500" />,
      demographics: {
        age: "28-45",
        income: "$50K-$100K",
        location: "Suburban areas",
        education: "Bachelor's degree"
      },
      psychographics: {
        values: ["Sustainability", "Health", "Family", "Community"],
        interests: ["Environment", "Parenting", "Health & wellness", "Community events"],
        behaviors: ["Research ingredients", "Read reviews", "Share experiences"]
      },
      painPoints: [
        "Finding truly eco products",
        "Higher costs",
        "Skepticism of claims",
        "Balancing convenience"
      ],
      goals: [
        "Protect environment",
        "Keep family healthy",
        "Teach children values",
        "Save money long-term"
      ],
      preferredChannels: ["Facebook", "Parenting blogs", "Email newsletters", "Community forums"],
      campaigns: 6,
      avgCTR: "5.1%",
      conversion: "4.7%",
      lifetimeValue: "$800"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Target Personas</h1>
          <p className="text-gray-400 mt-1">Understand your audience to create better campaigns</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Create New Persona
        </button>
      </div>

      {/* Personas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <div 
            key={persona.id} 
            className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-6 hover:border-gray-700 transition-colors cursor-pointer"
            onClick={() => setSelectedPersona(persona)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {persona.icon}
                <div>
                  <h3 className="font-semibold text-white">{persona.name}</h3>
                  <p className="text-sm text-gray-400">{persona.campaigns} campaigns</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-700 rounded">
                  <Edit className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-700 rounded">
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4">{persona.description}</p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-white">{persona.avgCTR}</p>
                <p className="text-xs text-gray-400">Avg CTR</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{persona.conversion}</p>
                <p className="text-xs text-gray-400">Conversion</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{persona.lifetimeValue}</p>
                <p className="text-xs text-gray-400">LTV</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View Modal/Panel */}
      {selectedPersona && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] rounded-lg border border-gray-800 p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {selectedPersona.icon}
                <h2 className="text-2xl font-bold text-white">{selectedPersona.name}</h2>
              </div>
              <button 
                onClick={() => setSelectedPersona(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Demographics */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Demographics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Age:</span>
                    <span className="text-white">{selectedPersona.demographics.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Income:</span>
                    <span className="text-white">{selectedPersona.demographics.income}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location:</span>
                    <span className="text-white">{selectedPersona.demographics.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Education:</span>
                    <span className="text-white">{selectedPersona.demographics.education}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Campaigns:</span>
                    <span className="text-white font-semibold">{selectedPersona.campaigns}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Avg CTR:</span>
                    <span className="text-green-500 font-semibold">{selectedPersona.avgCTR}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Conversion:</span>
                    <span className="text-blue-500 font-semibold">{selectedPersona.conversion}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Lifetime Value:</span>
                    <span className="text-yellow-500 font-semibold">{selectedPersona.lifetimeValue}</span>
                  </div>
                </div>
              </div>

              {/* Pain Points */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Pain Points</h3>
                <ul className="space-y-2">
                  {selectedPersona.painPoints.map((point, index) => (
                    <li key={index} className="text-gray-300 flex items-center gap-2">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Goals */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Goals</h3>
                <ul className="space-y-2">
                  {selectedPersona.goals.map((goal, index) => (
                    <li key={index} className="text-gray-300 flex items-center gap-2">
                      <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preferred Channels */}
              <div className="bg-gray-800 rounded-lg p-4 md:col-span-2">
                <h3 className="font-semibold text-white mb-3">Preferred Channels</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPersona.preferredChannels.map((channel, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                Edit Persona
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default TargetPersonas;
