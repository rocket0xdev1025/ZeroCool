const fs = require("fs");
const path = require("path");

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function page({ root, title, description, active, main }) {
  const href = (file) => root + file;
  const on = (name) => (active === name ? ' class="active"' : "");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="icon" href="${href("favicon.svg")}" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${href("css/styles.css")}">
  <script>try{if(localStorage.getItem("zc-theme")==="light")document.documentElement.setAttribute("data-theme","light")}catch(e){}</script>
</head>
<body data-root="${root}">
  <canvas id="plasma" class="plasma" aria-hidden="true"></canvas>
  <div class="grain"></div>
  <div class="vignette"></div>
  <div class="glow"></div>
  <header class="nav">
    <a class="brand" href="${href("index.html")}"><span class="star" data-star></span>Zero Cool</a>
    <div class="nav-desktop">
      <ul class="nav-links">
        <li class="svc" data-services>
          <button class="svc-btn" type="button" aria-expanded="false">Services
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 4.5l3 3 3-3"/></svg>
          </button>
          <div class="menu">
            <a href="${href("services/defi.html")}">DeFi</a>
            <a href="${href("services/bridges.html")}">Bridges</a>
            <a href="${href("services/l2-infrastructure.html")}">L2 Infrastructure</a>
            <a href="${href("services/formal-verification.html")}">Formal Verification</a>
          </div>
        </li>
        <li><a href="${href("index.html#engagement")}">Engagement</a></li>
        <li><a href="${href("docs.html")}"${on("docs")}>Docs</a></li>
        <li><a href="${href("about.html")}"${on("about")}>About</a></li>
      </ul>
      <div class="nav-actions">
        <button class="icon-btn" type="button" data-theme-toggle aria-label="Switch to light theme"></button>
        <a class="btn btn-ghost" href="https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=0x34bdf88065352838f5a917ea039c8b9adecd9e78" target="_blank" rel="noopener noreferrer">Buy $ZERO</a>
      </div>
    </div>
    <div class="nav-mobile">
      <button class="icon-btn" type="button" data-theme-toggle aria-label="Switch to light theme"></button>
      <button class="burger" type="button" data-burger aria-label="Toggle menu"><span></span><span></span><span></span></button>
    </div>
  </header>
  <div class="mobile-panel" data-panel>
    <a href="${href("services/defi.html")}">DeFi</a>
    <a href="${href("services/bridges.html")}">Bridges</a>
    <a href="${href("services/l2-infrastructure.html")}">L2 Infrastructure</a>
    <a href="${href("services/formal-verification.html")}">Formal Verification</a>
    <a href="${href("index.html#engagement")}">Engagement</a>
    <a href="${href("docs.html")}">Docs</a>
    <a href="${href("about.html")}">About</a>
    <a href="https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=0x34bdf88065352838f5a917ea039c8b9adecd9e78" target="_blank" rel="noopener noreferrer">Buy $ZERO</a>
  </div>
  <main>${main}
    <section class="join" id="join">
      <div class="star" data-star></div>
      <div class="wordmark"><span>ZERO</span> <span class="out">COOL</span></div>
      <h2>Find what others<br><em>miss</em></h2>
      <p class="copy">For protocol teams and security leaders who want exploit-grade coverage backed by proof, not promises.</p>
      <a class="btn btn-solid btn-lg" href="https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=0x34bdf88065352838f5a917ea039c8b9adecd9e78" target="_blank" rel="noopener noreferrer">Buy $ZERO</a>
    </section>
  </main>
  <footer class="foot"><div class="wrap"><span>© 2026 Zero Cool</span><nav>
    <a href="${href("docs.html")}">Docs</a>
    <a href="${href("privacy.html")}">Privacy</a>
    <a href="${href("terms.html")}">Terms</a>
    <a href="${href("subprocessors.html")}">Subprocessors</a>
  </nav></div></footer>
  <script src="${href("js/main.js")}"></script>
</body>
</html>`;
}

function write(file, html) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log(file);
}

const cta = "";

const services = [
  {
    file: "services/defi.html",
    title: "DeFi Auditing — Zero Cool",
    crumb: "Services / DeFi",
    h1: "DeFi protocols ship faster than auditors can keep up.",
    lede: [
      "DeFi composability is the source of both its value and its largest attack surface. Every new protocol inherits the security assumptions of the protocols it integrates with. Every state change ripples through positions held by users you've never seen. The hardest bugs aren't in your contracts. They're in the interactions between your contracts and the ones you depend on.",
      "Existing solutions don't keep pace. A single complex DeFi audit runs $75K to $250K and takes weeks or months. By the time a report ships, the code has moved on.",
    ],
    closerTitle: "Built by people who audited DeFi by hand.",
    closer: "Both founders spent years auditing DeFi protocols by hand at Trail of Bits, Spearbit, and Certora, three of the most respected names in protocol security. Through Offbeat Security they worked with clients including Uniswap, Optimism, and zkSync. The patterns they learned in those engagements — what to look for, what to verify, what's worth digging into — are embedded into how Zero Cool's agents prioritize.",
    threats: [
      ["Cross-contract reentrancy", "State assumptions that hold within a single function break when execution flow returns through composable callbacks. The hardest reentrancy bugs span contract boundaries."],
      ["Oracle manipulation", "Flash loans, price feed staleness, and TWAP edge cases turn read-only values into attack vectors. Most oracles look correct in isolation and fail under adversarial conditions."],
      ["Accounting precision", "Rounding errors, share/asset drift, and fixed-point math bugs that drain protocols slowly or all at once. Off-by-one in the wrong place is a million-dollar bug."],
      ["Composability assumptions", "What happens when a protocol you integrate with pauses, upgrades, or itself gets exploited. Your security depends on assumptions you didn't write."],
      ["Governance and access control", "Privileged functions, time-locked parameter changes, and emergency procedures that don't behave the way the documentation says they do."],
      ["MEV and ordering", "Frontrunning, sandwich attacks, and value extracted by sequencers and searchers in ways the protocol didn't model."],
    ],
  },
  {
    file: "services/bridges.html",
    title: "Bridge Auditing — Zero Cool",
    crumb: "Services / Bridges",
    h1: "Bridges have lost more to exploits than any other category in crypto.",
    lede: [
      "Ronin, Wormhole, Nomad, Multichain. Billions of dollars in losses, across the same category. The reason isn't sloppy code. It's that bridges combine the trust assumptions of two chains with message-validation logic almost nobody else writes. Every bridge invents its own threat model. That threat model gets audited fewer times than the contracts that use it.",
      "Most audit firms treat bridges as smart contract audits: review the L1 contracts, sign off on the relayer interface, ship. The actual attack surface is the system.",
    ],
    closerTitle: "Built by people who've audited cross-chain systems.",
    closer: "Kurt Willis brings deep expertise in layer-2 infrastructure and bridge security from years at Trail of Bits, Spearbit, and Certora. Both founders have audited cross-chain protocols at Offbeat Security. The threat models they internalized — validator compromise, message forgery, async finality bugs, key management failure — are embedded in how the agents prioritize across the full bridge stack.",
    threats: [
      ["Signature verification", "Validator set rotation, threshold signing schemes, and key management flaws that let an attacker forge messages or replay them across chains."],
      ["Message replay", "Cross-chain replay protection that breaks under reorganizations or message reordering. The same valid message executed twice drains funds."],
      ["Asset accounting", "Lock-and-mint logic, supply tracking, and the path between chains where balances can drift if even one assumption is off."],
      ["Async finality assumptions", "Source chain reorgs and finality gaps that let already-relayed messages get unwound, leaving funds minted on the destination but no longer locked at the source."],
      ["Validator and oracle compromise", "Trust models that fail if a threshold of validators or oracles collude or get compromised. Most bridge security comes down to this assumption."],
      ["Escape hatches and emergency procedures", "Mechanisms that exist to recover from failure but introduce new exploit paths if their authorization or sequencing is wrong."],
    ],
  },
  {
    file: "services/l2-infrastructure.html",
    title: "L2 Infrastructure — Zero Cool",
    crumb: "Services / L2 Infrastructure",
    h1: "L2 security spans more than smart contracts.",
    lede: [
      "Layer-2 infrastructure combines smart contract security with deeper system-level concerns: sequencer logic, proof systems, data availability, escape hatches, validator and operator behavior. The contracts on L1 are only part of the attack surface. The Rust or Go binary running the sequencer, the zk circuit verifying state transitions, the data availability layer storing transaction batches — all of these can fail in ways that drain user funds without the L1 contracts ever appearing exploitable.",
      "Audit firms that only review Solidity miss most of this. Manual review across the full stack — circuits, sequencer code, L1 contracts — is so expensive that few teams do it before mainnet.",
    ],
    closerTitle: "Built on years of L2 work.",
    closer: "Kurt's expertise in L2 infrastructure is a core part of why Zero Cool can audit this category. Both founders spent years at Spearbit and Certora reviewing L2 designs and proof systems. Through Offbeat Security they worked with Optimism and zkSync, two of the most studied L2 systems in the field. The patterns they learned — sequencer compromise scenarios, proof system edge cases, escape hatch flaws — are embedded into how the agents prioritize across the full L2 stack.",
    threats: [
      ["Sequencer correctness", "Ordering, censorship resistance, and escape hatch enforcement that determine whether users can exit independent of the operator."],
      ["Proof system bugs", "Constraint underdetermination in zk circuits, malleability, and edge cases in fault proofs that let invalid state transitions through unchallenged."],
      ["Data availability", "Assumptions about what data must be published, and what fails — silently or otherwise — if it isn't."],
      ["L1 bridge contracts", "Deposit and withdrawal correctness, including the path where withdrawals depend on proof system output rather than direct contract logic."],
      ["Operator key management", "Sequencer keys, prover keys, and multi-sig setups for upgradeability, where centralized failure becomes systemic risk."],
      ["State root validation", "Whether state roots committed to L1 actually reflect verifiable computation, or whether the verifier accepts roots it shouldn't."],
    ],
  },
  {
    file: "services/formal-verification.html",
    title: "Formal Verification — Zero Cool",
    crumb: "Services / Formal Verification",
    h1: "Prove what matters. Find what doesn't.",
    lede: [
      "Some bugs are hard to find by review or by fuzzing: the ones that only appear in specific state combinations, the ones that violate an invariant nobody thought to write down, the ones in math-heavy contracts where precision matters more than execution path coverage. Formal verification is how serious protocols prove these properties hold for every possible input, not just the ones that came up in testing.",
      "The cost of formal methods has historically been the bottleneck: writing specs, mapping invariants to provers, debugging counter-examples. The protocols that invest in it anyway are the ones that don't get exploited the way DeFi did in 2022 and 2023.",
    ],
    closerTitle: "Built by ex-Certora researchers.",
    closer: "Both founders were Lead Security Researchers at Certora, the team behind one of the industry's leading formal verification platforms. The work they did there, helping protocols write specs that actually catch bugs, is the same work the agents now help orchestrate. Formal verification is a craft. Zero Cool encodes the craft into how its agents pick properties, structure proofs, and reason about counter-examples.",
    threatsTitle: "Properties worth proving.",
    threats: [
      ["Accounting invariants", "Total supply, share-to-asset relationships, and value-preservation properties that must hold across every state transition. Proof beats coverage when money is on the line."],
      ["Access control", "Who can call what under which conditions, expressed as provable properties rather than tested code paths. Tests confirm what you remembered to check; proofs confirm everything else too."],
      ["Math-heavy contracts", "Pricing curves, AMM math, and compound interest where edge cases hide in bounds. Proving the math means catching what fuzzing won't reach."],
      ["State machines", "Lifecycle transitions in protocols where invalid sequences must be impossible, not just unhandled. Liveness and safety as proven properties."],
      ["Integration contracts", "Properties about how your protocol behaves when called by arbitrary external code, invariants that can't be confirmed by reviewing your contracts in isolation."],
      ["Cryptographic protocols", "Signature schemes, hash chains, and Merkle proofs where correctness depends on assumptions about underlying primitives."],
    ],
  },
];

for (const s of services) {
  const threats = s.threats
    .map(
      (t, i) => `<article class="threat reveal"><b>${String(i + 1).padStart(2, "0")}</b><div><h3>${esc(t[0])}</h3><p>${esc(t[1])}</p></div></article>`
    )
    .join("");
  const main = `<section class="page"><div class="wrap">
    <div class="kicker"><i>//</i> ${esc(s.crumb)}</div>
    <h1 class="h-section">${esc(s.h1)}</h1>
    ${s.lede.map((p) => `<p class="lede">${esc(p)}</p>`).join("")}
  </div></section>
  <section class="section"><div class="wrap">
    <div class="kicker"><i>//</i> Attack surface</div>
    <h2 class="h-section">${esc(s.threatsTitle || "Where the bugs hide.")}</h2>
    <div class="threats">${threats}</div>
  </div></section>
  <section class="section"><div class="wrap">
    <h2 class="h-section">${esc(s.closerTitle)}</h2>
    <p class="copy">${esc(s.closer)}</p>
  </div></section>`;
  write(s.file, page({ root: "../", title: s.title, description: s.h1, active: "services", main }));
}

const about = `<section class="page"><div class="wrap">
  <div class="kicker"><i>//</i> About</div>
  <h1 class="h-section">Built by researchers who've found these bugs by hand.</h1>
  <p class="lede">Zero Cool was founded by two security researchers who spent years finding exploit-grade vulnerabilities in production smart contracts by hand. Their work at Trail of Bits, Spearbit, Certora, and their own boutique firm Offbeat Security shaped how the agents reason and verify today. The product is the codification of patterns they learned auditing protocols manually.</p>
</div></section>
<section class="section"><div class="wrap">
  <div class="kicker"><i>//</i> Founders.</div>
  <div class="person-list">
    <article class="person">
      <div class="avatar">RH</div>
      <div>
        <div class="who"><h3>Richie Humphrey</h3><a href="https://github.com/devtooligan" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://x.com/ZeroCoolAI_x" target="_blank" rel="noopener noreferrer">@devtooligan</a></div>
        <p class="role">Co-founder · Research Lead</p>
        <p class="copy" style="margin-top:0.8rem">Richie met Kurt at Trail of Bits on the blockchain security team. He went on to become a Lead Security Researcher at Certora and Spearbit before co-founding Offbeat Security, a boutique audit firm with clients including Uniswap, Optimism, and zkSync.</p>
        <p class="copy">Before crypto, Richie spent his early career at Deloitte as a CPA and at Morgan Stanley in credit derivative risk management. He pivoted to web3 in 2021 and is one of the more recognized security engineers in the EVM community.</p>
        <p class="copy">At Zero Cool he leads research — embedding the patterns he learned auditing protocols by hand into how the agents reason, prioritize, and verify.</p>
      </div>
    </article>
    <article class="person">
      <div class="avatar">KW</div>
      <div>
        <div class="who"><h3>Kurt Willis</h3><a href="https://github.com/0xPhaze" target="_blank" rel="noopener noreferrer">GitHub</a></div>
        <p class="role">Co-founder · Technical Lead</p>
        <p class="copy" style="margin-top:0.8rem">Kurt's background combines machine learning research at Fraunhofer with deep expertise in smart contracts and layer-2 infrastructure. He met Richie at Trail of Bits, became a Lead Security Researcher at Certora and Spearbit, and co-founded Offbeat Security alongside him.</p>
        <p class="copy">His work spans EVM security, smart contract auditing, and the harder edge cases that emerge in layer-2 infrastructure — sequencers, proof systems, and bridge contracts.</p>
        <p class="copy">At Zero Cool he leads the technical architecture, fusing his ML background with the security domain knowledge they built up over years of hand audits.</p>
      </div>
    </article>
  </div>
</div></section>`;

write("about.html", page({
  root: "",
  title: "About — Zero Cool",
  description: "Zero Cool was founded by two security researchers from Trail of Bits, Spearbit, and Certora.",
  active: "about",
  main: about,
}));

const subs = `<section class="page"><div class="wrap legal">
  <a class="back" href="index.html">← Back</a>
  <h1 class="h-section" style="margin-top:1.5rem">Subprocessors</h1>
  <p class="updated">Last updated: July 2026</p>
  <p>Zero Cool uses the third-party service providers listed below to deliver, operate, and improve the Services. These providers may process customer data solely for the purposes of providing services to Zero Cool.</p>
  <table>
    <thead><tr><th>Subprocessor</th><th>Purpose</th></tr></thead>
    <tbody>
      <tr><td>Amazon Web Services (AWS)</td><td>Cloud infrastructure and hosting</td></tr>
      <tr><td>GitHub</td><td>Source code hosting and development infrastructure</td></tr>
      <tr><td>OpenRouter</td><td>AI inference gateway and model routing</td></tr>
      <tr><td>OpenAI</td><td>Artificial intelligence models and inference</td></tr>
      <tr><td>Anthropic</td><td>Artificial intelligence models and inference</td></tr>
    </tbody>
  </table>
  <p>In certain circumstances, Zero Cool may route requests through OpenRouter to additional third-party AI model providers to provide or improve the Services. These providers may include, but are not limited to, xAI, Google, DeepSeek, and other AI model providers supported by OpenRouter.</p>
  <p>Zero Cool reviews its subprocessors periodically and may add or remove providers as our infrastructure evolves. This page reflects our current list of subprocessors and may be updated from time to time.</p>
</div></section>`;

write("subprocessors.html", page({
  root: "",
  title: "Subprocessors — Zero Cool",
  description: "Third-party service providers Zero Cool uses to deliver the Services.",
  active: "",
  main: subs,
}));

function blocksToHtml(text, h1) {
  const chunks = text.trim().split(/\n{2,}/);
  let html = `<a class="back" href="index.html">← Back</a><h1 class="h-section" style="margin-top:1.5rem">${esc(h1)}</h1>`;
  for (const raw of chunks) {
    const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    const joined = lines.join(" ");
    if (/^←/.test(joined) || joined.toUpperCase() === h1.toUpperCase()) continue;
    if (/^last updated/i.test(lines[0])) {
      html += `<p class="updated">${esc(lines[0])}</p>`;
      continue;
    }
    if (/^\d+\.\s/.test(lines[0]) && lines.length === 1) {
      const title = lines[0].replace(/\s+/g, " ");
      const pretty = title.replace(/^(\d+\.\s+)(.+)$/, (_, n, rest) => n + rest.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase()));
      html += `<h2>${esc(pretty)}</h2>`;
      continue;
    }
    if (lines.length === 1 && lines[0].length < 48 && !/[.!?]$/.test(lines[0]) && !lines[0].includes("@")) {
      html += `<h3>${esc(lines[0])}</h3>`;
      continue;
    }
    if (lines.length > 1 && lines.every((l) => /[.;]$/.test(l))) {
      html += `<ul>${lines.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>`;
      continue;
    }
    for (const line of lines) html += `<p>${esc(line)}</p>`;
  }
  return `<section class="page"><div class="wrap legal">${html}</div></section>`;
}

const termsData = JSON.parse(fs.readFileSync("sections.json", "utf8"))["srcpages/terms.html"];
let termsHtml = `<a class="back" href="index.html">← Back</a><h1 class="h-section" style="margin-top:1.5rem">Terms of Service</h1><p class="updated">Last updated: July 13, 2026</p>`;
for (const section of termsData) {
  if (section.title.toLowerCase().includes("find what others")) continue;
  termsHtml += `<h2>${esc(section.title)}</h2>`;
  let list = [];
  const flush = () => {
    if (!list.length) return;
    termsHtml += `<ul>${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
    list = [];
  };
  for (const item of section.paras) {
    if (item.type === "li") list.push(item.text);
    else {
      flush();
      termsHtml += item.type === "pre" ? `<pre>${esc(item.text)}</pre>` : `<p>${esc(item.text)}</p>`;
    }
  }
  flush();
}
write("terms.html", page({
  root: "",
  title: "Terms of Service — Zero Cool",
  description: "Terms of Service for Zero Cool.",
  active: "",
  main: `<section class="page"><div class="wrap legal">${termsHtml}</div></section>`,
}));

const privacy = fs.readFileSync("content/privacy.txt", "utf8");
write("privacy.html", page({
  root: "",
  title: "Privacy Policy — Zero Cool",
  description: "How Zero Cool collects, uses, and protects personal information.",
  active: "",
  main: blocksToHtml(privacy, "Privacy Policy"),
}));

const docs = `<section class="page"><div class="wrap docs-layout">
  <aside class="docs-side">
    <a href="#overview">Overview</a>
    <a href="#keys">Create an API key</a>
    <a href="#quickstart">Quickstart</a>
    <a href="#agent">Agent workflow</a>
    <a href="#endpoints">Endpoints</a>
    <a href="#errors">Errors</a>
    <a href="#notes">Operational notes</a>
  </aside>
  <article class="legal">
    <div class="kicker"><i>//</i> Docs / Scan API</div>
    <h1 class="h-section">Initiate scans, poll status, and fetch findings</h1>
    <p class="lede">The Zero Cool Scan API lets a workspace API key initiate scans, read scan results, and continue failed scans from external tools and coding agents.</p>

    <h2 id="overview">Overview</h2>
    <h3>Workspace API Key</h3>
    <p>Create a workspace-scoped key in Workspace Administration. The key can only see scans for its workspace.</p>
    <h3>Initiate Scans</h3>
    <p>Start a scan by sending the repository URL and target commit. Include a base commit when you want a diff review.</p>
    <h3>Read Scan Results</h3>
    <p>List scans, fetch one scan by ID, and read findings once Zero Cool completes the scan.</p>
    <h3>Continue Failed Scans</h3>
    <p>Queue a continuation when a failed scan has saved runtime state.</p>

    <h2 id="keys">Create an API key</h2>
    <p>Create keys from the Zero Cool web app. The secret appears once, so store it before leaving the page.</p>
    <ul>
      <li>Open the workspace selector in the upper-right corner, then click the gear icon next to the workspace.</li>
      <li>Choose Workspace Administration, then open Scan API Keys.</li>
      <li>Enter a key name, choose the permissions, and click Create key. Copy the secret immediately.</li>
      <li>Set read access to This workspace. Leave Allow scan starts enabled when the key should start scans.</li>
    </ul>
    <p>Treat the API key like a password. Do not paste it into source files, issue comments, logs, or public chat.</p>

    <h2 id="quickstart">Quickstart</h2>
    <p>A diff review compares a head commit against a base commit. Diff-review-only workspaces reject requests that omit base_commit.</p>
    <pre>export ZC_API_KEY="zc_..."
export ZC_API_BASE="https://api.zerocool.ai/api/v1"

curl -sS -X POST "$ZC_API_BASE/scans" \\
  -H "Authorization: Bearer $ZC_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "repository_url": "https://github.com/Uniswap/v4-periphery",
    "git_branch": "margin-trading",
    "git_commit": "1db2c5dad1da882ad50533d8832adec3bfc7a929",
    "base_commit": "363226d9e1e2180b67bf6857023dbaad751010c5",
    "scan_name": "Zero Cool diff review"
  }'</pre>
    <pre>{
  "scan_id": "b8c96174-6b66-426a-abf3-f93a086e7dff",
  "status": "queued"
}</pre>
    <pre>curl -sS -H "Authorization: Bearer $ZC_API_KEY" \\
  "$ZC_API_BASE/scans/&lt;scan_id&gt;"</pre>

    <h2 id="agent">Agent workflow</h2>
    <p>Give the agent the API key through its environment, then give it the repository URL, head commit, and base commit.</p>
    <p>Use the Zero Cool Scan API. Start a Zero Cool diff review for this repository and commit range, poll until it completes, then include Zero Cool findings in the combined security review. Deduplicate Zero Cool findings against other tools by affected code area and exploit path.</p>
    <ul>
      <li>Require ZC_API_KEY and ZC_API_BASE.</li>
      <li>Send repository_url, git_commit, and base_commit for a diff review.</li>
      <li>Do not send scanner config, templates, lead generators, tags, workspace IDs, or credentials.</li>
      <li>Poll the returned scan_id until status is completed or failed.</li>
      <li>If a scan fails with error.retryable = true, offer continuation and handle a 400 rejection.</li>
      <li>Report the Zero Cool scan_id with the final summary.</li>
    </ul>

    <h2 id="endpoints">Endpoints</h2>
    <div class="endpoint"><span class="verb">POST</span><span class="path">/api/v1/scans</span></div>
    <p>Starts a scan for the API key workspace and returns a scan ID immediately. Include base_commit to start a diff review.</p>
    <table>
      <thead><tr><th>Field</th><th>Required</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td>repository_url</td><td>yes</td><td>GitHub HTTPS repository URL, such as https://github.com/Uniswap/v4-periphery.</td></tr>
        <tr><td>git_commit</td><td>yes</td><td>40-character head commit SHA to scan.</td></tr>
        <tr><td>base_commit</td><td>workspace-dependent</td><td>40-character base commit SHA. Include it to start a diff review. Diff-review-only workspaces reject requests that omit it.</td></tr>
        <tr><td>git_branch</td><td>no</td><td>Optional branch label for display and context. The server treats git_commit as authoritative.</td></tr>
        <tr><td>scan_name</td><td>no</td><td>Optional display name. Defaults to the repository name when omitted.</td></tr>
      </tbody>
    </table>
    <div class="endpoint"><span class="verb">GET</span><span class="path">/api/v1/scans</span></div>
    <p>Lists scans visible to the API key workspace, newest first.</p>
    <table>
      <thead><tr><th>Field</th><th>Required</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td>page</td><td>no</td><td>1-based page number. Defaults to 1.</td></tr>
        <tr><td>page_size</td><td>no</td><td>Results per page. Defaults to 100 and caps at 500.</td></tr>
        <tr><td>status</td><td>no</td><td>Optional scan status filter, such as completed, running, queued, or failed.</td></tr>
        <tr><td>branch</td><td>no</td><td>Optional exact git branch filter.</td></tr>
      </tbody>
    </table>
    <div class="endpoint"><span class="verb">GET</span><span class="path">/api/v1/scans/{scan_id}</span></div>
    <p>Returns one scan plus its error object and findings. Statuses are queued, running, completed, or failed. Completed scans include findings when Zero Cool produced them. Failed scans include error.message and error.retryable.</p>
    <table>
      <thead><tr><th>Finding field</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td>id</td><td>Finding identifier.</td></tr>
        <tr><td>title</td><td>Finding title.</td></tr>
        <tr><td>severity</td><td>Critical, High, Medium, Low, Informational, or null.</td></tr>
        <tr><td>impact</td><td>Impact rating when available.</td></tr>
        <tr><td>likelihood</td><td>Likelihood rating when available.</td></tr>
        <tr><td>summary</td><td>One-paragraph finding summary when available.</td></tr>
        <tr><td>content</td><td>Full finding write-up in Markdown when available.</td></tr>
        <tr><td>status</td><td>Review status, such as none, todo, acknowledged, unresolved, or resolved.</td></tr>
        <tr><td>created_at</td><td>Finding creation timestamp.</td></tr>
      </tbody>
    </table>
    <div class="endpoint"><span class="verb">POST</span><span class="path">/api/v1/scans/{scan_id}/continue</span></div>
    <p>Queues a continuation of a failed same-workspace scan. The server uses the original repository, commit, config template, worker config, and saved scan state.</p>
    <pre>curl -sS -X POST "$ZC_API_BASE/scans/&lt;scan_id&gt;/continue" \\
  -H "Authorization: Bearer $ZC_API_KEY"</pre>

    <h2 id="errors">Errors</h2>
    <p>Every error uses this envelope:</p>
    <pre>{ "error": "human-readable message" }</pre>
    <table>
      <thead><tr><th>Status</th><th>Meaning</th></tr></thead>
      <tbody>
        <tr><td>400</td><td>Invalid request, missing base_commit for a diff-review-only workspace, invalid commits, unsupported fields, or a continuation request the server cannot accept.</td></tr>
        <tr><td>401</td><td>Missing, malformed, expired, revoked, or invalid API key.</td></tr>
        <tr><td>402</td><td>Workspace cannot initiate a new scan. Contact Zero Cool if this persists.</td></tr>
        <tr><td>403</td><td>API key lacks the required permission.</td></tr>
        <tr><td>404</td><td>Scan is missing, deleted, or outside the API key workspace.</td></tr>
        <tr><td>429</td><td>Rate limit exceeded. Respect the Retry-After header when present.</td></tr>
      </tbody>
    </table>

    <h2 id="notes">Operational notes</h2>
    <ul>
      <li>API keys are workspace-scoped. A key sees only scans for its workspace.</li>
      <li>Maximum 10 requests per minute per key.</li>
      <li>Accepted scans appear in the list immediately as queued.</li>
    </ul>
  </article>
</div></section>`;

write("docs.html", page({
  root: "",
  title: "Scan API — Zero Cool",
  description: "Initiate scans, poll status, and fetch findings with the Zero Cool Scan API.",
  active: "docs",
  main: docs,
}));

console.log("done");
