"""
Synthetic-but-representative Headroom benchmark.

Mirrors the prod workloads Headroom targets (tool outputs / logs / RAG / code
search) plus a plain-chat control. Heavy content sits in OLDER turns of a
multi-turn agent conversation so it is past `protect_recent` (i.e. eligible for
compression) -- exactly how a real agent session looks once it grows.

Uses the DEFAULT compression config: this is what `headroom proxy` does out of
the box. tokens_before/after come from Headroom's own tokenizer.
"""
import json, time, random
from headroom import compress

random.seed(7)

def turns(*tool_results, final_q="Given all of the above, what should I do next?"):
    """Build a multi-turn convo: each tool_result is an old turn; a fresh user
    question is the last turn (protected). Returns Anthropic-style messages."""
    msgs = []
    for i, tr in enumerate(tool_results):
        msgs.append({"role": "assistant", "content": [
            {"type": "tool_use", "id": f"t{i}", "name": "run", "input": {"i": i}}]})
        msgs.append({"role": "user", "content": [
            {"type": "tool_result", "tool_use_id": f"t{i}", "content": tr}]})
    # a few extra benign turns so the heavy ones fall outside protect_recent
    for _ in range(4):
        msgs.append({"role": "assistant", "content": "Noted."})
        msgs.append({"role": "user", "content": "continue"})
    msgs.append({"role": "user", "content": final_q})
    return msgs

# --- Workload 1: large JSON tool output (e.g. API/DB returning many records) --
records = [{"id": i, "user_id": 1000 + i, "status": random.choice(["ok","ok","ok","retry"]),
           "region": random.choice(["us-east-1","us-west-2","eu-west-1"]),
           "latency_ms": random.randint(10, 90), "ts": f"2026-06-20T06:{i%60:02d}:00Z",
           "endpoint": "/v1/messages", "bytes": random.randint(200, 2000)} for i in range(120)]
json_tool = json.dumps(records, indent=2)

# --- Workload 2: log analysis (repetitive lines, a few anomalies) ------------
log_lines = []
for i in range(400):
    lvl = "ERROR" if i in (137, 290, 291) else "INFO"
    log_lines.append(f"2026-06-20 06:{i%60:02d}:{i%60:02d} {lvl} worker-{i%8} "
                     f"handled request rid={i} status=200 dur={random.randint(5,40)}ms cache=hit")
logs = "\n".join(log_lines)

# --- Workload 3: RAG chunks (retrieved docs, partially redundant) ------------
chunk = ("Headroom compresses tool outputs, logs, RAG chunks and files before they "
         "reach the LLM. It routes JSON to SmartCrusher, code to CodeCompressor and "
         "text to Kompress, and keeps compression reversible via the CCR store. ")
rag = "\n\n".join([f"[doc {i}] " + chunk * random.randint(2, 5) for i in range(12)])

# --- Workload 4: code search (grep-style hits across many files) -------------
code_hits = []
for i in range(60):
    code_hits.append(f"src/module_{i%10}/handler_{i}.py:{random.randint(10,300)}: "
                     f"def process_request_{i}(payload): return optimize(payload)  # TODO refactor")
code_search = "\n".join(code_hits)

# --- Workload 5: plain chat (control -- expect ~0 savings) -------------------
chat_msgs = [
    {"role": "user", "content": "Hey, can you explain what a Kalman filter is in two sentences?"},
    {"role": "assistant", "content": "A Kalman filter estimates the hidden state of a system "
        "from noisy measurements by combining a prediction with a correction. It is optimal "
        "for linear systems with Gaussian noise."},
    {"role": "user", "content": "Thanks. And when would I prefer an EKF instead?"},
]

workloads = {
    "json_tool_output": turns(json_tool),
    "log_analysis":     turns(logs),
    "rag_chunks":       turns(rag),
    "code_search":      turns(code_search),
    "chat (control)":   chat_msgs,
}

print(f"{'workload':<20}{'before':>9}{'after':>9}{'saved':>8}{'%saved':>9}{'ms':>8}  transforms")
print("-" * 92)
rows = []
for name, msgs in workloads.items():
    # time it (median of 3 to smooth jitter)
    durs = []
    res = None
    for _ in range(3):
        t0 = time.perf_counter()
        res = compress(msgs, model="claude-sonnet-4-5-20250929", optimize=True)
        durs.append((time.perf_counter() - t0) * 1000)
    durs.sort()
    ms = durs[1]
    pct = (res.tokens_saved / res.tokens_before * 100) if res.tokens_before else 0.0
    tr = ",".join(res.transforms_applied) or "(none)"
    rows.append((name, res.tokens_before, res.tokens_after, res.tokens_saved, pct, ms, tr))
    print(f"{name:<20}{res.tokens_before:>9}{res.tokens_after:>9}{res.tokens_saved:>8}"
          f"{pct:>8.1f}%{ms:>8.0f}  {tr}")

print("-" * 92)
tb = sum(r[1] for r in rows); ta = sum(r[2] for r in rows)
print(f"{'TOTAL':<20}{tb:>9}{ta:>9}{tb-ta:>8}{(tb-ta)/tb*100:>8.1f}%")
PY = None
