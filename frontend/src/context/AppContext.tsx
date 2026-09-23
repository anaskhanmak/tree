import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import {
  User,
  UserRole,
  Organization,
  Campaign,
  Tree,
  PlantationTeam,
  Certificate,
  RewardBadge,
  NotificationItem,
  GrowthUpdate,
  VerificationStatus,
} from "../types";
import {
  MOCK_USERS,
  MOCK_ORGANIZATIONS,
  MOCK_CAMPAIGNS,
  MOCK_TREES,
  MOCK_PLANTATION_TEAMS,
  MOCK_CERTIFICATES,
  MOCK_BADGES,
  MOCK_NOTIFICATIONS,
  ASSETS,
} from "../mock/data";
import { api } from "../services/api";

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  trees: Tree[];
  campaigns: Campaign[];
  organizations: Organization[];
  teams: PlantationTeam[];
  certificates: Certificate[];
  badges: RewardBadge[];
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  
  // Backend API Integration state
  backendStatus: "connected" | "connecting" | "offline";
  backendInfo: { status: string; engine?: string } | null;
  pingBackend: () => Promise<boolean>;

  // Actions
  sponsorTree: (
    campaignId: string,
    quantity: number,
    species: string,
    dedication?: string
  ) => Promise<{ success: boolean; treeIds: string[] }>;
  verifyPlantation: (
    treeIdentifier: string,
    newStatus: VerificationStatus,
    adminNotes?: string
  ) => Promise<void>;
  submitPlantationProof: (
    treeIdentifier: string,
    data: {
      photoUrl?: string;
      gpsText: string;
      notes: string;
      teamName: string;
    }
  ) => Promise<void>;
  submitGrowthUpdate: (
    treeIdentifier: string,
    data: {
      milestone: "Month 1" | "Month 3" | "Month 6" | "Month 12" | "Month 24";
      heightCm: number;
      healthStatus: "Thriving" | "Good" | "Needs Care" | "Dormant";
      notes: string;
    }
  ) => Promise<void>;
  createCampaign: (campaignData: Partial<Campaign>) => Promise<void>;
  markNotificationAsRead: (notifId: string) => void;
  markAllNotificationsAsRead: () => void;
  
  // Router
  currentPath: string;
  navigate: (path: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State supporting browser history & direct route parsing
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname || "/";
    }
    return "/";
  });

  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]); // Muhammad Anas by default
  const [trees, setTrees] = useState<Tree[]>(MOCK_TREES);
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [organizations, setOrganizations] = useState<Organization[]>(MOCK_ORGANIZATIONS);
  const [teams, setTeams] = useState<PlantationTeam[]>(MOCK_PLANTATION_TEAMS);
  const [certificates, setCertificates] = useState<Certificate[]>(MOCK_CERTIFICATES);
  const [badges, setBadges] = useState<RewardBadge[]>(MOCK_BADGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Backend connection state
  const [backendStatus, setBackendStatus] = useState<"connected" | "connecting" | "offline">("connecting");
  const [backendInfo, setBackendInfo] = useState<{ status: string; engine?: string } | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // Ping backend API & sync state if live
  const pingBackend = useCallback(async (): Promise<boolean> => {
    setBackendStatus("connecting");
    try {
      const health = await api.checkHealth();
      if (health) {
        setBackendStatus("connected");
        setBackendInfo({
          status: health.status || "healthy",
          engine: health.database?.engine || "MySQL / Simulation",
        });

        try {
          const remoteCampaigns = await api.getCampaigns();
          if (remoteCampaigns.data && Array.isArray(remoteCampaigns.data) && remoteCampaigns.data.length > 0) {
            console.info("Syncing campaigns from backend REST API:", remoteCampaigns.data.length);
          }
        } catch {
          // Keep existing campaigns if fetch fails
        }
        return true;
      } else {
        setBackendStatus("offline");
        return false;
      }
    } catch {
      setBackendStatus("offline");
      return false;
    }
  }, []);

  // Initial check on mount
  useEffect(() => {
    pingBackend();
  }, [pingBackend]);

  // Sync route with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      if (typeof window !== "undefined") {
        window.history.pushState({}, "", path);
      }
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const switchRole = (role: UserRole) => {
    const found = MOCK_USERS.find((u) => u.role === role) || MOCK_USERS[0];
    setCurrentUser(found);
    showToast(`Switched active perspective to: ${found.name} (${role.toUpperCase()})`);
  };

  // Sponsor Tree Handler - calls Backend API with graceful offline fallback
  const sponsorTree = async (
    campaignId: string,
    quantity: number,
    species: string,
    dedication?: string
  ): Promise<{ success: boolean; treeIds: string[] }> => {
    const camp = campaigns.find((c) => c.id === campaignId) || campaigns[0];
    const generatedTreeIds: string[] = [];
    const newTrees: Tree[] = [];
    const pointsToAdd = quantity * 100;

    let apiSucceeded = false;

    // Call Backend API
    try {
      const numericCampId = parseInt(campaignId.replace(/\D/g, ""), 10) || 1;
      const response = await api.sponsorTree({
        campaignId: numericCampId,
        speciesId: 1,
        quantity,
        dedicationMessage: dedication,
      });

      if (response.success && response.data?.trees) {
        apiSucceeded = true;
        response.data.trees.forEach((t: any) => {
          if (t.tree_code) {
            generatedTreeIds.push(t.tree_code);
          }
        });
      }
    } catch (err) {
      console.warn("Backend API sponsor endpoint unreachable or offline. Falling back to local state engine.", err);
    }

    // If API didn't provide IDs, generate standardized TreeMint IDs
    const cityCode = camp.city.slice(0, 3).toUpperCase();
    const currentYear = new Date().getFullYear();

    if (generatedTreeIds.length === 0) {
      for (let i = 0; i < quantity; i++) {
        const randomSeq = Math.floor(100 + Math.random() * 900);
        generatedTreeIds.push(`TREE-${cityCode}-${currentYear}-${randomSeq}`);
      }
    }

    for (let i = 0; i < quantity; i++) {
      const assignedId = generatedTreeIds[i] || `TREE-${cityCode}-${currentYear}-${Math.floor(100 + Math.random() * 900)}`;
      const newTree: Tree = {
        id: `tree-${Date.now()}-${i}`,
        treeId: assignedId,
        donorId: currentUser.id,
        donorName: currentUser.name,
        campaignId: camp.id,
        campaignName: camp.name,
        organizationId: camp.organizationId,
        organizationName: camp.organizationName,
        species: species || camp.treeSpecies[0] || "Azadirachta indica (Neem)",
        localName: species ? species.split(" ")[0] : "Neem",
        city: camp.city,
        area: camp.area,
        sponsoredDate: new Date().toISOString().split("T")[0],
        status: "sponsored",
        verificationStatus: "pending",
        survivalStatus: "Alive & Thriving",
        growthUpdates: [],
        dedicationMessage: dedication,
      };
      newTrees.push(newTree);
    }

    setTrees((prev) => [...newTrees, ...prev]);

    // Award Green Points (100 per tree)
    setCurrentUser((prev) => ({
      ...prev,
      points: prev.points + pointsToAdd,
      treesSponsoredCount: prev.treesSponsoredCount + quantity,
    }));

    // Update campaign stats
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === camp.id ? { ...c, sponsoredTrees: c.sponsoredTrees + quantity } : c
      )
    );

    // Create Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: "🌱 Tree Sponsoring Confirmed!",
      message: `Successfully sponsored ${quantity} ${species || "native tree(s)"} in ${camp.name}. Tree ID: ${generatedTreeIds[0]} assigned! ${apiSucceeded ? "(Verified via Backend API)" : ""}`,
      category: "plantation",
      read: false,
      timestamp: "Just now",
      actionUrl: `/trees/${generatedTreeIds[0]}`,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(
      apiSucceeded
        ? `Backend API: Sponsored ${quantity} tree(s)! Tree ID: ${generatedTreeIds[0]}`
        : `Successfully sponsored ${quantity} tree(s)! +${pointsToAdd} Green Points awarded.`
    );
    return { success: true, treeIds: generatedTreeIds };
  };

  // Verification Handler (Admin)
  const verifyPlantation = async (
    treeIdentifier: string,
    newStatus: VerificationStatus,
    adminNotes?: string
  ) => {
    // Attempt backend API call
    try {
      const numericProofId = parseInt(treeIdentifier.replace(/\D/g, ""), 10) || 1;
      if (newStatus === "verified") {
        await api.approveProof(numericProofId, adminNotes);
      } else if (newStatus === "rejected") {
        await api.rejectProof(numericProofId, adminNotes || "Insufficient proof");
      }
    } catch (err) {
      console.warn("Backend API verification endpoint offline, updating client state", err);
    }

    setTrees((prev) =>
      prev.map((t) => {
        if (t.treeId === treeIdentifier || t.id === treeIdentifier) {
          const isVerified = newStatus === "verified";
          const updatedTree: Tree = {
            ...t,
            verificationStatus: newStatus,
            status: isVerified ? "verified" : t.status,
          };

          // If verified, generate certificate if not existing
          if (isVerified && !updatedTree.certificateId) {
            const certId = `CERT-TM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
            updatedTree.certificateId = certId;

            const newCert: Certificate = {
              id: `cert-${Date.now()}`,
              certificateId: certId,
              treeId: t.treeId,
              donorId: t.donorId,
              donorName: t.donorName,
              species: t.species,
              plantationDate: t.plantationDate || new Date().toISOString().split("T")[0],
              location: `${t.area}, ${t.city}`,
              campaignId: t.campaignId,
              campaignName: t.campaignName,
              organizationName: t.organizationName,
              verificationHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
              qrCodeUrl: `https://treemint.org/trees/${t.treeId}`,
              issueDate: new Date().toISOString().split("T")[0],
            };
            setCertificates((cPrev) => [newCert, ...cPrev]);
          }

          return updatedTree;
        }
        return t;
      })
    );

    showToast(
      newStatus === "verified"
        ? `Tree ${treeIdentifier} plantation proof verified & certificate issued!`
        : `Tree ${treeIdentifier} verification marked as ${newStatus}.`
    );
  };

  // Submit Plantation Proof (Plantation Team)
  const submitPlantationProof = async (
    treeIdentifier: string,
    data: {
      photoUrl?: string;
      gpsText: string;
      notes: string;
      teamName: string;
    }
  ) => {
    // Attempt backend API call
    try {
      const numericTreeId = parseInt(treeIdentifier.replace(/\D/g, ""), 10) || 1;
      await api.submitPlantationProof({
        treeId: numericTreeId,
        latitude: 24.8607,
        longitude: 67.0011,
        locationName: data.gpsText,
        notes: data.notes,
        proofPhotos: [data.photoUrl || ASSETS.sapling],
      });
    } catch (err) {
      console.warn("Backend API submitPlantationProof offline, updating client state", err);
    }

    const today = new Date().toISOString().split("T")[0];
    setTrees((prev) =>
      prev.map((t) => {
        if (t.treeId === treeIdentifier || t.id === treeIdentifier) {
          return {
            ...t,
            status: "planted",
            plantationDate: today,
            plantationProof: {
              photoUrl: data.photoUrl || ASSETS.sapling,
              plantedAt: `${today} 09:30 AM`,
              plantedByTeamId: currentUser.teamId || "team-1",
              plantedByTeamName: data.teamName || "Green Field Unit",
              gpsCoordinates: {
                lat: 24.8607,
                lng: 67.0011,
                display: data.gpsText || "24.8607° N, 67.0011° E",
              },
              notes: data.notes,
              soilCondition: "Rich compost, pH neutral",
            },
          };
        }
        return t;
      })
    );
    showToast(`Plantation proof submitted for ${treeIdentifier}! Pending admin verification.`);
  };

  // Growth Update (Plantation Team / Admin)
  const submitGrowthUpdate = async (
    treeIdentifier: string,
    data: {
      milestone: "Month 1" | "Month 3" | "Month 6" | "Month 12" | "Month 24";
      heightCm: number;
      healthStatus: "Thriving" | "Good" | "Needs Care" | "Dormant";
      notes: string;
    }
  ) => {
    // Attempt backend API call
    try {
      const numericTreeId = parseInt(treeIdentifier.replace(/\D/g, ""), 10) || 1;
      await api.submitGrowthUpdate({
        treeId: numericTreeId,
        monthMilestone: data.milestone,
        heightCm: data.heightCm,
        healthStatus: data.healthStatus,
        notes: data.notes,
      });
    } catch (err) {
      console.warn("Backend API submitGrowthUpdate offline, updating client state", err);
    }

    const today = new Date().toISOString().split("T")[0];
    const newUpdate: GrowthUpdate = {
      id: `gu-${Date.now()}`,
      treeId: treeIdentifier,
      monthMilestone: data.milestone,
      date: today,
      heightCm: data.heightCm,
      healthStatus: data.healthStatus,
      imageUrl: ASSETS.sapling,
      notes: data.notes,
      submittedBy: `${currentUser.name} (${currentUser.role})`,
      verifiedByAdmin: true,
    };

    setTrees((prev) =>
      prev.map((t) => {
        if (t.treeId === treeIdentifier || t.id === treeIdentifier) {
          return {
            ...t,
            status: "growing",
            currentHeightCm: data.heightCm,
            growthUpdates: [...(t.growthUpdates || []), newUpdate],
          };
        }
        return t;
      })
    );

    showToast(`Growth log (${data.milestone}) saved for ${treeIdentifier}!`);
  };

  // Create Campaign
  const createCampaign = async (campaignData: Partial<Campaign>) => {
    try {
      await api.createCampaign({
        name: campaignData.name,
        description: campaignData.description,
        city: campaignData.city,
        area: campaignData.area,
        targetTrees: campaignData.targetTrees,
        pricePerTree: campaignData.pricePerTree,
        startDate: campaignData.startDate,
        endDate: campaignData.endDate,
      });
    } catch (err) {
      console.warn("Backend API createCampaign offline, saving in local state", err);
    }

    const newCamp: Campaign = {
      id: `camp-${Date.now()}`,
      name: campaignData.name || "New Green Initiative",
      slug: (campaignData.name || "new-green-initiative")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-"),
      organizationId: currentUser.organizationId || "org-1",
      organizationName:
        organizations.find((o) => o.id === currentUser.organizationId)?.name ||
        "Sindh Forest & Wildlife Department",
      organizationType:
        organizations.find((o) => o.id === currentUser.organizationId)?.type || "Government",
      organizationLogo: "🌱",
      description: campaignData.description || "Community afforestation program.",
      mission: campaignData.mission || "Restore ecological balance and increase canopy density.",
      coverImage: campaignData.coverImage || ASSETS.hero,
      city: campaignData.city || "Karachi",
      area: campaignData.area || "City Metropolitan Zone",
      targetTrees: Number(campaignData.targetTrees) || 5000,
      sponsoredTrees: 0,
      plantedTrees: 0,
      verifiedTrees: 0,
      survivingTrees: 0,
      pricePerTree: Number(campaignData.pricePerTree) || 1500,
      startDate: campaignData.startDate || new Date().toISOString().split("T")[0],
      endDate: campaignData.endDate || "2026-12-31",
      status: "active",
      treeSpecies: campaignData.treeSpecies || ["Neem", "Peepal", "Amaltas"],
      featured: false,
    };

    setCampaigns((prev) => [newCamp, ...prev]);
    showToast(`Campaign "${newCamp.name}" published successfully!`);
  };

  const markNotificationAsRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read.");
  };

  const unreadNotifsCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        trees,
        campaigns,
        organizations,
        teams,
        certificates,
        badges,
        notifications,
        unreadNotifsCount,
        backendStatus,
        backendInfo,
        pingBackend,
        sponsorTree,
        verifyPlantation,
        submitPlantationProof,
        submitGrowthUpdate,
        createCampaign,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        currentPath,
        navigate,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-xl transition-all duration-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
