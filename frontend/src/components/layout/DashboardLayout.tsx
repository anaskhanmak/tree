import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { siteConfig } from "../../config/site";
import {
  LayoutDashboard,
  Trees,
  FolderKanban,
  Award,
  Flame,
  LineChart,
  Bell,
  User,
  Settings,
  ShieldCheck,
  Building2,
  Users,
  Sprout,
  Menu,
  X,
  FileCheck2,
  FileText,
  LogOut,
  ChevronRight,
  Sparkles,
  Search,
} from "lucide-react";
import { UserRole } from "../../types";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string | number;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  roleScope: UserRole;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeSection,
  roleScope,
  title,
  subtitle,
  actions,
}) => {
  const {
    currentUser,
    currentPath,
    navigate,
    switchRole,
    notifications,
    unreadNotifsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState<boolean>(false);

  // Role-specific sidebars
  const donorNav: NavItem[] = [
    { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { label: "My Trees", path: "/dashboard/trees", icon: Trees, badge: currentUser.treesSponsoredCount },
    { label: "Campaigns", path: "/dashboard/campaigns", icon: FolderKanban },
    { label: "Certificates", path: "/dashboard/certificates", icon: Award },
    { label: "Rewards & Badges", path: "/dashboard/rewards", icon: Flame },
    { label: "Environmental Impact", path: "/dashboard/impact", icon: LineChart },
    { label: "Notifications", path: "/dashboard/notifications", icon: Bell, badge: unreadNotifsCount || undefined },
    { label: "Profile", path: "/dashboard/profile", icon: User },
    { label: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  const adminNav: NavItem[] = [
    { label: "Overview", path: "/admin", icon: LayoutDashboard },
    { label: "Verification Queue", path: "/admin/verification", icon: FileCheck2, badge: "Pending" },
    { label: "Campaigns", path: "/admin/campaigns", icon: FolderKanban },
    { label: "All Trees", path: "/admin/trees", icon: Trees },
    { label: "Organizations", path: "/admin/organizations", icon: Building2 },
    { label: "Users & Donors", path: "/admin/users", icon: Users },
    { label: "Plantation Teams", path: "/admin/teams", icon: Sprout },
    { label: "Growth Updates", path: "/admin/growth-updates", icon: Trees },
    { label: "Certificates", path: "/admin/certificates", icon: Award },
    { label: "Rewards Setup", path: "/admin/rewards", icon: Flame },
    { label: "Analytics", path: "/admin/analytics", icon: LineChart },
    { label: "Reports", path: "/admin/reports", icon: FileText },
    { label: "Platform Settings", path: "/admin/settings", icon: Settings },
  ];

  const teamNav: NavItem[] = [
    { label: "Overview", path: "/team", icon: LayoutDashboard },
    { label: "Assigned Trees", path: "/team/trees", icon: Trees },
    { label: "Plantation Proof", path: "/team/plantation", icon: FileCheck2 },
    { label: "Growth Updates", path: "/team/growth-updates", icon: Sprout },
    { label: "Field Profile", path: "/dashboard/profile", icon: User },
  ];

  const orgNav: NavItem[] = [
    { label: "Overview", path: "/organization", icon: LayoutDashboard },
    { label: "My Campaigns", path: "/organization/campaigns", icon: FolderKanban },
    { label: "Sponsored Trees", path: "/organization/trees", icon: Trees },
    { label: "Impact & Reports", path: "/organization/reports", icon: FileText },
    { label: "Org Profile", path: "/organization/profile", icon: Building2 },
  ];

  const currentNav =
    roleScope === "admin"
      ? adminNav
      : roleScope === "plantation_team"
      ? teamNav
      : roleScope === "organization"
      ? orgNav
      : donorNav;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row text-slate-900">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-1.5 font-bold font-display text-emerald-800">
            <Sprout className="h-5 w-5" />
            <span>{siteConfig.name}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
            {currentUser.points} pts
          </span>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="h-7 w-7 rounded-full border border-emerald-200 bg-slate-100"
          />
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200/90 bg-white flex flex-col justify-between transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 group text-left focus:outline-none"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-xs">
                <Sprout className="h-4 w-4" />
              </span>
              <div>
                <span className="text-base font-bold text-slate-900 font-display block leading-none">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {roleScope === "admin"
                    ? "Admin Console"
                    : roleScope === "plantation_team"
                    ? "Field Ops"
                    : roleScope === "organization"
                    ? "Partner Portal"
                    : "Donor Portal"}
                </span>
              </div>
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-4 px-3 space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentPath === item.path ||
                (item.path !== "/dashboard" &&
                  item.path !== "/admin" &&
                  item.path !== "/team" &&
                  item.path !== "/organization" &&
                  currentPath.startsWith(item.path));

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-900 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`h-4 w-4 shrink-0 ${
                        isActive ? "text-emerald-700" : "text-slate-400"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-emerald-200 text-emerald-900"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer User Info & Role Switcher */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          {/* Quick Return to Public Site */}
          <button
            onClick={() => navigate("/")}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <span>Visit Public Website</span>
            <ChevronRight className="h-3 w-3" />
          </button>

          {/* User Profile Card */}
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-8 w-8 rounded-full border border-slate-200 bg-white"
            />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold text-slate-800 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-500 capitalize truncate">
                {currentUser.role.replace("_", " ")}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Navbar */}
        <header className="hidden md:flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => navigate("/")} className="hover:text-slate-800">
              TreeMint
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="capitalize font-medium text-slate-800">
              {roleScope.replace("_", " ")}
            </span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-emerald-800">{activeSection}</span>
          </div>

          {/* Top Actions & Profile */}
          <div className="flex items-center gap-4">
            {/* Green Points Badge */}
            {roleScope === "donor" && (
              <button
                onClick={() => navigate("/dashboard/rewards")}
                className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                title="View your Green Points & Achievements"
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span className="font-mono tabular-nums">{currentUser.points.toLocaleString()}</span>
                <span className="text-[10px] font-normal text-emerald-700">Pts</span>
              </button>
            )}

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <Bell className="h-4 w-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-emerald-600" />
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
                    <span className="text-xs font-bold text-slate-900">
                      Notifications ({unreadNotifsCount})
                    </span>
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[10px] text-emerald-700 hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                    {notifications.slice(0, 4).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationAsRead(n.id);
                          if (n.actionUrl) {
                            navigate(n.actionUrl);
                            setNotifDropdownOpen(false);
                          }
                        }}
                        className={`p-2.5 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                          !n.read ? "bg-emerald-50/40" : ""
                        }`}
                      >
                        <p className="font-semibold text-slate-800">{n.title}</p>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{n.message}</p>
                        <span className="text-[9px] text-slate-400 mt-1 block">{n.timestamp}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 p-2 text-center">
                    <button
                      onClick={() => {
                        setNotifDropdownOpen(false);
                        navigate("/dashboard/notifications");
                      }}
                      className="text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Sponsor Tree Shortcut */}
            <button
              onClick={() => navigate("/campaigns")}
              className="rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-colors"
            >
              + Sponsor Tree
            </button>
          </div>
        </header>

        {/* Viewport Header */}
        <div className="border-b border-slate-200/70 bg-white px-4 py-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight">
                {title}
              </h1>
              {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
          </div>
        </div>

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
