export interface WasteStream {
  id: string;
  name: string;
  shortLabel: string;
  colorHex: string;
  accentBg: string;
  items: string;
  dispatchWindow: string;
  shredderSpec: string;
  sanitization: string;
  destination: string;
  safetyNote: string;
}

export interface InnovationPillar {
  id: string;
  index: string;
  horizon: '2026-2027' | '2028-2029' | '2030-2031';
  horizonLabel: string;
  title: string;
  solvesGap: string;
  description: string;
  impactMetric: string;
  impactDetail: string;
}

export interface CatalogItem {
  id: string;
  sku: string;
  category: 'Core Hardware' | '5-Year Innovation Kits' | 'Software & Maintenance';
  name: string;
  tagline: string;
  priceRM: number;
  unitLabel: string;
  leadTime: string;
  availability: string;
  annualCo2SavingsTonnes: number;
  specs: string[];
  schematicVariant: 'station' | 'optical' | 'solar' | 'biopod' | 'portal' | 'care';
  imageSrc: string;
}

export interface RecoveryStage {
  step: string;
  title: string;
  summary: string;
  output: string;
}

export const WASTE_STREAMS: WasteStream[] = [
  {
    id: 'plastic',
    name: 'Plastic',
    shortLabel: 'Plastic',
    colorHex: '#1D4ED8',
    accentBg: 'bg-blue-700',
    items: 'PET bottles, HDPE containers, clean rigid packaging',
    dispatchWindow: '08:00 Daily Pneumatic Cycle',
    shredderSpec: 'Dual-shaft auto-reverse granulator (18 mm flake)',
    sanitization: 'UV-C chamber pulse + activated carbon airflow',
    destination: 'Baling & Polymer Flake Recovery Line',
    safetyNote: 'Optical sensor flags metal cans or liquid-filled bottles prior to shredding.',
  },
  {
    id: 'glass',
    name: 'Glass',
    shortLabel: 'Glass',
    colorHex: '#15803D',
    accentBg: 'bg-emerald-700',
    items: 'Beverage bottles, food jars, clear & tinted cullet',
    dispatchWindow: '10:00 Daily Pneumatic Cycle',
    shredderSpec: 'Acoustic-damped glass crusher inside soundproofed chamber',
    sanitization: 'UV-C surface sterilization + HEPA dust trap',
    destination: 'Cullet Color-Sort & Remelt Feedstock',
    safetyNote: 'Finger-safe motorized chute closes automatically before crusher engages.',
  },
  {
    id: 'paper',
    name: 'Paper & Cardboard',
    shortLabel: 'Paper',
    colorHex: '#CA8A04',
    accentBg: 'bg-amber-600',
    items: 'Office paper, corrugated cartons, clean kraft packaging',
    dispatchWindow: '12:00 Daily Pneumatic Cycle',
    shredderSpec: 'High-torque cross-cut shredder with jam auto-reverse',
    sanitization: 'Humidity-controlled buffer airlock + fire sensor interlock',
    destination: 'High-Density Baling & Pulp Mill Recycling',
    safetyNote: 'Thermal & spark detection in pipe elbows triggers automatic suppression.',
  },
  {
    id: 'general',
    name: 'General Waste',
    shortLabel: 'General',
    colorHex: '#334155',
    accentBg: 'bg-slate-700',
    items: 'Non-recyclable household wraps, soiled composites',
    dispatchWindow: '14:00 Daily Pneumatic Cycle',
    shredderSpec: 'Heavy-duty volume reduction shredder (4:1 compaction)',
    sanitization: 'Continuous UV-C + dual activated carbon odour scrubbing',
    destination: 'High-Calorific Waste-to-Energy & Engineered Residue',
    safetyNote: 'Contamination detector alerts resident app if recyclable volume exceeds 40%.',
  },
  {
    id: 'organic',
    name: 'Organic Food Waste',
    shortLabel: 'Organic',
    colorHex: '#92400E',
    accentBg: 'bg-amber-800',
    items: 'Kitchen food scraps, fruit peels, coffee grounds, yard trim',
    dispatchWindow: '16:00 & 22:00 Dual Cycle',
    shredderSpec: 'Wet-macerator auger with self-flushing rim',
    sanitization: 'UV-A fly trap + UV-C microbial control + negative-pressure carbon vent',
    destination: 'Anaerobic Biogas Digester & Agricultural Compost',
    safetyNote: 'Sealed negative-pressure airflow prevents pest entry and surface odour.',
  },
  {
    id: 'metal',
    name: 'Metal & Cans',
    shortLabel: 'Metal',
    colorHex: '#6D28D9',
    accentBg: 'bg-violet-700',
    items: 'Aluminium beverage cans, tin food cans, clean foil trays',
    dispatchWindow: '18:00 Daily Pneumatic Cycle',
    shredderSpec: 'High-shear metal flattener & chip reducer',
    sanitization: 'UV-C cycle + rinse-air purge',
    destination: 'Eddy-Current Separator & Smelter Baling',
    safetyNote: 'Pressurized aerosol cans are rejected at scanner and routed to Hazardous.',
  },
  {
    id: 'hazardous',
    name: 'Hazardous 6+1 Module',
    shortLabel: 'Hazardous',
    colorHex: '#B91C1C',
    accentBg: 'bg-red-700',
    items: 'Lithium batteries, compact electronics, household chemicals, aerosols',
    dispatchWindow: 'Isolated Vault (Manual Certified Pickup)',
    shredderSpec: 'No shredding — fire-rated isolated containment locker',
    sanitization: 'Thermal runaway monitoring + automated dry-agent suppression',
    destination: 'Licensed Hazardous & E-Waste Recovery Partner',
    safetyNote: 'Never enters pneumatic pipes; eliminates shredder ignition risk.',
  },
];

