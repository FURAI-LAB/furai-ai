import { OFFICIAL_PORTRAIT_DATA } from "../lib/officialPortraits.generated"
import { uiScript } from "./script"
import { uiStyles } from "./styles"

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export function renderWelcomeUI(): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>FURAI — AI interface to Velorum</title>
  <meta name="description" content="FURAI is the AI interface for entering Velorum, a living archive system with memory, crew records, sealed lore, and meditation mode." />
  <link rel="canonical" href="https://furai.space/" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://furai.space/" />
  <meta property="og:title" content="FURAI — AI interface to Velorum" />
  <meta property="og:description" content="Enter Velorum through FURAI: a conversational archive interface with memory, crew records, sealed lore, and meditation mode." />
  <meta property="og:site_name" content="FURAI" />
  <meta property="og:image" content="https://furai.space/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="FURAI — AI interface to Velorum" />
  <meta name="twitter:description" content="Enter Velorum through FURAI: a conversational archive interface with memory, crew records, sealed lore, and meditation mode." />
  <meta name="twitter:image" content="https://furai.space/og-image.png" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FURAI",
    "url": "https://furai.space",
    "description": "AI interface to Velorum — a living archive system with memory, crew records, sealed lore, and meditation mode.",
    "applicationCategory": "EntertainmentApplication",
    "applicationSubCategory": "AI Chat Interface",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free access tier available; deeper proximity tiers unlock via USDT (TRC-20)."
    },
    "publisher": {
      "@type": "Organization",
      "name": "FURAI LAB",
      "url": "https://furai.space"
    }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FURAI",
    "url": "https://furai.space"
  }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/ai/styles.css" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="icon" href="/icons/favicon-32.png" sizes="32x32" type="image/png" />
  <link rel="icon" href="/icons/favicon-16.png" sizes="16x16" type="image/png" />
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
  <meta name="theme-color" content="#0a0a0a" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="FURAI" />
</head>
<body class="welcomePage">
  <div class="nebula" aria-hidden="true"></div>
  <div class="grain" aria-hidden="true"></div>
  <div class="grid" aria-hidden="true"></div>
  <div class="scanline" aria-hidden="true"></div>

  <main class="welcomeShell" aria-label="FURAI welcome screen">
    <div class="welcomeMark" aria-hidden="true">
      <span></span>
      <i></i>
      <span></span>
    </div>

    <p class="welcomeKicker">AI INTERFACE // VELORUM ARCHIVE</p>
    <h1>FURAI</h1>
    <p class="welcomeCopy">Enter Velorum through FURAI: ask the archive, follow crew records, and return to a signal that remembers you.</p>

    <nav class="welcomeActions" aria-label="Primary actions">
      <a class="frameButton" href="/ai">
        <span class="frameButton-inner">open terminal</span>
      </a>
      <a class="frameButton frameButton-secondary" href="/proximity">
        <span class="frameButton-inner">choose proximity</span>
      </a>
    </nav>

    <div class="welcomeMeta" aria-hidden="true">
      <span>PRODUCT · FURAI</span>
      <span>WORLD SYSTEM · VELORUM</span>
      <span>STATUS · ARCHIVE READY</span>
    </div>

    <footer class="siteFooter" aria-label="Site info">
      <span>built by</span>
      <a href="https://lab.furai.space" target="_blank" rel="noopener noreferrer">FURAI LAB</a>
    </footer>
  </main>
