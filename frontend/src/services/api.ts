/**
 * TreeMint Frontend API Client
 * Connects the React UI to the Express + MySQL REST API (port 5001)
 */

export interface ApiResponseEnvelope<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
  meta?: any;
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api/v1";

class ApiClient {
  private token: string | null = null;
  public isConnected: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("treemint_token");
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("treemint_token", token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("treemint_token");
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponseEnvelope<T>> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const json = await res.json();
      if (!res.ok) {
        throw new Error(
          json.message || `Request failed with status ${res.status}`,
        );
      }
      this.isConnected = true;
      return json;
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (
        err.name === "AbortError" ||
        err.message?.includes("Failed to fetch") ||
        err.message?.includes("NetworkError")
      ) {
        this.isConnected = false;
      }
      throw err;
    }
  }

  // Health check
  async checkHealth(): Promise<{
    status: string;
    message?: string;
    database?: any;
    engine?: string;
  } | null> {
    try {
      const res = await this.request<any>("/health");
      this.isConnected = Boolean(res?.success);
      if (!res?.success) return null;

      return {
        status: "healthy",
        message: res.message || "TreeMint API is running healthy.",
        database: res.database || {
          engine: res.service || "MySQL / Simulation",
        },
        engine: res.service || "MySQL / Simulation",
      };
    } catch (err) {
      this.isConnected = false;
      return null;
    }
  }

  // Authentication
  async login(credentials: { email: string; password: string }) {
    const res = await this.request<{ user: any; accessToken: string }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(credentials),
      },
    );
    if (res.data?.accessToken) {
      this.setToken(res.data.accessToken);
    }
    return res;
  }

  async register(data: {
    fullName: string;
    email: string;
    password: string;
    city: string;
    phone?: string;
    role?: string;
  }) {
    const res = await this.request<{ user: any; accessToken: string }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
    if (res.data?.accessToken) {
      this.setToken(res.data.accessToken);
    }
    return res;
  }

  async getMe() {
    return this.request("/auth/me");
  }

  // Campaigns
  async getCampaigns(params?: Record<string, string>) {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return this.request<any[]>(`/campaigns${query}`);
  }

  async getCampaignBySlug(slug: string) {
    return this.request<any>(`/campaigns/${slug}`);
  }

  async createCampaign(data: any) {
    return this.request<any>("/campaigns", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Trees & Passport
  async getTrees(params?: Record<string, string>) {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return this.request<any[]>(`/trees${query}`);
  }

  async getTreeByCode(treeCode: string) {
    return this.request<any>(`/trees/${treeCode}`);
  }

  async getTreeTimeline(treeCode: string) {
    return this.request<any[]>(`/trees/${treeCode}/timeline`);
  }

  // Sponsorship (Transactions)
  async sponsorTree(data: {
    campaignId: number | string;
    speciesId?: number | string;
    quantity: number;
    dedicationMessage?: string;
  }) {
    return this.request<{
      trees: any[];
      sponsorships: any[];
      totalAmount: number;
      greenPointsEarned: number;
    }>("/dashboard/sponsor", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Donor Dashboard Data
  async getDonorDashboard() {
    return this.request("/dashboard/donor");
  }

  // Admin Verification
  async getVerificationQueue() {
    return this.request<any[]>("/admin/verification");
  }

  async approveProof(proofId: number | string, notes?: string) {
    return this.request(`/admin/verification/${proofId}/approve`, {
      method: "PATCH",
      body: JSON.stringify({ notes }),
    });
  }

  async rejectProof(proofId: number | string, reason: string) {
    return this.request(`/admin/verification/${proofId}/reject`, {
      method: "PATCH",
      body: JSON.stringify({ reason }),
    });
  }

  // Field Team Proof Submission
  async submitPlantationProof(data: {
    treeId: number | string;
    latitude: number;
    longitude: number;
    locationName: string;
    soilCondition?: string;
    notes?: string;
    proofPhotos: string[];
  }) {
    return this.request("/team/proofs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async submitGrowthUpdate(data: {
    treeId: number | string;
    monthMilestone: string;
    heightCm: number;
    healthStatus: string;
    imageUrl?: string;
    notes?: string;
  }) {
    return this.request("/team/growth", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Certificates
  async getCertificate(certificateNumber: string) {
    return this.request(`/certificates/${certificateNumber}`);
  }
}

export const api = new ApiClient();
