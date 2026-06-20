# Headroom evaluation report

**Date:** 2026-06-20 · **Package:** `headroom-ai` **0.26.0** (latest, verified on PyPI) ·
**Repo:** chopratejas/headroom (39.4k★, author Tejas Chopra/Netflix) ·
**Docs:** https://headroom-docs.vercel.app/docs

> ⚠️ **Read this first — where these numbers come from.** I ran this in an
> **ephemeral cloud container, not your machine.** It has none of your real
> traffic (the only repo here is `better-site-builder`, a Next.js app — no
> FastAPI/Anthropic Python code). So the table below is from **synthetic but
> representative payloads**, and it is a **partial** measurement: this sandbox
> blocks egress to HuggingFace (403), so Headroom's **Kompress** text model
> could not download and the **logs / RAG / code** paths could not be tested
> here. The real KEEP/DROP decision must be made by running the runbook
> (bottom) on **your** machine against **your** traffic.

---

## 1. What was installed (all in an isolated venv `/home/user/hr-venv`)

```
python3 -m venv /home/user/hr-venv
. /home/user/hr-venv/bin/activate
pip install "headroom-ai[all]"     # 0.26.0
```

- `[all]` is **heavy** (pulls torch + CUDA + transformers + lm-eval, multi-GB).
  For production prefer granular extras: `pip install "headroom-ai[proxy]"` for
  the proxy, add `[code]`/`[relevance]`/`[memory]` only if you use those paths.
- CLI verified: `headroom --version` → `headroom, version 0.26.0`; `headroom --help` OK.

## 2. Proxy stood up (safe, parallel — touched nothing real)

```
headroom proxy --port 8787
curl http://127.0.0.1:8787/health
```

`/health` returned `status: healthy, ready: true`, `rust_core: loaded`, and
confirmed both of your ground rules:

| Ground rule | Health config | Status |
|---|---|---|
| Stateless / not storing prompts | `memory: false`, `learn: false` | ✅ |
| Reversible compression (CCR) | `optimize: true`, `cache: true` | ✅ |

Endpoints: `/health`, `/readyz`, `/livez`, `/stats`, `/stats-history`, `/metrics`.

## 3. Benchmark (synthetic, DEFAULT config = what the proxy does)

Heavy content placed in **older turns** of a multi-turn agent conversation so
it is past `protect_recent` (i.e. eligible) — mirroring a real session.
Token counts are Headroom's own.

| Workload | Baseline tok | Compressed tok | % saved | Added latency | Quality | Notes |
|---|---:|---:|---:|---:|---|---|
| **JSON tool output** (120 records) | 6 867 | 2 338 | **66.0%** | ~2 ms | reversible (CCR) | **SmartCrusher, Rust, fully offline** |
| Log analysis (400 lines) | 10 109 | 10 109 | 0.0%* | ~1 ms | — | *Kompress model blocked by sandbox (HF 403) — untested, not a real 0* |
| RAG chunks (12 docs) | 2 862 | 2 862 | 0.0%* | ~0 ms | — | *same: Kompress could not download* |
| Code search (60 hits) | 1 923 | 1 923 | 0.0%* | ~0 ms | — | *same: Kompress could not download* |
| Chat (control) | 102 | 102 | 0.0% | ~0 ms | unchanged | correct — chat is protected, not compressed |

\* These three are **not** genuine zeros. They route to Headroom's text
compressor (Kompress), whose ONNX/PyTorch model lives on HuggingFace, which is
**firewalled in this container**. On a machine with network access they
compress (the project reports its biggest wins on logs).

## 4. KEEP / DROP recommendation (per workload)

| Your workload | Recommendation | Reasoning |
|---|---|---|
| **Prod: large JSON/structured tool outputs** (API/DB dumps, tool results) | **KEEP — strong** | 66% measured here, offline, ~2ms. This is the canonical SmartCrusher win and it's real. |
| **Prod: log analysis** | **KEEP — pending your test** | Highest-claimed win, but I literally could not run it here. Validate with the runbook before trusting. |
| **Prod: RAG chunks** | **KEEP — pending your test** | Likely win on redundant chunks; must measure on your real corpus (relevance scoring is data-dependent). |
| **Dev: Claude Code (code search / refactor / debug)** | **TRIAL via proxy** | Wins concentrate in tool-heavy/log-heavy sessions. Trial with `ANTHROPIC_BASE_URL`; keep only if your sessions are tool-output-heavy. |
| **Chat / short prompts** | **DROP** | ~0% by design. No benefit; don't route pure chat through it. |

