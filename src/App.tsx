import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import Header from "./components/Header";
import { PromoBar } from "./components/PromoBar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import TargetPersonas from "./pages/TargetPersonas";
import CampaignBuilder from "./pages/CampaignBuilder";
import EmailCampaigns from "./pages/EmailCampaigns";
import SocialMedia from "./pages/SocialMedia";
import Analytics from "./pages/Analytics";
import ContentEditor from "./pages/ContentEditor";
import Performance from "./pages/Performance";
import Templates from "./pages/Templates";
import ABTests from "./pages/ABTests";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-[#0A0A0A]">
          <PromoBar />
          <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6 bg-[#0A0A0A]">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/personas" element={<TargetPersonas />} />
                  <Route
                    path="/campaign-builder"
                    element={<CampaignBuilder />}
                  />
                  <Route path="/email-campaigns" element={<EmailCampaigns />} />
                  <Route path="/social-media" element={<SocialMedia />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/content-editor" element={<ContentEditor />} />
                  <Route path="/performance" element={<Performance />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/ab-tests" element={<ABTests />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