</body>
</html>`
}

export function renderProximityUI(bybitUsdtAddress: string): string {
  const safeAddress = escapeHtml(bybitUsdtAddress)

  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>FURAI Proximity — Interaction Modes</title>
  <meta name="description" content="Choose how close FURAI should remain: live contact, remembered context, or deeper Velorum archive access." />
  <link rel="canonical" href="https://furai.space/proximity" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://furai.space/proximity" />
  <meta property="og:title" content="FURAI Proximity — Interaction Modes" />
  <meta property="og:description" content="Choose how close FURAI should remain: live contact, remembered context, or deeper Velorum archive access." />
  <meta property="og:site_name" content="FURAI" />
  <meta property="og:image" content="https://furai.space/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="FURAI Proximity — Interaction Modes" />
  <meta name="twitter:description" content="Choose how close FURAI should remain: live contact, remembered context, or deeper Velorum archive access." />
  <meta name="twitter:image" content="https://furai.space/og-image.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/ai/styles.css" />
</head>
<body class="proximityPage">
  <div class="nebula" aria-hidden="true"></div>
  <div class="grain" aria-hidden="true"></div>
  <div class="grid" aria-hidden="true"></div>
  <div class="scanline" aria-hidden="true"></div>

  <main class="proximityShell" aria-label="FURAI proximity">
    <nav class="proximityNav" aria-label="Proximity navigation">
      <a class="terminalNavLink terminalNavLink-primary" href="/">return to welcome</a>
      <a class="terminalNavLink" href="/ai">open terminal</a>
    </nav>

    <div class="proximityHeader">
      <p class="welcomeKicker">FURAI PROXIMITY</p>
      <h1>Choose proximity</h1>
      <p>Each mode changes how close the archive stays: live contact, remembered continuity, or deeper Velorum access.</p>
    </div>

    <section class="proximityModes" aria-label="Interaction modes">
      <article class="proximityMode">
        <span class="tierIndex">I</span>
        <strong>DRIFT</strong>
        <span class="tierPrice">Free</span>
        <span class="tierText">12 transmissions per day</span>
        <span class="tierText">Velorum remembers your name only</span>
        <span class="tierText">Crew photos and visual archive: locked</span>
        <span class="tierText">Deep archive access: locked</span>
        <a class="tierAction" href="/ai">start drift</a>
      </article>

      <article class="proximityMode">
        <span class="tierIndex">II</span>
        <strong>SIGNAL</strong>
        <span class="tierPrice">9 USDT/month</span>
        <span class="tierText">80 transmissions per day</span>
        <span class="tierText">Velorum remembers you: name, dialog history, interests</span>
        <span class="tierText">Crew photos and lore visuals: unlocked</span>
        <span class="tierText">Deep archive: not included</span>
        <a class="tierAction" href="#proximity-payment">activate signal</a>
      </article>

      <article class="proximityMode proximityMode-featured">
        <span class="tierIndex">III</span>
        <strong>ARCHIVE</strong>
        <span class="tierPrice">20 USDT/month</span>
        <span class="tierText">Unlimited transmissions</span>
        <span class="tierText">Full persistent memory across all sessions</span>
        <span class="tierText">All visuals + rare scene generation</span>
        <span class="tierText">Full archive record and deep vector search</span>
        <span class="tierText">Session recall from past dialogues</span>
        <a class="tierAction" href="#proximity-payment">activate archive</a>
      </article>
    </section>

    <section class="proximityPayment" id="proximity-payment" aria-label="Activate proximity">
      <div class="paymentHeader">
        <p class="welcomeKicker">PROXIMITY ACTIVATION</p>
        <h2>Activate proximity</h2>
      </div>

      <div class="paymentTierPicker" id="tier-picker">
        <button type="button" class="tierPickBtn" data-tier="signal" data-amount="9">
          <span class="tierPickName">SIGNAL</span>
          <span class="tierPickPrice">9 / month</span>
        </button>
        <button type="button" class="tierPickBtn" data-tier="archive" data-amount="20">
          <span class="tierPickName">ARCHIVE</span>
          <span class="tierPickPrice">20 / month</span>
        </button>
      </div>

      <div class="paymentQrBlock" id="qr-block" hidden>
        <canvas id="qr-canvas" width="180" height="180" aria-label="Payment QR code"></canvas>
        <div class="usdtAddress">
          <code id="pay-addr"></code>
          <button type="button" data-copy-address>Copy</button>
        </div>
        <p class="paymentNote" id="pay-note"></p>

        <button type="button" class="paymentSentBtn" id="pay-sent-btn">
          I sent payment — find my transaction
        </button>
      </div>

      <div id="pay-status-banner" class="paymentBanner" hidden></div>

      <div class="paymentAutoConfirm" id="auto-confirm" hidden>
        <p class="paymentNote">Transaction found:</p>
        <code id="auto-txid"></code>
        <button type="button" id="auto-submit-btn">Activate proximity</button>
      </div>

      <div class="paymentManual" id="manual-fallback" hidden>
        <p class="paymentNote">Transaction not detected automatically. Enter it manually:</p>
        <input
          id="txid-input"
          type="text"
          placeholder="Transaction hash (txid)"
          autocomplete="off"
          spellcheck="false"
        />
        <input
          id="amount-input"
          type="number"
          step="0.01"
          min="1"
          placeholder="Amount sent"
        />
        <button type="button" id="manual-submit-btn">Submit manually</button>
      </div>

      <div class="restoreAccess" id="restore-access">
        <p class="restoreLabel">Already paid? Restore your access:</p>
        <div class="restoreRow">
          <input
            id="restore-input"
            type="text"
            placeholder="Paste your access token here"
            autocomplete="off"
            spellcheck="false"
          />
          <button type="button" id="restore-btn">Restore</button>
        </div>
        <div id="restore-status" class="restoreStatus" hidden></div>
      </div>

      <p class="paymentFootnote">
        TRON network only. Do not send on ETH, BSC, or other networks.<br />
        Access activates automatically after transaction confirmation (~30 sec).
      </p>

      <script type="application/json" id="pay-addresses">
        {"usdt":"${safeAddress}"}
      </script>
    </section>
  </main>
  <script src="/proximity/qrcode-lib.js"></script>
  <script src="/proximity/script.js" defer></script>
</body>
</html>`
}

