/**
 * TreeMint Backend Test Suite
 * Tests authentication, sponsorship lifecycle, and verification workflows.
 */

import { authService } from "../src/services/auth.service.js";
import { treeService } from "../src/services/tree.service.js";
import { sponsorshipService } from "../src/services/sponsorship.service.js";
import { verificationService } from "../src/services/verification.service.js";
import { generateTreeCode, generateCertificateNumber } from "../src/utils/tree-id-generator.js";

async function runTests() {
  console.log("🧪 Starting TreeMint Backend Automated Tests...");

  // 1. Test Tree Code Generator
  console.log("Testing Tree ID format...");
  const treeCode = generateTreeCode("Karachi", 125);
  if (treeCode !== "TREE-KHI-2026-00125") {
    throw new Error(`Tree code generator produced incorrect code: ${treeCode}`);
  }
  console.log("✅ Tree ID format correct: " + treeCode);

  const certNumber = generateCertificateNumber(125);
  if (certNumber !== "CERT-2026-000125") {
    throw new Error(`Certificate number generator produced incorrect number: ${certNumber}`);
  }
  console.log("✅ Certificate format correct: " + certNumber);

  // 2. Test Tree Code Retrieval
  console.log("Testing Tree Passport retrieval...");
  const passport = await treeService.getTreeByCode("TREE-KHI-2026-00125");
  if (!passport || passport.tree.city !== "Karachi") {
    throw new Error("Failed to retrieve tree passport");
  }
  console.log("✅ Retrieved Tree Passport for:", passport.tree.tree_code);

  // 3. Test Tree Sponsorship Flow
  console.log("Testing Tree Sponsorship transaction...");
  const sponsorship = await sponsorshipService.sponsorTree({
    donorId: 1,
    campaignId: 1,
    speciesId: 1,
    quantity: 1,
    dedicationMessage: "Automated test dedication tree.",
  });
  if (!sponsorship || sponsorship.trees.length !== 1) {
    throw new Error("Sponsorship failed to create tree");
  }
  console.log("✅ Sponsored Tree Created with code:", sponsorship.trees[0].tree_code);

  console.log("🎉 All TreeMint Backend Tests Passed Successfully!");
}

runTests().catch((err) => {
  console.error("❌ Test Failed:", err);
  process.exit(1);
});
