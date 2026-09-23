import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { LandingPage } from "./pages/public/LandingPage";
import { CampaignsPage } from "./pages/public/CampaignsPage";
import { CampaignDetailPage } from "./pages/public/CampaignDetailPage";
import { TreeDetailPage } from "./pages/public/TreeDetailPage";
import { AuthPage } from "./pages/auth/AuthPages";
import { DonorOverview } from "./pages/donor/DonorOverview";
import { DonorTreesPage } from "./pages/donor/DonorTreesPage";
import { DonorCertificatesPage } from "./pages/donor/DonorCertificatesPage";
import { DonorRewardsPage } from "./pages/donor/DonorRewardsPage";
import { DonorImpactPage } from "./pages/donor/DonorImpactPage";
import {
  DonorNotificationsPage,
  DonorProfilePage,
  DonorCampaignsHistoryPage,
} from "./pages/donor/DonorMiscPages";
import { AdminOverviewPage, AdminVerificationPage } from "./pages/admin/AdminPages";
import {
  TeamOverviewPage,
  TeamPlantationProofPage,
  TeamGrowthUpdatesPage,
} from "./pages/team/TeamPages";
import {
  OrganizationOverviewPage,
  OrganizationNewCampaignPage,
} from "./pages/organization/OrganizationPages";

const RouterView: React.FC = () => {
  const { currentPath } = useApp();

  // 1. Root Landing Page
  if (currentPath === "/" || currentPath === "") {
    return <LandingPage />;
  }

  // 2. Auth Routes
  if (currentPath === "/login") {
    return <AuthPage mode="login" />;
  }
  if (currentPath === "/register") {
    return <AuthPage mode="register" />;
  }
  if (currentPath === "/forgot-password") {
    return <AuthPage mode="forgot-password" />;
  }

  // 3. Public Campaigns & Detail
  if (currentPath === "/campaigns") {
    return <CampaignsPage />;
  }
  if (currentPath.startsWith("/campaigns/")) {
    const campaignId = currentPath.replace("/campaigns/", "");
    return <CampaignDetailPage campaignId={campaignId} />;
  }

  // 4. Public Tree Passport / Verification Detail
  if (currentPath.startsWith("/trees/")) {
    const treeId = currentPath.replace("/trees/", "");
    return <TreeDetailPage treeId={treeId} />;
  }

  // 5. Donor Dashboard Routes
  if (currentPath === "/dashboard") {
    return <DonorOverview />;
  }
  if (currentPath === "/dashboard/trees") {
    return <DonorTreesPage />;
  }
  if (currentPath === "/dashboard/certificates") {
    return <DonorCertificatesPage />;
  }
  if (currentPath === "/dashboard/rewards") {
    return <DonorRewardsPage />;
  }
  if (currentPath === "/dashboard/impact") {
    return <DonorImpactPage />;
  }
  if (currentPath === "/dashboard/campaigns") {
    return <DonorCampaignsHistoryPage />;
  }
  if (currentPath === "/dashboard/notifications") {
    return <DonorNotificationsPage />;
  }
  if (currentPath === "/dashboard/profile" || currentPath === "/dashboard/settings") {
    return <DonorProfilePage />;
  }

  // 6. Admin Portal Routes
  if (currentPath === "/admin") {
    return <AdminOverviewPage />;
  }
  if (currentPath === "/admin/verification") {
    return <AdminVerificationPage />;
  }
  if (currentPath === "/admin/campaigns") {
    return <CampaignsPage />;
  }
  if (currentPath === "/admin/trees") {
    return <DonorTreesPage />;
  }
  if (currentPath === "/admin/organizations") {
    return <OrganizationOverviewPage />;
  }
  if (currentPath === "/admin/analytics" || currentPath === "/admin/reports") {
    return <DonorImpactPage />;
  }
  if (currentPath.startsWith("/admin/")) {
    return <AdminOverviewPage />;
  }

  // 7. Plantation Team Portal Routes
  if (currentPath === "/team" || currentPath === "/team/trees") {
    return <TeamOverviewPage />;
  }
  if (currentPath === "/team/plantation") {
    return <TeamPlantationProofPage />;
  }
  if (currentPath === "/team/growth-updates") {
    return <TeamGrowthUpdatesPage />;
  }

  // 8. Organization Portal Routes
  if (currentPath === "/organization" || currentPath === "/organization/campaigns") {
    return <OrganizationOverviewPage />;
  }
  if (currentPath === "/organization/campaigns/new") {
    return <OrganizationNewCampaignPage />;
  }
  if (currentPath === "/organization/reports") {
    return <DonorImpactPage />;
  }
  if (currentPath === "/organization/trees") {
    return <DonorTreesPage />;
  }
  if (currentPath.startsWith("/organization/")) {
    return <OrganizationOverviewPage />;
  }

  // Fallback to Landing Page
  return <LandingPage />;
};

export default function App() {
  return (
    <AppProvider>
      <RouterView />
    </AppProvider>
  );
}
