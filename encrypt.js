const fs = require('fs');
const path = require('path');
const crypto = require('crypto').webcrypto;

async function encryptHtml(plainHtml, pin, options = {}) {
  const title = typeof options === 'string' ? options : (options.title || 'Protected Page');
  const subtitle = options.subtitle || 'Enter Passcode to View';
  const buildTs = (typeof options === 'object' && options.buildTs) ? options.buildTs : Date.now();

  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(pin),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    enc.encode(plainHtml)
  );

  const payload = {
    salt: Buffer.from(salt).toString('base64'),
    iv: Buffer.from(iv).toString('base64'),
    ciphertext: Buffer.from(encryptedBuffer).toString('base64'),
    iterations: 100000
  };

  const pinLength = pin.length;
  const dotsHtml = Array.from({ length: pinLength }, () => '<div class="pin-dot"></div>').join('');

  const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; -webkit-tap-highlight-color: transparent; }
    body {
      background: radial-gradient(circle at 50% 20%, #1c1c1e, #0a0a0c 80%);
      color: #ffffff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow: hidden;
      user-select: none;
    }
    .lock-container {
      width: 100%;
      max-width: 320px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .lock-icon {
      width: 52px;
      height: 52px;
      margin-bottom: 24px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.3px;
      margin-bottom: 6px;
    }
    .subtitle {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 28px;
    }
    .pin-dots {
      display: flex;
      gap: 16px;
      margin-bottom: 36px;
    }
    .pin-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1.5px solid rgba(255, 255, 255, 0.4);
      transition: all 0.15s ease;
    }
    .pin-dot.filled {
      background: #ffffff;
      border-color: #ffffff;
      transform: scale(1.15);
      box-shadow: 0 0 10px rgba(255,255,255,0.8);
    }
    .keypad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      width: 100%;
    }
    .key-btn {
      width: 72px;
      height: 72px;
      margin: 0 auto;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      color: #ffffff;
      font-size: 28px;
      font-weight: 400;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, transform 0.1s;
    }
    .key-btn:active {
      background: rgba(255, 255, 255, 0.28);
      transform: scale(0.94);
    }
    .key-sub {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 1.5px;
      color: rgba(255, 255, 255, 0.6);
      margin-top: -2px;
    }
    .key-btn.action {
      background: transparent;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
    }
    .key-btn.action:active {
      background: transparent;
      color: #ffffff;
    }
    .shake {
      animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
    @keyframes shake {
      10%, 90% { transform: translate3d(-3px, 0, 0); }
      20%, 80% { transform: translate3d(5px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-6px, 0, 0); }
      40%, 60% { transform: translate3d(6px, 0, 0); }
    }
    .error-msg {
      color: #ff453a;
      font-size: 13px;
      margin-top: 16px;
      min-height: 18px;
      font-weight: 500;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .error-msg.visible {
      opacity: 1;
    }
    .footer-note {
      position: absolute;
      bottom: 24px;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.3);
      letter-spacing: 0.2px;
    }
  </style>
</head>
<body>

  <div class="lock-container" id="lockBox">
    <div class="lock-icon" id="lockIcon">🔒</div>
    <div class="title">${title}</div>
    <div class="subtitle">${subtitle}</div>

    <div class="pin-dots" id="dotsContainer">
      ${dotsHtml}
    </div>

    <div class="keypad">
      <button class="key-btn" onclick="pressKey('1')">1<span class="key-sub">&nbsp;</span></button>
      <button class="key-btn" onclick="pressKey('2')">2<span class="key-sub">ABC</span></button>
      <button class="key-btn" onclick="pressKey('3')">3<span class="key-sub">DEF</span></button>
      <button class="key-btn" onclick="pressKey('4')">4<span class="key-sub">GHI</span></button>
      <button class="key-btn" onclick="pressKey('5')">5<span class="key-sub">JKL</span></button>
      <button class="key-btn" onclick="pressKey('6')">6<span class="key-sub">MNO</span></button>
      <button class="key-btn" onclick="pressKey('7')">7<span class="key-sub">PQRS</span></button>
      <button class="key-btn" onclick="pressKey('8')">8<span class="key-sub">TUV</span></button>
      <button class="key-btn" onclick="pressKey('9')">9<span class="key-sub">WXYZ</span></button>
      <div class="key-btn action"></div>
      <button class="key-btn" onclick="pressKey('0')">0<span class="key-sub">+</span></button>
      <button class="key-btn action" onclick="deleteKey()">Delete</button>
    </div>

    <div class="error-msg" id="errorMsg">Incorrect PIN</div>
  </div>

  <div class="footer-note">AES-256-GCM Zero-Knowledge Encryption</div>

  <script>
    const LOCK_META = /*LOCK_META_START*/${JSON.stringify({ buildTs, payload, maxPin: pin.length })}/*LOCK_META_END*/;
    let PAGE_BUILD_TS = LOCK_META.buildTs;
    let PAYLOAD = LOCK_META.payload;
    const NORM_PATH = location.pathname.endsWith('/') ? location.pathname : (location.pathname + '/');
    const STORAGE_KEY = 'vault_session_' + NORM_PATH;
    const FRESH_PAYLOAD_KEY = 'pr_fresh_payload_' + NORM_PATH;
    let currentPin = '';
    let MAX_PIN = LOCK_META.maxPin;
    let isDecrypting = false;
    let isUnlocked = false;

    function applyFreshPayload(newPayload, newPinLen, newTs) {
      if (!newPayload || !newPayload.ciphertext) return;
      PAYLOAD = newPayload;
      MAX_PIN = Number(newPinLen) || MAX_PIN;
      if (newTs) PAGE_BUILD_TS = newTs;
      currentPin = '';
      const container = document.getElementById('dotsContainer');
      if (container) {
        container.innerHTML = Array.from({ length: MAX_PIN }, () => '<div class="pin-dot"></div>').join('');
      }
      try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) {}
    }

    // 1. Instant 0ms sync if PIN was just changed from Reach's Hub in this browser
    try {
      const rawFresh = localStorage.getItem(FRESH_PAYLOAD_KEY);
      if (rawFresh) {
        const parsed = JSON.parse(rawFresh);
        if (parsed && parsed.updatedAt > PAGE_BUILD_TS && parsed.payload) {
          applyFreshPayload(parsed.payload, parsed.pinLength, parsed.updatedAt);
        } else if (parsed && PAGE_BUILD_TS >= parsed.updatedAt) {
          localStorage.removeItem(FRESH_PAYLOAD_KEY);
        }
      }
    } catch (e) {}

    function updateDots() {
      const dots = document.querySelectorAll('.pin-dot');
      dots.forEach((dot, idx) => {
        if (idx < currentPin.length) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      });
    }

    async function pressKey(num) {
      if (isDecrypting || currentPin.length >= MAX_PIN) return;
      currentPin += num;
      updateDots();
      document.getElementById('errorMsg').classList.remove('visible');

      if (currentPin.length === MAX_PIN) {
        isDecrypting = true;
        setTimeout(attemptDecrypt, 150);
      }
    }

    function deleteKey() {
      if (isDecrypting || currentPin.length === 0) return;
      currentPin = currentPin.slice(0, -1);
      updateDots();
      document.getElementById('errorMsg').classList.remove('visible');
    }

    window.addEventListener('keydown', (e) => {
      if (e.key >= '0' && e.key <= '9') {
        pressKey(e.key);
      } else if (e.key === 'Backspace') {
        deleteKey();
      }
    });

    async function attemptDecrypt(isAuto = false) {
      try {
        const enc = new TextEncoder();
        const salt = Uint8Array.from(atob(PAYLOAD.salt), c => c.charCodeAt(0));
        const iv = Uint8Array.from(atob(PAYLOAD.iv), c => c.charCodeAt(0));
        const ciphertext = Uint8Array.from(atob(PAYLOAD.ciphertext), c => c.charCodeAt(0));

        const keyMaterial = await window.crypto.subtle.importKey(
          'raw',
          enc.encode(currentPin),
          { name: 'PBKDF2' },
          false,
          ['deriveKey']
        );

        const key = await window.crypto.subtle.deriveKey(
          {
            name: 'PBKDF2',
            salt: salt,
            iterations: PAYLOAD.iterations,
            hash: 'SHA-256'
          },
          keyMaterial,
          { name: 'AES-GCM', length: 256 },
          false,
          ['decrypt']
        );

        const decryptedBuffer = await window.crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: iv },
          key,
          ciphertext
        );

        const html = new TextDecoder().decode(decryptedBuffer);
        isUnlocked = true;

        // Store session PIN for automatic re-entry on refresh
        try {
          sessionStorage.setItem(STORAGE_KEY, currentPin);
        } catch (e) {}

        if (!isAuto) {
          document.getElementById('lockIcon').textContent = '🔓';
        }

        setTimeout(() => {
          document.open();
          document.write(html);
          document.close();
        }, isAuto ? 0 : 250);

      } catch (err) {
        if (isAuto) {
          sessionStorage.removeItem(STORAGE_KEY);
          currentPin = '';
          updateDots();
          isDecrypting = false;
          return;
        }

        const lockBox = document.getElementById('lockBox');
        lockBox.classList.remove('shake');
        void lockBox.offsetWidth;
        lockBox.classList.add('shake');
        
        document.getElementById('errorMsg').classList.add('visible');
        currentPin = '';
        updateDots();
        isDecrypting = false;
      }
    }

    // Check if session PIN is already stored, and revalidate bypassing browser HTTP cache
    window.addEventListener('DOMContentLoaded', () => {
      try {
        const savedPin = sessionStorage.getItem(STORAGE_KEY);
        if (savedPin && savedPin.length === MAX_PIN) {
          currentPin = savedPin;
          isDecrypting = true;
          attemptDecrypt(true);
        }
      } catch (e) {}

      // 2. Cross-device cache-busting check against GitHub Pages max-age=600 cache
      fetch(location.pathname + '?_cb=' + Date.now(), { cache: 'no-store' })
        .then(r => r.ok ? r.text() : '')
        .then(txt => {
          if (!txt || isUnlocked || isDecrypting) return;
          const parts = txt.split('/*LOCK_META_' + 'START*/');
          if (parts.length > 1) {
            const rawMeta = parts[1].split('/*LOCK_META_' + 'END*/')[0];
            const remoteMeta = JSON.parse(rawMeta);
            if (remoteMeta && remoteMeta.buildTs > PAGE_BUILD_TS) {
              applyFreshPayload(remoteMeta.payload, remoteMeta.maxPin, remoteMeta.buildTs);
            }
          }
        })
        .catch(() => {});
    });
  </script>
</body>
</html>`;

  if (typeof options === 'object' && options.returnObject) {
    return { html: template, payload, pinLength: pin.length, buildTs };
  }
  return template;
}

// Support CLI execution: node encrypt.js <inputFile> <pin> <outputFile> [title] [subtitle]
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.log("Usage: node encrypt.js <source.html> <pin> <dest.html> [title] [subtitle]");
    process.exit(1);
  }
  const [src, pin, dest, title, subtitle] = args;
  const rawHtml = fs.readFileSync(src, 'utf8');
  encryptHtml(rawHtml, pin, { title: title || 'Protected Page', subtitle: subtitle || 'Enter Passcode to View' }).then(encryptedHtml => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, encryptedHtml, 'utf8');
    console.log(`Successfully generated encrypted page at: ${dest}`);
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { encryptHtml };
