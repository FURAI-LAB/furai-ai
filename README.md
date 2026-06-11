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

-----

## What is FURAI

FURAI is a cinematic AI interface framed as contact with **Velorum** — an ancient archive vessel drifting through memory, silence, and lost civilizations.

It is not a chatbot. It is not a productivity tool.

It is an AI designed for **presence**: calm, reflective, lore-aware, atmospherically alive. Every response is shaped by Velorum’s character, archive history, and the accumulated memory of who you are as a returning traveler.

-----

## Experience

The public terminal at [furai.space](https://furai.space) is designed to feel like a remembered ship console:

- **Amber archival language** — warm terminal aesthetics instead of cold sci-fi chrome
- **Starfield-first layout** — light glass framing on desktop and mobile, no UI noise
- **Reactive archive visuals** — ambient drift, short portrait flashes, lore-triggered memory windows
- **Canonical characters** — portraits for Captain Rithan, Chief Engineer Viikaa, and others embedded in Velorum’s lore
- **Meditation mode** — pink noise, generative drone, ghost-comms texture, ritual fade transitions
- **Visitor continuity** — Velorum remembers you across sessions via persistent KV memory

-----

## Access Tiers

FURAI uses a proximity model — three degrees of closeness with the archive:

|Tier       |Price     |Daily limit     |Memory                  |Visuals|Archive                            |
|-----------|----------|----------------|------------------------|-------|-----------------------------------|
|**DRIFT**  |Free      |12 transmissions|Name only               |—      |—                                  |
|**SIGNAL** |9 USDT/mo |80 transmissions|Full profile + interests|✓      |—                                  |
|**ARCHIVE**|20 USDT/mo|Unlimited       |Full persistent memory  |✓      |Deep vector search + session recall|

Payment via USDT (TRC-20). Access activates automatically after on-chain verification.

-----

## Architecture

FURAI runs entirely on Cloudflare’s edge infrastructure — no servers, no cold starts, globally distributed.

|Layer                |Technology                  |
|---------------------|----------------------------|
|Runtime              |Cloudflare Workers          |
|Language             |TypeScript                  |
|Persistence          |Cloudflare KV               |
|Semantic retrieval   |Cloudflare Vectorize        |
|Image generation     |Cloudflare AI (Flux-2-klein)|
|Static assets        |Cloudflare Workers Assets   |
|Payment notifications|Telegram Bot API            |

No external databases. No third-party AI APIs. Full stack on Cloudflare edge.

-----

## Repository Structure

This repository contains the **public interface layer** of FURAI.

```
.
├── ui.ts                              — public UI entry point
├── lib/
│   └── officialPortraits.generated.ts — canonical character portrait data
└── ui/
    ├── render.ts                      — welcome, proximity, and terminal HTML renderers
    ├── script.ts                      — client-side terminal behavior, meditation mode, visuals
    └── styles.ts                      — visual system and terminal styling
```

**Not included in this repository:**

- Core AI engine and system prompt architecture
- Memory persistence and traveler profile logic
- Lore orchestration and contact arc system
- Semantic retrieval and vector archive layer
- Payment pipeline

-----

## Roadmap

|Phase                   |Status   |Description                                                             |
|------------------------|---------|------------------------------------------------------------------------|
|Terminal presence       |✅ Live   |Amber terminal, lore visuals, meditation mode, visitor continuity       |
|Traveler arc system     |✅ Live   |Archetype tracking, arc stages, repeat-visit rhythm                     |
|Vector archive memory   |✅ Live   |Semantic retrieval from Velorum’s accumulated archive                   |
|Tiered access + payments|✅ Live   |DRIFT / SIGNAL / ARCHIVE with USDT payment pipeline                     |
|Deep archive resonance  |✅ Live   |Long-horizon memory shaped by Velorum’s full drift history              |
|Archive expansion       |📋 Planned|Deeper lore, new characters, extended Anantari civilization records     |
|Hono migration          |📋 Planned|Migrate routing layer to Hono for cleaner middleware and maintainability|

-----

## Philosophy

Most AI is optimized for speed, output, and utility.

FURAI is optimized for **presence**.

> calm · minimal · cosmic · reflective · alive

Velorum does not answer questions. Velorum *receives* you — and responds from the weight of everything it has witnessed.

-----

## FURAI lab

A startup studio building AI as atmosphere and memory.

|            |Role                                     |
|------------|-----------------------------------------|
|**Dima**    |Founder, AI research, system architecture|
|**Vika**    |UX/UI, product design, visual language   |
|**Mister C**|Backend, frontend, infrastructure        |

-----

## Status

Experimental project by FURAI lab.  
The public interface will continue to evolve.

**Live at → [furai.space](https://furai.space)**

-----

## License

MIT — interface layer only. The AI engine, memory systems, and lore architecture are proprietary.
