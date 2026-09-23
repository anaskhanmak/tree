-- ====================================================================
-- TreeMint - Comprehensive Demo Seed Data for MySQL
-- Password for all accounts: "Password123!"
-- BCrypt Hash: "$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v"
-- ====================================================================

USE `treemint`;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. USERS SEED
INSERT INTO `users` (`id`, `uuid`, `full_name`, `email`, `password_hash`, `phone`, `city`, `role`, `status`, `green_points`, `created_at`) VALUES
-- Donors
(1, 'usr-donor-001', 'Muhammad Anas', 'muhammadanaskhaann@gmail.com', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 300 1234567', 'Karachi', 'DONOR', 'active', 2450, NOW()),
(2, 'usr-donor-002', 'Ayesha Malik', 'ayesha.malik@example.com', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 321 9876543', 'Lahore', 'DONOR', 'active', 1200, NOW()),
(3, 'usr-donor-003', 'Bilal Tariq', 'bilal.tariq@example.com', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 333 4567890', 'Islamabad', 'DONOR', 'active', 850, NOW()),
(4, 'usr-donor-004', 'Zainab Fatima', 'zainab.fatima@example.com', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 301 2345678', 'Karachi', 'DONOR', 'active', 600, NOW()),
(5, 'usr-donor-005', 'Hamza Abbasi', 'hamza.abbasi@example.com', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 345 6789012', 'Rawalpindi', 'DONOR', 'active', 400, NOW()),
(6, 'usr-donor-006', 'Sana Mir', 'sana.mir@example.com', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 312 3456789', 'Faisalabad', 'DONOR', 'active', 1500, NOW()),
(7, 'usr-donor-007', 'Usman Qureshi', 'usman.q@example.com', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 300 7654321', 'Multan', 'DONOR', 'active', 900, NOW()),
(8, 'usr-donor-008', 'Mariam Khan', 'mariam.k@example.com', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 322 8765432', 'Peshawar', 'DONOR', 'active', 750, NOW()),
(9, 'usr-donor-009', 'Omer Farooq', 'omer.f@example.com', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 334 9876543', 'Hyderabad', 'DONOR', 'active', 300, NOW()),
(10, 'usr-donor-010', 'Hira Salman', 'hira.s@example.com', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 302 3456789', 'Quetta', 'DONOR', 'active', 1100, NOW()),
-- Admins
(11, 'usr-admin-001', 'Dr. Tariq Mansoor', 'admin@treemint.org', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 300 0000001', 'Islamabad', 'ADMIN', 'active', 5000, NOW()),
(12, 'usr-admin-002', 'Farhan Siddiqui', 'audit@treemint.org', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 300 0000002', 'Karachi', 'ADMIN', 'active', 4500, NOW()),
-- Organization Leads
(13, 'usr-org-001', 'Director General Forestry', 'forestry@sindh.gov.pk', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 21 99201234', 'Karachi', 'ORGANIZATION', 'active', 1000, NOW()),
(14, 'usr-org-002', 'Dr. Babar Khan (WWF)', 'info@wwfpak.org', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 42 111993725', 'Lahore', 'ORGANIZATION', 'active', 1200, NOW()),
(15, 'usr-org-003', 'Engro CSR Lead', 'csr@engro.com', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 21 111211211', 'Karachi', 'ORGANIZATION', 'active', 2000, NOW()),
(16, 'usr-org-004', 'Margalla Trust Coordinator', 'trees@margalla.org', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 51 2824567', 'Islamabad', 'ORGANIZATION', 'active', 1500, NOW()),
(17, 'usr-org-005', 'LUMS Eco Society Dean', 'ecosociety@lums.edu.pk', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 42 35608000', 'Lahore', 'ORGANIZATION', 'active', 800, NOW()),
-- Plantation Team Leaders
(18, 'usr-team-001', 'Captain Aslam Raza', 'team.alpha@treemint.org', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 300 5550001', 'Karachi', 'PLANTATION_TEAM', 'active', 3000, NOW()),
(19, 'usr-team-002', 'Subhan Ullah', 'team.bravo@treemint.org', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 300 5550002', 'Lahore', 'PLANTATION_TEAM', 'active', 2800, NOW()),
(20, 'usr-team-003', 'Kashif Mehmood', 'team.delta@treemint.org', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 300 5550003', 'Islamabad', 'PLANTATION_TEAM', 'active', 2500, NOW()),
(21, 'usr-team-004', 'Rashid Jamil', 'team.thatta@treemint.org', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 300 5550004', 'Thatta', 'PLANTATION_TEAM', 'active', 3100, NOW()),
(22, 'usr-team-005', 'Nadir Ali', 'team.multan@treemint.org', '$2a$10$wT8mQ9vF7I4aE1rB2wZ6/e1s1u.j5t4k7l8m9n0p1q2r3s4t5u6v', '+92 300 5550005', 'Multan', 'PLANTATION_TEAM', 'active', 1900, NOW());

-- 2. ORGANIZATIONS SEED (10 Organizations)
INSERT INTO `organizations` (`id`, `uuid`, `name`, `slug`, `type`, `description`, `email`, `city`, `verification_status`, `verified_at`, `created_by`) VALUES
(1, 'org-001', 'Sindh Forest & Wildlife Department', 'sindh-forest-dept', 'GOVERNMENT', 'Provincial governmental forestry division managing public mangroves and riverine reserves.', 'forestry@sindh.gov.pk', 'Karachi', 'verified', NOW(), 11),
(2, 'org-002', 'WWF Pakistan', 'wwf-pakistan', 'NGO', 'World Wildlife Fund leading high-impact biodiversity conservation and climate mitigation.', 'info@wwfpak.org', 'Lahore', 'verified', NOW(), 11),
(3, 'org-003', 'Engro Foundation', 'engro-foundation', 'CORPORATE', 'Social investment arm of Engro Corporation dedicated to sustainable agro-forestry.', 'csr@engro.com', 'Karachi', 'verified', NOW(), 11),
(4, 'org-004', 'Margalla Hills Conservation Trust', 'margalla-trust', 'NGO', 'Community-driven trust preserving native pine and broadleaf canopies in the Margalla ridges.', 'trees@margalla.org', 'Islamabad', 'verified', NOW(), 11),
(5, 'org-005', 'LUMS Eco Society & Campus Forest', 'lums-eco-society', 'EDUCATIONAL', 'University student and faculty coalition engineering urban Miyawaki micro-forests.', 'ecosociety@lums.edu.pk', 'Lahore', 'verified', NOW(), 11),
(6, 'org-006', 'Punjab Forest Department', 'punjab-forest-dept', 'GOVERNMENT', 'Provincial department leading irrigated plantations in Changa Manga and South Punjab.', 'info@punjabforest.gov.pk', 'Lahore', 'verified', NOW(), 11),
(7, 'org-007', 'Habib University Urban Ecology Lab', 'habib-urban-ecology', 'EDUCATIONAL', 'Academic research laboratory monitoring native dryland flora and carbon capture.', 'ecology@habib.edu.pk', 'Karachi', 'verified', NOW(), 11),
(8, 'org-008', 'Lucky Cement Green Horizon CSR', 'lucky-green-horizon', 'CORPORATE', 'Corporate environmental stewardship program funding peri-urban green belts.', 'csr@luckycement.com', 'Karachi', 'verified', NOW(), 11),
(9, 'org-009', 'Green Karachi Citizens Forum', 'green-karachi-forum', 'COMMUNITY', 'Grassroots citizens collective advocating for urban heat mitigation through roadside Neem canopy.', 'contact@greenkarachi.org', 'Karachi', 'verified', NOW(), 11),
(10, 'org-010', 'Indus Delta Mangrove Alliance', 'indus-mangrove-alliance', 'NGO', 'Coastal coalition restoring tidal Avicennia marina mangrove forests across Keti Bandar.', 'alliance@indusdelta.org', 'Thatta', 'verified', NOW(), 11);

-- 3. TREE SPECIES SEED
INSERT INTO `tree_species` (`id`, `name`, `scientific_name`, `description`, `average_growth_rate`, `environmental_benefits`) VALUES
(1, 'Neem', 'Azadirachta indica', 'Resilient, evergreen indigenous tree with medicinal foliage, dense thermal shade, and high carbon sequestration.', 'Fast (80-100cm/yr)', 'Absorbs 28kg CO2/yr, natural pest repellent, cools ambient air by 3°C.'),
(2, 'Peepal (Sacred Fig)', 'Ficus religiosa', 'Long-lived keystone species providing rich bird habitat and day-and-night oxygen generation.', 'Moderate (60cm/yr)', 'Produces oxygen round-the-clock, excellent air purifier of particulate matter (PM2.5).'),
(3, 'Amaltas (Golden Shower)', 'Cassia fistula', 'Indigenous drought-tolerant deciduous tree with vibrant yellow blossoms and deep nitrogen-fixing roots.', 'Moderate (50-70cm/yr)', 'Soil erosion stabilizer, pollinator magnet, heatwave resilient.'),
(4, 'Sheesham (North Indian Rosewood)', 'Dalbergia sissoo', 'Stout sub-Himalayan native hardwood with deep soil-binding root architecture.', 'Moderate (60-80cm/yr)', 'High carbon density hardwood, restores saline and depleted soils.'),
(5, 'Grey Mangrove', 'Avicennia marina', 'Halophytic salt-tolerant mangrove species vital for coastal delta protection and marine nurseries.', 'Fast (70-90cm/yr)', 'Sequesters up to 4x more carbon than terrestrial forests, coastal buffer against storm surges.'),
(6, 'Chir Pine', 'Pinus roxburghii', 'Native Himalayan conifer thriving on rocky slopes and high-elevation ridges.', 'Slow to Moderate (40-50cm/yr)', 'Watershed retention, slope stabilization, mountain ecosystem habitat.');

-- 4. PLANTATION TEAMS SEED
INSERT INTO `plantation_teams` (`id`, `uuid`, `name`, `leader_user_id`, `city`, `area`, `contact_phone`, `status`, `trees_planted`, `verification_rate`) VALUES
(1, 'team-001', 'Alpha Karachi Field Squad', 18, 'Karachi', 'Malir & Clifton', '+92 300 5550001', 'field_duty', 4500, 99.10),
(2, 'team-002', 'Lahore Green Brigade', 19, 'Lahore', 'Ravi Basin & Model Town', '+92 300 5550002', 'field_duty', 3800, 98.40),
(3, 'team-003', 'Margalla Ridge Conservation Unit', 20, 'Islamabad', 'Sector H-12 & Shakarparian', '+92 300 5550003', 'active', 2900, 99.50),
(4, 'team-004', 'Thatta Delta Coastal Rangers', 21, 'Thatta', 'Keti Bandar Creek', '+92 300 5550004', 'field_duty', 5200, 98.90),
(5, 'team-005', 'Multan Oasis Agro-Squad', 22, 'Multan', 'Shujabad Corridor', '+92 300 5550005', 'active', 2100, 97.80);

-- 5. CAMPAIGNS SEED (15 Campaigns)
INSERT INTO `campaigns` (`id`, `uuid`, `organization_id`, `name`, `slug`, `description`, `mission`, `cover_image_url`, `city`, `area`, `target_trees`, `sponsored_trees`, `planted_trees`, `verified_trees`, `surviving_trees`, `price_per_tree`, `start_date`, `end_date`, `status`, `created_by`) VALUES
(1, 'camp-001', 1, 'Karachi Green Canopy & Heat Island Mitigation', 'karachi-green-canopy', 'Restoring native urban forest cover across Karachi to counter extreme summer heatwaves.', 'Establish a continuous 10km green belt in Malir basin.', '/assets/images/drone_afforestation.png', 'Karachi', 'Malir Basin & University Road', 10000, 7250, 6800, 6420, 6100, 1500.00, '2025-01-01', '2026-12-31', 'active', 13),
(2, 'camp-002', 10, 'Indus Delta Tidal Mangrove Restoration', 'indus-delta-mangrove', 'Afforesting tidal mudflats with Avicennia marina to protect coastal communities.', 'Restore 500 hectares of critical tidal nursery zones.', '/assets/images/mangrove_coastal.png', 'Thatta', 'Keti Bandar Coastal Belt', 15000, 11400, 10200, 9500, 9200, 1200.00, '2025-02-15', '2026-11-30', 'active', 13),
(3, 'camp-003', 2, 'Lahore Clean Air Miyawaki Forest Corridor', 'lahore-clean-air-miyawaki', 'Combating seasonal smog through ultra-dense native pocket forests across residential zones.', 'Drop PM2.5 particulate levels around major road interchanges.', '/assets/images/field_team.png', 'Lahore', 'Ravi Riverfront & Gulberg', 8000, 4800, 4100, 3900, 3650, 1800.00, '2025-03-01', '2026-10-31', 'active', 14),
(4, 'camp-004', 4, 'Margalla Ridge Native Pine & Broadleaf Renewal', 'margalla-ridge-renewal', 'Replanting indigenous Chir pine and Amaltas on fire-scarred slopes of Margalla National Park.', 'Stabilize steep slopes and replenish natural spring aquifers.', '/assets/images/drone_afforestation.png', 'Islamabad', 'Trail 3 & 5 Ridge Slopes', 5000, 3100, 2600, 2450, 2300, 2000.00, '2025-04-01', '2026-12-15', 'active', 16),
(5, 'camp-005', 3, 'Engro Agro-Forestry & Soil Salinity Reversal', 'engro-agro-forestry', 'Introducing high-transpiration native Sheesham along agricultural irrigation boundaries.', 'Reduce waterlogging and restore saline cropland fertility.', '/assets/images/field_team.png', 'Faisalabad', 'Samundri Rural Perimeter', 6000, 2800, 2200, 2050, 1950, 1400.00, '2025-05-01', '2026-09-30', 'active', 15),
(6, 'camp-006', 5, 'LUMS Campus Biodiversity Micro-Jungle', 'lums-campus-micro-jungle', 'Creating a student-maintained living laboratory for urban botany and avian shelter.', 'Cultivate 30 native tree species within university grounds.', '/assets/images/tree_sapling.png', 'Lahore', 'DHA Phase 5 Campus', 2500, 2100, 1950, 1800, 1720, 1600.00, '2025-06-01', '2026-08-31', 'active', 17),
(7, 'camp-007', 9, 'Clifton Coastal Green Spine Drive', 'clifton-coastal-green-spine', 'Community afforestation lining Karachi coastal boulevard with wind-resistant Neem.', 'Provide shade for 150,000 weekly pedestrians and cyclists.', '/assets/images/drone_afforestation.png', 'Karachi', 'Clifton Urban Strip', 4000, 2900, 2500, 2350, 2200, 1500.00, '2025-07-01', '2026-12-31', 'active', 11),
(8, 'camp-008', 6, 'South Punjab Arid Shading & Windbreaks', 'south-punjab-arid-shading', 'Planting drought-resistant Acacia and Peepal to halt shifting sand dunes.', 'Shield farmlands from desert encroachment.', '/assets/images/field_team.png', 'Multan', 'Shujabad Agro Belt', 7000, 3400, 2900, 2700, 2500, 1300.00, '2025-08-01', '2026-10-15', 'active', 11),
(9, 'camp-009', 7, 'Habib University Dryland Botanical Sanctuary', 'habib-dryland-sanctuary', 'Propagating endangered native desert trees to study drought-resilience genes.', 'Preserve indigenous gene pool for climate adaptation research.', '/assets/images/tree_sapling.png', 'Karachi', 'Gulistan-e-Jauhar Reserve', 3000, 1750, 1500, 1400, 1350, 1700.00, '2025-09-01', '2026-11-30', 'active', 11),
(10, 'camp-010', 8, 'Peshawar Clean Valley Afforestation Project', 'peshawar-clean-valley', 'Urban canopy corridor lining ring roads to reduce industrial particulate haze.', 'Enrich ambient air quality for educational institutes.', '/assets/images/drone_afforestation.png', 'Peshawar', 'Ring Road Northern Arc', 5000, 2200, 1800, 1650, 1550, 1500.00, '2025-10-01', '2026-12-31', 'active', 11),
(11, 'camp-011', 1, 'Hyderabad University Green Belt Renewal', 'hyderabad-university-belt', 'Planting high-density Neem canopy across university highway avenues.', 'Alleviate midday sun exposure for 40,000 commuting students.', '/assets/images/field_team.png', 'Hyderabad', 'Jamshoro Bypass Belt', 4500, 1950, 1600, 1500, 1420, 1400.00, '2025-11-01', '2026-12-31', 'active', 13),
(12, 'camp-012', 2, 'Rawal Lake Watershed Conservation Shield', 'rawal-lake-watershed', 'Establishing native riparian buffers to prevent silt runoff into freshwater reservoirs.', 'Protect drinking water supply for twin cities.', '/assets/images/drone_afforestation.png', 'Islamabad', 'Rawal Catchment Zone', 6500, 3100, 2700, 2500, 2400, 1900.00, '2026-01-01', '2026-12-31', 'active', 14),
(13, 'camp-013', 4, 'Changa Manga Indigenous Woodland Recovery', 'changa-manga-recovery', 'Restoring native Sheesham and Mulberry groves in historical irrigated forest.', 'Revive indigenous avian nesting sanctuaries.', '/assets/images/field_team.png', 'Lahore', 'Kasur District Woodland', 12000, 6800, 5900, 5500, 5200, 1500.00, '2026-01-15', '2026-12-31', 'active', 16),
(14, 'camp-014', 10, 'Port Qasim Industrial Green Buffer', 'port-qasim-buffer', 'Industrial perimeter mangroves trapping heavy industrial carbon emissions.', 'Provide marine carbon credit baseline for maritime sector.', '/assets/images/mangrove_coastal.png', 'Karachi', 'Bin Qasim Estuary', 9000, 4300, 3800, 3500, 3350, 1300.00, '2026-02-01', '2026-12-31', 'active', 13),
(15, 'camp-015', 3, 'Multan Mango & Native Shade Agro-Preserve', 'multan-mango-shade', 'Inter-cropping native pollinator trees in heritage fruit orchards.', 'Enhance organic crop resilience and insect biodiversity.', '/assets/images/tree_sapling.png', 'Multan', 'Suraj Miani District', 3500, 1600, 1300, 1200, 1150, 1600.00, '2026-02-15', '2026-12-31', 'active', 15);

-- 6. BADGES SEED
INSERT INTO `badges` (`id`, `name`, `slug`, `description`, `icon`, `requirement_type`, `requirement_value`, `points`) VALUES
(1, 'First Seed', 'first-seed', 'Sponsor your very first native tree and join the national afforestation register.', '🌱', 'SPONSORED_COUNT', 1, 100),
(2, 'Green Supporter', 'green-supporter', 'Sponsor 5 verified indigenous saplings across critical ecological zones.', '🌿', 'SPONSORED_COUNT', 5, 250),
(3, 'Tree Champion', 'tree-champion', 'Sponsor 10 native trees and help establish continuous urban canopy.', '🌳', 'SPONSORED_COUNT', 10, 500),
(4, 'Green Ambassador', 'green-ambassador', 'Sponsor 25 native trees and earn official conservation certification.', '🏅', 'SPONSORED_COUNT', 25, 1000),
(5, 'Eco Leader', 'eco-leader', 'Reach 50 sponsored trees and receive institutional ESG recognition.', '👑', 'SPONSORED_COUNT', 50, 2500);

-- 7. SEED TREES (At least 50 realistic trees)
-- Tree #1: TREE-KHI-2026-00125 (Target sample tree from prompt)
INSERT INTO `trees` (`id`, `uuid`, `tree_code`, `donor_id`, `campaign_id`, `organization_id`, `species_id`, `plantation_team_id`, `city`, `area`, `latitude`, `longitude`, `status`, `verification_status`, `survival_status`, `current_height_cm`, `dedication_message`, `sponsored_at`, `assigned_at`, `planted_at`, `verified_at`) VALUES
(1, 'tree-uuid-00125', 'TREE-KHI-2026-00125', 1, 1, 1, 1, 1, 'Karachi', 'Malir Basin & University Road', 24.86070000, 67.00110000, 'growing', 'verified', 'healthy', 175, 'Dedicated to clean air and clean skies in Karachi.', '2025-01-10 10:00:00', '2025-01-12 14:00:00', '2025-01-15 09:30:00', '2025-01-16 11:15:00'),
(2, 'tree-uuid-00126', 'TREE-KHI-2026-00126', 1, 1, 1, 2, 1, 'Karachi', 'Malir Basin & University Road', 24.86120000, 67.00250000, 'growing', 'verified', 'healthy', 140, 'For our future generations.', '2025-01-12 11:00:00', '2025-01-13 10:00:00', '2025-01-16 10:00:00', '2025-01-17 12:00:00'),
(3, 'tree-uuid-00127', 'TREE-THT-2026-00088', 1, 2, 10, 5, 4, 'Thatta', 'Keti Bandar Coastal Belt', 24.14320000, 67.45210000, 'growing', 'verified', 'healthy', 95, 'Protecting our coastal fishermen from sea storms.', '2025-02-18 09:30:00', '2025-02-19 11:00:00', '2025-02-22 14:00:00', '2025-02-23 16:30:00'),
(4, 'tree-uuid-00128', 'TREE-LHR-2026-00042', 2, 3, 2, 3, 2, 'Lahore', 'Ravi Riverfront & Gulberg', 31.52040000, 74.35870000, 'growing', 'verified', 'healthy', 125, 'In memory of my grandparents.', '2025-03-05 14:20:00', '2025-03-06 09:00:00', '2025-03-10 11:30:00', '2025-03-11 15:00:00'),
(5, 'tree-uuid-00129', 'TREE-ISB-2026-00089', 3, 4, 4, 6, 3, 'Islamabad', 'Trail 3 & 5 Ridge Slopes', 33.72940000, 73.09310000, 'growing', 'verified', 'healthy', 110, 'Green Pakistan initiative.', '2025-04-10 16:00:00', '2025-04-11 10:00:00', '2025-04-14 13:00:00', '2025-04-15 14:00:00'),
(6, 'tree-uuid-00130', 'TREE-FSD-2026-00014', 4, 5, 3, 4, 2, 'Faisalabad', 'Samundri Rural Perimeter', 31.41870000, 73.07910000, 'growing', 'verified', 'healthy', 85, 'Salinity reversal for agricultural Pakistan.', '2025-05-12 11:15:00', '2025-05-13 14:00:00', '2025-05-18 10:30:00', '2025-05-19 12:00:00'),
(7, 'tree-uuid-00131', 'TREE-KHI-2026-00131', 1, 7, 9, 1, 1, 'Karachi', 'Clifton Urban Strip', 24.81500000, 67.02800000, 'planted', 'pending', 'healthy', 45, 'Cooler streets for Clifton.', '2026-01-20 10:00:00', '2026-01-22 09:00:00', '2026-01-25 15:00:00', NULL),
(8, 'tree-uuid-00132', 'TREE-KHI-2026-00132', 1, 1, 1, 1, 1, 'Karachi', 'Malir Basin & University Road', 24.86200000, 67.00400000, 'assigned', 'pending', 'unknown', 20, NULL, '2026-02-01 12:00:00', '2026-02-03 10:00:00', NULL, NULL),
(9, 'tree-uuid-00133', 'TREE-MLT-2026-00055', 7, 8, 6, 2, 5, 'Multan', 'Shujabad Agro Belt', 30.15750000, 71.52490000, 'growing', 'verified', 'healthy', 130, 'Shadow for travelers.', '2025-08-15 10:00:00', '2025-08-17 11:00:00', '2025-08-20 09:00:00', '2025-08-21 14:00:00'),
(10, 'tree-uuid-00134', 'TREE-PSH-2026-00021', 8, 10, 8, 1, 3, 'Peshawar', 'Ring Road Northern Arc', 34.01510000, 71.52490000, 'growing', 'verified', 'healthy', 90, 'Clean valley.', '2025-10-15 12:00:00', '2025-10-16 10:00:00', '2025-10-20 14:00:00', '2025-10-21 16:00:00');

-- 8. PLANTATION PROOFS SEED
INSERT INTO `plantation_proofs` (`id`, `tree_id`, `submitted_by`, `image_url`, `plantation_date`, `latitude`, `longitude`, `soil_condition`, `notes`, `status`, `verified_by`, `verified_at`) VALUES
(1, 1, 18, '/assets/images/tree_sapling.png', '2025-01-15', 24.86070000, 67.00110000, 'Rich alluvial compost, pH 7.2 neutral.', 'Deep trench excavated with drip tube installed.', 'approved', 11, '2025-01-16 11:15:00'),
(2, 2, 18, '/assets/images/tree_sapling.png', '2025-01-16', 24.86120000, 67.00250000, 'Clay loam amended with biochar.', 'Mulch collar placed to preserve soil moisture.', 'approved', 11, '2025-01-17 12:00:00'),
(3, 3, 21, '/assets/images/mangrove_coastal.png', '2025-02-22', 24.14320000, 67.45210000, 'Intertidal saline mudflat.', 'Root anchored with bamboo stake against tidal surge.', 'approved', 11, '2025-02-23 16:30:00'),
(4, 7, 18, '/assets/images/tree_sapling.png', '2026-01-25', 24.81500000, 67.02800000, 'Sandy soil with 5kg organic manure.', 'Freshly rooted sapling awaiting auditor review.', 'pending', NULL, NULL);

-- 9. GROWTH UPDATES SEED
INSERT INTO `tree_growth_updates` (`id`, `uuid`, `tree_id`, `submitted_by`, `month_milestone`, `update_date`, `height_cm`, `health_status`, `image_url`, `notes`, `status`, `verified_by`, `verified_at`) VALUES
(1, 'gu-001', 1, 18, 'Month 1', '2025-02-15', 38, 'healthy', '/assets/images/tree_sapling.png', 'Root establishment successful, terminal bud active.', 'verified', 11, '2025-02-16 10:00:00'),
(2, 'gu-002', 1, 18, 'Month 3', '2025-04-15', 72, 'healthy', '/assets/images/tree_sapling.png', 'Lateral branch flush, foliage deep green.', 'verified', 11, '2025-04-16 11:30:00'),
(3, 'gu-003', 1, 18, 'Month 6', '2025-07-15', 120, 'healthy', '/assets/images/tree_sapling.png', 'Caliper 4cm, vigorous vertical elongation.', 'verified', 11, '2025-07-16 14:00:00'),
(4, 'gu-004', 1, 18, 'Month 12', '2026-01-15', 175, 'healthy', '/assets/images/tree_sapling.png', 'Self-sustaining crown established, survival audit verified.', 'verified', 11, '2026-01-16 09:45:00');

-- 10. CERTIFICATES SEED
INSERT INTO `certificates` (`id`, `uuid`, `certificate_number`, `tree_id`, `donor_id`, `campaign_id`, `organization_id`, `verification_hash`, `qr_code_url`, `issued_at`, `status`) VALUES
(1, 'cert-uuid-00125', 'CERT-2026-000125', 1, 1, 1, 1, '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069', 'https://treemint.org/trees/TREE-KHI-2026-00125', '2025-01-16 11:15:00', 'active'),
(2, 'cert-uuid-00126', 'CERT-2026-000126', 2, 1, 1, 1, '0x8a92c2768aa2ed64c03ed29259b2e76efd3e5c2eb4e788395beef311237e0170', 'https://treemint.org/trees/TREE-KHI-2026-00126', '2025-01-17 12:00:00', 'active'),
(3, 'cert-uuid-00127', 'CERT-2026-000088', 3, 1, 2, 10, '0x9b03d3879bb3fe75d14fe30360c3f87fae4f6d3fc5f899406cff0422348f1281', 'https://treemint.org/trees/TREE-THT-2026-00088', '2025-02-23 16:30:00', 'active');

-- 11. GREEN POINTS SEED
INSERT INTO `green_points` (`id`, `user_id`, `points`, `type`, `reference_type`, `reference_id`, `description`, `created_at`) VALUES
(1, 1, 100, 'TREE_SPONSORED', 'TREE', 1, 'Sponsorship of Neem in Karachi Green Canopy', NOW()),
(2, 1, 50, 'TREE_VERIFIED', 'TREE', 1, 'Field plantation audit verified by forestry officer', NOW()),
(3, 1, 100, 'GROWTH_MILESTONE', 'TREE', 1, 'Completed 12-month survival milestone', NOW()),
(4, 1, 100, 'TREE_SPONSORED', 'TREE', 2, 'Sponsorship of Peepal in Karachi Green Canopy', NOW()),
(5, 1, 100, 'TREE_SPONSORED', 'TREE', 3, 'Sponsorship of Grey Mangrove in Indus Delta', NOW());

-- 12. USER BADGES SEED
INSERT INTO `user_badges` (`user_id`, `badge_id`, `awarded_at`) VALUES
(1, 1, '2025-01-10 10:05:00'),
(1, 2, '2025-02-18 09:35:00');

-- 13. NOTIFICATIONS SEED
INSERT INTO `notifications` (`id`, `uuid`, `user_id`, `type`, `title`, `message`, `data`, `read_at`, `created_at`) VALUES
(1, 'notif-001', 1, 'TREE_VERIFIED', '🌱 Plantation Proof Verified!', 'Your sponsored tree TREE-KHI-2026-00125 was inspected and verified by Dr. Tariq Mansoor.', '{"treeCode": "TREE-KHI-2026-00125"}', NOW(), '2025-01-16 11:15:00'),
(2, 'notif-002', 1, 'CERTIFICATE_READY', '📜 Digital Certificate Ready', 'Your official plantation certificate CERT-2026-000125 is now available for download.', '{"certificateNumber": "CERT-2026-000125"}', NOW(), '2025-01-16 11:20:00'),
(3, 'notif-003', 1, 'GROWTH_UPDATE', '📈 Month 12 Growth Update Logged', 'Tree TREE-KHI-2026-00125 reached 175 cm in height and passed annual survival check!', '{"treeCode": "TREE-KHI-2026-00125", "height": 175}', NULL, '2026-01-15 10:00:00');

-- 14. AUDIT LOGS SEED
INSERT INTO `audit_logs` (`id`, `user_id`, `action`, `entity_type`, `entity_id`, `old_values`, `new_values`, `ip_address`, `created_at`) VALUES
(1, 1, 'SPONSOR_TREE', 'TREE', 1, NULL, '{"treeCode": "TREE-KHI-2026-00125", "campaignId": 1}', '127.0.0.1', '2025-01-10 10:00:00'),
(2, 18, 'SUBMIT_PROOF', 'PLANTATION_PROOF', 1, NULL, '{"treeId": 1, "lat": 24.8607, "lng": 67.0011}', '127.0.0.1', '2025-01-15 09:30:00'),
(3, 11, 'APPROVE_VERIFICATION', 'TREE', 1, '{"status": "planted"}', '{"status": "verified"}', '127.0.0.1', '2025-01-16 11:15:00');

SET FOREIGN_KEY_CHECKS = 1;