export const EXECUTIVE_GAP_AUDIT = [
  {
    dimension: 'Contamination Control',
    current: 'Alerts residents after wrong items enter the chute.',
    upgrade: 'Edge AI optical & NIR sensor identifies material before the chute gate unlocks.',
  },
  {
    dimension: 'Energy Autonomy',
    current: '30–40% renewable energy via supplemental rooftop panels.',
    upgrade: '85%+ solar autonomy with integrated LiFePO4 buffer storage for off-peak suction.',
  },
  {
    dimension: 'Customer Engagement',
    current: 'Static technical poster & manual inquiry emails.',
    upgrade: 'Interactive 5-year ROI estimator, live unit configurator, and direct procurement bag.',
  },
  {
    dimension: 'Resident Retention',
    current: 'Basic QR scan points with periodic fee discounts.',
    upgrade: 'Automated municipal rebate wallet, ESG developer reporting, and predictive alerts.',
  },
];

export const INNOVATION_PILLARS: InnovationPillar[] = [
  {
    id: 'ai-guard',
    index: '01.',
    horizon: '2026-2027',
    horizonLabel: 'Year 1–2 · Smart Detection',
    title: 'Edge AI Optical Pre-Sort & Contamination Guard',
    solvesGap: 'Eliminates downstream sorting rejects and shredder jams',
    description:
      'Upgrades the current post-drop contamination detector with an embedded near-infrared (NIR) camera inside the chute throat. Residents receive instant visual guidance on the kiosk screen before disposal is accepted.',
    impactMetric: '-68% Contamination',
    impactDetail: 'Reduces manual sorting labor at the Recovery Centre within 12 months',
  },
  {
    id: 'solar-grid',
    index: '02.',
    horizon: '2028-2029',
    horizonLabel: 'Year 2–3 · Energy & Bio Autonomy',
    title: 'Bifacial Solar Canopy & LiFePO4 Suction Microgrid',
    solvesGap: 'Pushes renewable energy usage from 35% to over 85%',
    description:
      'Pairs weatherproof rooftop bifacial PV canopies over every residential kiosk with modular battery storage, powering scheduled vacuum suction bursts and UV-C sanitization off-grid.',
    impactMetric: '85%+ Renewable Share',
    impactDetail: 'Cuts municipal grid draw by RM 38,000/yr per 10,000-home district',
  },
  {
    id: 'bio-pod',
    index: '03.',
    horizon: '2028-2029',
    horizonLabel: 'Year 2–3 · Energy & Bio Autonomy',
    title: 'Enzymatic Bio-Buffer Tank & Zero-Odour Pre-Digester',
    solvesGap: 'Prevents organic pipe build-up and doubles biogas yield',
    description:
      'Enhances the underground buffer tank with controlled bio-enzymatic dosing for the organic stream, liquefying food scraps during storage and stabilizing methane potential for Recovery Centre digesters.',
    impactMetric: '+42% Biogas Yield',
    impactDetail: 'Extends underground pipe flushing intervals from monthly to quarterly',
  },
  {
    id: 'circular-ledger',
    index: '04.',
    horizon: '2030-2031',
    horizonLabel: 'Year 4–5 · Autonomous City Grid',
    title: 'Verified ESG Carbon Ledger & Predictive Fleet Twin',
    solvesGap: 'Turns waste diversion into auditable recurring revenue',
    description:
      'Connects every Resident QR ID and kiosk fill-level sensor to an automated ESG dashboard for township developers and city councils, issuing verified carbon-offset certificates and municipal assessment rebates.',
    impactMetric: '82% Recycling Rate',
    impactDetail: 'Supports green-building certification (GBI / LEED) and long-term SaaS retention',
  },
];

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'binova-core-station',
    sku: 'BNV-STN-610',
    category: 'Core Hardware',
    name: 'BINOVA 6+1 Underground Kiosk Station',
    tagline: '6 pneumatic chutes + isolated hazardous vault, auto-reverse shredders, and UV-C sanitization.',
    priceRM: 185000,
    unitLabel: 'per station (serves 250–350 homes)',
    leadTime: '8–10 weeks fabrication',
    availability: 'In Production',
    annualCo2SavingsTonnes: 72,
    specs: [
      '6 color-coded chutes (Plastic, Glass, Paper, General, Organic, Metal) + Red Hazardous Vault',
      'Dual-shaft auto-reverse shredders inside soundproofed acoustic chamber (<52 dBA)',
      'UV-C sterilization array, UV-A fly trap, and dual activated carbon odour filters',
      'Child & finger safety sensor lock + UV panel interlock + pipe thermal fire suppression',
    ],
    schematicVariant: 'station',
    imageSrc: './src/assets/images/product_binova_station_1795660514238.jpg',
  },
  {
    id: 'ai-optical-kit',
    sku: 'BNV-OPT-2027',
    category: '5-Year Innovation Kits',
    name: 'Edge AI Optical Contamination Guard Kit',
    tagline: 'Year-1 retrofit NIR + optical vision gate module preventing wrong-stream disposal before drop.',
    priceRM: 14500,
    unitLabel: 'per station upgrade',
    leadTime: '3 weeks dispatch',
    availability: 'Pre-Order 2027 Batch',
    annualCo2SavingsTonnes: 18,
    specs: [
      'Sub-400ms polymer & contamination classification inside chute throat',
      'Synchronized touchscreen prompt on Resident QR ID terminal',
      'Drop-in retrofit bracket compatible with all BINOVA Gen-1 kiosks',
      'Cuts Recovery Centre sorting rejects by up to 68%',
    ],
    schematicVariant: 'optical',
    imageSrc: './src/assets/images/product_ai_optical_kit_1795660514603.jpg',
  },
  {
    id: 'solar-microgrid-pack',
    sku: 'BNV-SOL-2028',
    category: '5-Year Innovation Kits',
    name: 'Solar Canopy & LiFePO4 Buffer Microgrid',
    tagline: 'Architectural bifacial PV canopy and battery pack powering pneumatic cycles & UV-C arrays.',
    priceRM: 28000,
    unitLabel: 'per station kit',
    leadTime: '4–6 weeks dispatch',
    availability: 'Available',
    annualCo2SavingsTonnes: 24,
    specs: [
      '4.8 kWp weatherproof architectural solar canopy integrated above kiosk',
      '15 kWh LiFePO4 underground-rated battery bank for night suction cycles',
      'Raises station renewable energy share from 35% to 85%+',
      'Grid-failover readiness for uninterrupted community waste collection',
    ],
    schematicVariant: 'solar',
    imageSrc: './src/assets/images/product_solar_microgrid_1795660515660.jpg',
  },
  {
    id: 'enzymatic-biopod',
    sku: 'BNV-BIO-2029',
    category: '5-Year Innovation Kits',
    name: 'Enzymatic Bio-Buffer Tank Module',
    tagline: 'Modular underground organic pre-digester stabilizing food waste for high-yield biogas recovery.',
    priceRM: 42000,
    unitLabel: 'per district buffer node',
    leadTime: '6 weeks fabrication',
    availability: 'Available',
    annualCo2SavingsTonnes: 35,
    specs: [
      'Automated bio-enzymatic dosing stabilizes organic slurry inside buffer tank',
      'Eliminates pipe grease buildup and suppresses hydrogen sulfide odours',
      'Boosts Recovery Centre anaerobic biogas output by +42%',
      'Connects inline with standard 250 mm pneumatic suction manifolds',
    ],
    schematicVariant: 'biopod',
    imageSrc: './src/assets/images/product_enzymatic_biopod_1795660515645.jpg',
  },
  {
    id: 'resident-esg-portal',
    sku: 'BNV-SAAS-5YR',
    category: 'Software & Maintenance',
    name: 'Resident QR Rewards & ESG Cloud Suite (5-Year)',
    tagline: 'Full fleet telemetry, predictive jam diagnostics, resident fee rebates, and GBI/ESG audit ledger.',
    priceRM: 18000,
    unitLabel: '5-year license per 1,000 homes',
    leadTime: 'Instant Cloud Provisioning',
    availability: 'Available',
    annualCo2SavingsTonnes: 12,
    specs: [
      'Real-time fill-level telemetry and predictive shredder wear alerts',
      'Resident QR ID tracking with automated green reward & assessment rebate sync',
      'Exportable ISO-aligned CO₂ & landfill-diversion reports for property developers',
      'Includes API webhooks for municipal utility ERP systems',
    ],
    schematicVariant: 'portal',
    imageSrc: './src/assets/images/product_esg_portal_1795660516303.jpg',
  },
  {
    id: 'annual-care-pack',
    sku: 'BNV-CARE-1YR',
    category: 'Software & Maintenance',
    name: 'Activated Carbon, UV-C & Bi-Annual Care Plan',
    tagline: 'Complete consumables and certified BINOVA Operations Team maintenance for one station.',
    priceRM: 6400,
    unitLabel: 'per station / year',
    leadTime: 'Scheduled SLA',
    availability: 'Active Service',
    annualCo2SavingsTonnes: 4,
    specs: [
      'Weekly chute & activated carbon filter sanitization consumables',
      'Monthly pneumatic pipe flush & buffer tank sensor calibration',
      'Every-6-months full mechanical, shredder blade & fire-suppression inspection',
      'Guaranteed 4-hour emergency SLA dispatch from regional hub',
    ],
    schematicVariant: 'care',
    imageSrc: './src/assets/images/product_annual_care_pack_1795660516611.jpg',
  },
];