**Bottom line:** your instinct is right — wins are concentrated in
**high-volume structured-tool-output / log / RAG paths**, not chat. The one
hard number I can stand behind from here is **66% on JSON tool outputs,
offline, at ~2ms** — that alone is worth keeping for those paths. Everything
else needs your-machine validation before I'd call it a keep.

## 5. Integration points (PREPARED, NOT APPLIED)

### a) Claude Code (dev) — fully reversible
```
# one-off, explicit:
ANTHROPIC_BASE_URL=http://localhost:8787 claude
# or convenience wrapper (starts proxy + sets env + launches claude):
headroom wrap claude
#   --memory      → shares a cross-session memory cache (helps multi-agent; stores context locally → only if you accept local persistence)
#   --code-graph  → builds a repo code graph for better code compression (slower first run; great for refactors)
```
Tradeoff: bare `ANTHROPIC_BASE_URL` is the cleanest/most auditable; `wrap` is
convenient but does more (and `--memory`/`--code-graph` turn on persistence/indexing).

### b) Production FastAPI (staging first) — env toggle, no code change
```python
# anthropic SDK already reads ANTHROPIC_BASE_URL; behind a flag:
import os
from anthropic import Anthropic
client = Anthropic(
    base_url=os.getenv("ANTHROPIC_BASE_URL"),  # set only in staging profile first
)
```
```bash
# staging env only:
export ANTHROPIC_BASE_URL=http://localhost:8787
```
Roll to prod **only** after the staging numbers + output diffs pass.

## 6. Monitoring

```
curl http://localhost:8787/stats          # per-request tokens + USD saved (live)
curl http://localhost:8787/stats-history  # durable compression history
curl http://localhost:8787/metrics        # Prometheus
headroom agent-savings                    # render/verify CLI token-savings
headroom perf                             # analyze proxy perf from logs
```
`headroom learn` mines failed tool-call sessions and writes corrections into
`CLAUDE.md`/`AGENTS.md`. **Worth it only if** you have recurring agent failures
and are comfortable with it editing those files — review its diffs; it's not
required for token savings.

## 7. Rollback (one command per integration point)

| Piece | Undo |
|---|---|
| Claude Code env | `unset ANTHROPIC_BASE_URL` (new shell = already clean) |
| Durable `wrap` | `headroom unwrap claude` |
| Prod SDK | remove `ANTHROPIC_BASE_URL` from the staging profile / flip the flag off |
| Stop proxy | `kill $(cat /home/user/hr-proxy.pid)` (or Ctrl-C) |
| Persistent service (if ever installed) | `headroom install remove` |
| MCP (if ever installed) | remove the `headroom` MCP server from the client config |
| Uninstall entirely | `rm -rf /home/user/hr-venv` (it's all in the venv) |

Nothing here was wired into a real workflow; rollback in this container is just
stopping the proxy and deleting the venv.

---

## 8. Runbook — run THIS on your own machine (the real gate)

```bash
# 1. isolated install (your machine, has network)
python3 -m venv ~/hr && source ~/hr/bin/activate
pip install "headroom-ai[proxy,code,relevance]"     # lighter than [all]
headroom --version

# 2. proxy + health
headroom proxy --port 8787 &
curl http://localhost:8787/health      # expect status:healthy, memory:false

# 3a. DEV gate — run 2-3 real tasks WITH and WITHOUT, compare:
#     baseline:
claude            # do a code search, a multi-file refactor, a log/debug task
#     through headroom:
ANTHROPIC_BASE_URL=http://localhost:8787 claude   # repeat the SAME tasks
curl http://localhost:8787/stats       # read tokens saved + USD + latency
#     >>> diff the answers. KEEP only if quality is unchanged AND savings > latency cost.

# 3b. PROD gate — replay real payloads (logs/RAG/tool outputs) you have on disk:
python - <<'PY'
import json, time, glob
from headroom import compress
for f in glob.glob("sample_payloads/*.json"):   # your captured tool outputs
    msgs = json.load(open(f))
    t=time.perf_counter(); r=compress(msgs, model="claude-sonnet-4-5-20250929", optimize=True)
    print(f, r.tokens_before, "->", r.tokens_after,
          f"({100*r.tokens_saved/max(r.tokens_before,1):.0f}% , {(time.perf_counter()-t)*1000:.0f}ms)",
          r.transforms_applied)
PY

# 4. roll out only winners, staging before prod; rollback = unset ANTHROPIC_BASE_URL
```

**Be ruthless at the gate:** if your real logs/RAG come back single-digit %,
the added dependency + latency isn't worth it for those paths — keep Headroom
only where it clears a clear margin (JSON/tool outputs almost certainly will;
chat won't).