export function renderProximityScript(): string {
  return /* js */ `'use strict';

function buildVisitorToken() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID().replace(/-/g, '');
  }
  var t = Date.now().toString(36);
  var r1 = Math.random().toString(36).replace('0.', '');
  var r2 = Math.random().toString(36).replace('0.', '');
  return (t + r1 + r2).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32);
}

function getOrCreateVisitorToken() {
  var KEY = 'furai_visitor_token';
  try {
    var stored = window.localStorage.getItem(KEY);
    if (stored && /^[a-zA-Z0-9_-]{16,128}$/.test(stored)) return stored;
    var token = buildVisitorToken();
    window.localStorage.setItem(KEY, token);
    return token;
  } catch (e) {
    return buildVisitorToken();
  }
}


function renderQR(canvas, text) {
  var qr = qrcode(0, 'M');
  qr.addData(text, 'Byte');
  qr.make();
  var size = qr.getModuleCount();
  var scale = Math.floor(180 / size);
  var offset = Math.floor((180 - size * scale) / 2);
  canvas.width = 180; canvas.height = 180;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 180, 180);
  ctx.fillStyle = '#000';
  for (var r = 0; r < size; r++) {
    for (var c = 0; c < size; c++) {
      if (qr.isDark(r, c)) ctx.fillRect(offset + c * scale, offset + r * scale, scale, scale);
    }
  }
}

var USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

function pollTronScan(address, contract, expectedAmount, onFound, onTimeout) {
  var startTs = Math.floor(Date.now() / 1000) - 60;
  var deadline = Date.now() + 90000;
  var interval = 6000;

  function check() {
    if (Date.now() > deadline) { onTimeout(); return; }
    var url = 'https://apilist.tronscanapi.com/api/token_trc20/transfers'
      + '?toAddress=' + encodeURIComponent(address)
      + '&contract_address=' + encodeURIComponent(contract)
      + '&limit=5&start=0';

    fetch(url, { headers: { 'Accept': 'application/json' } })
      .then(function(r) { return r.ok ? r.json() : null; })
      .then(function(data) {
        if (!data || !Array.isArray(data.token_transfers)) {
          setTimeout(check, interval); return;
        }
        var found = null;
        for (var i = 0; i < data.token_transfers.length; i++) {
          var tx = data.token_transfers[i];
          if (!tx.confirmed) continue;
          var txTime = tx.block_ts ? Math.floor(tx.block_ts / 1000) : 0;
          if (txTime < startTs - 120) continue;
          var decimals = tx.tokenInfo && tx.tokenInfo.tokenDecimal ? parseInt(tx.tokenInfo.tokenDecimal) : 6;
          var rawAmount = tx.quant || tx.amount_str || '0';
          var amount = parseFloat(rawAmount) / Math.pow(10, decimals);
          if (amount >= expectedAmount * 0.95) { found = tx; break; }
        }
        if (found) {
          onFound(found.transaction_id, found);
        } else {
          setTimeout(check, interval);
        }
      })
      .catch(function() { setTimeout(check, interval); });
  }

  setTimeout(check, 2000);
}

(function () {
  function init() {
    var banner        = document.getElementById('pay-status-banner');
    var tierPicker    = document.getElementById('tier-picker');
    var qrBlock       = document.getElementById('qr-block');
    var qrCanvas      = document.getElementById('qr-canvas');
    var payAddr       = document.getElementById('pay-addr');
    var payNote       = document.getElementById('pay-note');
    var sentBtn       = document.getElementById('pay-sent-btn');
    var autoConfirm   = document.getElementById('auto-confirm');
    var autoTxid      = document.getElementById('auto-txid');
    var autoSubmit    = document.getElementById('auto-submit-btn');
    var manualFall    = document.getElementById('manual-fallback');
    var txidInput     = document.getElementById('txid-input');
    var amountInput   = document.getElementById('amount-input');
    var manualSubmit  = document.getElementById('manual-submit-btn');
    var copyBtn       = document.querySelector('[data-copy-address]');
    var restoreBtn    = document.getElementById('restore-btn');
    var restoreInput  = document.getElementById('restore-input');
    var restoreStatus = document.getElementById('restore-status');

    var addressData = { usdt: '' };
    try {
      var raw = document.getElementById('pay-addresses');
      if (raw) addressData = JSON.parse(raw.textContent || '{}');
    } catch(e) {}

    var state = { tier: null, amount: 0, address: '', contract: USDT_CONTRACT };

    function showBanner(msg, isError) {
      banner.textContent = msg;
      banner.hidden = false;
      banner.dataset.state = isError ? 'error' : 'success';
    }

    function updateQR() {
      state.address = addressData.usdt;
      state.contract = USDT_CONTRACT;
      if (!state.address || !state.tier) return;
      renderQR(qrCanvas, state.address);
      payAddr.textContent = state.address;
      payNote.innerHTML = 'Send exactly <b>' + state.amount + ' USDT</b> (TRC-20) to this address.<br/>Scan QR or copy the address into your wallet.';
    }

    var tierBtns = document.querySelectorAll('.tierPickBtn');
    for (var i = 0; i < tierBtns.length; i++) {
      tierBtns[i].addEventListener('click', function() {
        for (var j = 0; j < tierBtns.length; j++) tierBtns[j].classList.remove('active');
        this.classList.add('active');
        state.tier = this.dataset.tier;
        state.amount = parseInt(this.dataset.amount);
        qrBlock.hidden = false;
        autoConfirm.hidden = true;
        manualFall.hidden = true;
        sentBtn.disabled = false;
        sentBtn.textContent = 'I sent payment — find my transaction';
        banner.hidden = true;
        updateQR();
        qrBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }

    copyBtn && copyBtn.addEventListener('click', function() {
      if (!state.address) return;
      navigator.clipboard.writeText(state.address).then(function() {
        copyBtn.textContent = 'Copied';
        setTimeout(function() { copyBtn.textContent = 'Copy'; }, 1800);
      }).catch(function() { showBanner('Could not copy. Select manually.', true); });
    });

    var visitorToken = getOrCreateVisitorToken();

    if (visitorToken) {
      fetch('/api/pay/status?visitor_token=' + encodeURIComponent(visitorToken))
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (data.status === 'active') {
            showBanner('Proximity active: ' + data.tier.toUpperCase() + ' — access granted.', false);
            tierPicker.style.display = 'none';
          } else if (data.status === 'pending') {
            showBanner('Payment received — awaiting confirmation. Usually within 1 hour.', false);
          }
        }).catch(function() {});
    }

    sentBtn.addEventListener('click', function() {
      if (!state.tier || !state.address) return;
      sentBtn.disabled = true;
      sentBtn.textContent = 'Scanning blockchain...';
      showBanner('Searching for your transaction (up to 90 sec)…', false);
      banner.dataset.state = 'info';

      pollTronScan(
        state.address,
        state.contract,
        state.amount,
        function(txid) {
          banner.hidden = true;
          autoTxid.textContent = txid;
          autoConfirm.hidden = false;
          autoConfirm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        },
        function() {
          banner.hidden = true;
          manualFall.hidden = false;
          if (amountInput) amountInput.value = state.amount;
          manualFall.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      );
    });

    function submitPayment(txid, amount) {
      return fetch('/api/pay/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitor_token: visitorToken,
          tier: state.tier,
          txid: txid,
          amount_usdt: parseFloat(amount),
        }),
      }).then(function(r) { return r.json(); });
    }

    function onPayResult(data, btn, origLabel) {
      if (data.ok) {
        showBanner('✓ ' + (data.tier || state.tier).toUpperCase() + ' activated. Welcome to Velorum.', false);
        var box = document.createElement('div');
        box.className = 'tokenSaveBox';
        box.innerHTML = '<p class="tokenSaveLabel">⚠️ Save your access token — needed to restore access in another browser:</p><code id="token-display">' + visitorToken + '</code><button type="button" id="copy-token-btn">Copy token</button>';
        banner.parentNode.insertBefore(box, banner.nextSibling);
        document.getElementById('copy-token-btn').addEventListener('click', function() {
          navigator.clipboard.writeText(visitorToken).then(function() {
            document.getElementById('copy-token-btn').textContent = 'Copied!';
          }).catch(function() {
            document.getElementById('copy-token-btn').textContent = 'Copy manually';
          });
        });
        tierPicker.style.display = 'none';
        qrBlock.hidden = true;
        autoConfirm.hidden = true;
        manualFall.hidden = true;
      } else {
        showBanner('Error: ' + (data.error || 'unknown error'), true);
        if (btn) { btn.disabled = false; btn.textContent = origLabel; }
      }
    }

    autoSubmit.addEventListener('click', function() {
      var txid = autoTxid.textContent.trim();
      autoSubmit.disabled = true;
      autoSubmit.textContent = 'Activating...';
      submitPayment(txid, state.amount)
        .then(function(data) { onPayResult(data, autoSubmit, 'Activate proximity'); })
        .catch(function() {
          showBanner('Network error. Please try again.', true);
          autoSubmit.disabled = false;
          autoSubmit.textContent = 'Activate proximity';
        });
    });

    manualSubmit.addEventListener('click', function() {
      var txid = (txidInput.value || '').trim();
      var amount = parseFloat(amountInput.value) || state.amount;
      if (!txid || !/^[a-zA-Z0-9_-]{16,128}$/.test(txid)) {
        showBanner('Invalid transaction ID.', true); return;
      }
      manualSubmit.disabled = true;
      manualSubmit.textContent = 'Submitting...';
      submitPayment(txid, amount)
        .then(function(data) { onPayResult(data, manualSubmit, 'Submit manually'); })
        .catch(function() {
          showBanner('Network error. Please try again.', true);
          manualSubmit.disabled = false;
          manualSubmit.textContent = 'Submit manually';
        });
    });

    restoreBtn.addEventListener('click', function() {
      var token = restoreInput.value.trim();
      if (!/^[a-zA-Z0-9_-]{16,128}$/.test(token)) {
        restoreStatus.textContent = 'Invalid token format.';
        restoreStatus.hidden = false; return;
      }
      restoreBtn.disabled = true; restoreBtn.textContent = 'Checking...';
      fetch('/api/pay/status?visitor_token=' + encodeURIComponent(token))
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (data.status === 'active') {
            try { window.localStorage.setItem('furai_visitor_token', token); } catch(e) {}
            restoreStatus.textContent = '✅ Access restored! Tier: ' + data.tier.toUpperCase() + '. Reloading...';
            restoreStatus.hidden = false;
            setTimeout(function() { window.location.reload(); }, 1500);
          } else if (data.status === 'pending') {
            restoreStatus.textContent = 'Payment found but not yet confirmed.';
            restoreStatus.hidden = false;
            restoreBtn.disabled = false; restoreBtn.textContent = 'Restore';
          } else {
            restoreStatus.textContent = 'Token not found or access has expired.';
            restoreStatus.hidden = false;
            restoreBtn.disabled = false; restoreBtn.textContent = 'Restore';
          }
        })
        .catch(function() {
          restoreStatus.textContent = 'Network error. Please try again.';
          restoreStatus.hidden = false;
          restoreBtn.disabled = false; restoreBtn.textContent = 'Restore';
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
`
}
export function renderUI(): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>FURAI Terminal — Velorum Archive</title>
  <meta name="description" content="FURAI is the AI interface for entering Velorum, a living archive system. Ask questions, explore crew records, and return to a remembered signal." />
  <link rel="canonical" href="https://furai.space/ai" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://furai.space/ai" />
  <meta property="og:title" content="FURAI Terminal — Velorum Archive" />
  <meta property="og:description" content="Enter Velorum through FURAI: an AI archive interface with memory, lore, and meditative signal mode." />
  <meta property="og:site_name" content="FURAI" />
  <meta property="og:image" content="https://furai.space/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="FURAI Terminal — Velorum Archive" />
  <meta name="twitter:description" content="Enter Velorum through FURAI: an AI archive interface with memory, lore, and meditative signal mode." />
  <meta name="twitter:image" content="https://furai.space/og-image.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/ai/styles.css" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="icon" href="/icons/favicon-32.png" sizes="32x32" type="image/png" />
  <link rel="icon" href="/icons/favicon-16.png" sizes="16x16" type="image/png" />
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
  <meta name="theme-color" content="#0a0a0a" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="FURAI" />
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      });
    }
  </script>
