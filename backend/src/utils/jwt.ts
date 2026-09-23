import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { JwtPayload } from "../types/index.js";

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, ENV.JWT.ACCESS_SECRET, {
    expiresIn: ENV.JWT.ACCESS_EXPIRES as any,
  });
}

export function signRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, ENV.JWT.REFRESH_SECRET, {
    expiresIn: ENV.JWT.REFRESH_EXPIRES as any,
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, ENV.JWT.ACCESS_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, ENV.JWT.REFRESH_SECRET) as JwtPayload;
}
