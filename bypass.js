(function () {
  "use strict";

  // ─── Konfigurasi URL & Style (Tema Biru Neon Cyberpunk) ────────────────────
  const CONFIG = {
    r: "https://raw.githubusercontent.com/cybar779/bypass/refs/heads/main/bypass.txt",
    t: "https://raw.githubusercontent.com/cybar779/bypass/refs/heads/main/ch.txt",
    m: "https://raw.githubusercontent.com/vanz-website/VanzBypass/main/music.mp3",
    s: "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);" +
       "background:rgba(6,10,23,0.95);backdrop-filter:blur(12px);" +
       "-webkit-backdrop-filter:blur(12px);color:#fff;padding:30px 25px;" +
       "border-radius:16px;z-index:2147483647;" +
       'font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;' +
       "text-align:center;box-shadow:0 20px 50px rgba(0,0,0,0.6);" +
       "border:2px solid #00d4ff;width:300px;box-sizing:border-box;" +
       "animation: vanz-lightning-glow 3s linear infinite;",
  };

  // ─── Key Manual (Bypass License) ─────────────────────────────────────────────
  const VALID_KEYS = [
    "KyyyVip", // Tetap dipertahankan biar ga crash kalau ada cache lama
  ];

  const FALLBACK_MUSIC_URL = "https://raw.githubusercontent.com/vanz-website/VanzBypass/main/music.mp3";
  let audioPlayer = null;

  // ─── Main IIFE ────────────────────────────────────────────────────────────────
  (async function () {

    // Hapus elemen lama jika ada
    document.getElementById("vanz-auth-box")?.remove();
    document.getElementById("vanz-floating-credit")?.remove();

    const titleName    = "SUPER KYYY";
    const telegramLink = "https://t.me/apoyxz"; // Mengikuti variabel asal t.me/ramachanel sesuai script asli

    // ── Inject CSS Animasi (Semua warna diubah ke Biru Neon) ──────────────────
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      @keyframes vanz-lightning-glow {
        0%   { box-shadow: 0 0 5px #00d4ff, 0 0 10px #00d4ff, inset 0 0 5px rgba(0,212,255,0.2);  border-color: #00d4ff; }
        25%  { box-shadow: 0 0 15px #00b8e6, 0 0 25px #00d4ff, inset 0 0 10px rgba(0,212,255,0.4); border-color: #00b8e6; }
        30%  { box-shadow: 0 0 8px #00d4ff,  0 0 12px #00d4ff, inset 0 0 6px rgba(0,212,255,0.3);  border-color: #00d4ff; }
        35%  { box-shadow: 0 0 25px #00ffff, 0 0 40px #00d4ff, inset 0 0 15px rgba(0,212,255,0.5); border-color: #00ffff; }
        70%  { box-shadow: 0 0 15px #00b8e6, 0 0 25px #00d4ff, inset 0 0 10px rgba(0,212,255,0.4); border-color: #00b8e6; }
        73%  { box-shadow: 0 0 5px #00d4ff,  0 0 10px #00d4ff, inset 0 0 5px rgba(0,212,255,0.2);  border-color: #00d4ff; }
        100% { box-shadow: 0 0 5px #00d4ff,  0 0 10px #00d4ff, inset 0 0 5px rgba(0,212,255,0.2);  border-color: #00d4ff; }
      }
      @keyframes vanz-spin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes vanz-fire-spin {
        0%   { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
      @keyframes vanz-rainbow-glow {
        0%   { color: #00d4ff; text-shadow: 0 0 6px #00d4ff; }
        16%  { color: #00eeff; text-shadow: 0 0 6px #00eeff; }
        33%  { color: #0088ff; text-shadow: 0 0 6px #0088ff; }
        50%  { color: #0055ff; text-shadow: 0 0 6px #0055ff; }
        66%  { color: #00aaff; text-shadow: 0 0 6px #00aaff; }
        83%  { color: #0066ff; text-shadow: 0 0 6px #0066ff; }
        100% { color: #00d4ff; text-shadow: 0 0 6px #00d4ff; }
      }

      .vanz-clickable-credit {
        position: fixed;
        bottom: 14px;
        right: 20px;
        font-size: 18px;
        font-weight: bold;
        font-family: 'Courier New', Courier, monospace;
        letter-spacing: 1px;
        z-index: 2147483647;
        text-decoration: none;
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 0;
        margin: 0;
        animation: vanz-rainbow-glow 3s linear infinite;
      }

      .vanz-mode-btn {
        width: 100%;
        border: 1px solid rgba(0,212,255,0.3);
        padding: 12px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
        font-size: 14px;
        letter-spacing: 1.5px;
        margin-bottom: 12px;
        color: #fff;
        transition: all 0.3s ease;
        text-transform: uppercase;
      }
      .vanz-btn-fast   { background: linear-gradient(90deg, rgba(0,212,255,0.1), rgba(0,212,255,0.2)); border-color: #00d4ff; box-shadow: 0 0 8px rgba(0,212,255,0.2); }
      .vanz-btn-fast:hover   { background: #00d4ff; color: #030712; box-shadow: 0 0 15px #00d4ff; }
      .vanz-btn-secure { background: linear-gradient(90deg, rgba(0,136,255,0.1), rgba(0,136,255,0.2)); border-color: #0088ff; box-shadow: 0 0 8px rgba(0,136,255,0.2); }
      .vanz-btn-secure:hover { background: #0088ff; color: #030712; box-shadow: 0 0 15px #0088ff; }
      .vanz-btn-safe   { background: linear-gradient(90deg, rgba(50,50,200,0.1), rgba(50,50,200,0.2)); border-color: #3232c8; box-shadow: 0 0 8px rgba(50,50,200,0.2); }
      .vanz-btn-safe:hover   { background: #3232c8; color: #030712; box-shadow: 0 0 15px #3232c8; }
    `;
    document.head.appendChild(styleEl);

    // ── Floating Credit ───────────────────────────────────────────────────────
    const creditLink     = document.createElement("a");
    creditLink.id        = "vanz-floating-credit";
    creditLink.className = "vanz-clickable-credit";
    creditLink.innerText = "SUPER KYYY OFFICIAL";
    creditLink.href      = "https://t.me/psteamadm_official";
    creditLink.target    = "_blank";
    document.body.appendChild(creditLink);

    // ── Buat Auth Box (Dengan Warna Biru Neon) ────────────────────────────────
    const authBox         = document.createElement("div");
    authBox.id            = "vanz-auth-box";
    authBox.style.cssText = CONFIG.s;
    authBox.innerHTML     = `
      <button id="vanz-music-btn" style="
        position:absolute;top:15px;right:15px;
        background:rgba(255,255,255,0.05);border:1px solid rgba(0,212,255,0.3);
        color:#ff4444;border-radius:50%;width:32px;height:32px;
        cursor:pointer;font-size:14px;display:flex;align-items:center;
        justify-content:center;box-shadow:0 0 8px rgba(0,0,0,0.3);
        transition:all 0.3s ease;z-index:10;">🔇</button>

      <h3 style="margin:0 0 6px 0;color:#00d4ff;font-size:20px;letter-spacing:1.5px;
                 font-weight:800;text-shadow:0 0 12px rgba(0,212,255,0.5);text-transform:uppercase;">
        ${titleName} Official
      </h3>
      <p style="margin:0 0 20px 0;color:#8892b0;font-size:11px;letter-spacing:2px;font-weight:600;">
        ENTER LICENSE KEY
      </p>

      <input type="text" id="vanz-key-input" placeholder="ENTER KEY HERE" style="
        width:100%;padding:12px;margin-bottom:16px;
        border:1px solid rgba(0,212,255,0.4);border-radius:8px;
        background:rgba(7,11,25,0.6);color:#fff;text-align:center;
        box-sizing:border-box;font-size:13px;font-weight:600;
        letter-spacing:1px;outline:none;transition:all 0.3s ease;
        box-shadow:inset 0 2px 4px rgba(0,0,0,0.5);">

      <button id="vanz-login-btn" style="
        width:100%;background:#00d4ff;color:#030712;border:none;
        padding:12px;border-radius:8px;font-weight:700;cursor:pointer;
        font-size:14px;letter-spacing:0.5px;margin-bottom:12px;
        box-shadow:0 4px 12px rgba(0,212,255,0.3);transition:all 0.2s ease;">
        VERIFY KEY
      </button>

      <button id="vanz-telegram-btn" style="
        width:100%;background:rgba(0,212,255,0.05);color:#00d4ff;border:1px solid #00d4ff;
        padding:12px;border-radius:8px;font-weight:700;cursor:pointer;
        font-size:14px;letter-spacing:0.5px;
        box-shadow:0 4px 12px rgba(0,212,255,0.15);">
        TELEGRAM
      </button>

      <div id="vanz-status" style="margin-top:16px;font-size:11px;font-weight:700;
                                   color:#64748b;letter-spacing:1.5px;">
        © Copyright Super Kyyy Official
      </div>
    `;
    document.body.appendChild(authBox);

    // ── Referensi Elemen ──────────────────────────────────────────────────────
    const musicBtn    = document.getElementById("vanz-music-btn");
    const keyInput    = document.getElementById("vanz-key-input");
    const loginBtn    = document.getElementById("vanz-login-btn");
    const telegramBtn = document.getElementById("vanz-telegram-btn");
    const statusEl    = document.getElementById("vanz-status");

    // ── Responsif Mobile ──────────────────────────────────────────────────────
    setTimeout(() => {
      authBox.style.zIndex = "2147483647";
      if (window.innerWidth < 600) {
        authBox.style.width    = "90%";
        authBox.style.maxWidth = "300px";
      }
    }, 10);

    // ── Event: Tombol Musik ───────────────────────────────────────────────────
    let musicLoading = false;
    musicBtn.addEventListener("click", async () => {
      if (musicLoading) return;

      if (!audioPlayer) {
        musicLoading         = true;
        musicBtn.textContent = "⏳";
        let resolvedUrl      = FALLBACK_MUSIC_URL;
        try {
          const res      = await fetch(CONFIG.m + "?t=" + Date.now());
          const audioUrl = (await res.text()).trim();
          if (audioUrl && audioUrl.startsWith("http")) {
            resolvedUrl = audioUrl;
          }
        } catch (err) {
          console.log("Failed to fetch music URL, using fallback:", err);
        }
        audioPlayer      = new Audio(resolvedUrl);
        audioPlayer.loop = true;
        musicLoading     = false;
      }

      if (audioPlayer.paused) {
        audioPlayer.play()
          .then(() => {
            musicBtn.textContent       = "🔊";
            musicBtn.style.color       = "#00d4ff";
            musicBtn.style.borderColor = "#00d4ff";
            musicBtn.style.boxShadow   = "0 0 10px rgba(0,212,255,0.4)";
          })
          .catch(err => {
            console.log("Playback failed:", err);
            musicBtn.textContent = "🔇";
          });
      } else {
        audioPlayer.pause();
        musicBtn.textContent       = "🔇";
        musicBtn.style.color       = "#ff4444";
        musicBtn.style.borderColor = "rgba(0,212,255,0.3)";
        musicBtn.style.boxShadow   = "0 0 8px rgba(0,0,0,0.3)";
      }
    });

    // ── Event: Fokus / Blur Input ─────────────────────────────────────────────
    keyInput.addEventListener("focus", () => {
      keyInput.style.border    = "1px solid #00d4ff";
      keyInput.style.boxShadow = "0 0 10px rgba(0,212,255,0.25), inset 0 2px 4px rgba(0,0,0,0.5)";
    });
    keyInput.addEventListener("blur", () => {
      keyInput.style.border    = "1px solid rgba(0,212,255,0.4)";
      keyInput.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.5)";
    });

    // ── Event: Tombol Telegram ────────────────────────────────────────────────
    telegramBtn.addEventListener("click", () => {
      if (telegramLink && telegramLink.startsWith("http")) {
        window.open(telegramLink, "_blank");
      }
    });

    // ── Fungsi: Overlay Checking Update + Countdown Redirect (Biru Neon) ──────
    function runRedirect(countdownSeconds) {
      authBox.remove();

      const loadingOverlay = document.createElement("div");
      loadingOverlay.style.cssText = `
        position:fixed; top:0; left:0; width:100%; height:100%;
        background:rgba(3,7,18,0.85); backdrop-filter:blur(8px);
        -webkit-backdrop-filter:blur(8px); z-index:2147483647;
        display:flex; align-items:center; justify-content:center;
        font-family:system-ui,-apple-system,sans-serif;
      `;
      loadingOverlay.innerHTML = `
        <div style="text-align:center; background:rgba(6,10,23,0.95);
                    padding:35px 30px; border-radius:16px;
                    border:1px solid #00d4ff; width:290px;
                    animation: vanz-lightning-glow 3s linear infinite;">
          <div style="width:45px; height:45px;
                      border:4px solid rgba(0,212,255,0.1);
                      border-top:4px solid #00d4ff; border-radius:50%;
                      margin:0 auto 20px auto;
                      animation:vanz-spin 0.8s linear infinite;
                      box-shadow:0 0 15px rgba(0,212,255,0.2);"></div>
          <p id="vanz-check-text" style="color:#00d4ff; font-size:15px;
             font-weight:700; margin:0; letter-spacing:1.5px;
             text-shadow:0 0 8px rgba(0,212,255,0.3);">CHECKING UPDATE...</p>
        </div>
      `;
      document.body.appendChild(loadingOverlay);

      setTimeout(async () => {
        let hasUpdate = false;
        try {
          const updateRes  = await fetch("https://rm.rama-modz.workers.dev/");
          const updateText = await updateRes.text();
          if (updateText.includes("GitHub Updated")) hasUpdate = true;
        } catch { /* silent */ }

        const checkText = document.getElementById("vanz-check-text");
        checkText.innerHTML = hasUpdate
          ? "<span style='color:#00d4ff;'>Link Updated Successfully! ✓</span>"
          : "<span style='color:#ff4444; text-shadow:0 0 8px rgba(255,68,68,0.3);'>No Update Available!</span>";

        setTimeout(async () => {
          loadingOverlay.remove();
          try {
            const redirectRes = await fetch(CONFIG.r + "?t=" + Date.now());
            const redirectUrl = (await redirectRes.text()).trim();

            if (!redirectUrl.startsWith("http")) return;

            const DASH_TOTAL       = 597;
            const countdownOverlay = document.createElement("div");
            countdownOverlay.style.cssText = `
              position:fixed; top:0; left:0; width:100%; height:100%;
              background:rgba(3,7,18,0.05); backdrop-filter:blur(1px);
              -webkit-backdrop-filter:blur(1px); z-index:2147483647;
              display:flex; align-items:center; justify-content:center;
              font-family:system-ui,-apple-system,sans-serif;
            `;
            countdownOverlay.innerHTML = `
              <div style="text-align:center;">
                <div style="position:relative; width:250px; height:250px;
                            margin:0 auto; display:flex; align-items:center;
                            justify-content:center;">

                  <div style="position:absolute; top:50%; left:50%;
                              width:214px; height:214px; border-radius:50%;
                              background:conic-gradient(transparent 0deg,#0088ff 90deg,#00d4ff 180deg,#00eeff 270deg,transparent 360deg);
                              filter:blur(14px); opacity:0.85;
                              animation:vanz-fire-spin 1.5s linear infinite; z-index:1;"></div>

                  <div style="position:absolute; top:50%; left:50%;
                              width:206px; height:206px; border-radius:50%;
                              background:conic-gradient(transparent 0deg,#0055ff 60deg,#00aaff 120deg,#00d4ff 240deg,transparent 360deg);
                              filter:blur(6px); opacity:0.9;
                              animation:vanz-fire-spin 1s linear infinite reverse; z-index:2;"></div>

                  <svg width="240" height="240"
                       style="transform:rotate(-90deg); position:relative; z-index:3;">
                    <circle cx="120" cy="120" r="95"
                            fill="rgba(6,10,23,0.65)"
                            stroke="rgba(0,212,255,0.1)"
                            stroke-width="14"></circle>
                    <circle id="progress" cx="120" cy="120" r="95"
                            fill="none" stroke="#00d4ff" stroke-width="14"
                            stroke-dasharray="${DASH_TOTAL}"
                            stroke-dashoffset="${DASH_TOTAL}"
                            stroke-linecap="round"
                            style="filter:drop-shadow(0 0 6px #00d4ff);
                                   transition:stroke-dashoffset 1s linear;"></circle>
                  </svg>

                  <div id="countdown-text" style="
                    position:absolute; top:50%; left:50%;
                    transform:translate(-50%,-50%);
                    font-size:54px; font-weight:900; color:#fff;
                    text-shadow:0 0 20px #00d4ff, 0 0 30px rgba(0,212,255,0.3);
                    z-index:4;">${countdownSeconds}</div>
                </div>

                <p style="margin-top:30px; color:#00d4ff; font-size:16px;
                           font-weight:700; letter-spacing:3px;
                           text-shadow:0 0 12px rgba(0,212,255,0.4);
                           position:relative; z-index:4;">REDIRECTING...</p>
              </div>
            `;
            document.body.appendChild(countdownOverlay);

            let remaining        = countdownSeconds;
            const progressCircle = countdownOverlay.querySelector("#progress");
            const countdownText  = countdownOverlay.querySelector("#countdown-text");

            const timer = setInterval(() => {
              remaining--;
              countdownText.textContent             = remaining;
              progressCircle.style.strokeDashoffset = DASH_TOTAL * (remaining / countdownSeconds);

              if (remaining <= 0) {
                clearInterval(timer);
                if (audioPlayer) {
                  audioPlayer.pause();
                  audioPlayer = null;
                }
                countdownOverlay.remove();
                window.location.replace(redirectUrl);
              }
            }, 1000);

          } catch {
            alert("REDIRECT ERROR!");
          }
        }, 1500);
      }, 5000);
    }

    // ── Event: Tombol Login (validasi key manual) ─────────────────────────────
    loginBtn.addEventListener("click", () => {
      const inputKey = keyInput.value.trim();

      if (!inputKey) {
        statusEl.innerHTML = "<span style='color:#ff4444;'>PLEASE INPUT KEY!</span>";
        return;
      }

      const isValid = VALID_KEYS.some(k => k.toLowerCase() === inputKey.toLowerCase());

      if (isValid) {
        statusEl.innerHTML        = "<span style='color:#00d4ff;'>KEY VALIDATED! ✓</span>";
        loginBtn.disabled         = true;
        telegramBtn.disabled      = true;

        setTimeout(() => {
          authBox.innerHTML = `
            <h3 style="margin:0 0 8px 0;color:#00d4ff;font-size:18px;letter-spacing:1px;
                       font-weight:800;text-shadow:0 0 12px rgba(0,212,255,0.5);">
             SUPER KYYY BYPASS
            </h3>
            <p style="margin:0 0 22px 0;color:#8892b0;font-size:10px;letter-spacing:1.5px;font-weight:600;">
              CHOOSE SECURITY BYPASS METHOD
            </p>

            <button id="vanz-btn-fast"   class="vanz-mode-btn vanz-btn-fast">FAST MODE (BAN RISK)</button>
            <button id="vanz-btn-secure" class="vanz-mode-btn vanz-btn-secure">SECURE MODE (MIDDLE)</button>
            <button id="vanz-btn-safe"   class="vanz-mode-btn vanz-btn-safe">SAFE MODE (FULL SAFE)</button>
          `;
          document.getElementById("vanz-btn-fast").addEventListener("click",   () => runRedirect(30));
          document.getElementById("vanz-btn-secure").addEventListener("click", () => runRedirect(45));
          document.getElementById("vanz-btn-safe").addEventListener("click",   () => runRedirect(60));
        }, 800);

      } else {
        statusEl.innerHTML = "<span style='color:#ff4444;'>INVALID LICENSE KEY!</span>";
      }
    });

  })();
})();
