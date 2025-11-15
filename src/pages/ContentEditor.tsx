import React, { useState } from "react";
import {
  Edit,
  Save,
  Eye,
  Copy,
  RefreshCw,
  Wand2,
  Type,
  Image,
  Link,
  Palette,
  Download,
  Upload,
  FileText,
  Zap,
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContentEditor = () => {
  const [activeTab, setActiveTab] = useState("editor");
  const [contentType, setContentType] = useState("email");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const templates = [
    {
      id: "welcome",
      name: "Welcome Email",
      type: "email",
      preview:
        "Welcome to our community! We're excited to have you on board and can't wait to show you what we have in store.",
      category: "Onboarding",
    },
    {
      id: "promotion",
      name: "Promotional Email",
      type: "email",
      preview:
        "🎉 Special offer just for you! Get 25% off your next purchase with code SAVE25. Limited time only!",
      category: "Sales",
    },
    {
      id: "newsletter",
      name: "Newsletter",
      type: "email",
      preview:
        "This week in tech: The latest trends, product updates, and insights from industry leaders.",
      category: "Newsletter",
    },
    {
      id: "social-post",
      name: "Social Media Post",
      type: "social",
      preview:
        "✨ Transform your marketing game with AI-powered content creation. What would you create first? #MarketingAI",
      category: "Social",
    },
  ];

  const aiSuggestions = [
    {
      type: "Subject Line",
      suggestion: "🚀 Your exclusive early access is here",
      confidence: 92,
    },
    {
      type: "Opening",
      suggestion:
        "We've been working on something special, and you're among the first to know about it.",
      confidence: 88,
    },
    {
      type: "Call to Action",
      suggestion: "Claim Your Spot Now",
      confidence: 95,
    },
    {
      type: "Tone Adjustment",
      suggestion:
        "Consider making the tone more conversational to increase engagement",
      confidence: 85,
    },
  ];

  const contentAnalysis = {
    readabilityScore: 78,
    sentimentScore: 82,
    engagementPrediction: 74,
    wordCount: 156,
    characterCount: 892,
    estimatedReadTime: "1 min",
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const generateWithAI = () => {
    // Simulate AI generation
    const generatedContent = `Subject: 🎯 Unlock Your Marketing Potential

Hi there!

We've been analyzing the latest marketing trends, and one thing is clear: personalized, AI-driven content is the future.

That's why we're excited to introduce our new AI Marketing Assistant - designed to help you create compelling campaigns that truly resonate with your audience.

Here's what you can do:
• Generate personalized email campaigns in minutes
• Create social media content that drives engagement  
• Analyze performance with real-time insights
• A/B test different approaches automatically

Ready to transform your marketing strategy?

[Get Started Today]

Best regards,
The Marketing Team`;

    setContent(generatedContent);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Editor</h1>
            <p className="text-gray-600 mt-1">
              Create and edit marketing content with AI assistance
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={generateWithAI}
            >
              <Wand2 className="h-4 w-4" />
              Generate with AI
            </Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Content
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Templates</CardTitle>
              <CardDescription>Choose a starting point</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Campaign</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="blog">Blog Post</SelectItem>
                  <SelectItem value="ad">Advertisement</SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                {templates
                  .filter((template) => template.type === contentType)
                  .map((template) => (
                    <div
                      key={template.id}
                      className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedTemplate === template.id
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedTemplate(template.id);
                        setContent(template.preview);
                      }}
                    >
                      <div className="font-medium text-sm">{template.name}</div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {template.category}
                      </Badge>
                      <div className="text-xs text-gray-600 mt-2 line-clamp-2">
                        {template.preview}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Editor */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="editor" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="analysis" className="gap-2">
                  <Zap className="h-4 w-4" />
                  Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Content Editor</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(content)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contentType === "email" && (
                      <div>
                        <Label htmlFor="subject">Subject Line</Label>
                        <Input
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Enter email subject..."
                          className="mt-1"
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing your content..."
                        className="mt-1 min-h-[400px]"
                      />
                    </div>

                    <div className="flex gap-2 text-sm text-gray-600">
                      <span>{content.length} characters</span>
                      <span>•</span>
                      <span>{content.split(" ").length} words</span>
                      <span>•</span>
                      <span>
                        {Math.ceil(content.split(" ").length / 200)} min read
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview">
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                      How your content will appear
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-6 bg-gray-50 min-h-[400px]">
                      {contentType === "email" && subject && (
                        <div className="border-b pb-4 mb-4">
                          <div className="font-bold text-lg">{subject}</div>
                          <div className="text-sm text-gray-600">
                            From: marketing@company.com
                          </div>
                        </div>
                      )}
                      <div className="whitespace-pre-wrap text-gray-800">
                        {content || "No content to preview"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Analysis</CardTitle>
                    <CardDescription>
                      AI-powered insights about your content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {contentAnalysis.readabilityScore}
                        </div>
                        <div className="text-sm text-gray-600">
                          Readability Score
                        </div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {contentAnalysis.sentimentScore}
                        </div>
                        <div className="text-sm text-gray-600">
                          Sentiment Score
                        </div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {contentAnalysis.engagementPrediction}
                        </div>
                        <div className="text-sm text-gray-600">
                          Engagement Score
                        </div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {contentAnalysis.estimatedReadTime}
                        </div>
                        <div className="text-sm text-gray-600">Read Time</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Content Statistics</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>Words: {contentAnalysis.wordCount}</div>
                        <div>Characters: {contentAnalysis.characterCount}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Suggestions Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Suggestions</CardTitle>
              <CardDescription>Improve your content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {suggestion.type}
                    </Badge>
                    <span className="text-xs text-green-600">
                      {suggestion.confidence}% confident
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    {suggestion.suggestion}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => copyToClipboard(suggestion.suggestion)}
                  >
                    Apply Suggestion
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Formatting Toolbar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Formatting Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Type className="h-4 w-4" />
                Bold
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Type className="h-4 w-4" style={{ fontStyle: "italic" }} />
                Italic
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Link className="h-4 w-4" />
                Add Link
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Image className="h-4 w-4" />
                Insert Image
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Palette className="h-4 w-4" />
                Colors
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentEditor;
