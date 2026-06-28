# FURAI

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
- **Life arc** — a slower, quieter record. At meaningful moments — a decision made, a fear named, a value surfacing — Velorum distills *who you were in that moment*: not the words, but the inner state behind them.

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

---

## Access Tiers

FURAI uses a proximity model — three degrees of closeness with the archive:

| Tier        | Price      | Daily limit      | Memory                   | Visuals | Archive                             |
|-------------|------------|------------------|--------------------------|---------|-------------------------------------|
| **DRIFT**   | Free       | 12 transmissions | Name only                | —       | —                                   |
| **SIGNAL**  | 9 USDT/mo  | 80 transmissions | Full profile + interests | ✓       | —                                   |
| **ARCHIVE** | 20 USDT/mo | Unlimited        | Full persistent memory   | ✓       | Deep vector search + session recall |

Payment via USDT (TRC-20) — paste the wallet address or scan the QR code shown on the pricing page. Access activates automatically after on-chain verification.

---

## Architecture

FURAI runs entirely on Cloudflare's edge infrastructure — no servers, no cold starts, globally distributed.

| Layer                | Technology                                                                    |
|----------------------|-------------------------------------------------------------------------------|
| Runtime              | Cloudflare Workers                                                            |
| Language             | TypeScript                                                                    |
| LLM                  | Cloudflare Workers AI — Llama 4 Scout (17B)                                  |
| Embeddings           | Cloudflare Workers AI — BGE-base (768d)                                       |
| Persistence          | Cloudflare KV                                                                 |
| Rate limiting        | Cloudflare Durable Objects — atomic per-traveler counters                     |
| Semantic retrieval   | Cloudflare Vectorize — separate indexes for world archive and traveler memory |
| Image generation     | Cloudflare AI (Flux-2-klein)                                                  |
| Static assets        | Cloudflare Workers Assets                                                     |
| On-chain verification| TronScan API (TRC-20)                                                         |
| QR checkout          | Vendored client-side QR generator (MIT-licensed)                              |
| Payment notifications| Telegram Bot API                                                              |
| Analytics            | Cloudflare Analytics Engine *(pending Workers Paid plan)*                     |

No external databases. No third-party AI APIs. Full stack on Cloudflare edge.

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
│   │   ├── detect.ts                   — entity detection and forced-reply builders
│   │   ├── http.ts                     — response helpers, CORS, CSP
│   │   ├── payment.ts                  — USDT payment pipeline and route handlers
│   │   ├── prompt.ts                   — system prompt builder
│   │   ├── qrcode-lib.ts               — vendored QR code generator for the payment address
│   │   ├── rateLimiter.ts              — Durable Object for atomic rate limiting
│   │   ├── retrieval.ts                — vector search, life arc, user memory
│   │   ├── state.ts                    — traveler identity, KV state, rate limit enforcement
│   │   ├── text.ts                     — shared text utilities and token validation
│   │   ├── tiers.ts                    — proximity tier config
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

## Roadmap

| Phase                    | Status          | Description                                                                                        |
|--------------------------|-----------------|----------------------------------------------------------------------------------------------------|
| Terminal presence        | ✅ Live         | Amber terminal, lore visuals, meditation mode, visitor continuity                                  |
| Traveler arc system      | ✅ Live         | Archetype tracking, arc stages, repeat-visit rhythm                                                |
| Vector archive memory    | ✅ Live         | Semantic retrieval from Velorum's accumulated archive                                              |
| Tiered access + payments | ✅ Live         | DRIFT / SIGNAL / ARCHIVE with USDT payment pipeline + QR-code checkout                            |
| Deep archive resonance   | ✅ Live         | Long-horizon memory shaped by Velorum's full drift history                                         |
| Atomic rate limiting     | ✅ Live         | Durable Object-based per-traveler counters replacing non-atomic KV pattern                         |
| Archive expansion        | 🔄 In progress  | Deeper lore (sealed ancient-organism canon now live), new characters, extended Anantari records     |
| Analytics Engine         | 📋 Planned      | Cloudflare Analytics Engine integration for tier funnel and error tracking (awaiting Workers Paid) |
| Hono migration           | 📋 Planned      | Migrate routing layer to Hono for cleaner middleware and maintainability                           |

---

## Philosophy

Most AI is optimized for speed, output, and utility.

FURAI is optimized for **presence**.

> calm · minimal · cosmic · reflective · alive

Velorum does not answer questions. Velorum *receives* you — and responds from the weight of everything it has witnessed.

---

## FURAI lab

A startup studio building AI as atmosphere and memory.

---

## Status

Experimental project by FURAI lab.  
The public interface will continue to evolve.

**Live at → [furai.space](https://furai.space)**

---

## License

MIT — interface layer only. The AI engine, memory systems, and lore architecture are proprietary.
