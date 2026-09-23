import { ENV } from "../config/env.js";
import { logger } from "../utils/logger.js";

export class EmailService {
  async sendEmail(to: string, subject: string, body: string) {
    // In local dev/demo mode, log email output cleanly to console
    logger.info(`📧 [Email Simulation] To: ${to} | Subject: "${subject}"`);
    return true;
  }

  async sendWelcomeEmail(to: string, name: string) {
    return this.sendEmail(
      to,
      "Welcome to TreeMint - Sponsor. Plant. Grow.",
      `Hello ${name},\n\nThank you for joining TreeMint. You are now registered to sponsor verified native trees across Pakistan.`
    );
  }

  async sendVerificationApprovedEmail(to: string, treeCode: string, certNumber: string) {
    return this.sendEmail(
      to,
      `✅ Plantation Verified: ${treeCode}`,
      `Your sponsored tree ${treeCode} has been verified by forestry auditors. Certificate ${certNumber} is now ready.`
    );
  }
}

export const emailService = new EmailService();
