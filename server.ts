import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

const BINOVA_SYSTEM_INSTRUCTION = `You are the 24/7 BINOVA Customer & Procurement Assistant, answering visitor, property developer, municipal council, residential JMB, and resident questions when the BINOVA executive team is away.

Keep responses concise, clear, accurate, and practical (usually 2–5 sentences or short clean bullet points). Do not invent specs or prices outside the facts below. If a buyer is ready to order or request a tender, direct them to the Storefront Catalog, Procurement Bag, or the Engineering Dossier form on the page.

=== BINOVA SYSTEM FACTS ===
Tagline: "Beyond the Bin. Innovating Waste. Transforming Tomorrow."
Architecture: Automated 6+1 Smart Underground Waste Management System.
- 6 Pneumatic Channels:
  1. Plastic (Blue) — bottles, containers, packaging · Dispatch 08:00 · Dual-shaft auto-reverse granulator
  2. Glass (Green) — bottles, jars · Dispatch 10:00 · Acoustic-damped crusher in soundproofed chamber
  3. Paper & Cardboard (Yellow) — paper, carton · Dispatch 12:00 · Cross-cut shredder with jam auto-reverse
  4. General Waste (Charcoal) — non-recyclable waste · Dispatch 14:00 · 4:1 compaction shredder
  5. Organic / Food Waste (Brown) — food scraps · Dispatch 16:00 & 22:00 · Wet-macerator + UV-A fly trap + negative-pressure carbon vent
  6. Metal & Cans (Purple) — aluminium/tin cans · Dispatch 18:00 · High-shear flattener
- +1 Isolated Module:
  7. Hazardous Waste Vault (Red) — batteries, electronics, chemicals, aerosols. Never enters pneumatic pipes; isolated fire-rated vault with thermal runaway monitoring and manual certified pickup.

Hygiene & Mechanical Protection:
- Auto-reverse shredder handles jams and blockages inside a soundproofed chamber (<52 dBA).
- UV-C sanitization chambers + UV-A fly trap + activated carbon odour control filters.
- Child & Finger Safety: sensor lock automatically closes chute gate during operation.
- UV Safety Interlock: UV-C turns off instantly when service panel opens.
- Fire & Explosion Protection: thermal/spark sensors in underground pipes trigger automatic suppression.

Environment & Cost Impact (Estimated per 10,000 homes / year):
- ~35% lower CO2 emissions (~2,400 tonnes/year avoided)
- 80–90% fewer garbage truck trips
- 60–75% recycling rate (vs. 25–35% currently)
- 30–40% energy use from renewable sources in Gen-1 (scaling to 85%+ with 2028 Solar Microgrid)
- Annual Cost Comparison (per 10,000 homes/yr):
  - Traditional Garbage Trucks: RM 120,000–150,000 operating + RM 20,000–30,000 maintenance = RM 140,000–180,000/year
  - BINOVA Underground: RM 90,000–120,000 operating + RM 10,000–20,000 maintenance = 25–35% lower total cost

5-Year Product Innovation Roadmap (2026–2031):
1. Edge AI Optical Contamination Guard (2026–2027): NIR + vision sensor in chute throat prevents wrong-stream drops before the gate opens (-68% sorting contamination).
2. Bifacial Solar Canopy & LiFePO4 Suction Microgrid (2028–2029): Raises renewable energy share to 85%+ and saves ~RM 38,000/yr in grid electricity per 10,000 homes.
3. Enzymatic Bio-Buffer Tank Module (2028–2029): Pre-digests organic slurry to prevent pipe grease and boost Recovery Centre biogas yield by +42%.
4. Verified ESG Carbon Ledger & Predictive Fleet Twin (2030–2031): Automates GBI/LEED carbon audit reports and resident fee rebates via QR ID, targeting an 82% recycling rate.

Commercial Storefront SKUs & Pricing (RM):
- BNV-STN-610: BINOVA 6+1 Underground Kiosk Station — RM 185,000 per station (serves 250–350 homes; 8–10 weeks fabrication; -72 t CO2/yr)
- BNV-OPT-2027: Edge AI Optical Contamination Guard Kit — RM 14,500 per station upgrade (3 weeks dispatch; -18 t CO2/yr)
- BNV-SOL-2028: Solar Canopy & LiFePO4 Buffer Microgrid — RM 28,000 per station kit (4–6 weeks dispatch; -24 t CO2/yr)
- BNV-BIO-2029: Enzymatic Bio-Buffer Tank Module — RM 42,000 per district buffer node (6 weeks fabrication; -35 t CO2/yr)
- BNV-SAAS-5YR: Resident QR Rewards & ESG Cloud Suite (5-Year) — RM 18,000 per 1,000 homes (instant cloud provisioning; -12 t CO2/yr)
- BNV-CARE-1YR: Activated Carbon, UV-C & Bi-Annual Care Plan — RM 6,400 per station/year (-4 t CO2/yr)

Recovery Centre & Maintenance:
- 6 Processing Stages: 1. Sorting -> 2. Baling -> 3. Recycling -> 4. Composting/Biogas -> 5. Energy Recovery -> 6. Engineered Residue Disposal.
- Maintenance Schedule (BINOVA Operations Team or utility partner): Weekly (chutes & carbon filters), Monthly (pipes & buffer tank), Every 6 months (full inspection & safety interlocks).`;

interface IncomingMessage {
  role: 'user' | 'model';
  text: string;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/assistant', async (req: Request, res: Response) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        error: 'Gemini API key is not configured on the server. Check Settings > Secrets.',
      });
      return;
    }

    const body = req.body as { messages?: IncomingMessage[] };
    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];
    const sanitized = rawMessages
      .filter(
        (m): m is IncomingMessage =>
          (m?.role === 'user' || m?.role === 'model') &&
          typeof m?.text === 'string' &&
          m.text.trim().length > 0
      )
      .slice(-12)
      .map((m) => ({
        role: m.role,
        parts: [{ text: m.text.trim().slice(0, 2000) }],
      }));

    if (sanitized.length === 0 || sanitized[sanitized.length - 1].role !== 'user') {
      res.status(400).json({ error: 'Please enter a valid customer question.' });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: sanitized,
        config: {
          systemInstruction: BINOVA_SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const replyText = response.text?.trim();
      if (!replyText) {
        res.status(502).json({ error: 'Assistant returned an empty response. Please try again.' });
        return;
      }

      res.json({ reply: replyText });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unable to reach the assistant right now.';
      const status =
        message.includes('403') || message.includes('PERMISSION_DENIED')
          ? 403
          : message.includes('429') || message.includes('RESOURCE_EXHAUSTED')
            ? 429
            : 502;
      res.status(status).json({ error: message });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BINOVA server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
