-- ====================================================================
-- TreeMint - Digital Tree Sponsorship & Verification Platform
-- MySQL 8.0+ Production Database Schema
-- ====================================================================

CREATE DATABASE IF NOT EXISTS `treemint` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `treemint`;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. USERS TABLE
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(30) NULL,
  `city` VARCHAR(100) NOT NULL DEFAULT 'Karachi',
  `role` ENUM('DONOR', 'ADMIN', 'ORGANIZATION', 'PLANTATION_TEAM', 'SUPER_ADMIN') NOT NULL DEFAULT 'DONOR',
  `avatar_url` VARCHAR(500) NULL,
  `status` ENUM('active', 'suspended', 'pending', 'deleted') NOT NULL DEFAULT 'active',
  `green_points` INT UNSIGNED NOT NULL DEFAULT 0,
  `email_verified_at` DATETIME NULL,
  `last_login_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_uuid` (`uuid`),
  UNIQUE KEY `idx_users_email` (`email`),
  KEY `idx_users_role` (`role`),
  KEY `idx_users_status` (`status`),
  KEY `idx_users_city` (`city`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. ORGANIZATIONS TABLE
DROP TABLE IF EXISTS `organizations`;
CREATE TABLE `organizations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(200) NOT NULL,
  `type` ENUM('GOVERNMENT', 'NGO', 'CORPORATE', 'EDUCATIONAL', 'COMMUNITY') NOT NULL DEFAULT 'NGO',
  `description` TEXT NULL,
  `logo_url` VARCHAR(500) NULL,
  `website` VARCHAR(255) NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(30) NULL,
  `address` VARCHAR(255) NULL,
  `city` VARCHAR(100) NOT NULL,
  `verification_status` ENUM('pending', 'verified', 'rejected', 'suspended') NOT NULL DEFAULT 'pending',
  `verified_at` DATETIME NULL,
  `created_by` INT UNSIGNED NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_organizations_uuid` (`uuid`),
  UNIQUE KEY `idx_organizations_slug` (`slug`),
  KEY `idx_organizations_type` (`type`),
  KEY `idx_organizations_status` (`verification_status`),
  KEY `idx_organizations_city` (`city`),
  CONSTRAINT `fk_org_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. ORGANIZATION USERS RELATIONSHIP
DROP TABLE IF EXISTS `organization_users`;
CREATE TABLE `organization_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `organization_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `role` ENUM('OWNER', 'MANAGER', 'STAFF') NOT NULL DEFAULT 'STAFF',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_org_user_unique` (`organization_id`, `user_id`),
  CONSTRAINT `fk_org_user_org` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_org_user_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. TREE SPECIES TABLE
DROP TABLE IF EXISTS `tree_species`;
CREATE TABLE `tree_species` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `scientific_name` VARCHAR(150) NOT NULL,
  `description` TEXT NULL,
  `image_url` VARCHAR(500) NULL,
  `average_growth_rate` VARCHAR(50) NULL DEFAULT 'Fast (60-80cm/yr)',
  `environmental_benefits` TEXT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_species_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. CAMPAIGNS TABLE
DROP TABLE IF EXISTS `campaigns`;
CREATE TABLE `campaigns` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `organization_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `mission` TEXT NULL,
  `cover_image_url` VARCHAR(500) NULL,
  `city` VARCHAR(100) NOT NULL DEFAULT 'Karachi',
  `area` VARCHAR(150) NOT NULL DEFAULT 'Metropolitan Reserve',
  `target_trees` INT UNSIGNED NOT NULL DEFAULT 1000,
  `sponsored_trees` INT UNSIGNED NOT NULL DEFAULT 0,
  `planted_trees` INT UNSIGNED NOT NULL DEFAULT 0,
  `verified_trees` INT UNSIGNED NOT NULL DEFAULT 0,
  `surviving_trees` INT UNSIGNED NOT NULL DEFAULT 0,
  `price_per_tree` DECIMAL(10,2) NOT NULL DEFAULT 1500.00,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `status` ENUM('draft', 'pending_approval', 'active', 'paused', 'completed', 'cancelled') NOT NULL DEFAULT 'pending_approval',
  `created_by` INT UNSIGNED NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_campaigns_uuid` (`uuid`),
  UNIQUE KEY `idx_campaigns_slug` (`slug`),
  KEY `idx_campaigns_org` (`organization_id`),
  KEY `idx_campaigns_status` (`status`),
  KEY `idx_campaigns_city` (`city`),
  CONSTRAINT `fk_campaign_org` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_campaign_creator` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. CAMPAIGN LOCATIONS
DROP TABLE IF EXISTS `campaign_locations`;
CREATE TABLE `campaign_locations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `campaign_id` INT UNSIGNED NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `area` VARCHAR(150) NOT NULL,
  `address` VARCHAR(255) NULL,
  `latitude` DECIMAL(10,8) NOT NULL,
  `longitude` DECIMAL(11,8) NOT NULL,
  `target_trees` INT UNSIGNED NOT NULL DEFAULT 500,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_camp_loc_campaign` (`campaign_id`),
  CONSTRAINT `fk_camp_loc_campaign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. PLANTATION TEAMS
DROP TABLE IF EXISTS `plantation_teams`;
CREATE TABLE `plantation_teams` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `leader_user_id` INT UNSIGNED NULL,
  `city` VARCHAR(100) NOT NULL,
  `area` VARCHAR(150) NOT NULL,
  `contact_phone` VARCHAR(30) NULL,
  `status` ENUM('active', 'field_duty', 'idle', 'suspended') NOT NULL DEFAULT 'active',
  `trees_planted` INT UNSIGNED NOT NULL DEFAULT 0,
  `verification_rate` DECIMAL(5,2) NOT NULL DEFAULT 98.50,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_teams_uuid` (`uuid`),
  KEY `idx_teams_city` (`city`),
  CONSTRAINT `fk_teams_leader` FOREIGN KEY (`leader_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. PLANTATION TEAM MEMBERS
DROP TABLE IF EXISTS `plantation_team_members`;
CREATE TABLE `plantation_team_members` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `team_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_team_member_unique` (`team_id`, `user_id`),
  CONSTRAINT `fk_ptm_team` FOREIGN KEY (`team_id`) REFERENCES `plantation_teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ptm_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. TREES TABLE (CORE LEDGER)
DROP TABLE IF EXISTS `trees`;
CREATE TABLE `trees` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `tree_code` VARCHAR(50) NOT NULL, -- e.g. TREE-KHI-2026-00125
  `donor_id` INT UNSIGNED NOT NULL,
  `campaign_id` INT UNSIGNED NOT NULL,
  `organization_id` INT UNSIGNED NOT NULL,
  `species_id` INT UNSIGNED NOT NULL,
  `campaign_location_id` INT UNSIGNED NULL,
  `plantation_team_id` INT UNSIGNED NULL,
  `city` VARCHAR(100) NOT NULL,
  `area` VARCHAR(150) NOT NULL,
  `address` VARCHAR(255) NULL,
  `latitude` DECIMAL(10,8) NULL,
  `longitude` DECIMAL(11,8) NULL,
  `status` ENUM('sponsored', 'assigned', 'planted', 'verified', 'growing', 'survival_check', 'dead') NOT NULL DEFAULT 'sponsored',
  `verification_status` ENUM('pending', 'verified', 'rejected') NOT NULL DEFAULT 'pending',
  `survival_status` ENUM('unknown', 'healthy', 'at_risk', 'surviving', 'dead') NOT NULL DEFAULT 'unknown',
  `current_height_cm` INT UNSIGNED NULL DEFAULT 20,
  `dedication_message` VARCHAR(255) NULL,
  `sponsored_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `assigned_at` DATETIME NULL,
  `planted_at` DATETIME NULL,
  `verified_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_trees_uuid` (`uuid`),
  UNIQUE KEY `idx_trees_tree_code` (`tree_code`),
  KEY `idx_trees_donor` (`donor_id`),
  KEY `idx_trees_campaign` (`campaign_id`),
  KEY `idx_trees_org` (`organization_id`),
  KEY `idx_trees_team` (`plantation_team_id`),
  KEY `idx_trees_status` (`status`),
  KEY `idx_trees_verif` (`verification_status`),
  KEY `idx_trees_city` (`city`),
  CONSTRAINT `fk_tree_donor` FOREIGN KEY (`donor_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_tree_campaign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_tree_org` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_tree_species` FOREIGN KEY (`species_id`) REFERENCES `tree_species` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_tree_location` FOREIGN KEY (`campaign_location_id`) REFERENCES `campaign_locations` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_tree_team` FOREIGN KEY (`plantation_team_id`) REFERENCES `plantation_teams` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. SPONSORSHIPS TABLE
DROP TABLE IF EXISTS `sponsorships`;
CREATE TABLE `sponsorships` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `tree_id` INT UNSIGNED NOT NULL,
  `campaign_id` INT UNSIGNED NOT NULL,
  `organization_id` INT UNSIGNED NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'PKR',
  `payment_status` ENUM('mock', 'pending', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'paid',
  `payment_reference` VARCHAR(100) NULL,
  `sponsored_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_sponsorships_uuid` (`uuid`),
  KEY `idx_sponsorships_user` (`user_id`),
  KEY `idx_sponsorships_tree` (`tree_id`),
  KEY `idx_sponsorships_campaign` (`campaign_id`),
  CONSTRAINT `fk_spons_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_spons_tree` FOREIGN KEY (`tree_id`) REFERENCES `trees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_spons_camp` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_spons_org` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. TREE ASSIGNMENTS TABLE
DROP TABLE IF EXISTS `tree_assignments`;
CREATE TABLE `tree_assignments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tree_id` INT UNSIGNED NOT NULL,
  `team_id` INT UNSIGNED NOT NULL,
  `assigned_by` INT UNSIGNED NOT NULL,
  `assigned_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_at` DATETIME NULL,
  `status` ENUM('assigned', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'assigned',
  PRIMARY KEY (`id`),
  KEY `idx_ta_tree` (`tree_id`),
  KEY `idx_ta_team` (`team_id`),
  CONSTRAINT `fk_ta_tree` FOREIGN KEY (`tree_id`) REFERENCES `trees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ta_team` FOREIGN KEY (`team_id`) REFERENCES `plantation_teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ta_assigner` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. PLANTATION PROOFS TABLE
DROP TABLE IF EXISTS `plantation_proofs`;
CREATE TABLE `plantation_proofs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tree_id` INT UNSIGNED NOT NULL,
  `submitted_by` INT UNSIGNED NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `plantation_date` DATE NOT NULL,
  `latitude` DECIMAL(10,8) NOT NULL,
  `longitude` DECIMAL(11,8) NOT NULL,
  `soil_condition` VARCHAR(255) NULL,
  `notes` TEXT NULL,
  `status` ENUM('pending', 'approved', 'rejected', 'changes_requested') NOT NULL DEFAULT 'pending',
  `verified_by` INT UNSIGNED NULL,
  `verified_at` DATETIME NULL,
  `rejection_reason` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_proof_tree_unique` (`tree_id`),
  KEY `idx_proof_status` (`status`),
  CONSTRAINT `fk_proof_tree` FOREIGN KEY (`tree_id`) REFERENCES `trees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_proof_submitter` FOREIGN KEY (`submitted_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_proof_verifier` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. TREE GROWTH UPDATES TABLE
DROP TABLE IF EXISTS `tree_growth_updates`;
CREATE TABLE `tree_growth_updates` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `tree_id` INT UNSIGNED NOT NULL,
  `submitted_by` INT UNSIGNED NOT NULL,
  `month_milestone` VARCHAR(50) NOT NULL, -- e.g. "Month 1", "Month 3", "Month 6", "Month 12"
  `update_date` DATE NOT NULL,
  `height_cm` INT UNSIGNED NOT NULL,
  `health_status` ENUM('healthy', 'good', 'at_risk', 'critical', 'dead') NOT NULL DEFAULT 'healthy',
  `image_url` VARCHAR(500) NOT NULL,
  `notes` TEXT NULL,
  `status` ENUM('submitted', 'verified', 'flagged') NOT NULL DEFAULT 'verified',
  `verified_by` INT UNSIGNED NULL,
  `verified_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_growth_uuid` (`uuid`),
  KEY `idx_growth_tree` (`tree_id`),
  CONSTRAINT `fk_growth_tree` FOREIGN KEY (`tree_id`) REFERENCES `trees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_growth_submitter` FOREIGN KEY (`submitted_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_growth_verifier` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. CERTIFICATES TABLE
DROP TABLE IF EXISTS `certificates`;
CREATE TABLE `certificates` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `certificate_number` VARCHAR(50) NOT NULL, -- e.g. CERT-2026-000125
  `tree_id` INT UNSIGNED NOT NULL,
  `donor_id` INT UNSIGNED NOT NULL,
  `campaign_id` INT UNSIGNED NOT NULL,
  `organization_id` INT UNSIGNED NOT NULL,
  `verification_hash` VARCHAR(128) NOT NULL,
  `qr_code_url` VARCHAR(500) NULL,
  `issued_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('active', 'revoked') NOT NULL DEFAULT 'active',
  `certificate_url` VARCHAR(500) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_cert_uuid` (`uuid`),
  UNIQUE KEY `idx_cert_number` (`certificate_number`),
  UNIQUE KEY `idx_cert_tree` (`tree_id`),
  KEY `idx_cert_donor` (`donor_id`),
  CONSTRAINT `fk_cert_tree` FOREIGN KEY (`tree_id`) REFERENCES `trees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cert_donor` FOREIGN KEY (`donor_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_cert_camp` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_cert_org` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. GREEN POINTS LEDGER
DROP TABLE IF EXISTS `green_points`;
CREATE TABLE `green_points` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `points` INT NOT NULL, -- e.g. +100, +50
  `type` ENUM('TREE_SPONSORED', 'TREE_VERIFIED', 'GROWTH_MILESTONE', 'SURVIVAL_MILESTONE', 'CAMPAIGN_PARTICIPATION', 'REDEEMED') NOT NULL,
  `reference_type` VARCHAR(50) NULL,
  `reference_id` INT UNSIGNED NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_points_user` (`user_id`),
  CONSTRAINT `fk_points_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. BADGES DEFINITIONS TABLE
DROP TABLE IF EXISTS `badges`;
CREATE TABLE `badges` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `icon` VARCHAR(50) NOT NULL DEFAULT '🌱',
  `requirement_type` ENUM('SPONSORED_COUNT', 'VERIFIED_COUNT', 'GROWTH_LOG_COUNT', 'POINTS_EARNED') NOT NULL,
  `requirement_value` INT UNSIGNED NOT NULL,
  `points` INT UNSIGNED NOT NULL DEFAULT 50,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_badges_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. USER BADGES AWARDED TABLE
DROP TABLE IF EXISTS `user_badges`;
CREATE TABLE `user_badges` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `badge_id` INT UNSIGNED NOT NULL,
  `awarded_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_badge_unique` (`user_id`, `badge_id`),
  CONSTRAINT `fk_ub_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ub_badge` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 18. NOTIFICATIONS TABLE
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` CHAR(36) NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `type` ENUM('TREE_PLANTED', 'TREE_VERIFIED', 'GROWTH_UPDATE', 'CERTIFICATE_READY', 'BADGE_EARNED', 'POINTS_EARNED', 'CAMPAIGN_UPDATE', 'SYSTEM') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `data` JSON NULL,
  `read_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_notif_uuid` (`uuid`),
  KEY `idx_notif_user` (`user_id`),
  KEY `idx_notif_read` (`read_at`),
  CONSTRAINT `fk_notif_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 19. AUDIT LOGS TABLE
DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE `audit_logs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NULL,
  `action` VARCHAR(100) NOT NULL,
  `entity_type` VARCHAR(50) NOT NULL,
  `entity_id` INT UNSIGNED NULL,
  `old_values` JSON NULL,
  `new_values` JSON NULL,
  `ip_address` VARCHAR(45) NULL,
  `user_agent` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_audit_user` (`user_id`),
  KEY `idx_audit_action` (`action`),
  KEY `idx_audit_entity` (`entity_type`, `entity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
