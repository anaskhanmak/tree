import path from "path";
import fs from "fs";
import { ENV } from "../config/env.js";

export class StorageService {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.resolve(process.cwd(), ENV.STORAGE.UPLOAD_DIR);
    if (!fs.existsSync(this.uploadDir)) {
      try {
        fs.mkdirSync(this.uploadDir, { recursive: true });
      } catch {
        // Safe check
      }
    }
  }

  public getPublicUrl(filename: string): string {
    return `/uploads/${filename}`;
  }

  public deleteFile(filename: string): boolean {
    const filePath = path.join(this.uploadDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  }
}

export const storageService = new StorageService();
