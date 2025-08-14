import React, { useState } from 'react';
import { Search, Filter, Star, Copy, Eye, Edit, Download, Plus, Grid, List, Heart, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Templates = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      title: "Welcome Email Series",
      category: "Email",
      type: "Onboarding",
      description: "A complete 3-email welcome sequence for new subscribers",
      preview: "Welcome to our community! We're thrilled to have you join our family of innovators and creators...",
      rating: 4.8,
      uses: 1240,
      featured: true,
      tags: ["welcome", "onboarding", "series"],
      author: "Marketing Team",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "Product Launch Announcement",
      category: "Email",
      type: "Product",
      description: "Perfect template for announcing new product launches",
      preview: "🚀 We're excited to introduce our latest innovation that will revolutionize how you...",
      rating: 4.9,
      uses: 890,
      featured: true,
      tags: ["launch", "product", "announcement"],
      author: "Product Team",
      lastUpdated: "2024-01-20"
    },
    {
      id: 3,
      title: "Social Media Engagement Post",
      category: "Social",
      type: "Engagement",
      description: "High-engagement social media post template",
      preview: "💡 Quick question for our community: What's the biggest challenge you're facing in your...",
      rating: 4.6,
      uses: 2100,
      featured: false,
      tags: ["engagement", "question", "community"],
      author: "Social Team",
      lastUpdated: "2024-01-18"
    },
    {
      id: 4,
      title: "Holiday Sale Campaign",
      category: "Email",
      type: "Promotional",
      description: "Seasonal sales template with countdown timer",
      preview: "🎄 Holiday Special: Get 30% off everything! Limited time offer - countdown starts now...",
      rating: 4.7,
      uses: 1560,
      featured: true,
      tags: ["sale", "holiday", "promotion"],
      author: "Sales Team",
      lastUpdated: "2024-01-10"
    },
    {
      id: 5,
      title: "Customer Success Story",
      category: "Blog",
      type: "Case Study",
      description: "Template for showcasing customer success stories",
      preview: "How [Customer Name] Increased Revenue by 300% Using Our Platform. Learn about their journey...",
      rating: 4.5,
      uses: 670,
      featured: false,
      tags: ["success", "case-study", "testimonial"],
      author: "Content Team",
      lastUpdated: "2024-01-12"
    },
    {
      id: 6,
      title: "Webinar Invitation",
      category: "Email",
      type: "Event",
      description: "Professional webinar invitation template",
      preview: "You're invited to join our exclusive webinar: 'Marketing Automation Secrets'...",
      rating: 4.4,
      uses: 980,
      featured: false,
      tags: ["webinar", "invitation", "event"],
      author: "Events Team",
      lastUpdated: "2024-01-14"
    },
    {
      id: 7,
      title: "Instagram Story Template",
      category: "Social",
      type: "Story",
      description: "Eye-catching Instagram story design template",
      preview: "Swipe-worthy story template with interactive elements and brand consistency...",
      rating: 4.8,
      uses: 3200,
      featured: true,
      tags: ["instagram", "story", "design"],
      author: "Design Team",
      lastUpdated: "2024-01-22"
    },
    {
      id: 8,
      title: "Abandoned Cart Recovery",
      category: "Email",
      type: "Automation",
      description: "Recover lost sales with this proven cart abandonment sequence",
      preview: "Oops! You left something behind. Complete your purchase now and get free shipping...",
      rating: 4.9,
      uses: 1890,
      featured: true,
      tags: ["cart", "recovery", "automation"],
      author: "E-commerce Team",
      lastUpdated: "2024-01-16"
    }
  ];

  const categories = [
    { value: "all", label: "All Templates" },
    { value: "Email", label: "Email Templates" },
    { value: "Social", label: "Social Media" },
    { value: "Blog", label: "Blog Posts" },
    { value: "Ad", label: "Advertisements" }
  ];

  const templateTypes = [
    "Onboarding", "Product", "Promotional", "Event", "Case Study", 
    "Engagement", "Story", "Automation", "Newsletter", "Survey"
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredTemplates = templates.filter(template => template.featured);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const TemplateCard = ({ template, compact = false }) => (
    <Card className={`hover:shadow-lg transition-shadow ${compact ? 'h-auto' : 'h-full'}`}>
      <CardHeader className={compact ? 'pb-3' : ''}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className={`${compact ? 'text-base' : 'text-lg'}`}>{template.title}</CardTitle>
              {template.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
            </div>
            <div className="flex gap-2 mb-2">
              <Badge variant="secondary">{template.category}</Badge>
              <Badge variant="outline">{template.type}</Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="h-3 w-3 fill-current text-yellow-500" />
              {template.rating}
            </div>
            <div className="text-xs text-gray-500">{template.uses} uses</div>
          </div>
        </div>
        {!compact && <CardDescription>{template.description}</CardDescription>}
      </CardHeader>
      <CardContent className={compact ? 'pt-0' : ''}>
        {!compact && (
          <div className="mb-4 p-3 bg-gray-50 rounded text-sm text-gray-700 line-clamp-3">
            {template.preview}
          </div>
        )}
        <div className="flex flex-wrap gap-1 mb-4">
          {template.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 gap-2">
                <Eye className="h-3 w-3" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{template.title}</DialogTitle>
                <DialogDescription>{template.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-700">
                    {template.preview}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="gap-2" 
                    onClick={() => copyToClipboard(template.preview)}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Template
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Template
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button 
            size="sm" 
            className="gap-2"
            onClick={() => copyToClipboard(template.preview)}
          >
            <Copy className="h-3 w-3" />
            Use
          </Button>
        </div>
        {!compact && (
          <div className="mt-3 pt-3 border-t text-xs text-gray-500">
            By {template.author} • Updated {template.lastUpdated}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Template Library</h1>
            <p className="text-gray-300 mt-1">Ready-to-use templates for all your marketing needs</p>
          </div>
        <div className="flex gap-3">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {/* Templates Grid/List */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredTemplates.map((template) => (
              <TemplateCard 
                key={template.id} 
                template={template} 
                compact={viewMode === 'list'} 
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {featuredTemplates.map((template) => (
              <TemplateCard 
                key={template.id} 
                template={template} 
                compact={viewMode === 'list'} 
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {[...templates].sort((a, b) => b.uses - a.uses).slice(0, 6).map((template) => (
              <TemplateCard 
                key={template.id} 
                template={template} 
                compact={viewMode === 'list'} 
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {[...templates].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()).slice(0, 6).map((template) => (
              <TemplateCard 
                key={template.id} 
                template={template} 
                compact={viewMode === 'list'} 
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Template Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Grid className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{templates.length}</div>
                <div className="text-sm text-gray-600">Total Templates</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{featuredTemplates.length}</div>
                <div className="text-sm text-gray-600">Featured</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Heart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(templates.reduce((acc, t) => acc + t.rating, 0) / templates.length * 10) / 10}
                </div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {templates.reduce((acc, t) => acc + t.uses, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Uses</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No templates found</h3>
              <p>Try adjusting your search terms or filters to find what you're looking for.</p>
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  );
};

export default Templates;
