import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronRight,
  HomeIcon,
  Users,
  Target,
  Mail,
  Share2,
  BarChart3,
  Edit,
  TrendingUp,
  Grid,
  LayoutGrid,
  Rss,
  Code,
  ChevronDown,
  BookOpen,
  HelpCircle,
  Sparkles,
  Palette as ThemeIcon,
  Newspaper,
  Clock,
  Bookmark,
  Heart,
  Album,
  Boxes,
} from "lucide-react";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isNew?: boolean;
  hasDropdown?: boolean;
  onClick?: () => void;
};

type DropdownItemProps = {
  icon: React.ReactNode;
  label: string;
  isExternal?: boolean;
  isActive?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({
  icon,
  label,
  isActive = false,
  isNew = false,
  hasDropdown = false,
  onClick,
}: SidebarItemProps) => (
  <button
    className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors ${
      isActive ? "bg-accent" : "hover:bg-accent"
    }`}
    onClick={onClick}
  >
    <div className={isActive ? "text-white" : "text-gray-300"}>{icon}</div>
    <span className="text-white text-sm font-medium flex-1 text-left">
      {label}
    </span>
    {isNew && (
      <span className="bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
        NEW
      </span>
    )}
    {hasDropdown &&
      (isActive ? (
        <ChevronDown size={16} className="text-gray-300" />
      ) : (
        <ChevronRight size={16} className="text-gray-300" />
      ))}
  </button>
);

const DropdownItem = ({
  icon,
  label,
  isExternal = false,
  isActive = false,
  onClick,
}: DropdownItemProps) => (
  <button
    className={`w-full flex items-center gap-3 p-3 pl-12 hover:bg-accent rounded-md transition-colors ${
      isActive ? "bg-accent" : ""
    }`}
    onClick={onClick}
  >
    <div className={isActive ? "text-white" : "text-gray-300"}>{icon}</div>
    <span className={`text-sm ${isActive ? "text-white" : "text-gray-300"}`}>
      {label}
    </span>
    {isExternal && (
      <span className="ml-2 px-1 bg-muted rounded-sm text-[10px] text-gray-300">
        ↗
      </span>
    )}
  </button>
);

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [myStuffOpen, setMyStuffOpen] = useState(false);
  const [activeDropdownItem, setActiveDropdownItem] = useState("");

  const getActiveItem = () => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") return "Dashboard";
    if (path === "/personas") return "Target Personas";
    if (path === "/campaign-builder") return "Campaign Builder";
    if (path === "/email-campaigns") return "Email Campaigns";
    if (path === "/social-media") return "Social Media";
    if (path === "/analytics") return "Analytics";
    if (path === "/content-editor") return "Content Editor";
    if (path === "/performance") return "Performance";
    if (path === "/templates") return "Templates";
    if (path === "/ab-tests") return "A/B Tests";
    if (path === "/my-campaigns") return "My Campaigns";
    if (path === "/resources") return "Resources";
    return "Dashboard";
  };

  const handleNavigation = (item, path) => {
    navigate(path);
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-sidebar min-h-screen flex flex-col items-center py-4 border-r border-gray-800">
        <div className="mb-8">
          <img
            src="/lovable-uploads/407e5ec8-9b67-42ee-acf0-b238e194aa64.png"
            alt="Logo"
            className="w-8 h-8"
          />
        </div>
        <button
          onClick={() => setIsCollapsed(false)}
          className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 rounded-full p-1 text-white hover:bg-gray-700 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-[232px] bg-sidebar min-h-screen flex flex-col border-r border-gray-800">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/407e5ec8-9b67-42ee-acf0-b238e194aa64.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="text-white font-semibold">MarketingAI</span>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-800"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="py-2 px-3 flex flex-col gap-1">
        <SidebarItem
          icon={<HomeIcon size={20} />}
          label="Dashboard"
          isActive={getActiveItem() === "Dashboard"}
          onClick={() => handleNavigation("Dashboard", "/dashboard")}
        />
        <SidebarItem
          icon={<Users size={20} />}
          label="Target Personas"
          isActive={getActiveItem() === "Target Personas"}
          onClick={() => handleNavigation("Target Personas", "/personas")}
        />
        <SidebarItem
          icon={<Target size={20} />}
          label="Campaign Builder"
          isNew
          isActive={getActiveItem() === "Campaign Builder"}
          onClick={() =>
            handleNavigation("Campaign Builder", "/campaign-builder")
          }
        />
        <SidebarItem
          icon={<Mail size={20} />}
          label="Email Campaigns"
          isActive={getActiveItem() === "Email Campaigns"}
          onClick={() =>
            handleNavigation("Email Campaigns", "/email-campaigns")
          }
        />
        <SidebarItem
          icon={<Share2 size={20} />}
          label="Social Media"
          isActive={getActiveItem() === "Social Media"}
          onClick={() => handleNavigation("Social Media", "/social-media")}
        />
        <SidebarItem
          icon={<BarChart3 size={20} />}
          label="Analytics"
          isActive={getActiveItem() === "Analytics"}
          onClick={() => handleNavigation("Analytics", "/analytics")}
        />
        <SidebarItem
          icon={<Edit size={20} />}
          label="Content Editor"
          isActive={getActiveItem() === "Content Editor"}
          onClick={() => handleNavigation("Content Editor", "/content-editor")}
        />
        <SidebarItem
          icon={<TrendingUp size={20} />}
          label="Performance"
          isActive={getActiveItem() === "Performance"}
          onClick={() => handleNavigation("Performance", "/performance")}
        />
        <SidebarItem
          icon={<Grid size={20} />}
          label="Templates"
          isActive={getActiveItem() === "Templates"}
          onClick={() => handleNavigation("Templates", "/templates")}
        />
        <SidebarItem
          icon={<LayoutGrid size={20} />}
          label="A/B Tests"
          isActive={getActiveItem() === "A/B Tests"}
          onClick={() => handleNavigation("A/B Tests", "/ab-tests")}
        />
      </div>

      <div className="flex-grow overflow-auto">
        <div className="py-2 px-3">
          <SidebarItem
            icon={
              myStuffOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )
            }
            label="My Campaigns"
            isActive={getActiveItem() === "My Campaigns"}
            hasDropdown
            onClick={() => {
              setMyStuffOpen(!myStuffOpen);
              handleNavigation("My Campaigns", "/my-campaigns");
            }}
          />

          {myStuffOpen && (
            <div className="mt-1 space-y-1 animate-fade-in">
              <DropdownItem
                icon={<Clock size={16} />}
                label="Campaign History"
                isActive={activeDropdownItem === "Campaign History"}
                onClick={() => setActiveDropdownItem("Campaign History")}
              />
              <DropdownItem
                icon={<Bookmark size={16} />}
                label="Saved Templates"
                isActive={activeDropdownItem === "Saved Templates"}
                onClick={() => setActiveDropdownItem("Saved Templates")}
              />
              <DropdownItem
                icon={<Heart size={16} />}
                label="Favorites"
                isActive={activeDropdownItem === "Favorites"}
                onClick={() => setActiveDropdownItem("Favorites")}
              />
              <DropdownItem
                icon={<Album size={16} />}
                label="Brand Assets"
                isActive={activeDropdownItem === "Brand Assets"}
                onClick={() => setActiveDropdownItem("Brand Assets")}
              />
              <DropdownItem
                icon={<Boxes size={16} />}
                label="Custom Personas"
                isActive={activeDropdownItem === "Custom Personas"}
                onClick={() => setActiveDropdownItem("Custom Personas")}
              />
            </div>
          )}
        </div>

        <div className="py-2 px-3">
          <SidebarItem
            icon={
              resourcesOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )
            }
            label="Resources"
            hasDropdown
            isActive={getActiveItem() === "Resources"}
            onClick={() => {
              setResourcesOpen(!resourcesOpen);
              handleNavigation("Resources", "/resources");
            }}
          />

          {resourcesOpen && (
            <div className="mt-1 space-y-1 animate-fade-in">
              <DropdownItem
                icon={<BookOpen size={16} />}
                label="Tutorials"
                isActive={activeDropdownItem === "Tutorials"}
                onClick={() => setActiveDropdownItem("Tutorials")}
              />
              <DropdownItem
                icon={<HelpCircle size={16} />}
                label="Wiki"
                isExternal
                isActive={activeDropdownItem === "Wiki"}
                onClick={() => setActiveDropdownItem("Wiki")}
              />
              <DropdownItem
                icon={<HelpCircle size={16} />}
                label="Help Center"
                isActive={activeDropdownItem === "Help Center"}
                onClick={() => setActiveDropdownItem("Help Center")}
              />
              <DropdownItem
                icon={<Sparkles size={16} />}
                label="What's New"
                isActive={activeDropdownItem === "What's New"}
                onClick={() => setActiveDropdownItem("What's New")}
              />
              <DropdownItem
                icon={<ThemeIcon size={16} />}
                label="Theme Gallery"
                isActive={activeDropdownItem === "Theme Gallery"}
                onClick={() => setActiveDropdownItem("Theme Gallery")}
              />
              <DropdownItem
                icon={<Newspaper size={16} />}
                label="Blog"
                isExternal
                isActive={activeDropdownItem === "Blog"}
                onClick={() => setActiveDropdownItem("Blog")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
