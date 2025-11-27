(function() {
    'use-strict';

    // ==========================================
    // CORE CHEAT LOGIC
    // ==========================================
    
    function getGameState() { try { const el = document.querySelector("#app"); if (!el) return null; const rk = Object.keys(el).find(k => k.startsWith("__reactContainer$")); if (!rk) return null; let n = el[rk]; while (n) { if (n.stateNode?.props?.liveGameController) return n.stateNode; n = n.child; } return null; } catch (e) { return null; } }
    function getWorkingStateNode() { try { const reactNode = (function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); })(); return Object.values(reactNode)[1].children[0]._owner.stateNode; } catch (e) { return null; } }
    
    function findAndClickCorrectAnswer() { const gs = getGameState(); if (gs?.state?.question) { const correctAnswer = gs.state.question.correctAnswers[0]; document.querySelectorAll('[class*="answerContainer"]').forEach(b => { if(b.innerText === correctAnswer) b.click(); }); } }
    
    function parseWeight(input) { 
        if (settings.romanMode) return romanToInt(input);
        const raw = String(input).trim().toLowerCase(); 
        const m = { 'lucas': Number.POSITIVE_INFINITY, 'sx': 1e21, 'qi': 1e18, 'q': 1e15, 't': 1e12, 'b': 1e9, 'm': 1e6, 'k': 1e3 }; 
        for (const s of Object.keys(m).sort((a,b)=>b.length-a.length)) { if (raw.endsWith(s)) return Math.floor((parseFloat(raw.slice(0, -s.length)) || 1) * m[s]); } 
        return parseFloat(raw) || NaN; 
    }
    function romanToInt(s) { const m = { 'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000 }; let t=0; s=String(s).toUpperCase(); for(let i=0;i<s.length;i++) { m[s[i]] < m[s[i+1]] ? t-=m[s[i]] : t+=m[s[i]]; } return t; }

    const intervals = { frenzy: null, autoAnswer: null, rainbow: null, distract: null, guess: null, hackBox: null, triple: null, hack: null, choiceESP: null, passESP: null, quint: null, dblXP: null, halfSpd: null, instKill: null, invinc: null, magnet: null, autoFish: null };
    let settings = JSON.parse(localStorage.getItem('overBlookSettings')) || { theme: 'christmas', toggleKey: 'k', autoAnswerSpeed: 10, romanMode: false, customTitle: "OverBlook | %Name%" };
    let guiState = { isMinimized: false };
    let originalBuy = null; let originalSend = null;
    let cachedName = "Waiting..."; let cachedTheme = settings.theme;

    const cheats = {
        // Global
        toggleAutoAnswer: () => { if(intervals.autoAnswer) { clearInterval(intervals.autoAnswer); intervals.autoAnswer = null; notify("Auto Answer Off"); } else { intervals.autoAnswer = setInterval(findAndClickCorrectAnswer, settings.autoAnswerSpeed); notify("Auto Answer On"); } },
        setAnswerSpeed: (val) => { const v = parseInt(val); if(!isNaN(v)) { settings.autoAnswerSpeed = v; localStorage.setItem('overBlookSettings', JSON.stringify(settings)); if(intervals.autoAnswer) { clearInterval(intervals.autoAnswer); intervals.autoAnswer = setInterval(findAndClickCorrectAnswer, v); } notify("Speed Set: " + v + "ms"); } },
        useAnyBlook: () => { 
            try {
                const lobbyNode = Object.values((function react(r = document.querySelector("body>div")) { 
                    return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                })())[1].children[0]._owner.stateNode;
                
                if(lobbyNode && lobbyNode.props && lobbyNode.props.blooks) {
                    lobbyNode.props.blooks = Object.keys(lobbyNode.props.blooks).reduce((a, b) => (a[b] = lobbyNode.props.blooks[b], a[b].locked = false, a), {});
                    notify("All Blooks Unlocked!"); 
                } else {
                    notify("Error: Blook data not found.");
                }
            } catch(e) {
                notify("Please go to the Lobby!");
            }
        },
        changeBlookIngame: (name) => { const s = getWorkingStateNode(); if(s && s.props.client) { s.props.liveGameController.setVal({ path: `c/${s.props.client.name}/b`, val: name }); if(s.setState) s.setState({ blook: name }); if(s.props.client) s.props.client.blook = name; notify("Blook Changed!"); } },

        // Fishing
        toggleAutoFish: () => {
            if(intervals.autoFish) {
                clearInterval(intervals.autoFish); intervals.autoFish = null;
                notify("Auto Fish Off");
            } else {
                intervals.autoFish = setInterval(() => {
                    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
                    const elementAtCorner = document.elementFromPoint(0, 0);
                    if(elementAtCorner) elementAtCorner.dispatchEvent(new MouseEvent('click', { view: window, bubbles: true, cancelable: true, clientX: 0, clientY: 0 }));
                }, 50);
                notify("Auto Fish On");
            }
        },
        setLure: (val) => { const s = getWorkingStateNode(); if(s) { s.setState({ lure: parseInt(val) }); notify("Lure set to " + val); } },
        setWeight: (val) => { const s = getWorkingStateNode(); const w = parseWeight(val); if(s && !isNaN(w)) { s.props.liveGameController.setVal({ path: `c/${s.props.client.name}`, val: { b: s.props.client.blook, w: w } }); s.setState({ weight: w, weight2: w }); notify("Weight updated!"); } },
        toggleFrenzy: () => { if(intervals.frenzy) { clearInterval(intervals.frenzy); intervals.frenzy = null; const s = getWorkingStateNode(); if(s) s.setState({ isFrenzy: false }); notify("Frenzy Off"); } else { intervals.frenzy = setInterval(() => { const s = getWorkingStateNode(); if(s) s.props.liveGameController.setVal({ path: `c/${s.props.client.name}`, val: { b: s.props.client.blook, w: s.state.weight, f: "Frenzy", s: true } }); }, 100); notify("Frenzy On"); } },
        toggleDistractionRemover: () => { if(intervals.distract) { clearInterval(intervals.distract); intervals.distract = null; notify("Distractions Enabled"); } else { intervals.distract = setInterval(() => { const s = getWorkingStateNode(); if(s) s.setState({ party: "" }); }, 50); notify("Distractions Blocked"); } },
        sendDistraction: (fish) => { const s = getWorkingStateNode(); if(s) { const w = s.state.weight || 0; s.props.liveGameController.setVal({ path: `c/${s.props.client.name}`, val: { b: s.props.client.blook, w: w, f: fish, s: true } }); notify(`Sent ${fish}!`); } },
        
        // Crypto
        setCrypto: (val) => { const s = getWorkingStateNode(); const c = parseWeight(val); if(s && !isNaN(c)) { s.props.liveGameController.setVal({ path: `c/${s.props.client.name}/c`, val: c }); notify("Crypto Set!"); } },
        setPass: (p) => { const s = getWorkingStateNode(); if(s) { s.props.liveGameController.setVal({ path: `c/${s.props.client.name}/p`, val: p }); notify("Password Set!"); } },
        stealCrypto: (name) => { const s = getWorkingStateNode(); if(s) { s.props.liveGameController.setVal({ path: `c/${s.props.client.name}/steal`, val: name }); notify(`Stealing from ${name}...`); } },
        toggleAutoGuess: () => { if(intervals.guess) { clearInterval(intervals.guess); intervals.guess = null; notify("Auto Guess Off"); } else { intervals.guess = setInterval(() => { const s = getWorkingStateNode(); if(s?.state?.choices) s.state.choices.forEach(c => { if(c.correct) s.guess(c.text); }); }, 50); notify("Auto Guess On"); } },
        toggleAlwaysTriple: () => { if(intervals.triple) { clearInterval(intervals.triple); intervals.triple = null; notify("Always Triple Off"); } else { intervals.triple = setInterval(() => { const s = getWorkingStateNode(); if(s?.state?.stage === "prize") s.setState({ add: s.state.crypto * 2 }); }, 50); notify("Always Triple On"); } },
        toggleAlwaysQuintuple: () => { const s = getWorkingStateNode(); if(!intervals.quint) { if(s) s.setState({ choices: [{ type: "mult", val: 5, rate: 0.075, blook: "Brainy Bot", text: "Quintuple Crypto" }] }); intervals.quint = true; notify("Always Quintuple On"); } else { if(s) s.setState({ choices: [] }); intervals.quint = false; notify("Always Quintuple Off"); } },
        toggleAlwaysHack: () => { if(intervals.hack) { clearInterval(intervals.hack); intervals.hack = null; notify("Always Hack Off"); } else { intervals.hack = setInterval(() => { const s = getWorkingStateNode(); if(s) s.props.liveGameController.setVal({ path: `c/${s.props.client.name}/hack`, val: true }); }, 100); notify("Always Hack On"); } },
        togglePassESP: () => { if(intervals.passESP) { clearInterval(intervals.passESP); intervals.passESP = null; document.querySelectorAll('.esp-pass').forEach(e=>e.remove()); notify("Pass ESP Off"); } else { intervals.passESP = setInterval(() => { const s = getWorkingStateNode(); if(s?.state?.game?.players) document.querySelectorAll('div[class^="styles__name___"]').forEach(el => { const p = s.state.game.players[el.innerText]; if(p?.p) { let d = el.querySelector('.esp-pass'); if(!d) { d = document.createElement('div'); d.className = 'esp-pass'; el.append(d); } d.innerText = p.p; } }); }, 100); notify("Pass ESP On"); } },
        toggleChoiceESP: () => { if(intervals.choiceESP) { clearInterval(intervals.choiceESP); intervals.choiceESP = null; document.querySelectorAll('div[class^="styles__choice___"]').forEach(e => e.innerHTML = ""); notify("Choice ESP Off"); } else { intervals.choiceESP = setInterval(() => { const s = getWorkingStateNode(); if(s?.state?.choices) document.querySelectorAll('div[class^="styles__choice___"]').forEach((e, i) => { if(e.innerText === "") e.innerText = s.state.choices[i].type; }); }, 50); notify("Choice ESP On"); } },
        toggleBlockHack: () => { if(intervals.hackBox) { clearInterval(intervals.hackBox); intervals.hackBox = null; notify("Hack Box Allowed"); } else { intervals.hackBox = setInterval(() => { const box = document.querySelector('div[class^="styles__box___"]'); if(box) box.style.display = 'none'; }, 50); notify("Hack Box Blocked"); } },

        // Tower Defense
        tdSetTokens: (val) => { const s = getWorkingStateNode(); const t = parseWeight(val); if(s && !isNaN(t)) { s.props.liveGameController.setVal({ path: `c/${s.props.client.name}/t`, val: t }); notify("Tokens Set!"); } },
        tdSetRound: (val) => { const s = getWorkingStateNode(); if(s) { s.props.liveGameController.setVal({ path: `r`, val: parseInt(val) }); notify("Round Set!"); } },
        tdSetHealth: (val) => { const s = getWorkingStateNode(); if(s) { s.props.liveGameController.setVal({ path: `h`, val: parseInt(val) }); notify("Health Set!"); } },
        tdClearEnemies: () => { const s = getWorkingStateNode(); if(s) { s.props.liveGameController.setVal({ path: `e`, val: {} }); notify("Enemies Cleared!"); } },
        tdMaxTowers: () => { const s = getWorkingStateNode(); if(s) { Object.entries(s.props.liveGameController.get("towers")).forEach(([id, t]) => s.props.liveGameController.setVal({ path: `towers/${id}`, val: { ...t, level: s.props.client.blookData[t.type].levels.length - 1 }})); notify("Towers Maxed!"); } },
        tdRemoveDucks: () => { const s = getWorkingStateNode(); if(s) { s.props.liveGameController.setVal({ path: 'g/ducks', val: [] }); notify("Ducks Removed!"); } },
        tdRemoveObstacles: () => { const s = getWorkingStateNode(); if(s) { s.removeObstacles(); notify("Obstacles Removed!"); } },
        tdEarthquake: () => { const s = getWorkingStateNode(); if(s) { s.props.liveGameController.setVal({ path: 'g/eq', val: true }); notify("Earthquake!"); } },
        tdToggleGlobalDmg: (val) => { 
            const s = getWorkingStateNode(); 
            if(!window.globalDamageActive) { 
                if(s && !originalSend) { originalSend = s.props.liveGameController.send; s.props.liveGameController.send = function(msg) { if(msg.type == "attack") msg.data.damage = parseInt(val); return originalSend.apply(s.props.liveGameController, arguments); }; window.globalDamageActive = true; notify("Global Dmg On"); }
            } else { 
                if(s && originalSend) { s.props.liveGameController.send = originalSend; originalSend = null; } window.globalDamageActive = false; notify("Global Dmg Off");
            } 
        },

        // TD2
        td2SetCoins: (val) => { const s = getWorkingStateNode(); const c = parseWeight(val); if(s && !isNaN(c)) { s.setState({ coins: c }); notify("Coins Set!"); } },
        td2SetHealth: (val) => { const s = getWorkingStateNode(); if(s) s.setState({ health: parseInt(val) }); notify("Health Set!"); },
        td2SetRound: (val) => { const s = getWorkingStateNode(); if(s) s.setState({ round: parseInt(val) }); notify("Round Set!"); },
        td2ClearEnemies: () => { const s = getWorkingStateNode(); if(s) { s.setState({ enemies: [] }); notify("Enemies Cleared!"); } },
        td2MaxTowers: () => { const s = getWorkingStateNode(); if(s) { s.state.towers.forEach(t => { t.stats.damage = 1e6; t.stats.range = 100; t.stats.rate = 0.01; }); s.setState({ towers: s.state.towers }); notify("Towers God Mode!"); } },

        // Brawl
        brawlInvinc: () => { if(intervals.invinc) { clearInterval(intervals.invinc); intervals.invinc = null; notify("Invincibility Off"); } else { intervals.invinc = setInterval(() => { const s = getWorkingStateNode(); if(s?.state) s.state.health.set(999999); }, 50); notify("Invincibility On"); } },
        brawlKillAll: () => { const s = getWorkingStateNode(); if(s) { s.killAll(); notify("Enemies Killed!"); } },
        brawlDoubleXP: () => { if(intervals.dblXP) { clearInterval(intervals.dblXP); intervals.dblXP = null; const s=getWorkingStateNode(); if(s?.state) s.state.xp.set(1); notify("Double XP Off"); } else { intervals.dblXP = setInterval(() => { const s=getWorkingStateNode(); if(s?.state) s.state.xp.set(2); }, 50); notify("Double XP On"); } },
        brawlHalfSpeed: () => { if(intervals.halfSpd) { clearInterval(intervals.halfSpd); intervals.halfSpd = null; const s=getWorkingStateNode(); if(s?.state) s.state.speed.set(1); notify("Half Speed Off"); } else { intervals.halfSpd = setInterval(() => { const s=getWorkingStateNode(); if(s?.state) s.state.speed.set(0.5); }, 50); notify("Half Speed On"); } },
        brawlInstantKill: () => { if(intervals.instKill) { clearInterval(intervals.instKill); intervals.instKill = null; const s=getWorkingStateNode(); if(s?.state) s.state.damage.set(1); notify("Insta Kill Off"); } else { intervals.instKill = setInterval(() => { const s=getWorkingStateNode(); if(s?.state) s.state.damage.set(1e6); }, 50); notify("Insta Kill On"); } },
        brawlMagnet: () => { if(intervals.magnet) { clearInterval(intervals.magnet); intervals.magnet = null; const s=getWorkingStateNode(); if(s?.state) s.state.magnet.set(1); notify("Magnet Off"); } else { intervals.magnet = setInterval(() => { const s=getWorkingStateNode(); if(s?.state) s.state.magnet.set(1e6); }, 50); notify("Magnet On"); } },
        brawlMaxAbilities: () => { const s = getWorkingStateNode(); if(s) { s.maxAbilities(); notify("Abilities Maxed!"); } },
        brawlNextLevel: () => { const s = getWorkingStateNode(); if(s) { s.nextLevel(); notify("Next Level!"); } },
        brawlRemoveObstacles: () => { const s = getWorkingStateNode(); if(s) { s.clearTrees(); notify("Trees Removed!"); } },
        brawlResetHealth: () => { const s = getWorkingStateNode(); if(s) { s.resetHealth(); notify("Health Reset!"); } },

        // Settings
        startRainbow: () => {
            if (window.rainbowInterval) return;
            let hue = 0;
            const masterPicker = document.getElementById('gui-master-color-picker');
            if (masterPicker) masterPicker.disabled = true;
            window.rainbowInterval = setInterval(() => {
                hue = (hue + 1) % 360; const alpha = 1.0 - (settings.transparency / 100.0);
                const accent = `hsl(${hue}, 90%, 55%)`;
                const bgLight = `hsla(${hue}, 35%, 20%, ${alpha})`;
                const bg = `hsla(${hue}, 35%, 15%, ${alpha})`;
                const rootEl = document.getElementById('overblook-root');
                if(rootEl) {
                    rootEl.style.setProperty('--ob-accent', accent); rootEl.style.setProperty('--ob-accent-hover', accent);
                }
            }, 25);
        },
        stopRainbow: () => { 
            clearInterval(window.rainbowInterval); 
            window.rainbowInterval = null; 
            const m = document.getElementById('gui-master-color-picker'); 
            if(m) m.disabled = false; 
            const rootEl = document.getElementById('overblook-root');
            if(rootEl) {
                rootEl.style.removeProperty('--ob-accent');
                rootEl.style.removeProperty('--ob-accent-hover');
            }
            updateAppearance(); 
        },
        setTitle: (val) => { 
            if (val.trim() === "") val = "OverBlook | %Name%";
            settings.customTitle = val; 
            localStorage.setItem('overBlookSettings', JSON.stringify(settings)); 
            document.querySelector('.ob-title').innerText = val; 
            notify("Title Set!"); 
        },
        setToggleKey: (val) => { if(val) { settings.toggleKey = val; localStorage.setItem('overBlookSettings', JSON.stringify(settings)); notify("Toggle Key: " + val); } },
        resetAll: () => {
            if(confirm("Reset all settings to default?")) {
                localStorage.removeItem('overBlookSettings');
                location.reload();
            }
        }
    };

    // ==========================================
    // UI/UX ENGINE (OverBlook)
    // ==========================================

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');
        :root { --ob-bg: rgba(20, 20, 30, 0.65); --ob-border: rgba(255, 255, 255, 0.1); --ob-text: #fff; --ob-text-dim: #ddd; --ob-accent: #00c7ff; --ob-accent-hover: #009ecb; --ob-radius: 12px; --ob-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); --ob-blur: blur(16px); --ob-font: 'Nunito', sans-serif; }
        .theme-glass {}
        .theme-native { --ob-bg: #ffffff; --ob-border: #e0e0e0; --ob-text: #333; --ob-text-dim: #555; --ob-shadow: 0 4px 0 rgba(0,0,0,0.1); --ob-blur: none; }
        .theme-terminal { --ob-bg: #000; --ob-border: #00ff00; --ob-text: #00ff00; --ob-text-dim: #00aa00; --ob-accent: #00aa00; --ob-accent-hover: #00ff00; --ob-radius: 0px; --ob-font: 'Courier New', monospace; }
        /* RGB: Thicker border + intense glow */
        .theme-rgb { 
            --ob-bg: rgba(0, 0, 0, 0.85); 
            --ob-border: transparent; 
            border: 3px solid transparent;
            animation: rgbGlow 3s linear infinite; 
        }
        @keyframes rgbGlow {
            0% { box-shadow: 0 0 15px #ff0000, 0 0 30px #ff0000; border-color: #ff0000; }
            33% { box-shadow: 0 0 15px #00ff00, 0 0 30px #00ff00; border-color: #00ff00; }
            66% { box-shadow: 0 0 15px #0000ff, 0 0 30px #0000ff; border-color: #0000ff; }
            100% { box-shadow: 0 0 15px #ff0000, 0 0 30px #ff0000; border-color: #ff0000; }
        }
        .theme-christmas { 
            --ob-bg: rgba(100, 0, 0, 0.6); 
            --ob-border: rgba(255,255,255,0.3); 
            --ob-accent: #27ae60; 
            --ob-accent-hover: #2ecc71; 
            --ob-text: #fff; 
            --ob-text-dim: #eee; 
            --ob-blur: blur(12px);
        }
        .theme-christmas::before {
            content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;
            background-image: radial-gradient(white 3px, transparent 4px), radial-gradient(white 2px, transparent 3px);
            background-size: 60px 60px, 40px 40px;
            animation: snow 4s linear infinite; opacity: 0.4;
        }
        @keyframes snow { 0% {background-position: 0 0, 0 0;} 100% {background-position: 0 200px, 0 100px;} }
        
        #overblook-root { position: fixed; top: 50px; left: 50px; width: 700px; height: 500px; background: var(--ob-bg); backdrop-filter: var(--ob-blur); border: 1px solid var(--ob-border); border-radius: var(--ob-radius); box-shadow: var(--ob-shadow); color: var(--ob-text); font-family: var(--ob-font); z-index: 999999; display: flex; flex-direction: column; overflow: hidden; }
        #overblook-root.minimized { width: 60px; height: 60px; border-radius: 50%; cursor: pointer; background: var(--ob-accent); border: 2px solid #fff; }
        #overblook-root.minimized * { display: none !important; }
        #overblook-root.minimized::after { content: 'B'; display: flex !important; justify-content: center; align-items: center; width: 100%; height: 100%; font-size: 30px; font-weight: 900; color: #fff; }
        #ob-header { display: flex; align-items: center; padding: 15px; border-bottom: 1px solid var(--ob-border); user-select: none; }
        .ob-profile { display: flex; align-items: center; gap: 10px; flex-grow: 1; }
        .ob-title { font-weight: 900; font-size: 1.2rem; }
        .ob-controls { display: flex; gap: 10px; }
        .ob-ctrl-btn { cursor: pointer; opacity: 0.7; transition: 0.2s; } .ob-ctrl-btn:hover { opacity: 1; }
        #ob-body { display: flex; flex-grow: 1; overflow: hidden; position: relative; }
        #ob-sidebar { width: 150px; background: rgba(0,0,0,0.1); display: flex; flex-direction: column; padding: 10px; gap: 5px; border-right: 1px solid var(--ob-border); overflow-y: auto; }
        .ob-tab { padding: 10px; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.9rem; color: var(--ob-text-dim); transition: 0.2s; text-align: left; background: transparent; border: none; }
        .ob-tab:hover { background: rgba(255,255,255,0.05); color: var(--ob-text); }
        .ob-tab.active { background: var(--ob-accent); color: #fff; }
        #ob-content { flex-grow: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; }
        #ob-search { width: 95%; padding: 10px 15px; border-radius: 8px; border: 1px solid var(--ob-border); background: rgba(0,0,0,0.2); color: var(--ob-text); font-family: var(--ob-font); outline: none; margin-bottom: 10px; }
        .ob-card { background: rgba(255,255,255,0.03); border: 1px solid var(--ob-border); border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center; transition: 0.3s; }
        .ob-card:hover { transform: translateY(-2px); background: rgba(255,255,255,0.06); border-color: var(--ob-accent); }
        .ob-card-info { display: flex; flex-direction: column; }
        .ob-card-title { font-weight: 700; font-size: 1rem; }
        .ob-card-desc { font-size: 0.75rem; color: var(--ob-text-dim); margin-top: 2px; }
        .ob-btn { padding: 6px 14px; border-radius: 6px; border: none; cursor: pointer; font-weight: 700; background: var(--ob-accent); color: #fff; transition: 0.2s; font-family: var(--ob-font); }
        .ob-btn:hover { background: var(--ob-accent-hover); box-shadow: 0 0 10px var(--ob-accent); }
        .ob-btn.toggle-off { background: #444; color: #bbb; }
        .ob-input { padding: 6px; border-radius: 6px; border: 1px solid var(--ob-border); background: rgba(0,0,0,0.3); color: var(--ob-text); width: 80px; text-align: center; margin-right: 5px; }
        /* Assistant pinned to window */
        #ob-assistant { position: absolute; bottom: 15px; right: 15px; display: flex; align-items: flex-end; pointer-events: none; opacity: 0; transition: 0.3s; transform: translateY(20px); z-index: 1000000; }
        #overblook-root:hover #ob-assistant { opacity: 1; transform: translateY(0); }
        .assistant-bubble { background: #fff; color: #000; padding: 8px 12px; border-radius: 12px 12px 0 12px; font-size: 0.8rem; font-weight: 700; margin-right: 5px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); max-width: 150px; }
        .assistant-img { width: 60px; height: 60px; object-fit: contain; filter: drop-shadow(0 4px 4px rgba(0,0,0,0.3)); }
        #ob-toast-container { position: fixed; bottom: 20px; right: 20px; z-index: 1000000; display: flex; flex-direction: column; gap: 10px; }
        .ob-toast { background: var(--ob-bg); backdrop-filter: blur(10px); border: 1px solid var(--ob-accent); color: var(--ob-text); padding: 12px 20px; border-radius: 8px; font-family: var(--ob-font); font-weight: 700; box-shadow: 0 5px 15px rgba(0,0,0,0.3); transform: translateX(100%); animation: slideIn 0.3s forwards; }
        @keyframes slideIn { to { transform: translateX(0); } }
        .esp-pass { color: #00c7ff; font-weight: bold; font-size: 0.8rem; background: rgba(0,0,0,0.8); padding: 2px 6px; border-radius: 4px; margin-top: 2px; position: absolute; top: 0; right: 0; }
        .changelog-entry { margin-bottom: 15px; } .changelog-entry h3, .changelog-entry p { text-align: center; margin-bottom: 15px; color: var(--ob-text-dim); } .changelog-entry h3 { color: var(--ob-accent); font-size: 1.1em; } .changelog-entry h4 { color: var(--ob-text); margin-bottom: 5px; border-bottom: 1px solid var(--ob-border); padding-bottom: 3px; } .changelog-entry ul { list-style-type: '» '; padding-left: 20px; margin: 0; } .changelog-entry li { margin-bottom: 5px; color: var(--ob-text-dim); }
    `;
    const styleEl = document.createElement('style'); styleEl.innerHTML = styles; document.head.appendChild(styleEl);

    // ==========================================
    // UI CONSTRUCTION
    // ==========================================
    const root = document.createElement('div'); root.id = 'overblook-root'; root.className = `theme-${settings.theme}`;
    const megabotImg = "https://ac.blooket.com/marketassets/blooks/megabot.svg"; 
    const santaImg = "https://ac.blooket.com/marketassets/blooks/santaclaus.svg";
    const earthImg = "https://ac.blooket.com/marketassets/blooks/earth.svg";
    const starsImg = "https://ac.blooket.com/marketassets/blooks/stars.svg";
    const rainbowImg = "https://ac.blooket.com/marketassets/blooks/rainbowastronaut.svg";
    
    // Map themes to images
    const themeImages = {
        "christmas": santaImg,
        "native": earthImg,
        "glass": starsImg,
        "rgb": rainbowImg,
        "terminal": megabotImg
    };

    root.innerHTML = `
        <div id="ob-header"><div class="ob-profile"><span class="ob-title">Waiting...</span></div><div class="ob-controls"><span class="ob-ctrl-btn" id="ob-min">_</span><span class="ob-ctrl-btn" id="ob-close">X</span></div></div>
        <div id="ob-body"><div id="ob-sidebar"></div><div id="ob-content"><input type="text" id="ob-search" placeholder="Search cheats..."><div id="ob-cards-container"></div></div></div>
        <div id="ob-assistant"><div class="assistant-bubble" id="ob-assist-text">I'm here to help!</div><img src="${themeImages[settings.theme] || megabotImg}" class="assistant-img" id="ob-helper-img"></div>
    `;
    document.body.appendChild(root);
    const toastContainer = document.createElement('div'); toastContainer.id = 'ob-toast-container'; document.body.appendChild(toastContainer);

    // Dynamic Name Loading Loop - FLICKER FIXED
    setInterval(() => {
        const s = getWorkingStateNode();
        
        // 1. Title Logic
        const titleEl = document.querySelector('.ob-title');
        if(titleEl) {
            if(s?.props?.client?.name) {
                cachedName = s.props.client.name; // Update cache only if name is present
            }
            // Always use cached name to prevent reverting to "Waiting..."
            const finalTitle = settings.customTitle.replace('%Name%', cachedName);
            if(titleEl.innerText !== finalTitle) titleEl.innerText = finalTitle;
        }

        // 2. Assistant Image Logic
        const helper = document.getElementById('ob-helper-img');
        if(helper) {
            // Only change image if theme has changed, ignore loop otherwise
            const desiredSrc = themeImages[settings.theme] || megabotImg;
            if(cachedTheme !== settings.theme || helper.getAttribute('src') !== desiredSrc) {
                helper.src = desiredSrc;
                cachedTheme = settings.theme;
            }
        }
    }, 500);

    function notify(msg) { const t=document.createElement('div'); t.className='ob-toast'; t.innerText=msg; toastContainer.appendChild(t); setTimeout(()=>{t.style.opacity='0';setTimeout(()=>t.remove(),300)},3000); }
    function createCard(parent, title, desc, control) { 
        const c=document.createElement('div'); c.className='ob-card'; c.dataset.name=title.toLowerCase();
        const i=document.createElement('div'); i.className='ob-card-info'; i.innerHTML=`<span class="ob-card-title">${title}</span><span class="ob-card-desc">${desc}</span>`;
        c.append(i, control); parent.appendChild(c);
        c.onmouseenter = () => document.getElementById('ob-assist-text').innerText = desc;
        c.onmouseleave = () => document.getElementById('ob-assist-text').innerText = "I'm here to help!";
    }
    function buildToggle(on, off) { const b=document.createElement('button'); b.className='ob-btn toggle-off'; b.innerText="OFF"; b.onclick=()=>{if(b.innerText==="ON"){off();b.innerText="OFF";b.classList.add('toggle-off')}else{on();b.innerText="ON";b.classList.remove('toggle-off')}}; return b; }
    function buildInputBtn(ph, txt, act) { const d=document.createElement('div'); d.style.display='flex'; const i=document.createElement('input'); i.className='ob-input'; i.placeholder=ph; const b=document.createElement('button'); b.className='ob-btn'; b.innerText=txt; b.onclick=()=>act(i.value); d.append(i,b); return d; }
    function buildBtn(txt, act) { const b=document.createElement('button'); b.className='ob-btn'; b.innerText=txt; b.onclick=act; return b; }
    function buildDropdown(opts, act) { const d=document.createElement('div'); d.style.display='flex'; const s=document.createElement('select'); s.className='ob-input'; s.style.width='100px'; opts.forEach(o=>s.add(new Option(o,o))); const b=document.createElement('button'); b.className='ob-btn'; b.innerText="Send"; b.onclick=()=>act(s.value); d.append(s,b); return d; }

    // ==========================================
    // CONTENT POPULATION
    // ==========================================
    const tabs = {
        "All": [], // Placeholder
        "Global": [
            { t: "Auto Answer", d: "Auto-answers correct options", c: buildToggle(cheats.toggleAutoAnswer, cheats.toggleAutoAnswer) },
            { t: "Answer Speed", d: "Set delay in ms (Lower = Faster)", c: buildInputBtn("10", "Set", cheats.setAnswerSpeed) },
            { t: "Use Any Blook", d: "Unlock all blooks (Lobby only)", c: buildBtn("Unlock", cheats.useAnyBlook) },
            { t: "Change Blook", d: "Change blook ingame (Name)", c: buildInputBtn("Name", "Set", cheats.changeBlookIngame) }
        ],
        "Fishing": [
            { t: "Auto Fish", d: "Auto click + answer (50ms)", c: buildToggle(cheats.toggleAutoFish, cheats.toggleAutoFish) },
            { t: "Frenzy", d: "Triggers frenzy event", c: buildToggle(cheats.toggleFrenzy, cheats.toggleFrenzy) },
            { t: "Set Weight", d: "Set fish weight (supports 'lucas')", c: buildInputBtn("Weight", "Set", cheats.setWeight) },
            { t: "Set Lure", d: "Change your lure (Level 1-5)", c: buildInputBtn("Level", "Set", cheats.setLure) },
            { t: "No Distractions", d: "Removes big fish animations", c: buildToggle(cheats.toggleDistractionRemover, cheats.toggleDistractionRemover) },
            { t: "Send Distraction", d: "Spam big fish to others", c: buildDropdown(["Crab","Jellyfish","Frog","Pufferfish","Octopus","Narwhal","Megalodon","Blobfish"], cheats.sendDistraction) }
        ],
        "Crypto": [
            { t: "Password ESP", d: "See everyone's passwords", c: buildToggle(cheats.togglePassESP, cheats.togglePassESP) },
            { t: "Choice ESP", d: "See what's in prize boxes", c: buildToggle(cheats.toggleChoiceESP, cheats.toggleChoiceESP) },
            { t: "Auto Guess", d: "Auto-guesses passwords", c: buildToggle(cheats.toggleAutoGuess, cheats.toggleAutoGuess) },
            { t: "Always Triple", d: "Triples crypto on win", c: buildToggle(cheats.toggleAlwaysTriple, cheats.toggleAlwaysTriple) },
            { t: "Always Quintuple", d: "Forces x5 Crypto option", c: buildToggle(cheats.toggleAlwaysQuintuple, cheats.toggleAlwaysQuintuple) },
            { t: "Always Hack", d: "Forces Hack option", c: buildToggle(cheats.toggleAlwaysHack, cheats.toggleAlwaysHack) },
            { t: "Set Crypto", d: "Set your crypto balance", c: buildInputBtn("Amount", "Set", cheats.setCrypto) },
            { t: "Set Password", d: "Set your own password", c: buildInputBtn("Pass", "Set", cheats.setPass) },
            { t: "Steal Crypto", d: "Steal from a specific player", c: buildInputBtn("Name", "Steal", cheats.stealCrypto) },
            { t: "Block Hack", d: "Prevents getting hacked", c: buildToggle(cheats.toggleBlockHack, cheats.toggleBlockHack) }
        ],
        "Tower Def": [
            { t: "Max Towers", d: "Upgrades all towers", c: buildBtn("Max", cheats.tdMaxTowers) },
            { t: "Clear Enemies", d: "Wipes the map", c: buildBtn("Clear", cheats.tdClearEnemies) },
            { t: "Set Tokens", d: "Sets your tokens", c: buildInputBtn("Amount", "Set", cheats.tdSetTokens) },
            { t: "Set Round", d: "Skip to round", c: buildInputBtn("Round", "Set", cheats.tdSetRound) },
            { t: "Set Health", d: "Set your HP", c: buildInputBtn("HP", "Set", cheats.tdSetHealth) },
            { t: "Remove Ducks", d: "Begone ducks", c: buildBtn("Remove", cheats.tdRemoveDucks) },
            { t: "Remove Obstacles", d: "Clear trees/rocks", c: buildBtn("Remove", cheats.tdRemoveObstacles) },
            { t: "Earthquake", d: "Trigger earthquake", c: buildBtn("Trigger", cheats.tdEarthquake) },
            { t: "Global Damage", d: "Set damage for all towers", c: (() => { const d=document.createElement('div'); d.style.display='flex'; const i=document.createElement('input'); i.className='ob-input'; i.placeholder='Dmg'; const b=buildToggle(()=>cheats.tdToggleGlobalDmg(i.value), cheats.tdToggleGlobalDmg); d.append(i,b); return d; })() }
        ],
        "Tower Def 2": [
            { t: "God Mode Towers", d: "Inf Dmg/Range/FireRate", c: buildBtn("Enable", cheats.td2MaxTowers) },
            { t: "Clear Enemies", d: "Wipe map", c: buildBtn("Clear", cheats.td2ClearEnemies) },
            { t: "Set Coins", d: "Sets your coins", c: buildInputBtn("Amount", "Set", cheats.td2SetCoins) },
            { t: "Set Health", d: "Set your HP", c: buildInputBtn("HP", "Set", cheats.td2SetHealth) },
            { t: "Set Round", d: "Set current round", c: buildInputBtn("Round", "Set", cheats.td2SetRound) }
        ],
        "Brawl": [
            { t: "Invincibility", d: "Infinite Health", c: buildToggle(cheats.brawlInvinc, cheats.brawlInvinc) },
            { t: "Double XP", d: "2x XP Gain", c: buildToggle(cheats.brawlDoubleXP, cheats.brawlDoubleXP) },
            { t: "Half Speed", d: "Slow Enemies", c: buildToggle(cheats.brawlHalfSpeed, cheats.brawlHalfSpeed) },
            { t: "Instant Kill", d: "1-Hit KO", c: buildToggle(cheats.brawlInstantKill, cheats.brawlInstantKill) },
            { t: "Magnet", d: "Infinite Magnet Range", c: buildToggle(cheats.brawlMagnet, cheats.brawlMagnet) },
            { t: "Kill All", d: "Kill all enemies", c: buildBtn("Kill", cheats.brawlKillAll) },
            { t: "Max Abilities", d: "Max current skills", c: buildBtn("Max", cheats.brawlMaxAbilities) },
            { t: "Next Level", d: "Level up", c: buildBtn("Lvl Up", cheats.brawlNextLevel) },
            { t: "Remove Obstacles", d: "Clear map", c: buildBtn("Remove", cheats.brawlRemoveObstacles) },
            { t: "Reset Health", d: "Heal to full", c: buildBtn("Heal", cheats.brawlResetHealth) }
        ],
        "Settings": [
            { t: "Theme", d: "Change UI Look", c: (() => { const s=document.createElement('select'); s.className='ob-input'; s.style.width='100px'; ['glass','native','terminal','rgb','christmas'].forEach(th=>s.add(new Option(th,th))); s.value=settings.theme; s.onchange=()=>{root.className=`theme-${s.value}`;settings.theme=s.value;localStorage.setItem('overBlookSettings',JSON.stringify(settings));}; return s; })() },
            { t: "Toggle Key", d: "Key to hide menu", c: buildInputBtn("k", "Set", cheats.setToggleKey) },
            { t: "Roman Input Mode", d: "Type I, V, X for numbers", c: buildToggle(()=>{settings.romanMode=true; notify("Roman Mode ON");}, ()=>{settings.romanMode=false; notify("Roman Mode OFF");}) },
            { t: "Rainbow Mode", d: "Cycle colors", c: buildToggle(cheats.startRainbow, cheats.stopRainbow) },
            { t: "Custom Title", d: "Change menu name", c: buildInputBtn("Title", "Set", cheats.setTitle) },
            { t: "Reset All", d: "Reset everything", c: buildBtn("Reset", cheats.resetAll) }
        ],
        "Changelog": [
            { t: "Made By", d: "Ocean_Water (Discord) / Alwaysadvancing (Github)", c: document.createElement('span') },
            { t: "V44", d: "Revamped RGB Theme (Thicker + Glowing).", c: document.createElement('span') },
            { t: "V43", d: "Fixed 'Use Any Blook' using exact raw logic.", c: document.createElement('span') },
            { t: "V42", d: "Fixed all flickering (Title/Helper) via state caching.", c: document.createElement('span') },
            { t: "V41", d: "Added theme-specific helpers, glowing RGB mode, and fixed 'Use Any Blook' logic.", c: document.createElement('span') },
            { t: "V40", d: "Fixed all flickering issues (Title & Helper).", c: document.createElement('span') },
            { t: "V39", d: "Fixed Title stability & Reset logic. Instant load.", c: document.createElement('span') },
            { t: "V38", d: "Fixed Auto Fish logic (Corner Clicker method)", c: document.createElement('span') },
            { t: "V37", d: "Made minimized circle draggable. Auto Fish now independent from Auto Answer.", c: document.createElement('span') },
            { t: "V36", d: "Fixed Rainbow toggle & Snow. Improved Auto Fish inputs.", c: document.createElement('span') },
            { t: "V35", d: "Fixed Title flashing & improved Lobby check.", c: document.createElement('span') },
            { t: "V34", d: "Bug fixes & Lobby check improvement.", c: document.createElement('span') },
            { t: "V33", d: "Fixed loading bug.", c: document.createElement('span') },
            { t: "V32", d: "Added 'All' tab & 'Use Any Blook'.", c: document.createElement('span') },
            { t: "V31", d: "Animated Christmas theme & Keybind setting", c: document.createElement('span') },
            { t: "V30", d: "Redesigned UI (OverBlook) & Holiday update", c: document.createElement('span') },
            { t: "V26", d: "Added TD2 cheats & Title customization", c: document.createElement('span') },
            { t: "V25", d: "Added Brawl & TD cheats", c: document.createElement('span') },
            { t: "V24", d: "Added Crypto features.", c: document.createElement('span') },
            { t: "V23", d: "Fixed Settings panel.", c: document.createElement('span') },
            { t: "V22", d: "Added Changelog.", c: document.createElement('span') },
            { t: "V21", d: "Crypto ESPs.", c: document.createElement('span') },
            { t: "V20", d: "Triple Crypto.", c: document.createElement('span') },
            { t: "V19", d: "Full Crypto Suite.", c: document.createElement('span') },
            { t: "V18", d: "Crypto & TD expansion.", c: document.createElement('span') },
            { t: "V17", d: "Infinity Lucas.", c: document.createElement('span') },
            { t: "V16", d: "Fixed Remove Distractions.", c: document.createElement('span') },
            { t: "V15", d: "Fixed Send Distractions.", c: document.createElement('span') },
            { t: "V12", d: "Roman Numerals.", c: document.createElement('span') },
            { t: "V11", d: "Full Rainbow.", c: document.createElement('span') },
            { t: "V10", d: "Polishing.", c: document.createElement('span') },
            { t: "V9", d: "Suffix support.", c: document.createElement('span') },
            { t: "V7", d: "Recursion fix.", c: document.createElement('span') },
            { t: "V6", d: "Server-side logic.", c: document.createElement('span') },
            { t: "V1", d: "Inception.", c: document.createElement('span') }
        ]
    };

    // Aggregate "All" Tab
    tabs["All"] = [...tabs.Global, ...tabs.Fishing, ...tabs.Crypto, ...tabs["Tower Def"], ...tabs["Tower Def 2"], ...tabs.Brawl];

    // Render logic
    const sb = document.getElementById('ob-sidebar'); const ct = document.getElementById('ob-cards-container');
    Object.keys(tabs).forEach((n,i) => { const b=document.createElement('button'); b.className=`ob-tab ${i===0?'active':''}`; b.innerText=n; b.onclick=()=>{document.querySelectorAll('.ob-tab').forEach(t=>t.classList.remove('active')); b.classList.add('active'); ct.innerHTML=''; tabs[n].forEach(x=>createCard(ct,x.t,x.d,x.c));}; sb.appendChild(b); });
    ct.innerHTML=''; tabs["All"].forEach(x=>createCard(ct,x.t,x.d,x.c));

    // Dragging & Interactions
    const h = document.getElementById('ob-header'); let d=false,ox,oy; 
    root.onmousedown = (e) => {
        if(guiState.isMinimized || e.target.closest('#ob-header')) {
            d = true; ox = e.clientX - root.offsetLeft; oy = e.clientY - root.offsetTop;
        }
    };
    document.onmousemove = e => { if(d) { root.style.left = (e.clientX - ox) + 'px'; root.style.top = (e.clientY - oy) + 'px'; } };
    document.onmouseup = () => d = false;

    document.getElementById('ob-min').onclick=()=>{guiState.isMinimized=!guiState.isMinimized; root.classList.toggle('minimized', guiState.isMinimized);};
    root.onclick=e=>{if(guiState.isMinimized&&e.target===root){guiState.isMinimized=false;root.classList.remove('minimized');}};
    document.getElementById('ob-close').onclick=()=>{root.remove(); document.getElementById('ob-toast-container').remove(); styleEl.remove();};
    document.getElementById('ob-search').oninput=e=>{const v=e.target.value.toLowerCase(); document.querySelectorAll('.ob-card').forEach(c=>c.style.display=c.dataset.name.includes(v)?'flex':'none');};
    document.addEventListener('keydown',e=>{if(e.key.toLowerCase()===settings.toggleKey.toLowerCase())root.style.display=root.style.display==='none'?'flex':'none';});

    notify("OverBlook Loaded!");
})();
