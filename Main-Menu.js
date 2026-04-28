(function() {
    'use-strict';
// <<<< btw these are for easier upd's
    // ==========================================
    // 1. ENGINE & UTILITIES
    // ==========================================
    
    const internals = {
        getGameState: () => { try { const el = document.querySelector("#app"); if (!el) return null; const rk = Object.keys(el).find(k => k.startsWith("__reactContainer$")); if (!rk) return null; let n = el[rk]; while (n) { if (n.stateNode?.props?.liveGameController) return n.stateNode; n = n.child; } return null; } catch (e) { return null; } },
        getWorkingStateNode: () => { try { const reactNode = (function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); })(); return Object.values(reactNode)[1].children[0]._owner.stateNode; } catch (e) { return null; } },
        getLobbyNode: () => { try { return (function react(r = document.querySelector("body>div")) { const node = Object.values(r)[1]?.children?.[0]?._owner.stateNode; if (node && node.props && (node.props.blooks || node.setState)) return node; if (r.querySelector(":scope>div")) return react(r.querySelector(":scope>div")); return null; })(); } catch (e) { return null; } },
        findAndClickAnswer: () => { const gs = internals.getGameState(); if (gs?.state?.question) { const correct = gs.state.question.correctAnswers[0]; document.querySelectorAll('[class*="answerContainer"]').forEach(b => { if(b.innerText === correct) b.click(); }); } },
        parseWeight: (input) => { 
            if (settings.romanMode) return internals.romanToInt(input);
            const raw = String(input).trim().toLowerCase(); 
            const m = { 'lucas': Number.POSITIVE_INFINITY, 'sx': 1e21, 'qi': 1e18, 'q': 1e15, 't': 1e12, 'b': 1e9, 'm': 1e6, 'k': 1e3 }; 
            for (const s of Object.keys(m).sort((a,b)=>b.length-a.length)) { if (raw.endsWith(s)) return Math.floor((parseFloat(raw.slice(0, -s.length)) || 1) * m[s]); } 
            return parseFloat(raw) || NaN; 
        },
        romanToInt: (s) => { const m = { 'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000 }; let t=0; s=String(s).toUpperCase(); for(let i=0;i<s.length;i++) { m[s[i]] < m[s[i+1]] ? t-=m[s[i]] : t+=m[s[i]]; } return t; },
        // MODIFIED: Duration is now in SECONDS
        notify: (msg, seconds = 3) => { 
            const t=document.createElement('div'); t.className='ob-toast'; t.innerText=msg; 
            document.getElementById('ob-toast-container')?.appendChild(t); 
            setTimeout(()=>{t.style.opacity='0';setTimeout(()=>t.remove(),300)}, seconds * 1000); 
        },
        refreshTab: (name) => {
            const currentTabBtn = document.querySelector('.ob-tab.active');
            if(currentTabBtn && currentTabBtn.innerText === name) renderTab(name);
        }
    };

    const intervals = { frenzy: null, autoAnswer: null, rainbow: null, distract: null, guess: null, hackBox: null, autoPass: null, triple: null, hack: null, choiceESP: null, passESP: null, quint: null, dblXP: null, halfSpd: null, instKill: null, invinc: null, magnet: null, autoFish: null, stealAll: null };
    let settings = JSON.parse(localStorage.getItem('overBlookSettings')) || { theme: 'christmas', toggleKey: 'k', autoAnswerSpeed: 10, romanMode: false, customTitle: "OverBlook | %Name%" };
    let guiState = { isMinimized: false };
    let originalBuy = null; let originalSend = null; let cachedName = "Waiting..."; let cachedTheme = settings.theme;
    let speedMultiplier = 1; let originalRaf = window.requestAnimationFrame;

    // ==========================================
    // 2. CHEAT FUNCTIONS
    // ==========================================
    const cheats = {
        // Global
        toggleAutoAnswer: () => { if(intervals.autoAnswer) { clearInterval(intervals.autoAnswer); intervals.autoAnswer = null; internals.notify("Auto Answer Off"); } else { intervals.autoAnswer = setInterval(internals.findAndClickAnswer, settings.autoAnswerSpeed); internals.notify("Auto Answer On"); } },
        setAnswerSpeed: (val) => { const v = parseInt(val); if(!isNaN(v)) { settings.autoAnswerSpeed = v; localStorage.setItem('overBlookSettings', JSON.stringify(settings)); if(intervals.autoAnswer) { clearInterval(intervals.autoAnswer); intervals.autoAnswer = setInterval(internals.findAndClickAnswer, v); } internals.notify("Speed Set: " + v + "ms"); } },
        useAnyBlook: () => { 
            const s = internals.getLobbyNode();
            if (!s) return internals.notify("Not in Lobby!");
            let blooks;
            const oldKeys = Object.keys;
            Object.keys = function (obj) {
                if (!obj.Chick) return oldKeys.call(this, obj);
                blooks = obj;
                return (Object.keys = oldKeys).call(this, obj);
            };
            try { s.render(); } catch(e){} 
            if(blooks) s.setState({ unlocks: Object.keys(blooks) });
            internals.notify("All Blooks Unlocked!"); 
        },
        bypassRandomName: () => {
            try {
                const node = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); })())[1].children[0]._owner.stateNode;
                if(node) { node.setState({ isRandom: false, client: { name: "" } }); internals.notify("Random Name Removed!"); setTimeout(() => document.querySelector('[class*="nameInput"]')?.focus(), 100); } 
                else internals.notify("Could not find name state.");
            } catch (e) { internals.notify("Run this on Name Entry!"); }
        },
        changeBlookIngame: (name) => { const s = internals.getWorkingStateNode(); if(s && s.props.client) { s.props.liveGameController.setVal({ path: `c/${s.props.client.name}/b`, val: name }); if(s.setState) s.setState({ blook: name }); if(s.props.client) s.props.client.blook = name; internals.notify("Blook Changed!"); } },
        setGameSpeed: (val) => {
            speedMultiplier = parseFloat(val);
            if (window.requestAnimationFrame === originalRaf && speedMultiplier !== 1) {
                window.requestAnimationFrame = function(cb) {
                    if (speedMultiplier < 1) { if (Math.random() < speedMultiplier) originalRaf(cb); else originalRaf(() => window.requestAnimationFrame(cb)); } 
                    else { for (let i = 0; i < speedMultiplier; i++) originalRaf(cb); }
                    return Math.floor(Math.random() * 10000);
                };
            } else if (speedMultiplier === 1) { window.requestAnimationFrame = originalRaf; }
        },

        // Fishing
        toggleAutoFish: () => {
            if(intervals.autoFish) { clearInterval(intervals.autoFish); intervals.autoFish = null; internals.notify("Auto Fish Off"); } 
            else {
                intervals.autoFish = setInterval(() => {
                    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
                    const elementAtCorner = document.elementFromPoint(0, 0);
                    if(elementAtCorner) elementAtCorner.dispatchEvent(new MouseEvent('click', { view: window, bubbles: true, cancelable: true, clientX: 0, clientY: 0 }));
                }, 50);
                internals.notify("Auto Fish On");
            }
        },
        setLure: (val) => { const s = internals.getWorkingStateNode(); if(s) { s.setState({ lure: parseInt(val) }); internals.notify("Lure set to " + val); } },
        setWeight: (val) => { const s = internals.getWorkingStateNode(); const w = internals.parseWeight(val); if(s && !isNaN(w)) { s.props.liveGameController.setVal({ path: `c/${s.props.client.name}`, val: { b: s.props.client.blook, w: w } }); s.setState({ weight: w, weight2: w }); internals.notify("Weight updated!"); } },
        toggleFrenzy: () => { if(intervals.frenzy) { clearInterval(intervals.frenzy); intervals.frenzy = null; const s = internals.getWorkingStateNode(); if(s) s.setState({ isFrenzy: false }); internals.notify("Frenzy Off"); } else { intervals.frenzy = setInterval(() => { const s = internals.getWorkingStateNode(); if(s) s.props.liveGameController.setVal({ path: `c/${s.props.client.name}`, val: { b: s.props.client.blook, w: s.state.weight, f: "Frenzy", s: true } }); }, 100); internals.notify("Frenzy On"); } },
        toggleDistractionRemover: () => { if(intervals.distract) { clearInterval(intervals.distract); intervals.distract = null; internals.notify("Distractions Enabled"); } else { intervals.distract = setInterval(() => { const s = internals.getWorkingStateNode(); if(s) s.setState({ party: "" }); }, 50); internals.notify("Distractions Blocked"); } },
        sendDistraction: (fish) => { const s = internals.getWorkingStateNode(); if(s) { const w = s.state.weight || 0; s.props.liveGameController.setVal({ path: `c/${s.props.client.name}`, val: { b: s.props.client.blook, w: w, f: fish, s: true } }); internals.notify(`Sent ${fish}!`); } },
        
        // Crypto
        setCrypto: (val) => { 
            const s = internals.getWorkingStateNode(); 
            const c = internals.parseWeight(val); 
            if(s && !isNaN(c)) { 
                // Redundant Update for robustness
                s.setState({ crypto: c, crypto2: c });
                s.props.liveGameController.setVal({ path: `c/${s.props.client.name}/cr`, val: c }); // Used by some game versions
                s.props.liveGameController.setVal({ path: `c/${s.props.client.name}/crypto`, val: c }); // Used by others
                internals.notify("Crypto Set!"); 
            } 
        },
        setPass: (p) => { const s = internals.getWorkingStateNode(); if(s) { s.props.liveGameController.setVal({ path: `c/${s.props.client.name}/p`, val: p }); internals.notify("Password Set!"); } },
        stealCrypto: (targetName) => { 
            const s = internals.getWorkingStateNode(); 
            if(s) { 
                s.props.liveGameController.getDatabaseVal("c", (players) => {
                    if (!players) return internals.notify("No players found!");
                    const target = Object.entries(players).find(([name]) => name.toLowerCase() === targetName.toLowerCase());
                    if (target) {
                        const amount = target[1].cr || 0;
                        const newAmount = s.state.crypto + amount;
                        s.setState({ crypto: newAmount, crypto2: newAmount });
                        s.props.liveGameController.setVal({
                            path: `c/${s.props.client.name}`,
                            val: { b: s.props.client.blook, p: s.state.password, cr: newAmount, tat: `${target[0]}:${amount}` }
                        });
                        internals.notify(`Stole ${amount} from ${target[0]}!`);
                    } else {
                        internals.notify("Player not found!");
                    }
                });
            } 
        },
        toggleAutoGuess: () => { if(intervals.guess) { clearInterval(intervals.guess); intervals.guess = null; internals.notify("Auto Guess Off"); } else { intervals.guess = setInterval(() => { const s = internals.getWorkingStateNode(); if(s?.state?.stage === "hack" && s.state.choices) { const correct = s.state.correctPassword; const btn = Array.from(document.querySelectorAll('div[class*="button"]')).find(b => b.innerText === correct); if(btn) btn.click(); } }, 100); internals.notify("Auto Guess On"); } },
        toggleAlwaysTriple: () => { if(intervals.triple) { clearInterval(intervals.triple); intervals.triple = null; internals.notify("Always Triple Off"); } else { intervals.triple = setInterval(() => { const s = internals.getWorkingStateNode(); if(s?.state?.stage === "prize") s.setState({ add: s.state.crypto * 2 }); }, 50); internals.notify("Always Triple On"); } },
        toggleAlwaysQuintuple: () => { const s = internals.getWorkingStateNode(); if(!intervals.quint) { if(s) s.setState({ choices: [{ type: "mult", val: 5, rate: 0.075, blook: "Brainy Bot", text: "Quintuple Crypto" }] }); intervals.quint = true; internals.notify("Always Quintuple On"); } else { if(s) s.setState({ choices: [] }); intervals.quint = false; internals.notify("Always Quintuple Off"); } },
        toggleAlwaysHack: () => { if(intervals.hack) { clearInterval(intervals.hack); intervals.hack = null; internals.notify("Always Hack Off"); } else { intervals.hack = setInterval(() => { const s = internals.getWorkingStateNode(); if(s) s.setState({ choices: [{ type: "hack", rate: 0.075, blook: "Brainy Bot", text: "Hack" }] }); }, 25); internals.notify("Always Hack On"); } },
        togglePassESP: () => { if(intervals.passESP) { clearInterval(intervals.passESP); intervals.passESP = null; document.querySelectorAll('.esp-pass').forEach(e=>e.remove()); internals.notify("Pass ESP Off"); } else { intervals.passESP = setInterval(() => { const s = internals.getWorkingStateNode(); if(s?.state?.game?.players) document.querySelectorAll('div[class^="styles__name___"]').forEach(el => { const p = s.state.game.players[el.innerText]; if(p?.p) { let d = el.querySelector('.esp-pass'); if(!d) { d = document.createElement('div'); d.className = 'esp-pass'; el.append(d); } d.innerText = p.p; } }); }, 100); internals.notify("Pass ESP On"); } },
        toggleChoiceESP: () => { if(intervals.choiceESP) { clearInterval(intervals.choiceESP); intervals.choiceESP = null; document.querySelectorAll('div[class^="styles__choice___"]').forEach(e => e.innerHTML = ""); internals.notify("Choice ESP Off"); } else { intervals.choiceESP = setInterval(() => { const s = internals.getWorkingStateNode(); if(s?.state?.choices) document.querySelectorAll('div[class^="styles__choice___"]').forEach((e, i) => { if(e.innerText === "") e.innerText = s.state.choices[i].type; }); }, 50); internals.notify("Choice ESP On"); } },
        toggleBlockHackV1: () => { if(intervals.hackBox) { clearInterval(intervals.hackBox); intervals.hackBox = null; internals.notify("V1: Hack UI Blocked"); } else { intervals.hackBox = setInterval(() => { const s = internals.getWorkingStateNode(); if(s) s.setState({ hack: "" }); }, 50); internals.notify("V1: Hack UI Enabled"); } },
        toggleBlockHackV2: () => {
            if(intervals.autoPass) { clearInterval(intervals.autoPass); intervals.autoPass = null; internals.notify("V2: Auto-Pass Off"); }
            else {
                const passwords = ["DogLover54", "Password123", "BlooketGod", "LeaveMeAlone", "SchoolSucks", "123456", "Qwerty", "HackerMan"];
                intervals.autoPass = setInterval(() => {
                    const s = internals.getWorkingStateNode();
                    const randPass = passwords[Math.floor(Math.random() * passwords.length)];
                    if(s) s.props.liveGameController.setVal({ path: `c/${s.props.client.name}/p`, val: randPass });
                }, 500);
                internals.notify("V2: Auto-Pass On");
            }
        },

        // Admin
        glitchHost: () => {
            const s = internals.getWorkingStateNode();
            if(s) {
                // Sends a hack event with invalid target data, usually glitching the host screen
                s.props.liveGameController.setVal({
                    path: `c/${s.props.client.name}/hack`,
                    val: { target: "Host", amount: NaN } 
                });
                internals.notify("Glitch Packet Sent!");
            }
        },
        setInfinitePass: () => {
            const s = internals.getWorkingStateNode();
            if(s) {
                s.props.liveGameController.setVal({ path: `c/${s.props.client.name}/p`, val: NaN });
                internals.notify("Password set to NaN (Un-enterable)");
            }
        },
        toggleStealAll: () => {
            if(intervals.stealAll) { clearInterval(intervals.stealAll); intervals.stealAll = null; internals.notify("Steal All Off"); }
            else {
                internals.notify("Steal All On");
                intervals.stealAll = setInterval(() => {
                    const s = internals.getWorkingStateNode();
                    if(s) {
                        s.props.liveGameController.getDatabaseVal("c", (players) => {
                            if (!players) return;
                            Object.entries(players).forEach(([name, data]) => {
                                if (name !== s.props.client.name && data.cr > 0) {
                                    // Steal packet
                                    s.props.liveGameController.setVal({
                                        path: `c/${s.props.client.name}/tat`,
                                        val: `${name}:${data.cr}`
                                    });
                                }
                            });
                        });
                    }
                }, 2000);
            }
        },

        // Tower Defense
        tdSetTokens: (val) => { const s = internals.getWorkingStateNode(); const t = internals.parseWeight(val); if(s && !isNaN(t)) { s.props.liveGameController.setVal({ path: `c/${s.props.client.name}/t`, val: t }); internals.notify("Tokens Set!"); } },
        tdSetRound: (val) => { const s = internals.getWorkingStateNode(); if(s) { s.props.liveGameController.setVal({ path: `r`, val: parseInt(val) }); internals.notify("Round Set!"); } },
        tdSetHealth: (val) => { const s = internals.getWorkingStateNode(); if(s) { s.props.liveGameController.setVal({ path: `h`, val: parseInt(val) }); internals.notify("Health Set!"); } },
        tdClearEnemies: () => { const s = internals.getWorkingStateNode(); if(s) { s.props.liveGameController.setVal({ path: `e`, val: {} }); internals.notify("Enemies Cleared!"); } },
        tdMaxTowers: () => { const s = internals.getWorkingStateNode(); if(s) { Object.entries(s.props.liveGameController.get("towers")).forEach(([id, t]) => s.props.liveGameController.setVal({ path: `towers/${id}`, val: { ...t, level: s.props.client.blookData[t.type].levels.length - 1 }})); internals.notify("Towers Maxed!"); } },
        tdRemoveDucks: () => { const s = internals.getWorkingStateNode(); if(s) { s.props.liveGameController.setVal({ path: 'g/ducks', val: [] }); internals.notify("Ducks Removed!"); } },
        tdRemoveObstacles: () => { const s = internals.getWorkingStateNode(); if(s) { s.removeObstacles(); internals.notify("Obstacles Removed!"); } },
        tdEarthquake: () => { const s = internals.getWorkingStateNode(); if(s) { s.props.liveGameController.setVal({ path: 'g/eq', val: true }); internals.notify("Earthquake!"); } },
        tdToggleGlobalDmg: (val) => { 
            const s = internals.getWorkingStateNode(); 
            if(!window.globalDamageActive) { 
                if(s && !originalSend) { originalSend = s.props.liveGameController.send; s.props.liveGameController.send = function(msg) { if(msg.type == "attack") msg.data.damage = parseInt(val); return originalSend.apply(s.props.liveGameController, arguments); }; window.globalDamageActive = true; internals.notify("Global Dmg On"); }
            } else { 
                if(s && originalSend) { s.props.liveGameController.send = originalSend; originalSend = null; } window.globalDamageActive = false; internals.notify("Global Dmg Off");
            } 
        },

        // TD2
        td2SetCoins: (val) => { const s = internals.getWorkingStateNode(); const c = internals.parseWeight(val); if(s && !isNaN(c)) { s.setState({ coins: c }); internals.notify("Coins Set!"); } },
        td2SetHealth: (val) => { const s = internals.getWorkingStateNode(); if(s) s.setState({ health: parseInt(val) }); internals.notify("Health Set!"); },
        td2SetRound: (val) => { const s = internals.getWorkingStateNode(); if(s) s.setState({ round: parseInt(val) }); internals.notify("Round Set!"); },
        td2ClearEnemies: () => { const s = internals.getWorkingStateNode(); if(s) { s.setState({ enemies: [] }); internals.notify("Enemies Cleared!"); } },
        td2MaxTowers: () => { const s = internals.getWorkingStateNode(); if(s) { s.state.towers.forEach(t => { t.stats.damage = 1e6; t.stats.range = 100; t.stats.rate = 0.01; }); s.setState({ towers: s.state.towers }); internals.notify("Towers God Mode!"); } },

        // Brawl
        brawlInvinc: () => { if(intervals.invinc) { clearInterval(intervals.invinc); intervals.invinc = null; internals.notify("Invincibility Off"); } else { intervals.invinc = setInterval(() => { const s = internals.getWorkingStateNode(); if(s?.state) s.state.health.set(999999); }, 50); internals.notify("Invincibility On"); } },
        brawlKillAll: () => { const s = internals.getWorkingStateNode(); if(s) { s.killAll(); internals.notify("Enemies Killed!"); } },
        brawlDoubleXP: () => { if(intervals.dblXP) { clearInterval(intervals.dblXP); intervals.dblXP = null; const s=internals.getWorkingStateNode(); if(s?.state) s.state.xp.set(1); internals.notify("Double XP Off"); } else { intervals.dblXP = setInterval(() => { const s=internals.getWorkingStateNode(); if(s?.state) s.state.xp.set(2); }, 50); internals.notify("Double XP On"); } },
        brawlHalfSpeed: () => { if(intervals.halfSpd) { clearInterval(intervals.halfSpd); intervals.halfSpd = null; const s=internals.getWorkingStateNode(); if(s?.state) s.state.speed.set(1); internals.notify("Half Speed Off"); } else { intervals.halfSpd = setInterval(() => { const s=internals.getWorkingStateNode(); if(s?.state) s.state.speed.set(0.5); }, 50); internals.notify("Half Speed On"); } },
        brawlInstantKill: () => { if(intervals.instKill) { clearInterval(intervals.instKill); intervals.instKill = null; const s=internals.getWorkingStateNode(); if(s?.state) s.state.damage.set(1); internals.notify("Insta Kill Off"); } else { intervals.instKill = setInterval(() => { const s=internals.getWorkingStateNode(); if(s?.state) s.state.damage.set(1e6); }, 50); internals.notify("Insta Kill On"); } },
        brawlMagnet: () => { if(intervals.magnet) { clearInterval(intervals.magnet); intervals.magnet = null; const s=internals.getWorkingStateNode(); if(s?.state) s.state.magnet.set(1); internals.notify("Magnet Off"); } else { intervals.magnet = setInterval(() => { const s=internals.getWorkingStateNode(); if(s?.state) s.state.magnet.set(1e6); }, 50); internals.notify("Magnet On"); } },
        brawlMaxAbilities: () => { const s = internals.getWorkingStateNode(); if(s) { s.maxAbilities(); internals.notify("Abilities Maxed!"); } },
        brawlNextLevel: () => { const s = internals.getWorkingStateNode(); if(s) { s.nextLevel(); internals.notify("Next Level!"); } },
        brawlRemoveObstacles: () => { const s = internals.getWorkingStateNode(); if(s) { s.clearTrees(); internals.notify("Trees Removed!"); } },
        brawlResetHealth: () => { const s = internals.getWorkingStateNode(); if(s) { s.resetHealth(); internals.notify("Health Reset!"); } },

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
                if(rootEl) { rootEl.style.setProperty('--ob-accent', accent); rootEl.style.setProperty('--ob-accent-hover', accent); }
            }, 25);
        },
        stopRainbow: () => { 
            clearInterval(window.rainbowInterval); 
            window.rainbowInterval = null; 
            const m = document.getElementById('gui-master-color-picker'); 
            if(m) m.disabled = false; 
            const rootEl = document.getElementById('overblook-root');
            if(rootEl) { rootEl.style.removeProperty('--ob-accent'); rootEl.style.removeProperty('--ob-accent-hover'); }
            updateAppearance(); 
        },
        setTitle: (val) => { 
            if (val.trim() === "") val = "OverBlook | %Name%";
            settings.customTitle = val; 
            localStorage.setItem('overBlookSettings', JSON.stringify(settings)); 
            document.querySelector('.ob-title').innerText = val; 
            internals.notify("Title Set!"); 
        },
        setToggleKey: (val) => { if(val) { settings.toggleKey = val; localStorage.setItem('overBlookSettings', JSON.stringify(settings)); internals.notify("Toggle Key: " + val); } },
        resetAll: () => { if(confirm("Reset all settings to default?")) { localStorage.removeItem('overBlookSettings'); location.reload(); } }
    };

    // ==========================================
    // 3. UI BUILDER & STYLES
    // ==========================================

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');
        :root { --ob-bg: rgba(20, 20, 30, 0.65); --ob-border: rgba(255, 255, 255, 0.1); --ob-text: #fff; --ob-text-dim: #ddd; --ob-accent: #00c7ff; --ob-accent-hover: #009ecb; --ob-radius: 12px; --ob-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); --ob-blur: blur(16px); --ob-font: 'Nunito', sans-serif; }
        .theme-glass {}
        .theme-native { --ob-bg: #ffffff; --ob-border: #e0e0e0; --ob-text: #333; --ob-text-dim: #555; --ob-shadow: 0 4px 0 rgba(0,0,0,0.1); --ob-blur: none; }
        .theme-terminal { --ob-bg: #000; --ob-border: #00ff00; --ob-text: #00ff00; --ob-text-dim: #00aa00; --ob-accent: #00aa00; --ob-accent-hover: #00ff00; --ob-radius: 0px; --ob-font: 'Courier New', monospace; }
        .theme-rgb { --ob-bg: rgba(0, 0, 0, 0.85); --ob-border: transparent; border: 3px solid transparent; animation: rgbGlow 3s linear infinite; }
        .theme-christmas { --ob-bg: rgba(100, 0, 0, 0.6); --ob-border: rgba(255,255,255,0.3); --ob-accent: #27ae60; --ob-accent-hover: #2ecc71; --ob-text: #fff; --ob-text-dim: #eee; --ob-blur: blur(12px); }
        .theme-christmas::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1; background-image: radial-gradient(white 3px, transparent 4px), radial-gradient(white 2px, transparent 3px); background-size: 60px 60px, 40px 40px; animation: snow 4s linear infinite; opacity: 0.4; }
        @keyframes snow { 0% {background-position: 0 0, 0 0;} 100% {background-position: 0 200px, 0 100px;} }
        @keyframes rgbGlow { 0% { box-shadow: 0 0 15px #ff0000, 0 0 30px #ff0000; border-color: #ff0000; } 33% { box-shadow: 0 0 15px #00ff00, 0 0 30px #00ff00; border-color: #00ff00; } 66% { box-shadow: 0 0 15px #0000ff, 0 0 30px #0000ff; border-color: #0000ff; } 100% { box-shadow: 0 0 15px #ff0000, 0 0 30px #ff0000; border-color: #ff0000; } }
        
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
        .ob-slider-container { display: flex; align-items: center; gap: 10px; flex-grow: 1; }
        .ob-slider { -webkit-appearance: none; width: 100%; height: 6px; background: rgba(255,255,255,0.2); border-radius: 5px; outline: none; }
        .ob-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--ob-accent); cursor: pointer; transition: .2s; }
        .ob-slider-val { min-width: 30px; text-align: right; font-weight: bold; font-size: 0.9rem; }
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
    // 4. GUI INITIALIZATION & API
    // ==========================================
    const root = document.createElement('div'); root.id = 'overblook-root'; root.className = `theme-${settings.theme}`;
    const megabotImg = "https://ac.blooket.com/marketassets/blooks/megabot.svg"; 
    const santaImg = "https://ac.blooket.com/marketassets/blooks/santaclaus.svg";
    const earthImg = "https://ac.blooket.com/marketassets/blooks/earth.svg";
    const starsImg = "https://ac.blooket.com/marketassets/blooks/stars.svg";
    const rainbowImg = "https://ac.blooket.com/marketassets/blooks/rainbowastronaut.svg";
    const themeImages = { "christmas": santaImg, "native": earthImg, "glass": starsImg, "rgb": rainbowImg, "terminal": megabotImg };

    root.innerHTML = `
        <div id="ob-header"><div class="ob-profile"><span class="ob-title">Waiting...</span></div><div class="ob-controls"><span class="ob-ctrl-btn" id="ob-min">_</span><span class="ob-ctrl-btn" id="ob-close">X</span></div></div>
        <div id="ob-body"><div id="ob-sidebar"></div><div id="ob-content"><input type="text" id="ob-search" placeholder="Search cheats..."><div id="ob-cards-container"></div></div></div>
        <div id="ob-assistant"><div class="assistant-bubble" id="ob-assist-text">I'm here to help!</div><img src="${themeImages[settings.theme] || megabotImg}" class="assistant-img" id="ob-helper-img"></div>
    `;
    document.body.appendChild(root);
    const toastContainer = document.createElement('div'); toastContainer.id = 'ob-toast-container'; document.body.appendChild(toastContainer);

    // ------------------------------------------
    // THE API & HELPERS
    // ------------------------------------------
    function notify(msg, duration = 3) { const t=document.createElement('div'); t.className='ob-toast'; t.innerText=msg; toastContainer.appendChild(t); setTimeout(()=>{t.style.opacity='0';setTimeout(()=>t.remove(),300)}, duration * 1000); }
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
    function buildSlider(min, max, step, def, act) { 
        const d=document.createElement('div'); d.className='ob-slider-container'; 
        const i=document.createElement('input'); i.type='range'; i.className='ob-slider'; i.min=min; i.max=max; i.step=step; i.value=def; 
        const l=document.createElement('span'); l.className='ob-slider-val'; l.innerText=def + 'x';
        i.oninput = () => { l.innerText = i.value + 'x'; act(i.value); };
        d.append(i, l); return d; 
    }
    function updateAppearance() { const alpha = 1.0 - (settings.transparency / 100.0); Object.entries(settings.colors).forEach(([k, v]) => root.style.setProperty(k.replace('-solid', ''), k.endsWith('-solid') ? hexToRgba(v, alpha) : v)); root.style.setProperty('--ob-bg-solid', settings.colors['--ob-bg-solid']); }
    function renderTab(name) {
        const ct = document.getElementById('ob-cards-container'); ct.innerHTML = '';
        if(tabs[name]) tabs[name].forEach(x => createCard(ct, x.t, x.d, x.c));
    }

    window.OverBlook = {
        AddTab: (config) => {
            if(!tabs[config.Name]) { tabs[config.Name] = []; }
            const b = document.createElement('button'); b.className = 'ob-tab'; b.innerText = config.Name;
            b.onclick = () => { document.querySelectorAll('.ob-tab').forEach(t=>t.classList.remove('active')); b.classList.add('active'); renderTab(config.Name); };
            document.getElementById('ob-sidebar').appendChild(b);
        },
        AddButton: (config) => {
            if(!config.Tab || !config.Name) return;
            if(!tabs[config.Tab]) window.OverBlook.AddTab({Name: config.Tab});
            tabs[config.Tab].push({ t: config.Name, d: config.Description || "", c: buildBtn(config.Name.split(' ')[0], config.Script) });
            internals.refreshTab(config.Tab);
        },
        AddToggle: (config) => {
            if(!config.Tab || !config.Name) return;
            if(!tabs[config.Tab]) window.OverBlook.AddTab({Name: config.Tab});
            tabs[config.Tab].push({ t: config.Name, d: config.Description || "", c: buildToggle(config.OnScript, config.OffScript) });
            internals.refreshTab(config.Tab);
        },
        AddInput: (config) => {
            if(!config.Tab || !config.Name) return;
            if(!tabs[config.Tab]) window.OverBlook.AddTab({Name: config.Tab});
            tabs[config.Tab].push({ t: config.Name, d: config.Description || "", c: buildInputBtn(config.Placeholder || "", config.ButtonText || "Set", config.Script) });
            internals.refreshTab(config.Tab);
        },
        AddSlider: (config) => {
            if(!config.Tab || !config.Name) return;
            if(!tabs[config.Tab]) window.OverBlook.AddTab({Name: config.Tab});
            tabs[config.Tab].push({ t: config.Name, d: config.Description || "", c: buildSlider(config.Min, config.Max, config.Step, config.Default, config.Script) });
            internals.refreshTab(config.Tab);
        },
        Notify: (msg, duration) => internals.notify(msg, duration)
    };

    // --- POPULATE THE GUI (Using the new Data Structure) ---
    const tabs = { "All": [], "Global": [], "Fishing": [], "Crypto": [], "Tower Def": [], "Tower Def 2": [], "Brawl": [], "Admin": [], "Settings": [], "Changelog": [] };

    // Global
    tabs.Global.push({ t: "Auto Answer", d: "Auto-answers correct options", c: buildToggle(cheats.toggleAutoAnswer, cheats.toggleAutoAnswer) });
    tabs.Global.push({ t: "Answer Speed", d: "Set delay in ms (Lower = Faster)", c: buildInputBtn("10", "Set", cheats.setAnswerSpeed) });
    tabs.Global.push({ t: "Game Speed", d: "Speed up or slow down game", c: buildSlider(0.5, 5, 0.5, 1, cheats.setGameSpeed) });
    tabs.Global.push({ t: "Use Any Blook", d: "Unlock all blooks (Lobby only)", c: buildBtn("Unlock", cheats.useAnyBlook) });
    tabs.Global.push({ t: "Change Blook", d: "Change blook ingame (Name)", c: buildInputBtn("Name", "Set", cheats.changeBlookIngame) });
    tabs.Global.push({ t: "Bypass Random Name", d: "Disable forced random names", c: buildBtn("Bypass", cheats.bypassRandomName) });

    // Fishing
    tabs.Fishing.push({ t: "Auto Fish", d: "Auto click + answer (50ms)", c: buildToggle(cheats.toggleAutoFish, cheats.toggleAutoFish) });
    tabs.Fishing.push({ t: "Frenzy", d: "Triggers frenzy event", c: buildToggle(cheats.toggleFrenzy, cheats.toggleFrenzy) });
    tabs.Fishing.push({ t: "Set Weight", d: "Set fish weight (supports 'lucas')", c: buildInputBtn("Weight", "Set", cheats.setWeight) });
    tabs.Fishing.push({ t: "Set Lure", d: "Change your lure (Level 1-5)", c: buildInputBtn("Level", "Set", cheats.setLure) });
    tabs.Fishing.push({ t: "No Distractions", d: "Removes big fish animations", c: buildToggle(cheats.toggleDistractionRemover, cheats.toggleDistractionRemover) });
    tabs.Fishing.push({ t: "Send Distraction", d: "Spam big fish to others", c: buildDropdown(["Crab","Jellyfish","Frog","Pufferfish","Octopus","Narwhal","Megalodon","Blobfish"], cheats.sendDistraction) });

    // Crypto
    tabs.Crypto.push({ t: "Password ESP", d: "See everyone's passwords", c: buildToggle(cheats.togglePassESP, cheats.togglePassESP) });
    tabs.Crypto.push({ t: "Choice ESP", d: "See what's in prize boxes", c: buildToggle(cheats.toggleChoiceESP, cheats.toggleChoiceESP) });
    tabs.Crypto.push({ t: "Auto Guess", d: "Auto-guesses passwords", c: buildToggle(cheats.toggleAutoGuess, cheats.toggleAutoGuess) });
    tabs.Crypto.push({ t: "Always Triple", d: "Triples crypto on win", c: buildToggle(cheats.toggleAlwaysTriple, cheats.toggleAlwaysTriple) });
    tabs.Crypto.push({ t: "Always Quintuple", d: "Forces x5 Crypto option", c: buildToggle(cheats.toggleAlwaysQuintuple, cheats.toggleAlwaysQuintuple) });
    tabs.Crypto.push({ t: "Always Hack", d: "Forces Hack option", c: buildToggle(cheats.toggleAlwaysHack, cheats.toggleAlwaysHack) });
    tabs.Crypto.push({ t: "Set Crypto", d: "Set your crypto balance", c: buildInputBtn("Amount", "Set", cheats.setCrypto) });
    tabs.Crypto.push({ t: "Set Password", d: "Set your own password", c: buildInputBtn("Pass", "Set", cheats.setPass) });
    tabs.Crypto.push({ t: "Steal Crypto", d: "Steal from a specific player", c: buildInputBtn("Name", "Steal", cheats.stealCrypto) });
    tabs.Crypto.push({ t: "Block Hack V1", d: "Hides hack UI (Visual)", c: buildToggle(cheats.toggleBlockHackV1, cheats.toggleBlockHackV1) });
    tabs.Crypto.push({ t: "Block Hacks V2", d: "Auto-Randomizes Password (Un-hackable)", c: buildToggle(cheats.toggleBlockHackV2, cheats.toggleBlockHackV2) });

    // TD, TD2, Brawl (Standard population...)
    tabs["Tower Def"].push({ t: "Max Towers", d: "Upgrades all towers", c: buildBtn("Max", cheats.tdMaxTowers) }, { t: "Clear Enemies", d: "Wipes the map", c: buildBtn("Clear", cheats.tdClearEnemies) }, { t: "Set Tokens", d: "Sets your tokens", c: buildInputBtn("Amount", "Set", cheats.tdSetTokens) }, { t: "Set Round", d: "Skip to round", c: buildInputBtn("Round", "Set", cheats.tdSetRound) }, { t: "Set Health", d: "Set your HP", c: buildInputBtn("HP", "Set", cheats.tdSetHealth) }, { t: "Remove Ducks", d: "Begone ducks", c: buildBtn("Remove", cheats.tdRemoveDucks) }, { t: "Remove Obstacles", d: "Clear trees/rocks", c: buildBtn("Remove", cheats.tdRemoveObstacles) }, { t: "Earthquake", d: "Trigger earthquake", c: buildBtn("Trigger", cheats.tdEarthquake) }, { t: "Global Damage", d: "Set damage for all towers", c: (() => { const d=document.createElement('div'); d.style.display='flex'; const i=document.createElement('input'); i.className='ob-input'; i.placeholder='Dmg'; const b=buildToggle(()=>cheats.tdToggleGlobalDmg(i.value), cheats.tdToggleGlobalDmg); d.append(i,b); return d; })() });
    tabs["Tower Def 2"].push({ t: "God Mode Towers", d: "Inf Dmg/Range/FireRate", c: buildBtn("Enable", cheats.td2MaxTowers) }, { t: "Clear Enemies", d: "Wipe map", c: buildBtn("Clear", cheats.td2ClearEnemies) }, { t: "Set Coins", d: "Sets your coins", c: buildInputBtn("Amount", "Set", cheats.td2SetCoins) }, { t: "Set Health", d: "Set your HP", c: buildInputBtn("HP", "Set", cheats.td2SetHealth) }, { t: "Set Round", d: "Set current round", c: buildInputBtn("Round", "Set", cheats.td2SetRound) });
    tabs.Brawl.push({ t: "Invincibility", d: "Infinite Health", c: buildToggle(cheats.brawlInvinc, cheats.brawlInvinc) }, { t: "Double XP", d: "2x XP Gain", c: buildToggle(cheats.brawlDoubleXP, cheats.brawlDoubleXP) }, { t: "Half Speed", d: "Slow Enemies", c: buildToggle(cheats.brawlHalfSpeed, cheats.brawlHalfSpeed) }, { t: "Instant Kill", d: "1-Hit KO", c: buildToggle(cheats.brawlInstantKill, cheats.brawlInstantKill) }, { t: "Magnet", d: "Infinite Magnet Range", c: buildToggle(cheats.brawlMagnet, cheats.brawlMagnet) }, { t: "Kill All", d: "Kill all enemies", c: buildBtn("Kill", cheats.brawlKillAll) }, { t: "Max Abilities", d: "Max current skills", c: buildBtn("Max", cheats.brawlMaxAbilities) }, { t: "Next Level", d: "Level up", c: buildBtn("Lvl Up", cheats.brawlNextLevel) }, { t: "Remove Obstacles", d: "Clear map", c: buildBtn("Remove", cheats.brawlRemoveObstacles) }, { t: "Reset Health", d: "Heal to full", c: buildBtn("Heal", cheats.brawlResetHealth) });

    // Admin (Hidden by Default)
    tabs.Admin.push(
        { t: "Glitch Host", d: "Send invalid hack packet to host", c: buildBtn("Glitch", cheats.glitchHost) },
        { t: "Set Inf Password", d: "Set password to NaN", c: buildBtn("Set NaN", cheats.setInfinitePass) },
        { t: "Steal All", d: "Steal from everyone loop", c: buildToggle(cheats.toggleStealAll, cheats.toggleStealAll) }
    );

    // Settings
    tabs.Settings.push(
        { t: "Theme", d: "Change UI Look", c: (() => { const s=document.createElement('select'); s.className='ob-input'; s.style.width='100px'; ['glass','native','terminal','rgb','christmas'].forEach(th=>s.add(new Option(th,th))); s.value=settings.theme; s.onchange=()=>{root.className=`theme-${s.value}`;settings.theme=s.value;localStorage.setItem('overBlookSettings',JSON.stringify(settings));}; return s; })() },
        { t: "Toggle Key", d: "Key to hide menu", c: buildInputBtn("k", "Set", cheats.setToggleKey) },
        { t: "Roman Input Mode", d: "Type I, V, X for numbers", c: buildToggle(()=>{settings.romanMode=true; internals.notify("Roman Mode ON");}, ()=>{settings.romanMode=false; internals.notify("Roman Mode OFF");}) },
        { t: "Rainbow Mode", d: "Cycle colors", c: buildToggle(cheats.startRainbow, cheats.stopRainbow) },
        { t: "Custom Title", d: "Change menu name", c: buildInputBtn("Title", "Set", cheats.setTitle) },
        { t: "Reset All", d: "Reset everything", c: buildBtn("Reset", cheats.resetAll) }
    );

    // Changelog
    const cl = document.createElement('div');
    cl.innerHTML = `
        <div class="changelog-entry"><h3>Made By: Ocean_Water (Discord) / Alwaysadvancing (Github)</h3><p>uhmmm latest upd v53 "secret upd"</p></div>
        <div class="changelog-entry"><h4>V53: The Secret Upd😁🔒</h4><ul><li>I Mightve added smth that was in older versions</li><li></li><li>Switched Notify to Seconds. Fixed Set Crypto (again).</li></ul></div>
        <div class="changelog-entry"><h4>V52: The Logic Repair</h4><ul><li>Fixed "Block Hacks" V1/V2 toggles calling wrong functions.</li><li>Rewrote "Always Hack/Triple/Quintuple" to use direct state forcing loop.</li><li>Fixed "Set Crypto" pathing.</li></ul></div>
        <div class="changelog-entry"><h4>V50: The Milestone Update</h4><ul><li>Added 'Game Speed' Slider (0.5x - 5x).</li><li>Added 'AddSlider' to Developer API.</li><li>Fixed core logic bugs affecting multiple cheats.</li></ul></div>
        <div class="changelog-entry"><h4>V47: The Documentation Update</h4><ul><li>Full Developer API documentation in Console.</li><li>Notification API exposed.</li><li>Fixed script loading crash.</li></ul></div>
        <div class="changelog-entry"><h4>V46: The Scripter Update</h4><ul><li>Added 'OverBlook.addButton()' API.</li><li>Fixed 'Use Any Blook'.</li><li>Added 'Bypass Random Name'.</li></ul></div>
        <div class="changelog-entry"><h4>V45: The Developer Update</h4><ul><li>Refactored codebase for modularity.</li></ul></div>
        <div class="changelog-entry"><h4>V44: The RGB Revival</h4><ul><li>Buffed RGB theme with thick borders and neon glow.</li></ul></div>
        <div class="changelog-entry"><h4>V43: The Unlocker</h4><ul><li>Refined lobby logic.</li></ul></div>
        <div class="changelog-entry"><h4>V42: The Smooth Update</h4><ul><li>Fixed flickering.</li></ul></div>
        <div class="changelog-entry"><h4>V41: The Cosmic Update</h4><ul><li>Added theme-specific helpers.</li></ul></div>
        <div class="changelog-entry"><h4>V30-V40</h4><ul><li>UI Revolution & Bug Fixes.</li></ul></div>
        <div class="changelog-entry"><h4>V1-V29</h4><ul><li>The Foundation.</li></ul></div>
    `;
    tabs.Changelog.push({ t: "", d: "", c: cl });

    // Initial Render
    tabs["All"] = [...tabs.Global, ...tabs.Fishing, ...tabs.Crypto, ...tabs["Tower Def"], ...tabs["Tower Def 2"], ...tabs.Brawl];
    const sb = document.getElementById('ob-sidebar');
    Object.keys(tabs).forEach((n,i) => { 
        if(n === "Admin") return; // Admin tab hidden by default
        const b=document.createElement('button'); b.className=`ob-tab ${i===0?'active':''}`; b.innerText=n; 
        b.onclick=()=>{document.querySelectorAll('.ob-tab').forEach(t=>t.classList.remove('active')); b.classList.add('active'); renderTab(n);}; sb.appendChild(b); 
    });
    renderTab("All");

    // Loops & Events
    setInterval(() => {
        const s = internals.getWorkingStateNode();
        const titleEl = document.querySelector('.ob-title');
        if(titleEl) {
            let name = "Loading...";
            if(s?.props?.client?.name) { name = s.props.client.name; cachedName = name; } else if (cachedName) { name = cachedName; }
            const finalTitle = settings.customTitle.replace('%Name%', name);
            if(titleEl.innerText !== finalTitle) titleEl.innerText = finalTitle;
        }
        const helper = document.getElementById('ob-helper-img');
        if(helper) {
            const targetSrc = themeImages[settings.theme] || megabotImg;
            if(helper.getAttribute('src') !== targetSrc) helper.src = targetSrc;
        }
    }, 500);

    const h = document.getElementById('ob-header'); let d=false,ox,oy; 
    root.onmousedown = (e) => { if(guiState.isMinimized || e.target.closest('#ob-header')) { d = true; ox = e.clientX - root.offsetLeft; oy = e.clientY - root.offsetTop; } };
    document.onmousemove = e => { if(d) { root.style.left = (e.clientX - ox) + 'px'; root.style.top = (e.clientY - oy) + 'px'; } };
    document.onmouseup = () => d = false;
    document.getElementById('ob-min').onclick=()=>{guiState.isMinimized=!guiState.isMinimized; root.classList.toggle('minimized', guiState.isMinimized);};
    root.onclick=e=>{if(guiState.isMinimized&&e.target===root){guiState.isMinimized=false;root.classList.remove('minimized');}};
    document.getElementById('ob-close').onclick=()=>{root.remove(); document.getElementById('ob-toast-container').remove(); styleEl.remove();};
    document.getElementById('ob-search').oninput=e=>{const v=e.target.value.toLowerCase(); document.querySelectorAll('.ob-card').forEach(c=>c.style.display=c.dataset.name.includes(v)?'flex':'none');};
    document.addEventListener('keydown',e=>{
        if(e.key.toLowerCase()===settings.toggleKey.toLowerCase()) root.style.display=root.style.display==='none'?'flex':'none';
        // Admin Panel Toggle
        if(e.key === "Insert") {
            const adminBtn = Array.from(document.querySelectorAll('.ob-tab')).find(b => b.innerText === "Admin");
            if(adminBtn) { adminBtn.remove(); } // Toggle off
            else {
                const b=document.createElement('button'); b.className='ob-tab'; b.innerText="Admin"; b.style.color="#ff4444";
                b.onclick=()=>{document.querySelectorAll('.ob-tab').forEach(t=>t.classList.remove('active')); b.classList.add('active'); renderTab("Admin");};
                const settingsBtn = Array.from(document.querySelectorAll('.ob-tab')).find(b => b.innerText === "Settings");
                sb.insertBefore(b, settingsBtn); // Insert before Settings
            }
        }
    });

    internals.notify("OverBlook Loaded!");
    console.log("%cOverBlook Developer API", "font-size: 20px; font-weight: bold; color: #00c7ff;");
    console.log("Add Button: OverBlook.AddButton({ Tab:'Global', Name:'Cheat', Script: ()=>{} })");
    console.log("Add Toggle: OverBlook.AddToggle({ Tab:'Global', Name:'Cheat', OnScript: ()=>{}, OffScript: ()=>{} })");
    console.log("Add Input:  OverBlook.AddInput({ Tab:'Global', Name:'Cheat', Placeholder:'Val', ButtonText:'Set', Script: (val)=>{ console.log(val); } })");
    console.log("Add Slider: OverBlook.AddSlider({ Tab:'Global', Name:'Cheat', Min:1, Max:10, Step:1, Default:5, Script: (val)=>{} })");
    console.log("Add Tab:    OverBlook.AddTab({ Name: 'My Tab' })");
    console.log("Notify:     OverBlook.Notify('Message', 3)");
})();