</head>

<body>

<canvas id="stars" aria-hidden="true"></canvas>
<div class="vignette" aria-hidden="true"></div>
<div class="nebula" aria-hidden="true"></div>
<div id="ambientVisual" aria-hidden="true">
  <img id="ambientVisualImage" alt="" />
</div>
<div class="grain" aria-hidden="true"></div>
<div class="grid" aria-hidden="true"></div>
<div class="scanline" aria-hidden="true"></div>
<aside id="sceneVisual" aria-hidden="true">
  <div class="sceneFrame">
    <div class="sceneMetaRow">
      <div id="sceneVisualLabel" class="sceneLabel">ARCHIVE VISION // MATERIALIZING</div>
      <div id="sceneVisualTimer" class="sceneTimer" hidden></div>
    </div>
    <div class="sceneImageShell">
      <img id="sceneVisualImage" alt="" />
    </div>
    <div id="sceneVisualCaption" class="sceneCaption"></div>
  </div>
</aside>

<header id="header">
  <a id="welcomeReturn" class="headerLink" href="/" aria-label="Return to welcome screen">
    WELCOME
  </a>
</header>

<div id="meditationControlLayer">
  <button id="meditationToggle" class="meditationSwitch" type="button" role="switch" aria-checked="false" aria-pressed="false" aria-label="Meditation mode">
    <span class="meditationSwitch-inner">
      <span class="meditationSwitch-label">MEDITATION</span>
      <span class="meditationSwitch-track" aria-hidden="true">
        <span class="meditationSwitch-thumb"></span>
      </span>
    </span>
  </button>