export const RECOVERY_STAGES: RecoveryStage[] = [
  {
    step: '01',
    title: 'Automated & Manual Sorting',
    summary: 'Pre-separated pneumatic streams arrive in timed batches for final optical QA.',
    output: '98% stream purity',
  },
  {
    step: '02',
    title: 'High-Density Baling',
    summary: 'Shredded plastics, paper, and metals are compressed into export-ready bales.',
    output: '4:1 volume reduction',
  },
  {
    step: '03',
    title: 'Material Recycling',
    summary: 'Clean polymer flakes, cullet, and pulp return directly to regional manufacturers.',
    output: '60–75% circular recovery',
  },
  {
    step: '04',
    title: 'Composting & Biogas',
    summary: 'Organic food slurry feeds anaerobic digesters for agricultural compost and methane.',
    output: 'Renewable fuel + soil',
  },
  {
    step: '05',
    title: 'Energy Recovery',
    summary: 'High-calorific non-recyclables convert cleanly into district heat and electricity.',
    output: 'Clean base-load power',
  },
  {
    step: '06',
    title: 'Engineered Residue Disposal',
    summary: 'Minimal inert ash is safely contained within lined environmental controls.',
    output: '<12% final landfill mass',
  },
];

export const MAINTENANCE_SCHEDULE = [
  {
    cadence: 'Weekly',
    scope: 'Chutes & Activated Carbon Filters',
    owner: 'BINOVA Operations Team',
    detail: 'Surface sanitization, UV-A fly trap tray check, and odour cartridge verification.',
  },
  {
    cadence: 'Monthly',
    scope: 'Pneumatic Pipes & Buffer Tank',
    owner: 'BINOVA Operations Team',
    detail: 'Air-suction pressure test, pipe elbow check, and shredder blade torque audit.',
  },
  {
    cadence: 'Every 6 Months',
    scope: 'Full System & Safety Interlock Inspection',
    owner: 'Certified Utility Partner',
    detail: 'Thermal fire suppression calibration, UV-C lamp output test, and preventive overhaul.',
  },
];
