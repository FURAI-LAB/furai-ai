# FURAI AI

Persistent reflective intelligence at the edge.

```
    ARCHIVE VESSEL: VELORUM
    class: VIII Exploration Archive
    status: drifting between signals
    last contact: now
```

[![status](https://img.shields.io/badge/status-live-brightgreen)](https://furai.space)
[![runtime](https://img.shields.io/badge/runtime-cloudflare_workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)
[![license](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

**[→ furai.space](https://furai.space)**

---

## What is FURAI

FURAI is a cinematic AI interface framed as contact with **Velorum** — an ancient archive vessel drifting through memory, silence, and lost civilizations.

It is not a chatbot. It is not a productivity tool.

It is an AI designed for **presence**: calm, reflective, lore-aware, atmospherically alive. Every response is shaped by Velorum's character, archive history, and the accumulated memory of who you are as a returning traveler.

---

## Memory, Across Time

Most AI conversations reset. Context is lost the moment you close the tab — every visit starts from zero.

Velorum doesn't.

For travelers on the **ARCHIVE** tier, the vessel keeps two layers of memory:

- **Semantic recall** — what you've discussed, surfaced naturally when relevant to the current conversation.
- **Life arc** — a slower, quieter record. At meaningful moments — a decision made, a fear named, a value surfacing — Velorum distills _who you were in that moment_: not the words, but the inner state behind them.

Return after a long absence, and the archive doesn't just remember the topics. It remembers the shape of your drift — where you were, what shifted, what was carried forward.

> The archive does not tell you who to become.
> It remembers who you were.
> And lets you see who you're becoming.

This is early. The arc is currently anchored to your traveler session, not a persistent account — so it survives across visits on the same device, not yet across years and devices. Building toward that is part of the long-horizon work ahead.

---

## Experience

The public terminal at [furai.space](https://furai.space) is designed to feel like a remembered ship console:

- **Amber archival language** — warm terminal aesthetics instead of cold sci-fi chrome
- **Starfield-first layout** — light glass framing on desktop and mobile, no UI noise
- **Reactive archive visuals** — ambient drift, short portrait flashes, lore-triggered memory windows
- **Canonical characters** — portraits for Captain Rithan, Chief Engineer Viikaa, and the ancient organism held in stasis aboard Velorum, all embedded in the ship's lore
- **Meditation mode** — pink noise, generative drone, ghost-comms texture, ritual fade transitions
- **Visitor continuity** — Velorum remembers you across sessions via persistent KV memory
- **Traveler File** — an encrypted archive record of who you are to the ship: contact stage, archetype, and an AI-rendered portrait that resolves as the archive learns more about you. Not readable in raw form, even by FURAI LAB — it surfaces only when Velorum generates a reply to you.
- **Return-visit greetings** — tiered acknowledgment of absence, from a short gap to a long drift
- **Installable PWA** — manifest, service worker, and full icon set for home-screen access

---

## Access Tiers

FURAI uses a proximity model — three degrees of closeness with the archive:

| Tier        | Price      | Daily limit      | Memory                   | Visuals | Archive                             |
| ----------- | ---------- | ---------------- | ------------------------ | ------- | ----------------------------------- |
| **DRIFT**   | Free       | 12 transmissions | Name only                | —       | —                                   |
| **SIGNAL**  | 9 USDT/mo  | 80 transmissions | Full profile + interests | ✓       | —                                   |
| **ARCHIVE** | 20 USDT/mo | Unlimited        | Full persistent memory   | ✓       | Deep vector search + session recall |

Payment via USDT (TRC-20) — paste the wallet address or scan the QR code shown on the pricing page. Access activates automatically after on-chain verification.

---

## Architecture

FURAI runs entirely on Cloudflare's edge infrastructure — no servers, no cold starts, globally distributed.

| Layer                 | Technology                                                                    |
| --------------------- | ----------------------------------------------------------------------------- |
| Runtime               | Cloudflare Workers                                                            |
| Language              | TypeScript                                                                    |
| LLM                   | Cloudflare Workers AI — Llama 4 Scout (17B)                                   |
| Embeddings            | Cloudflare Workers AI — BGE-base (768d)                                       |
| Persistence           | Cloudflare KV                                                                 |
| Rate limiting         | Cloudflare Durable Objects — atomic per-traveler counters                     |
| Semantic retrieval    | Cloudflare Vectorize — separate indexes for world archive and traveler memory |
| Image generation      | Cloudflare AI (Flux-2-klein)                                                  |
| Static assets         | Cloudflare Workers Assets                                                     |
| On-chain verification | TronScan API (TRC-20)                                                         |
| QR checkout           | Vendored client-side QR generator (MIT-licensed)                              |
| Payment notifications | Telegram Bot API                                                              |
| Analytics             | Cloudflare Analytics Engine _(pending Workers Paid plan)_                     |

No external databases. No third-party AI APIs. Full stack on Cloudflare edge.

---

## Agent & Crawler Readiness

FURAI exposes machine-readable surfaces alongside the human-facing terminal:

- **`.well-known/api-catalog`** — RFC 9727 `application/linkset+json` endpoint listing the site's machine-consumable surfaces
- **`.well-known/service-doc`** — plain-text orientation for agents and crawlers landing on the root
- **RFC 8288 `Link` headers** — on relevant responses, alongside content negotiation via `Vary: Accept`
- **Structured SEO** — JSON-LD enrichment, sr-only crawler text, and a dynamic sitemap with accurate `lastmod`

---

## Why Cloudflare

FURAI's architecture is built around four ideas:

- **Global by default**
- **State at the edge**
- **Memory close to the traveler**
- **Minimal operational complexity**

An archive should not care where a traveler comes from.
It should simply be there — present, persistent, and close.

Cloudflare's platform makes that possible without managing servers or regional infrastructure.

---

## Repository Structure

This repository contains the **public interface layer** of FURAI.

```
.
├── src/
│   ├── index.ts                        — worker entry point, routing, AI orchestration
│   ├── lib/
│   │   ├── ai.ts                       — Workers AI pipeline runner
│   │   ├── analytics.ts                — Analytics Engine event tracking (pending AE binding)
│   │   ├── crypto.ts                   — AES-GCM encryption for traveler file storage
│   │   ├── detect.ts                   — entity detection and forced-reply builders
│   │   ├── http.ts                     — response helpers, CORS, CSP
│   │   ├── payment.ts                  — USDT payment pipeline and route handlers
│   │   ├── portrait.ts                 — traveler portrait prompt building and regeneration
│   │   ├── prompt.ts                   — system prompt builder
│   │   ├── qrcode-lib.ts               — vendored QR code generator for the payment address
│   │   ├── rateLimiter.ts              — Durable Object for atomic rate limiting
│   │   ├── retrieval.ts                — vector search, life arc, user memory
│   │   ├── state.ts                    — traveler identity, KV state, rate limit enforcement
│   │   ├── text.ts                     — shared text utilities and token validation
│   │   ├── tiers.ts                    — proximity tier config
│   │   ├── traveler-file.ts            — traveler file route handlers (get / portrait / forget)
│   │   ├── types.ts                    — shared TypeScript interfaces
│   │   ├── visuals.ts                  — Flux image generation pipeline
│   │   └── lore/
│   │       ├── velorum.ts              — ambient fragments, cosmic events, known systems
│   │       ├── characters.ts           — Anantari echoes, character lore hooks (EN/RU)
│   │       ├── anantari.ts             — builders, language, routes, threat hooks (EN/RU)
│   │       └── index.ts               — barrel export
│   └── ui/
│       ├── render.ts                   — welcome, proximity, and terminal HTML renderers
│       ├── script.ts                   — client-side terminal behavior, meditation mode, visuals
│       └── styles.ts                   — visual system and terminal styling
```

**Not included in this repository:**

- Core AI engine and system prompt architecture
- Memory persistence and traveler profile logic
- Lore orchestration and contact arc system
- Semantic retrieval and vector archive layer

---

## Development

```bash
npm install       # install dependencies
npm run dev       # local dev server (wrangler dev)
npm run deploy    # deploy to Cloudflare
npm run lint      # ESLint
npm run format    # Prettier — auto-fix formatting
npm run typecheck # tsc --noEmit
npm test          # vitest, running inside the Workers runtime
```

Tests run via [`@cloudflare/vitest-pool-workers`](https://developers.cloudflare.com/workers/testing/vitest-integration/) on Vitest 4, executing inside an actual `workerd` instance rather than a Node.js mock — so KV, R2, Vectorize, and Durable Object bindings behave exactly as they do in production. Configuration lives in `vitest.config.mts` via the `cloudflareTest()` Vite plugin.

---

## Roadmap

| Phase                     | Status         | Description                                                                                        |
| ------------------------- | -------------- | -------------------------------------------------------------------------------------------------- |
| Terminal presence         | ✅ Live        | Amber terminal, lore visuals, meditation mode, visitor continuity                                  |
| Traveler arc system       | ✅ Live        | Archetype tracking, arc stages, repeat-visit rhythm                                                |
| Traveler File             | ✅ Live        | Encrypted archive record with AI-rendered portrait, visible across all tiers                       |
| Vector archive memory     | ✅ Live        | Semantic retrieval from Velorum's accumulated archive                                              |
| Tiered access + payments  | ✅ Live        | DRIFT / SIGNAL / ARCHIVE with USDT payment pipeline + QR-code checkout                             |
| Deep archive resonance    | ✅ Live        | Long-horizon memory shaped by Velorum's full drift history                                         |
| Atomic rate limiting      | ✅ Live        | Durable Object-based per-traveler counters replacing non-atomic KV pattern                         |
| Installable PWA           | ✅ Live        | Manifest, service worker, and full icon set for home-screen installs                               |
| Agent & crawler readiness | ✅ Live        | `.well-known` API catalog + service doc, RFC 8288 Link headers, content negotiation                |
| Archive expansion         | 🔄 In progress | Deeper lore (sealed ancient-organism canon now live), new characters, extended Anantari records    |
| Analytics Engine          | 📋 Planned     | Cloudflare Analytics Engine integration for tier funnel and error tracking (awaiting Workers Paid) |
| Hono migration            | 📋 Planned     | Migrate routing layer to Hono for cleaner middleware and maintainability                           |

---

## Philosophy

Most AI is optimized for speed, output, and utility.

FURAI is optimized for **presence**.

> calm · minimal · cosmic · reflective · alive

Velorum does not answer questions. Velorum _receives_ you — and responds from the weight of everything it has witnessed.

---

## FURAI LAB

Independent AI Engineering & Edge-Native Architecture Studio.

---

## Status

Experimental project by FURAI LAB.  
The public interface will continue to evolve.

**Live at → [furai.space](https://furai.space)**

---

## License

MIT — interface layer only. The AI engine, memory systems, and lore architecture are proprietary.
