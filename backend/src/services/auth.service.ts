import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { UserRole } from "../constants/roles.js";
import { auditRepository } from "../repositories/audit.repository.js";

export class AuthService {
  async register(data: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    city: string;
    ipAddress?: string;
  }) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("A user account with this email address is already registered.");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await userRepository.create({
      fullName: data.fullName,
      email: data.email,
      passwordHash,
      phone: data.phone,
      city: data.city,
      role: UserRole.DONOR, // Public register only allows DONOR
    });

    await auditRepository.log({
      userId: user.id,
      action: "USER_REGISTERED",
      entityType: "USER",
      entityId: user.id,
      ipAddress: data.ipAddress,
    });

    const payload = {
      userId: user.id,
      uuid: user.uuid,
      email: user.email,
      role: user.role,
      fullName: user.full_name,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return {
      user: {
        id: user.id,
        uuid: user.uuid,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        city: user.city,
        greenPoints: user.green_points,
      },
      accessToken,
      refreshToken,
    };
  }

  async login(credentials: { email: string; password: string; ipAddress?: string }) {
    const user = await userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    if (user.status === "suspended") {
      throw new Error("Your account has been suspended. Please contact administrator.");
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password_hash);
    if (!isMatch) {
      throw new Error("Invalid email or password.");
    }

    const payload = {
      userId: user.id,
      uuid: user.uuid,
      email: user.email,
      role: user.role,
      fullName: user.full_name,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await auditRepository.log({
      userId: user.id,
      action: "USER_LOGIN",
      entityType: "USER",
      entityId: user.id,
      ipAddress: credentials.ipAddress,
    });

    return {
      user: {
        id: user.id,
        uuid: user.uuid,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        city: user.city,
        greenPoints: user.green_points,
      },
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    const decoded = verifyRefreshToken(token);
    const user = await userRepository.findById(decoded.userId);
    if (!user || user.status === "suspended") {
      throw new Error("Invalid or expired session. Please sign in again.");
    }

    const payload = {
      userId: user.id,
      uuid: user.uuid,
      email: user.email,
      role: user.role,
      fullName: user.full_name,
    };

    return {
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload),
    };
  }
}

export const authService = new AuthService();