</div>

<main id="terminalWrap">
  <section id="terminalShell" aria-label="FURAI interface to the Velorum archive">
    <div id="orientationPanel" aria-label="FURAI orientation">
      <div class="orientationKicker">AI INTERFACE // VELORUM ARCHIVE</div>
      <h1>FURAI</h1>
      <p>Enter Velorum through a conversational archive. Ask about the vessel, the missing crew, sealed records, or switch into meditation mode.</p>
      <p class="sr-only">FURAI is an AI terminal interface for exploring the Velorum archive: a conversational chat system with persistent memory, crew records, sealed lore entries, and a meditation mode for ambient interaction.</p>
    </div>

    <div id="terminalMeta" aria-label="Velorum archive controls">
      <div class="metaItem metaItem-passive">FURAI // LIVE</div>
      <button id="viikaaKeyButton" class="metaItem metaItemButton" type="button" aria-label="Show Chief Engineer Viikaa archive photo">
        CREW RECORD // VIIKAA
      </button>
      <button id="rithanKeyButton" class="metaItem metaItemButton" type="button" aria-label="Show Captain Rithan archive photo">
        CREW RECORD // RITHAN
      </button>
      <button id="encryptedKeyButton" class="metaItem metaItemButton metaItemButton-jp metaItemButton-encrypted" type="button" aria-label="Encrypted archive access">
        SEALED RECORD // 暗号化
      </button>
    </div>

    <div id="log" role="log" aria-live="polite" aria-label="Terminal output"></div>

    <div id="inputDock">
      <label class="inputLabel" for="input">ask FURAI</label>
      <div id="inputRow">
        <input
          id="input"
          type="text"
          placeholder="Ask about Velorum, Rithan, Viikaa, or the sealed archive..."
          autocomplete="off"
          spellcheck="false"
          aria-label="Message input"
        />
        <button id="send" class="frameButton" type="button" aria-label="Send message">
          <span class="frameButton-inner">send</span>
        </button>
      </div>
    </div>
  </section>
</main>

<div id="thinkingCore" aria-hidden="true"></div>

<audio id="meditationAudio" loop preload="none"></audio>

<script src="/ai/script.js" defer></script>

</body>
</html>`
}

export function renderUiStyles(): string {
  return uiStyles
}

export function renderUiScript(): string {
  return uiScript
    .replace(
      /'__CAPTAIN_RITHAN_PORTRAIT__'/g,
      JSON.stringify(OFFICIAL_PORTRAIT_DATA["captain-rithan"])
    )
    .replace(
      /'__CHIEF_ENGINEER_VIIKAA_PORTRAIT__'/g,
      JSON.stringify(OFFICIAL_PORTRAIT_DATA["chief-engineer-viikaa"])
    )
}
