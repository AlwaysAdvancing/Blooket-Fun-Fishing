(() => {
    // Create mode selection popup
    const modePopup = document.createElement('div');
    modePopup.style.position = 'fixed';
    modePopup.style.top = '50%';
    modePopup.style.left = '50%';
    modePopup.style.transform = 'translate(-50%, -50%)';
    modePopup.style.zIndex = '9999';
    modePopup.style.backgroundColor = 'rgba(40, 40, 50, 0.95)';
    modePopup.style.borderRadius = '15px';
    modePopup.style.padding = '20px';
    modePopup.style.boxShadow = '0 0 20px rgba(0,0,0,0.7)';
    modePopup.style.color = 'white';
    modePopup.style.fontFamily = 'Arial, sans-serif';
    modePopup.style.textAlign = 'center';
    modePopup.style.width = '350px';
    modePopup.style.height = 'auto';
    modePopup.style.cursor = 'move';
    modePopup.style.userSelect = 'none';

    // Make mode selection draggable
    let isDraggingModePopup = false;
    let modePopupOffsetX, modePopupOffsetY;

    modePopup.addEventListener('mousedown', (e) => {
        if (e.target === modePopup || e.target.tagName === 'H2') {
            isDraggingModePopup = true;
            modePopupOffsetX = e.clientX - modePopup.getBoundingClientRect().left;
            modePopupOffsetY = e.clientY - modePopup.getBoundingClientRect().top;
            modePopup.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDraggingModePopup) {
            modePopup.style.left = (e.clientX - modePopupOffsetX) + 'px';
            modePopup.style.top = (e.clientY - modePopupOffsetY) + 'px';
            modePopup.style.transform = 'none';
        }
    });

    document.addEventListener('mouseup', () => {
        isDraggingModePopup = false;
        modePopup.style.cursor = 'move';
    });

    const title = document.createElement('h2');
    title.textContent = 'Select Game Mode';
    title.style.marginTop = '0';
    title.style.color = '#4CAF50';
    modePopup.appendChild(title);

    const fishingBtn = document.createElement('button');
    fishingBtn.textContent = 'Fishing Frenzy';
    fishingBtn.style.width = '100%';
    fishingBtn.style.padding = '12px';
    fishingBtn.style.margin = '10px 0';
    fishingBtn.style.borderRadius = '8px';
    fishingBtn.style.border = 'none';
    fishingBtn.style.backgroundColor = '#2196F3';
    fishingBtn.style.color = 'white';
    fishingBtn.style.fontSize = '16px';
    fishingBtn.style.cursor = 'pointer';
    fishingBtn.style.transition = 'all 0.3s';

    fishingBtn.onmouseover = () => fishingBtn.style.backgroundColor = '#0b7dda';
    fishingBtn.onmouseout = () => fishingBtn.style.backgroundColor = '#2196F3';
    
    const cryptoBtn = document.createElement('button');
    cryptoBtn.textContent = 'Crypto Hack';
    cryptoBtn.style.width = '100%';
    cryptoBtn.style.padding = '12px';
    cryptoBtn.style.margin = '10px 0';
    cryptoBtn.style.borderRadius = '8px';
    cryptoBtn.style.border = 'none';
    cryptoBtn.style.backgroundColor = '#FF9800';
    cryptoBtn.style.color = 'white';
    cryptoBtn.style.fontSize = '16px';
    cryptoBtn.style.cursor = 'pointer';
    cryptoBtn.style.transition = 'all 0.3s';

    cryptoBtn.onmouseover = () => cryptoBtn.style.backgroundColor = '#e68a00';
    cryptoBtn.onmouseout = () => cryptoBtn.style.backgroundColor = '#FF9800';

    // Add Tower Defense 2 button

    const td2Btn = document.createElement('button');
    td2Btn.textContent = 'Tower Defense 2';
    td2Btn.style.width = '100%';
    td2Btn.style.padding = '12px';
    td2Btn.style.margin = '10px 0';
    td2Btn.style.borderRadius = '8px';
    td2Btn.style.border = 'none';
    td2Btn.style.backgroundColor = '#9C27B0';
    td2Btn.style.color = 'white';
    td2Btn.style.fontSize = '16px';
    td2Btn.style.cursor = 'pointer';
    td2Btn.style.transition = 'all 0.3s';

    td2Btn.onmouseover = () => td2Btn.style.backgroundColor = '#7B1FA2';
    td2Btn.onmouseout = () => td2Btn.style.backgroundColor = '#9C27B0';

    // Add Battle Royale button
    function createBattleRoyaleMenu() {
    if (currentMenu) currentMenu.remove();
    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.top = '10px';
    menu.style.right = '10px';
    menu.style.zIndex = '9999';
    menu.style.backgroundColor = 'rgba(40, 40, 50, 0.9)';
    menu.style.borderRadius = '10px';
    menu.style.padding = '10px';
    menu.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    menu.style.color = 'white';
    menu.style.fontFamily = 'Arial, sans-serif';
    menu.style.cursor = 'move';
    menu.style.userSelect = 'none';
    menu.style.resize = 'both';
    menu.style.overflow = 'auto';
    menu.style.width = '350px';
    menu.style.height = '450px';
    menu.style.maxHeight = '80vh';
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    currentMenu = menu;

    // Draggable logic (same as TD2)
    let isDragging = false, offsetX, offsetY;
    menu.addEventListener('mousedown', e => {
        if (e.target === menu || e.target.tagName === 'H3') {
            isDragging = true;
            offsetX = e.clientX - menu.getBoundingClientRect().left;
            offsetY = e.clientY - menu.getBoundingClientRect().top;
            menu.style.cursor = 'grabbing';
        }
    });
    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        menu.style.left = (e.clientX - offsetX) + 'px';
        menu.style.top = (e.clientY - offsetY) + 'px';
        menu.style.right = 'unset';
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        menu.style.cursor = 'move';
    });

    const title = document.createElement('h3');
    title.textContent = 'Battle Royale Cheats (Press M to hide/show)';
    title.style.margin = '0 0 10px 0';
    title.style.textAlign = 'center';
    title.style.color = '#2196F3';
    menu.appendChild(title);

    const addDivider = (label) => {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.margin = '10px 0';
        const hr = document.createElement('hr');
        hr.style.flex = '1';
        hr.style.border = '1px solid #555';
        hr.style.margin = '0 5px';
        const span = document.createElement('span');
        span.textContent = label;
        span.style.color = '#aaa';
        span.style.fontSize = '12px';
        span.style.fontWeight = 'bold';
        container.appendChild(hr);
        container.appendChild(span);
        container.appendChild(hr.cloneNode());
        menu.appendChild(container);
    };

    // GAME DIVIDER
    addDivider('Game');
    const autoAnswerBtn = document.createElement('button');
    autoAnswerBtn.textContent = 'Auto Answer';
    autoAnswerBtn.style.cssText = 'display:block;width:100%;padding:8px;margin:5px 0;border-radius:5px;border:none;cursor:pointer;background-color:#2196F3;color:white;font-weight:bold;transition:all 0.3s;';
    autoAnswerBtn.onclick = () => {
        const cheat = async () => {
            const { stateNode } = Object.values((function react(r=document.querySelector("body>div")){return Object.values(r)[1]?.children?.[0]?._owner.stateNode?r:react(r.querySelector(":scope>div"));})())[1].children[0]._owner;
            const Question = stateNode.state.question || stateNode.props.client.question;
            if (stateNode.state.question.qType != "typing") {
                if (stateNode.state.stage != "feedback" && !stateNode.state.feedback) {
                    let ind;
                    for (ind = 0; ind < Question.answers.length; ind++) {
                        if (Question.correctAnswers.includes(Question.answers[ind])) break;
                    }
                    document.querySelectorAll("[class*='answerContainer']")[ind]?.click();
                } else document.querySelector("[class*='feedback'], [id*='feedback']")?.firstChild?.click();
            } else {
                Object.values(document.querySelector("[class*='typingAnswerWrapper']"))[1].children._owner.stateNode.sendAnswer?.(Question.answers[0]);
            }
        };
        setInterval(cheat, 500);
    };
    menu.appendChild(autoAnswerBtn);

    // OTHER DIVIDER
    addDivider('Other');
    const otherCheats = [
        { name: 'All Answers Correct', func: () => {
            const stateNode = Object.values((function react(r=document.querySelector("body>div")){return Object.values(r)[1]?.children?.[0]?._owner.stateNode?r:react(r.querySelector(":scope>div"));})())[1].children[0]._owner.stateNode;
            for (let i = 0; i < stateNode.questions.length; i++) {
                const q = stateNode.questions[i];
                q.correctAnswers = [...q.answers];
            }
            if (stateNode.props.liveGameController) {
                stateNode.props.liveGameController.setVal({
                    path: 'questions',
                    val: stateNode.questions.map(q => ({
                        ...q,
                        correctAnswers: [...q.answers]
                    }))
                });
            }
        }},
        { name: 'Use Any Blook', func: () => alert('Placeholder: Use Any Blook') },
        { name: 'Change Blook', func: () => alert('Placeholder: Change Blook') },
        { name: 'Set Flappy Score', func: () => alert('Placeholder: Set Flappy Score') },
        { name: 'Toggle Ghost Mode', func: () => alert('Placeholder: Toggle Ghost Mode') }
    ];

    otherCheats.forEach(c => {
        const btn = document.createElement('button');
        btn.textContent = c.name;
        btn.style.cssText = 'display:block;width:100%;padding:8px;margin:5px 0;border-radius:5px;border:none;cursor:pointer;background-color:#4CAF50;color:white;font-weight:bold;transition:all 0.3s;';
        btn.onclick = c.func;
        menu.appendChild(btn);
    });

    // CLOSE BUTTON
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close Menu';
    closeBtn.style.cssText = 'margin:5px 0;padding:8px;border:none;border-radius:5px;background-color:#f44336;color:white;font-weight:bold;cursor:pointer;';
    closeBtn.onclick = () => menu.remove();
    menu.appendChild(closeBtn);

    document.body.appendChild(menu);
}

const battleRoyaleBtn = document.createElement('button');
    battleRoyaleBtn.textContent = 'Battle Royale';
    battleRoyaleBtn.style.width = '100%';
    battleRoyaleBtn.style.padding = '12px';
    battleRoyaleBtn.style.margin = '10px 0';
    battleRoyaleBtn.style.borderRadius = '8px';
    battleRoyaleBtn.style.border = 'none';
    battleRoyaleBtn.style.backgroundColor = '#E91E63';
    battleRoyaleBtn.style.color = 'white';
    battleRoyaleBtn.style.fontSize = '16px';
    battleRoyaleBtn.style.cursor = 'pointer';
    battleRoyaleBtn.style.transition = 'all 0.3s';
    
    battleRoyaleBtn.onmouseover = () => battleRoyaleBtn.style.backgroundColor = '#C2185B';
    battleRoyaleBtn.onmouseout = () => battleRoyaleBtn.style.backgroundColor = '#E91E63';

    // Add Monster Brawl button
    const monsterBrawlBtn = document.createElement('button');
    monsterBrawlBtn.textContent = 'Monster Brawl';
    monsterBrawlBtn.style.width = '100%';
    monsterBrawlBtn.style.padding = '12px';
    monsterBrawlBtn.style.margin = '10px 0';
    monsterBrawlBtn.style.borderRadius = '8px';
    monsterBrawlBtn.style.border = 'none';
    monsterBrawlBtn.style.backgroundColor = '#795548';
    monsterBrawlBtn.style.color = 'white';
    monsterBrawlBtn.style.fontSize = '16px';
    monsterBrawlBtn.style.cursor = 'pointer';
    monsterBrawlBtn.style.transition = 'all 0.3s';

    monsterBrawlBtn.onmouseover = () => monsterBrawlBtn.style.backgroundColor = '#5D4037';
    monsterBrawlBtn.onmouseout = () => monsterBrawlBtn.style.backgroundColor = '#795548';



    // Global menu reference for K key toggle
    let currentMenu = null;

    // Function to handle K key press
    const handleKeyPress = (e) => {
        if (e.key.toLowerCase() === 'k' && currentMenu) {
            currentMenu.style.display = currentMenu.style.display === 'none' ? 'block' : 'none';
        }
    };
    document.addEventListener('keydown', handleKeyPress);

    // Helper function to get state node
    const getStateNode = () => {
        return Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
        })())[1].children[0]._owner.stateNode;
    };

    // Function to create the Fishing menu
    const createFishingMenu = () => {
        modePopup.remove();
        
        const menu = document.createElement('div');
        menu.style.position = 'fixed';
        menu.style.top = '10px';
        menu.style.right = '10px';
        menu.style.zIndex = '9999';
        menu.style.backgroundColor = 'rgba(40, 40, 50, 0.9)';
        menu.style.borderRadius = '10px';
        menu.style.padding = '10px';
        menu.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        menu.style.color = 'white';
        menu.style.fontFamily = 'Arial, sans-serif';
        menu.style.cursor = 'move';
        menu.style.userSelect = 'none';
        menu.style.resize = 'both';
        menu.style.overflow = 'auto';
        menu.style.width = '350px';
        menu.style.height = '450px';
        menu.style.maxHeight = '80vh';
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
        
        // Set as current menu
        currentMenu = menu;
        
        // Make menu draggable
        let isDragging = false;
        let offsetX, offsetY;
        
        menu.addEventListener('mousedown', (e) => {
            if (e.target === menu || e.target.tagName === 'H3') {
                isDragging = true;
                offsetX = e.clientX - menu.getBoundingClientRect().left;
                offsetY = e.clientY - menu.getBoundingClientRect().top;
                menu.style.cursor = 'grabbing';
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            menu.style.left = (e.clientX - offsetX) + 'px';
            menu.style.top = (e.clientY - offsetY) + 'px';
            menu.style.right = 'unset';
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            menu.style.cursor = 'move';
        });

        // Add resize handles (all corners)
        const createResizeHandle = (position) => {
            const resizeHandle = document.createElement('div');
            resizeHandle.style.position = 'fixed';
            resizeHandle.style.width = '20px';
            resizeHandle.style.height = '20px';
            resizeHandle.style.cursor = position.includes('right') ? 
                (position.includes('bottom') ? 'nwse-resize' : 'nesw-resize') :
                (position.includes('bottom') ? 'nesw-resize' : 'nwse-resize');
            
            if (position.includes('right')) resizeHandle.style.right = '0';
            else resizeHandle.style.left = '0';
            if (position.includes('bottom')) resizeHandle.style.bottom = '0';
            else resizeHandle.style.top = '0';

            resizeHandle.style.backgroundColor = 'rgba(255,255,255,0.3)';
            resizeHandle.style.borderRadius = position.includes('right') ? 
                (position.includes('bottom') ? '0 0 5px 0' : '0 5px 0 0') :
                (position.includes('bottom') ? '0 0 0 5px' : '5px 0 0 0');
            
            let isResizing = false;
            let startX, startY, startWidth, startHeight, startTop, startLeft;
            
            resizeHandle.addEventListener('mousedown', (e) => {
                isResizing = true;
                startX = e.clientX;
                startY = e.clientY;
                startWidth = parseInt(document.defaultView.getComputedStyle(menu).width, 10);
                startHeight = parseInt(document.defaultView.getComputedStyle(menu).height, 10);
                startTop = parseInt(document.defaultView.getComputedStyle(menu).top, 10);
                startLeft = parseInt(document.defaultView.getComputedStyle(menu).left, 10);
                e.preventDefault();
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isResizing) return;
                
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;

                if (position.includes('right')) {
                    menu.style.width = (startWidth + deltaX) + 'px';
                } else {
                    menu.style.width = (startWidth - deltaX) + 'px';
                    menu.style.left = (startLeft + deltaX) + 'px';
                }

                if (position.includes('bottom')) {
                    menu.style.height = (startHeight + deltaY) + 'px';
                } else {
                    menu.style.height = (startHeight - deltaY) + 'px';
                    menu.style.top = (startTop + deltaY) + 'px';
                }
                
                const buttons = menu.querySelectorAll('button');
                buttons.forEach(btn => {
                    btn.style.width = '100%';
                    btn.style.padding = `${Math.max(6, parseInt(menu.style.height, 10)/30)}px`;
                });
            });
            
            document.addEventListener('mouseup', () => {
                isResizing = false;
            });
            
            return resizeHandle;
        };
        
        // Create a container for resize handles
        const resizeContainer = document.createElement('div');
        resizeContainer.style.position = 'sticky';
        resizeContainer.style.bottom = '0';
        resizeContainer.style.width = '100%';
        resizeContainer.style.height = '20px';
        resizeContainer.style.zIndex = '10000';
        
        // Add all 4 resize handles
        resizeContainer.appendChild(createResizeHandle('top-left'));
        resizeContainer.appendChild(createResizeHandle('top-right'));
        resizeContainer.appendChild(createResizeHandle('bottom-left'));
        resizeContainer.appendChild(createResizeHandle('bottom-right'));
        menu.appendChild(resizeContainer);
        
        // Menu title
        const title = document.createElement('h3');
        title.textContent = 'Fishing Frenzy Cheats (Press K to hide/show)';
        title.style.margin = '0 0 10px 0';
        title.style.textAlign = 'center';
        title.style.color = '#2196F3';
        menu.appendChild(title);

        // Set up fetch interception
        let iframe = document.querySelector("iframe");
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.style.display = "none";
            document.body.append(iframe);
        }

        if (window.fetch && window.fetch.call.toString() === 'function call() { [native code] }') {
            const call = window.fetch.call;
            window.fetch.call = function () {
                if (!arguments[1] || !arguments[1].includes("s.blooket.com/rc")) {
                    return call.apply(this, arguments);
                }
            };
        }

        // Add "Game" divider at the top
        const gameDividerContainer = document.createElement('div');
        gameDividerContainer.style.display = 'flex';
        gameDividerContainer.style.alignItems = 'center';
        gameDividerContainer.style.margin = '10px 0';
        
        const gameDivider = document.createElement('hr');
        gameDivider.style.flex = '1';
        gameDivider.style.border = '1px solid #555';
        gameDivider.style.margin = '0 5px';
        
        const gameLabel = document.createElement('span');
        gameLabel.textContent = 'Game';
        gameLabel.style.color = '#aaa';
        gameLabel.style.fontSize = '12px';
        gameLabel.style.fontWeight = 'bold';
        
        gameDividerContainer.appendChild(gameDivider);
        gameDividerContainer.appendChild(gameLabel);
        gameDividerContainer.appendChild(gameDivider.cloneNode());
        
        menu.appendChild(gameDividerContainer);

        // Auto Answer cheat
        const autoAnswerCheat = {
            name: 'Auto Answer',
            active: false,
            interval: null,
            func: () => {
                const cheat = (async () => {
                    const { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner;
                    const Question = stateNode.state.question || stateNode.props.client.question;
                    if (stateNode.state.question.qType != "typing") {
                        if (stateNode.state.stage != "feedback" && !stateNode.state.feedback) {
                            let ind;
                            for (ind = 0; ind < Question.answers.length; ind++) {
                                let found = false;
                                for (let j = 0; j < Question.correctAnswers.length; j++)
                                    if (Question.answers[ind] == Question.correctAnswers[j]) {
                                        found = true;
                                        break;
                                    }
                                if (found) break;
                            }
                            document.querySelectorAll("[class*='answerContainer']")[ind]?.click();
                        } else document.querySelector("[class*='feedback'], [id*='feedback']")?.firstChild?.click();
                    } else Object.values(document.querySelector("[class*='typingAnswerWrapper']"))[1].children._owner.stateNode.sendAnswer?.(Question.answers[0]);
                });
                cheat();
            }
        };

        // Create Auto Answer button
        const autoAnswerBtn = document.createElement('button');
        autoAnswerBtn.textContent = autoAnswerCheat.name;
        autoAnswerBtn.style.display = 'block';
        autoAnswerBtn.style.width = '100%';
        autoAnswerBtn.style.padding = '8px';
        autoAnswerBtn.style.margin = '5px 0';
        autoAnswerBtn.style.borderRadius = '5px';
        autoAnswerBtn.style.border = 'none';
        autoAnswerBtn.style.cursor = 'pointer';
        autoAnswerBtn.style.backgroundColor = '#2196F3';
        autoAnswerBtn.style.color = 'white';
        autoAnswerBtn.style.fontWeight = 'bold';
        autoAnswerBtn.style.transition = 'all 0.3s';
        
        autoAnswerBtn.onmouseover = () => autoAnswerBtn.style.backgroundColor = '#0b7dda';
        autoAnswerBtn.onmouseout = () => autoAnswerBtn.style.backgroundColor = autoAnswerCheat.active ? '#0b7dda' : '#2196F3';
        
        autoAnswerBtn.onclick = () => {
            if (autoAnswerCheat.active && autoAnswerCheat.interval) {
                clearInterval(autoAnswerCheat.interval);
                autoAnswerCheat.active = false;
                autoAnswerBtn.style.backgroundColor = '#2196F3';
            } else {
                autoAnswerCheat.interval = setInterval(autoAnswerCheat.func, 500);
                autoAnswerCheat.active = true;
                autoAnswerBtn.style.backgroundColor = '#0b7dda';
            }
        };
        
        menu.appendChild(autoAnswerBtn);

        // Fishing-specific cheats
        const fishingCheats = {
            fishingFrenzy: {
                name: 'Fishing Frenzy',
                active: false,
                interval: null,
                func: () => {
                    try {
                        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
                            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                        })())[1].children[0]._owner;
                        stateNode.props.liveGameController.setVal({
                            path: `c/${stateNode.props.client.name}`,
                            val: {
                                b: stateNode.props.client.blook,
                                w: stateNode.state.weight,
                                f: "Frenzy",
                                s: true
                            }
                        });
                    } catch (e) {
                        console.error("Fishing Frenzy error:", e);
                    }
                }
            },
            setLure: {
                name: 'Set Lure',
                active: false,
                expanded: false,
                buttons: [],
                arrow: null,
                func: function() {
                    try {
                        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
                            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                        })())[1].children[0]._owner;
                        
                        // Create arrow indicator if it doesn't exist
                        if (!this.arrow) {
                            this.arrow = document.createElement('span');
                            this.arrow.innerHTML = '▼';
                            this.arrow.style.position = 'absolute';
                            this.arrow.style.right = '10px';
                            this.arrow.style.pointerEvents = 'none';
                            this.arrow.style.transition = 'transform 0.3s';
                            setLureBtn.appendChild(this.arrow);
                        }

                        if (!this.expanded) {
                            // Create lure level buttons (1-5 in UI, 0-4 in code) in reverse order
                            for (let i = 5; i >= 1; i--) {
                                const lureBtn = document.createElement('button');
                                lureBtn.textContent = `Lure Level ${i}`;
                                lureBtn.style.display = 'block';
                                lureBtn.style.width = '100%';
                                lureBtn.style.padding = '8px';
                                lureBtn.style.margin = '5px 0';
                                lureBtn.style.borderRadius = '5px';
                                lureBtn.style.border = 'none';
                                lureBtn.style.cursor = 'pointer';
                                lureBtn.style.backgroundColor = '#1E88E5';
                                lureBtn.style.color = 'white';
                                lureBtn.style.fontWeight = 'bold';
                                lureBtn.style.transition = 'all 0.3s';
                                lureBtn.style.opacity = '0';
                                lureBtn.style.transform = 'translateY(-10px)';
                                
                                lureBtn.onmouseover = () => lureBtn.style.backgroundColor = '#0b7dda';
                                lureBtn.onmouseout = () => lureBtn.style.backgroundColor = '#1E88E5';
                                
                                lureBtn.onclick = () => {
                                    stateNode.setState({ lure: i-1 });
                                    // Hide the lure buttons with animation
                                    this.buttons.forEach(btn => {
                                        btn.style.opacity = '0';
                                        btn.style.transform = 'translateY(-10px)';
                                        setTimeout(() => btn.remove(), 300);
                                    });
                                    this.buttons = [];
                                    this.expanded = false;
                                    if (this.arrow) {
                                        this.arrow.style.transform = 'rotate(0deg)';
                                    }
                                };
                                
                                // Insert after the Set Lure button
                                setLureBtn.parentNode.insertBefore(lureBtn, setLureBtn.nextSibling);
                                this.buttons.push(lureBtn);
                                
                                // Animate in
                                setTimeout(() => {
                                    lureBtn.style.opacity = '1';
                                    lureBtn.style.transform = 'translateY(0)';
                                }, 10);
                            }
                            this.expanded = true;
                            if (this.arrow) {
                                this.arrow.style.transform = 'rotate(180deg)';
                            }
                        } else {
                            // Hide the lure buttons with animation
                            this.buttons.forEach(btn => {
                                btn.style.opacity = '0';
                                btn.style.transform = 'translateY(-10px)';
                                setTimeout(() => btn.remove(), 300);
                            });
                            this.buttons = [];
                            this.expanded = false;
                            if (this.arrow) {
                                this.arrow.style.transform = 'rotate(0deg)';
                            }
                        }
                        
                        return true;
                    } catch (e) {
                        console.error("Set Lure error:", e);
                        return false;
                    }
                }
            },
            setWeight: {
                name: 'Set Weight',
                active: false,
                func: () => {
                    try {
                        const parseWeightInput = (input) => {
                            input = (input || "0").trim().toUpperCase();
                            const multiplier = {
                                'K': 1000,
                                'M': 1000000,
                                'B': 1000000000,
                                'T': 1000000000000
                            }[input.slice(-1)] || 1;
                            
                            const numberPart = parseFloat(input.replace(/[^0-9.]/g, '')) || 0;
                            return Math.round(numberPart * multiplier);
                        };

                        let i = document.createElement('iframe');
                        document.body.append(i);
                        window.prompt = i.contentWindow.prompt.bind(window);
                        i.remove();
                        
                        const weight = parseWeightInput(
                            prompt("How much weight would you like? (e.g., 500, 5K, 2.5M, 1B, 2T)")
                        );

                        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
                            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                        })())[1].children[0]._owner;
                        
                        stateNode.setState({ weight, weight2: weight });
                        stateNode.props.liveGameController.setVal({
                            path: `c/${stateNode.props.client.name}`,
                            val: {
                                b: stateNode.props.client.blook,
                                w: weight,
                                f: ["Crab", "Jellyfish", "Frog", "Pufferfish", "Octopus", "Narwhal", "Megalodon", "Blobfish", "Baby Shark"][Math.floor(Math.random() * 9)]
                            }
                        });
                    } catch (e) {
                        console.error("Set Weight error:", e);
                    }
                }
            }
        };

        // Create buttons for each fishing cheat
        Object.keys(fishingCheats).forEach(key => {
            const cheat = fishingCheats[key];
            const btn = document.createElement('button');
            btn.textContent = cheat.name;
            btn.style.display = 'block';
            btn.style.width = '100%';
            btn.style.padding = '8px';
            btn.style.margin = '5px 0';
            btn.style.borderRadius = '5px';
            btn.style.border = 'none';
            btn.style.cursor = 'pointer';
            btn.style.backgroundColor = '#2196F3';
            btn.style.color = 'white';
            btn.style.fontWeight = 'bold';
            btn.style.transition = 'all 0.3s';
            btn.style.position = 'relative';
            
            btn.onmouseover = () => btn.style.backgroundColor = '#0b7dda';
            btn.onmouseout = () => btn.style.backgroundColor = cheat.active ? '#0b7dda' : '#2196F3';
            
            btn.onclick = () => {
                if (cheat.active && cheat.interval) {
                    clearInterval(cheat.interval);
                    cheat.active = false;
                    btn.style.backgroundColor = '#2196F3';
                } else {
                    if (key === 'fishingFrenzy') {
                        cheat.interval = setInterval(cheat.func, 500);
                    } else {
                        cheat.func();
                        if (!cheat.interval) return;
                    }
                    cheat.active = true;
                    btn.style.backgroundColor = '#0b7dda';
                }
            };
            
            menu.appendChild(btn);
            
            // Store reference to Set Lure button for arrow
            if (key === 'setLure') {
                setLureBtn = btn;
                // Immediately add the arrow indicator
                const arrow = document.createElement('span');
                arrow.innerHTML = '▼';
                arrow.style.position = 'absolute';
                arrow.style.right = '10px';
                arrow.style.pointerEvents = 'none';
                arrow.style.transition = 'transform 0.3s';
                btn.appendChild(arrow);
                cheat.arrow = arrow;
            }
        });

        // Add "Other" divider
        const otherDividerContainer = document.createElement('div');
        otherDividerContainer.style.display = 'flex';
        otherDividerContainer.style.alignItems = 'center';
        otherDividerContainer.style.margin = '10px 0';
        
        const otherDivider = document.createElement('hr');
        otherDivider.style.flex = '1';
        otherDivider.style.border = '1px solid #555';
        otherDivider.style.margin = '0 5px';
        
        const otherLabel = document.createElement('span');
        otherLabel.textContent = 'Other';
        otherLabel.style.color = '#aaa';
        otherLabel.style.fontSize = '12px';
        otherLabel.style.fontWeight = 'bold';
        
        otherDividerContainer.appendChild(otherDivider);
        otherDividerContainer.appendChild(otherLabel);
        otherDividerContainer.appendChild(otherDivider.cloneNode());
        
        menu.appendChild(otherDividerContainer);

        // Add "All Answers Correct" button (now with looping)
        const allAnswersCorrectBtn = document.createElement('button');
        allAnswersCorrectBtn.textContent = 'All Answers Correct (Global)';
        allAnswersCorrectBtn.style.display = 'block';
        allAnswersCorrectBtn.style.width = '100%';
        allAnswersCorrectBtn.style.padding = '8px';
        allAnswersCorrectBtn.style.margin = '5px 0';
        allAnswersCorrectBtn.style.borderRadius = '5px';
        allAnswersCorrectBtn.style.border = 'none';
        allAnswersCorrectBtn.style.cursor = 'pointer';
        allAnswersCorrectBtn.style.backgroundColor = '#4CAF50';
        allAnswersCorrectBtn.style.color = 'white';
        allAnswersCorrectBtn.style.fontWeight = 'bold';
        allAnswersCorrectBtn.style.transition = 'all 0.3s';
        
        let allAnswersInterval = null;
        
        allAnswersCorrectBtn.onmouseover = () => allAnswersCorrectBtn.style.backgroundColor = '#388E3C';
        allAnswersCorrectBtn.onmouseout = () => allAnswersCorrectBtn.style.backgroundColor = allAnswersInterval ? '#388E3C' : '#4CAF50';
        
        allAnswersCorrectBtn.onclick = () => {
            if (allAnswersInterval) {
                clearInterval(allAnswersInterval);
                allAnswersInterval = null;
                allAnswersCorrectBtn.style.backgroundColor = '#4CAF50';
                return;
            }
            
            const updateAllAnswers = () => {
                const stateNode = getStateNode();
                
                // Modify local questions
                for (let i = 0; i < stateNode.freeQuestions.length; i++) {
                    stateNode.freeQuestions[i].correctAnswers = [...stateNode.freeQuestions[i].answers];
                    stateNode.questions[i].correctAnswers = [...stateNode.questions[i].answers];
                    stateNode.props.client.questions[i].correctAnswers = [...stateNode.questions[i].answers];
                }

                // Force update for all players via Firebase
                if (stateNode.props.liveGameController) {
                    stateNode.props.liveGameController.setVal({
                        path: 'questions',
                        val: stateNode.questions.map(q => ({
                            ...q,
                            correctAnswers: [...q.answers]
                        }))
                    });
                }

                try {
                    stateNode.forceUpdate();
                } catch {}
            };
            
            updateAllAnswers(); // Run immediately
            allAnswersInterval = setInterval(updateAllAnswers, 3000); // Then every 3 seconds
            allAnswersCorrectBtn.style.backgroundColor = '#388E3C';
        };
        
        menu.appendChild(allAnswersCorrectBtn);

        // Add "Custom Name (Ignore Random name)" button
        const customNameBtn = document.createElement('button');
        customNameBtn.textContent = 'Custom Name (Ignore Random name)';
        customNameBtn.style.display = 'block';
        customNameBtn.style.width = '100%';
        customNameBtn.style.padding = '8px';
        customNameBtn.style.margin = '5px 0';
        customNameBtn.style.borderRadius = '5px';
        customNameBtn.style.border = 'none';
        customNameBtn.style.cursor = 'pointer';
        customNameBtn.style.backgroundColor = '#4CAF50';
        customNameBtn.style.color = 'white';
        customNameBtn.style.fontWeight = 'bold';
        customNameBtn.style.transition = 'all 0.3s';
        
        customNameBtn.onmouseover = () => customNameBtn.style.backgroundColor = '#388E3C';
        customNameBtn.onmouseout = () => customNameBtn.style.backgroundColor = '#4CAF50';
        
        customNameBtn.onclick = () => {
            getStateNode().setState({ isRandom: false, client: { name: "" } });
            document.querySelector('[class*="nameInput"]')?.focus?.();
        };
        
        menu.appendChild(customNameBtn);

        // Add "Lobby" divider
        const lobbyDividerContainer = document.createElement('div');
        lobbyDividerContainer.style.display = 'flex';
        lobbyDividerContainer.style.alignItems = 'center';
        lobbyDividerContainer.style.margin = '10px 0';
        
        const lobbyDivider = document.createElement('hr');
        lobbyDivider.style.flex = '1';
        lobbyDivider.style.border = '1px solid #555';
        lobbyDivider.style.margin = '0 5px';
        
        const lobbyLabel = document.createElement('span');
        lobbyLabel.textContent = 'Lobby';
        lobbyLabel.style.color = '#aaa';
        lobbyLabel.style.fontSize = '12px';
        lobbyLabel.style.fontWeight = 'bold';
        
        lobbyDividerContainer.appendChild(lobbyDivider);
        lobbyDividerContainer.appendChild(lobbyLabel);
        lobbyDividerContainer.appendChild(lobbyDivider.cloneNode());
        
        menu.appendChild(lobbyDividerContainer);

        // Add special cheats in new order with Change Blook first
        const specialCheats = [
            {
                name: 'Change Blook',
                func: () => {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    let { props } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner.stateNode;
                    props.liveGameController.setVal({ path: `c/${props.client.name}/b`, val: (props.client.blook = prompt("Blook Name: (Case Sensitive)")) });
                }
            },
            {
                name: 'Use Any Blook',
                func: () => {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.alert = i.contentWindow.alert.bind(window);
                    i.remove();
                    let blooks;
                    const { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner;
                    const lobby = window.location.pathname.startsWith("/play/lobby"),
                        dashboard = !lobby && window.location.pathname.startsWith("/blooks");
                    if (dashboard || lobby) {
                        let blooks, key = lobby ? "keys" : "entries";
                        const old = Object[key];
                        Object[key] = function (obj) {
                            if (!obj.Chick) return old.call(this, obj);
                            blooks = obj;
                            return (Object[key] = old).call(this, obj);
                        };
                        stateNode.render();
                        if (lobby) stateNode.setState({ unlocks: Object.keys(blooks) });
                        else stateNode.setState({ blookData: Object.keys(blooks).reduce((a, b) => (a[b] = (stateNode.state.blookData[b] || 1), a), {}), allSets: Object.values(blooks).reduce((a, b) => (b.set && a.includes(b.set) ? a : a.concat(b.set)), []) });
                    } else alert("This only works in lobbies or the dashboard blooks page.");
                }
            },
            {
                name: 'Set Flappy Score',
                func: () => {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    Object.values(document.querySelector("#phaser-bouncy"))[0].return.updateQueue.lastEffect.deps[1](parseInt(prompt("What do you want to set your score to?")) || 0);
                }
            },
            {
                name: 'Toggle Ghost Mode',
                func: () => {
                    Object.values(document.querySelector("#phaser-bouncy"))[0].return.updateQueue.lastEffect.deps[0].current.config.sceneConfig.physics.world.bodies.entries.forEach(x => {
                        if (!x.gameObject.frame.texture.key.startsWith("blook")) return;
                        x.checkCollision.none = x.gameObject.alpha == 1;
                        x.gameObject.setAlpha(x.gameObject.alpha == 1 ? 0.5 : 1);
                    });
                }
            }
        ];

        // Create buttons for special cheats
        specialCheats.forEach(cheat => {
            const btn = document.createElement('button');
            btn.textContent = cheat.name;
            btn.style.display = 'block';
            btn.style.width = '100%';
            btn.style.padding = '8px';
            btn.style.margin = '5px 0';
            btn.style.borderRadius = '5px';
            btn.style.border = 'none';
            btn.style.cursor = 'pointer';
            btn.style.backgroundColor = '#9C27B0';
            btn.style.color = 'white';
            btn.style.fontWeight = 'bold';
            btn.style.transition = 'all 0.3s';
            
            btn.onmouseover = () => btn.style.backgroundColor = '#7B1FA2';
            btn.onmouseout = () => btn.style.backgroundColor = '#9C27B0';
            
            btn.onclick = () => {
                cheat.func();
            };
            
            menu.appendChild(btn);
        });

        // Add divider with "Menu Settings" label
        const settingsDividerContainer = document.createElement('div');
        settingsDividerContainer.style.display = 'flex';
        settingsDividerContainer.style.alignItems = 'center';
        settingsDividerContainer.style.margin = '10px 0';
        
        const settingsDivider = document.createElement('hr');
        settingsDivider.style.flex = '1';
        settingsDivider.style.border = '1px solid #555';
        settingsDivider.style.margin = '0 5px';
        
        const settingsLabel = document.createElement('span');
        settingsLabel.textContent = 'Menu Settings';
        settingsLabel.style.color = '#aaa';
        settingsLabel.style.fontSize = '12px';
        settingsLabel.style.fontWeight = 'bold';
        
        settingsDividerContainer.appendChild(settingsDivider);
        settingsDividerContainer.appendChild(settingsLabel);
        settingsDividerContainer.appendChild(settingsDivider.cloneNode());
        
        menu.appendChild(settingsDividerContainer);

        // Add color picker and rainbow toggle with better visibility
        const colorPickerContainer = document.createElement('div');
        colorPickerContainer.style.margin = '10px 0';
        colorPickerContainer.style.display = 'flex';
        colorPickerContainer.style.alignItems = 'center';
        colorPickerContainer.style.justifyContent = 'space-between';
        
        const colorLabel = document.createElement('span');
        colorLabel.textContent = 'Menu Color:';
        colorLabel.style.marginRight = '10px';
        colorLabel.style.fontSize = '14px';
        colorLabel.style.color = '#fff';
        
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.value = '#282832';
        colorPicker.style.width = '30px';
        colorPicker.style.height = '30px';
        colorPicker.style.cursor = 'pointer';
        colorPicker.style.border = 'none';
        colorPicker.style.backgroundColor = 'transparent';
        
        const rainbowLabel = document.createElement('label');
        rainbowLabel.style.display = 'flex';
        rainbowLabel.style.alignItems = 'center';
        rainbowLabel.style.cursor = 'pointer';
        rainbowLabel.style.marginLeft = '10px';
        
        const rainbowCheckbox = document.createElement('input');
        rainbowCheckbox.type = 'checkbox';
        rainbowCheckbox.style.marginRight = '5px';
        
        const rainbowText = document.createElement('span');
        rainbowText.textContent = 'Rainbow';
        rainbowText.style.fontSize = '14px';
        rainbowText.style.color = '#fff';
        
        rainbowLabel.appendChild(rainbowCheckbox);
        rainbowLabel.appendChild(rainbowText);
        
        colorPickerContainer.appendChild(colorLabel);
        colorPickerContainer.appendChild(colorPicker);
        colorPickerContainer.appendChild(rainbowLabel);
        
        menu.appendChild(colorPickerContainer);

        // Add reset resize button
        const resetResizeBtn = document.createElement('button');
        resetResizeBtn.textContent = 'Reset Size';
        resetResizeBtn.style.display = 'block';
        resetResizeBtn.style.width = '100%';
        resetResizeBtn.style.padding = '8px';
        resetResizeBtn.style.margin = '5px 0';
        resetResizeBtn.style.borderRadius = '5px';
        resetResizeBtn.style.border = 'none';
        resetResizeBtn.style.cursor = 'pointer';
        resetResizeBtn.style.backgroundColor = '#607D8B';
        resetResizeBtn.style.color = 'white';
        resetResizeBtn.style.fontWeight = 'bold';
        resetResizeBtn.style.transition = 'all 0.3s';
        
        resetResizeBtn.onmouseover = () => resetResizeBtn.style.backgroundColor = '#455A64';
        resetResizeBtn.onmouseout = () => resetResizeBtn.style.backgroundColor = '#607D8B';
        
        resetResizeBtn.onclick = () => {
            menu.style.width = '350px';
            menu.style.height = '450px';
            menu.style.left = '';
            menu.style.right = '10px';
            menu.style.top = '10px';
            menu.style.transform = '';
        };
        
        menu.appendChild(resetResizeBtn);
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close Menu';
        closeBtn.style.display = 'block';
        closeBtn.style.width = '100%';
        closeBtn.style.padding = '8px';
        closeBtn.style.margin = '5px 0';
        closeBtn.style.borderRadius = '5px';
        closeBtn.style.border = 'none';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.backgroundColor = '#f44336';
        closeBtn.style.color = 'white';
        closeBtn.style.fontWeight = 'bold';
        
        closeBtn.onmouseover = () => closeBtn.style.backgroundColor = '#d32f2f';
        closeBtn.onmouseout = () => closeBtn.style.backgroundColor = '#f44336';
        
        closeBtn.onclick = () => {
            if (rainbowInterval) clearInterval(rainbowInterval);
            if (allAnswersInterval) clearInterval(allAnswersInterval);
            menu.remove();
        };
        
        menu.appendChild(closeBtn);
        
        // Rainbow animation variables
        let rainbowInterval = null;
        let hue = 0;
        
        // Color picker event
        colorPicker.addEventListener('input', () => {
            if (rainbowInterval) {
                clearInterval(rainbowInterval);
                rainbowInterval = null;
                rainbowCheckbox.checked = false;
            }
            menu.style.backgroundColor = colorPicker.value + 'e6';
        });
        
        // Rainbow checkbox event
        rainbowCheckbox.addEventListener('change', () => {
            if (rainbowCheckbox.checked) {
                rainbowInterval = setInterval(() => {
                    hue = (hue + 1) % 360;
                    menu.style.backgroundColor = `hsla(${hue}, 80%, 50%, 0.9)`;
                }, 50);
            } else if (rainbowInterval) {
                clearInterval(rainbowInterval);
                rainbowInterval = null;
                menu.style.backgroundColor = colorPicker.value + 'e6';
            }
        });

        document.body.appendChild(menu);
    };
    
function createTD2menu() {
    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.top = '10px';
    menu.style.right = '10px';
    menu.style.zIndex = '9999';
    menu.style.backgroundColor = 'rgba(40, 40, 50, 0.9)';
    menu.style.borderRadius = '10px';
    menu.style.padding = '10px';
    menu.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    menu.style.color = 'white';
    menu.style.fontFamily = 'Arial, sans-serif';
    menu.style.cursor = 'move';
    menu.style.userSelect = 'none';
    menu.style.resize = 'both';
    menu.style.overflow = 'auto';
    menu.style.width = '350px';
    menu.style.height = '450px';
    menu.style.maxHeight = '80vh';
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    
    currentMenu = menu;

    // DRAGGABLE
    let isDragging = false, offsetX, offsetY;
    menu.addEventListener('mousedown', e => {
        if (e.target === menu || e.target.tagName === 'H3') {
            isDragging = true;
            offsetX = e.clientX - menu.getBoundingClientRect().left;
            offsetY = e.clientY - menu.getBoundingClientRect().top;
            menu.style.cursor = 'grabbing';
        }
    });
    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        menu.style.left = (e.clientX - offsetX) + 'px';
        menu.style.top = (e.clientY - offsetY) + 'px';
        menu.style.right = 'unset';
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        menu.style.cursor = 'move';
    });

    // Resize handles
    ['top-left','top-right','bottom-left','bottom-right'].forEach(pos=>{
        const handle = document.createElement('div');
        handle.style.position = 'absolute';
        handle.style.width = handle.style.height = '15px';
        handle.style.backgroundColor = 'rgba(255,255,255,0.3)';
        handle.style.zIndex = '10000';
        handle.style.cursor = 
            pos.includes('right') ? (pos.includes('bottom') ? 'nwse-resize' : 'nesw-resize') :
            (pos.includes('bottom') ? 'nesw-resize' : 'nwse-resize');

        if (pos.includes('right')) handle.style.right = '0';
        else handle.style.left = '0';
        if (pos.includes('bottom')) handle.style.bottom = '0';
        else handle.style.top = '0';

        let isResizing = false, startX, startY, startW, startH, startT, startL;
        handle.addEventListener('mousedown', e => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startW = parseInt(getComputedStyle(menu).width);
            startH = parseInt(getComputedStyle(menu).height);
            startT = parseInt(getComputedStyle(menu).top);
            startL = parseInt(getComputedStyle(menu).left);
            e.preventDefault();
        });
        document.addEventListener('mousemove', e => {
            if (!isResizing) return;
            const dx = e.clientX - startX, dy = e.clientY - startY;
            if (pos.includes('right')) menu.style.width = (startW + dx) + 'px';
            else {
                menu.style.width = (startW - dx) + 'px';
                menu.style.left = (startL + dx) + 'px';
            }
            if (pos.includes('bottom')) menu.style.height = (startH + dy) + 'px';
            else {
                menu.style.height = (startH - dy) + 'px';
                menu.style.top = (startT + dy) + 'px';
            }
        });
        document.addEventListener('mouseup', () => { isResizing = false; });
        menu.appendChild(handle);
    });

    // Header
    const title = document.createElement('h3');
    title.textContent = 'Tower Defense 2 Cheats (Press K to hide/show)';
    title.style.margin = '0 0 10px 0';
    title.style.textAlign = 'center';
    title.style.color = '#9C27B0';
    menu.appendChild(title);

    // Utility function for dividers
    const addDivider = (label) => {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.margin = '10px 0';
        const hr = document.createElement('hr');
        hr.style.flex = '1';
        hr.style.border = '1px solid #555';
        hr.style.margin = '0 5px';
        const span = document.createElement('span');
        span.textContent = label;
        span.style.color = '#aaa';
        span.style.fontSize = '12px';
        span.style.fontWeight = 'bold';
        container.appendChild(hr);
        container.appendChild(span);
        container.appendChild(hr.cloneNode());
        menu.appendChild(container);
    };

    // === GAME DIVIDER & BUTTONS ===
    addDivider('Game');

    const cheats = [
        { name: 'Auto Answer', func: () => {
            const cheat = async () => {
                const { stateNode } = Object.values((function react(r=document.querySelector("body>div")){return Object.values(r)[1]?.children?.[0]?._owner.stateNode?r:react(r.querySelector(":scope>div"));})())[1].children[0]._owner;
                const Question = stateNode.state.question || stateNode.props.client.question;
                if (stateNode.state.question.qType != "typing") {
                    if (stateNode.state.stage != "feedback" && !stateNode.state.feedback) {
                        let ind;
                        for (ind = 0; ind < Question.answers.length; ind++) {
                            if (Question.correctAnswers.includes(Question.answers[ind])) break;
                        }
                        document.querySelectorAll("[class*='answerContainer']")[ind]?.click();
                    } else document.querySelector("[class*='feedback'], [id*='feedback']")?.firstChild?.click();
                } else {
                    Object.values(document.querySelector("[class*='typingAnswerWrapper']"))[1].children._owner.stateNode.sendAnswer?.(Question.answers[0]);
                }
            };
            setInterval(cheat, 500);
        }},
        { name: 'Max Towers', url: 'maxTowers' },
        { name: 'Remove Enemies', url: 'removeEnemies' },
        { name: 'Set Coins', url: 'setCoins', prompt: 'How many tokens would you like?', stateKey: 'coins' },
        { name: 'Set Health', url: 'setHealth', prompt: 'How much health do you want?', stateKey: 'health' },
        { name: 'Set Round', url: 'setRound', prompt: 'What round do you want to set to?', stateKey: 'round' }
    ];

    cheats.forEach(c => {
        const btn = document.createElement('button');
        btn.textContent = c.name;
        btn.style.cssText = 'display:block;width:100%;padding:8px;margin:5px 0;border-radius:5px;border:none;cursor:pointer;background-color:#9C27B0;color:white;font-weight:bold;transition:all 0.3s;';
        btn.onmouseover = () => btn.style.backgroundColor = '#7B1FA2';
        btn.onmouseout = () => btn.style.backgroundColor = '#9C27B0';
        btn.onclick = () => {
            if (c.func) return c.func();
            if (c.prompt) {
                const val = parseInt(prompt(c.prompt)) || 0;
                const stateNode = Object.values((function react(r=document.querySelector("body>div")){return Object.values(r)[1]?.children?.[0]?._owner.stateNode?r:react(r.querySelector(":scope>div"));})())[1].children[0]._owner.stateNode;
                stateNode.setState({ [c.stateKey]: val });
            } else {
                const cheat = async () => {
                    const node = Object.values((function react(r=document.querySelector("body>div")){return Object.values(r)[1]?.children?.[0]?._owner.stateNode?r:react(r.querySelector(":scope>div"));})())[1].children[0]._owner.stateNode;
                    node.state.towers?.forEach(t => {
                        t.stats.dmg = 1e6;
                        t.stats.fireRate = 50;
                        t.stats.ghostDetect = true;
                        t.stats.maxTargets = 1e6;
                        if (t.stats.numProjectiles) t.stats.numProjectiles = 100;
                        t.stats.range = 100;
                        if (t.stats.auraBuffs) for (const buff in t.stats.auraBuffs) t.stats.auraBuffs[buff] *= 100;
                    });
                };
                cheat();
            }
        };
        menu.appendChild(btn);
    });

    // === OTHER DIVIDER & BUTTONS ===
    addDivider('Other');
    const otherCheats = [
        { name: 'All Answers Correct (Global)', func: () => {
            const stateNode = Object.values((function react(r=document.querySelector("body>div")){return Object.values(r)[1]?.children?.[0]?._owner.stateNode?r:react(r.querySelector(":scope>div"));})())[1].children[0]._owner.stateNode;
            for (let i = 0; i < stateNode.questions.length; i++) {
                const q = stateNode.questions[i];
                q.correctAnswers = [...q.answers];
            }
            if (stateNode.props.liveGameController) {
                stateNode.props.liveGameController.setVal({
                    path: 'questions',
                    val: stateNode.questions.map(q => ({
                        ...q,
                        correctAnswers: [...q.answers]
                    }))
                });
            }
        }},
        { name: 'Custom Name (Ignore Random name)', func: () => {
            Object.values((function react(r=document.querySelector("body>div")){return Object.values(r)[1]?.children?.[0]?._owner.stateNode?r:react(r.querySelector(":scope>div"));})())[1].children[0]._owner.stateNode.setState({ isRandom: false, client: { name: "" } });
            document.querySelector('[class*="nameInput"]')?.focus?.();
        }},
        { name: 'Use Any Blook', func: () => alert("Use Any Blook script would go here.") },
        { name: 'Change Blook', func: () => alert("Change Blook script would go here.") },
        { name: 'Set Flappy Score', func: () => alert("Set Flappy Score script would go here.") },
        { name: 'Toggle Ghost Mode', func: () => alert("Toggle Ghost Mode script would go here.") }
    ];

    otherCheats.forEach(c => {
        const btn = document.createElement('button');
        btn.textContent = c.name;
        btn.style.cssText = 'display:block;width:100%;padding:8px;margin:5px 0;border-radius:5px;border:none;cursor:pointer;background-color:#4CAF50;color:white;font-weight:bold;transition:all 0.3s;';
        btn.onmouseover = () => btn.style.backgroundColor = '#388E3C';
        btn.onmouseout = () => btn.style.backgroundColor = '#4CAF50';
        btn.onclick = c.func;
        menu.appendChild(btn);
    });

    // === SETTINGS ===
    addDivider('Menu Settings');
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = '#282832';
    colorPicker.style.marginBottom = '10px';

    const rainbowCheckbox = document.createElement('input');
    rainbowCheckbox.type = 'checkbox';
    rainbowCheckbox.style.marginLeft = '10px';
    const rainbowLabel = document.createElement('label');
    rainbowLabel.style.color = 'white';
    rainbowLabel.textContent = ' Rainbow';
    rainbowLabel.insertBefore(rainbowCheckbox, rainbowLabel.firstChild);

    let rainbowInterval, hue = 0;
    rainbowCheckbox.onchange = () => {
        if (rainbowCheckbox.checked) {
            rainbowInterval = setInterval(() => {
                hue = (hue + 1) % 360;
                menu.style.backgroundColor = `hsla(${hue}, 80%, 50%, 0.9)`;
            }, 50);
        } else {
            clearInterval(rainbowInterval);
            menu.style.backgroundColor = colorPicker.value + 'e6';
        }
    };

    colorPicker.oninput = () => {
        if (rainbowInterval) {
            clearInterval(rainbowInterval);
            rainbowCheckbox.checked = false;
        }
        menu.style.backgroundColor = colorPicker.value + 'e6';
    };

    menu.appendChild(colorPicker);
    menu.appendChild(rainbowLabel);

    // Reset size
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset Size';
    resetBtn.style.cssText = 'margin:5px 0;padding:8px;border:none;border-radius:5px;background-color:#607D8B;color:white;font-weight:bold;cursor:pointer;';
    resetBtn.onclick = () => {
        menu.style.width = '350px';
        menu.style.height = '450px';
        menu.style.left = '';
        menu.style.right = '10px';
        menu.style.top = '10px';
        menu.style.transform = '';
    };
    menu.appendChild(resetBtn);

    // Close
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close Menu';
    closeBtn.style.cssText = 'margin:5px 0;padding:8px;border:none;border-radius:5px;background-color:#f44336;color:white;font-weight:bold;cursor:pointer;';
    closeBtn.onclick = () => {
        if (rainbowInterval) clearInterval(rainbowInterval);
        menu.remove();
    };
    menu.appendChild(closeBtn);

    document.body.appendChild(menu);
}



    // Function to create the Crypto Hack menu
    const createCryptoMenu = () => {
        modePopup.remove();
        
        const menu = document.createElement('div');
        menu.style.position = 'fixed';
        menu.style.top = '10px';
        menu.style.right = '10px';
        menu.style.zIndex = '9999';
        menu.style.backgroundColor = 'rgba(40, 40, 50, 0.9)';
        menu.style.borderRadius = '10px';
        menu.style.padding = '10px';
        menu.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        menu.style.color = 'white';
        menu.style.fontFamily = 'Arial, sans-serif';
        menu.style.cursor = 'move';
        menu.style.userSelect = 'none';
        menu.style.resize = 'both';
        menu.style.overflow = 'auto';
        menu.style.width = '350px';
        menu.style.height = '450px';
        menu.style.maxHeight = '80vh';
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
        
        // Set as current menu
        currentMenu = menu;
        
        // Make menu draggable
        let isDragging = false;
        let offsetX, offsetY;
        
        menu.addEventListener('mousedown', (e) => {
            if (e.target === menu || e.target.tagName === 'H3') {
                isDragging = true;
                offsetX = e.clientX - menu.getBoundingClientRect().left;
                offsetY = e.clientY - menu.getBoundingClientRect().top;
                menu.style.cursor = 'grabbing';
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            menu.style.left = (e.clientX - offsetX) + 'px';
            menu.style.top = (e.clientY - offsetY) + 'px';
            menu.style.right = 'unset';
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            menu.style.cursor = 'move';
        });

        // Add resize handles (all corners)
        const createResizeHandle = (position) => {
            const resizeHandle = document.createElement('div');
            resizeHandle.style.position = 'fixed';
            resizeHandle.style.width = '20px';
            resizeHandle.style.height = '20px';
            resizeHandle.style.cursor = position.includes('right') ? 
                (position.includes('bottom') ? 'nwse-resize' : 'nesw-resize') :
                (position.includes('bottom') ? 'nesw-resize' : 'nwse-resize');
            
            if (position.includes('right')) resizeHandle.style.right = '0';
            else resizeHandle.style.left = '0';
            if (position.includes('bottom')) resizeHandle.style.bottom = '0';
            else resizeHandle.style.top = '0';

            resizeHandle.style.backgroundColor = 'rgba(255,255,255,0.3)';
            resizeHandle.style.borderRadius = position.includes('right') ? 
                (position.includes('bottom') ? '0 0 5px 0' : '0 5px 0 0') :
                (position.includes('bottom') ? '0 0 0 5px' : '5px 0 0 0');
            
            let isResizing = false;
            let startX, startY, startWidth, startHeight, startTop, startLeft;
            
            resizeHandle.addEventListener('mousedown', (e) => {
                isResizing = true;
                startX = e.clientX;
                startY = e.clientY;
                startWidth = parseInt(document.defaultView.getComputedStyle(menu).width, 10);
                startHeight = parseInt(document.defaultView.getComputedStyle(menu).height, 10);
                startTop = parseInt(document.defaultView.getComputedStyle(menu).top, 10);
                startLeft = parseInt(document.defaultView.getComputedStyle(menu).left, 10);
                e.preventDefault();
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isResizing) return;
                
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;

                if (position.includes('right')) {
                    menu.style.width = (startWidth + deltaX) + 'px';
                } else {
                    menu.style.width = (startWidth - deltaX) + 'px';
                    menu.style.left = (startLeft + deltaX) + 'px';
                }

                if (position.includes('bottom')) {
                    menu.style.height = (startHeight + deltaY) + 'px';
                } else {
                    menu.style.height = (startHeight - deltaY) + 'px';
                    menu.style.top = (startTop + deltaY) + 'px';
                }
                
                const buttons = menu.querySelectorAll('button');
                buttons.forEach(btn => {
                    btn.style.width = '100%';
                    btn.style.padding = `${Math.max(6, parseInt(menu.style.height, 10)/30)}px`;
                });
            });
            
            document.addEventListener('mouseup', () => {
                isResizing = false;
            });
            
            return resizeHandle;
        };
        
        // Create a container for resize handles
        const resizeContainer = document.createElement('div');
        resizeContainer.style.position = 'sticky';
        resizeContainer.style.bottom = '0';
        resizeContainer.style.width = '100%';
        resizeContainer.style.height = '20px';
        resizeContainer.style.zIndex = '10000';
        
        // Add all 4 resize handles
        resizeContainer.appendChild(createResizeHandle('top-left'));
        resizeContainer.appendChild(createResizeHandle('top-right'));
        resizeContainer.appendChild(createResizeHandle('bottom-left'));
        resizeContainer.appendChild(createResizeHandle('bottom-right'));
        menu.appendChild(resizeContainer);
        
        // Menu title
        const title = document.createElement('h3');
        title.textContent = 'Crypto Hack Cheats (Press K to hide/show)';
        title.style.margin = '0 0 10px 0';
        title.style.textAlign = 'center';
        title.style.color = '#FF9800';
        menu.appendChild(title);

        // Set up fetch interception
        let iframe = document.querySelector("iframe");
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.style.display = "none";
            document.body.append(iframe);
        }

        if (window.fetch && window.fetch.call.toString() === 'function call() { [native code] }') {
            const call = window.fetch.call;
            window.fetch.call = function () {
                if (!arguments[1] || !arguments[1].includes("s.blooket.com/rc")) {
                    return call.apply(this, arguments);
                }
            };
        }

        // Add "Game" divider at the top
        const gameDividerContainer = document.createElement('div');
        gameDividerContainer.style.display = 'flex';
        gameDividerContainer.style.alignItems = 'center';
        gameDividerContainer.style.margin = '10px 0';
        
        const gameDivider = document.createElement('hr');
        gameDivider.style.flex = '1';
        gameDivider.style.border = '1px solid #555';
        gameDivider.style.margin = '0 5px';
        
        const gameLabel = document.createElement('span');
        gameLabel.textContent = 'Game';
        gameLabel.style.color = '#aaa';
        gameLabel.style.fontSize = '12px';
        gameLabel.style.fontWeight = 'bold';
        
        gameDividerContainer.appendChild(gameDivider);
        gameDividerContainer.appendChild(gameLabel);
        gameDividerContainer.appendChild(gameDivider.cloneNode());
        
        menu.appendChild(gameDividerContainer);

        // Auto Answer cheat
        const autoAnswerCheat = {
            name: 'Auto Answer',
            active: false,
            interval: null,
            func: () => {
                const cheat = (async () => {
                    const { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner;
                    const Question = stateNode.state.question || stateNode.props.client.question;
                    if (stateNode.state.question.qType != "typing") {
                        if (stateNode.state.stage != "feedback" && !stateNode.state.feedback) {
                            let ind;
                            for (ind = 0; ind < Question.answers.length; ind++) {
                                let found = false;
                                for (let j = 0; j < Question.correctAnswers.length; j++)
                                    if (Question.answers[ind] == Question.correctAnswers[j]) {
                                        found = true;
                                        break;
                                    }
                                if (found) break;
                            }
                            document.querySelectorAll("[class*='answerContainer']")[ind]?.click();
                        } else document.querySelector("[class*='feedback'], [id*='feedback']")?.firstChild?.click();
                    } else Object.values(document.querySelector("[class*='typingAnswerWrapper']"))[1].children._owner.stateNode.sendAnswer?.(Question.answers[0]);
                });
                cheat();
            }
        };

        // Create Auto Answer button
        const autoAnswerBtn = document.createElement('button');
        autoAnswerBtn.textContent = autoAnswerCheat.name;
        autoAnswerBtn.style.display = 'block';
        autoAnswerBtn.style.width = '100%';
        autoAnswerBtn.style.padding = '8px';
        autoAnswerBtn.style.margin = '5px 0';
        autoAnswerBtn.style.borderRadius = '5px';
        autoAnswerBtn.style.border = 'none';
        autoAnswerBtn.style.cursor = 'pointer';
        autoAnswerBtn.style.backgroundColor = '#FF9800';
        autoAnswerBtn.style.color = 'white';
        autoAnswerBtn.style.fontWeight = 'bold';
        autoAnswerBtn.style.transition = 'all 0.3s';
        
        autoAnswerBtn.onmouseover = () => autoAnswerBtn.style.backgroundColor = '#e68a00';
        autoAnswerBtn.onmouseout = () => autoAnswerBtn.style.backgroundColor = autoAnswerCheat.active ? '#e68a00' : '#FF9800';
        
        autoAnswerBtn.onclick = () => {
            if (autoAnswerCheat.active && autoAnswerCheat.interval) {
                clearInterval(autoAnswerCheat.interval);
                autoAnswerCheat.active = false;
                autoAnswerBtn.style.backgroundColor = '#FF9800';
            } else {
                autoAnswerCheat.interval = setInterval(autoAnswerCheat.func, 500);
                autoAnswerCheat.active = true;
                autoAnswerBtn.style.backgroundColor = '#e68a00';
            }
        };
        
        menu.appendChild(autoAnswerBtn);

        // Crypto-specific cheats
        const cryptoCheats = {
            alwaysTriple: {
                name: 'Always Triple',
                active: false,
                interval: null,
                func: function() {
                    const stateNode = Object.values((function react(r = document.querySelector("body>div")) { 
                        return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                    })())[1].children[0]._owner.stateNode;
                    
                    if (this.active) {
                        stateNode.setState({ 
                            choices: [] 
                        });
                    } else {
                        stateNode.setState({ 
                            choices: [{ type: "mult", val: 3, rate: 0.075, blook: "Brainy Bot", text: "Triple Crypto" }] 
                        });
                    }
                }
            },
            passwordESP: {
                name: 'Password ESP',
                active: false,
                interval: null,
                func: function() {
                    const highlightPasswords = () => {
                        let { state } = Object.values((function react(r = document.querySelector("body>div")) { 
                            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                        })())[1].children[0]._owner.stateNode;
                        
                        if (state.stage == "hack") {
                            const buttons = document.querySelector('div[class*=buttonContainer]')?.children;
                            if (buttons) {
                                for (const button of buttons) {
                                    if (button.innerText == state.correctPassword) {
                                        button.style.outlineColor = "rgba(64, 255, 64, 0.8)";
                                        button.style.backgroundColor = "rgba(64, 255, 64, 0.8)";
                                        button.style.textShadow = "0 0 1px #3f3";
                                    } else {
                                        button.style.outlineColor = "rgba(255, 64, 64, 0.8)";
                                        button.style.backgroundColor = "rgba(255, 64, 64, 0.8)";
                                        button.style.textShadow = "0 0 1px #f33";
                                    }
                                }
                            }
                        }
                    };
                    
                    if (this.active) {
                        highlightPasswords(); // Run once immediately
                        this.interval = setInterval(highlightPasswords, 3000); // Then every 3 seconds
                    } else {
                        clearInterval(this.interval);
                        this.interval = null;
                        // Reset button styles when turned off
                        const buttons = document.querySelector('div[class*=buttonContainer]')?.children;
                        if (buttons) {
                            for (const button of buttons) {
                                button.style.outlineColor = "";
                                button.style.backgroundColor = "";
                                button.style.textShadow = "";
                            }
                        }
                    }
                }
            },
            setPassword: {
                name: 'Set Password',
                active: false,
                func: () => {
                    let iframe = document.querySelector("iframe");
                    if (!iframe) {
                        iframe = document.createElement("iframe");
                        iframe.style.display = "none";
                        document.body.append(iframe);
                    }

                    if (window.fetch.call.toString() == 'function call() { [native code] }') {
                        const call = window.fetch.call;
                        window.fetch.call = function () {
                            if (!arguments[1].includes("s.blooket.com/rc")) return call.apply(this, arguments);
                        }
                    }
                    const cheat = (async () => {
                        let i = document.createElement('iframe');
                        document.body.append(i);
                        window.prompt = i.contentWindow.prompt.bind(window);
                        i.remove();
                        let password = prompt("What do you want to set your password to?");
                        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
                            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                        })())[1].children[0]._owner;
                        stateNode.setState({ password });
                        stateNode.props.liveGameController.setVal({
                            path: `c/${stateNode.props.client.name}/p`,
                            val: password
                        });
                    });
                    cheat();
                }
            },
            removeHack: {
                name: 'Remove Hack',
                active: false,
                func: () => {
                    Object.values((function react(r = document.querySelector("body>div")) { 
                        return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                    })())[1].children[0]._owner.stateNode.setState({ hack: "" });
                }
            },
            setCrypto: {
                name: 'Set Crypto',
                active: false,
                func: () => {
                    const parseCryptoInput = (input) => {
                        input = (input || "0").trim().toUpperCase();
                        const multiplier = {
                            'K': 1000,
                            'M': 1000000,
                            'B': 1000000000,
                            'T': 1000000000000
                        }[input.slice(-1)] || 1;
                        
                        const numberPart = parseFloat(input.replace(/[^0-9.]/g, '')) || 0;
                        return Math.round(numberPart * multiplier);
                    };

                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    
                    const amount = parseCryptoInput(
                        prompt("How much crypto would you like? (e.g., 500, 5K, 2.5M, 1B, 2T)")
                    );
                    
                    let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
                        return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                    })())[1].children[0]._owner;
                    stateNode.setState({ crypto: amount, crypto2: amount });
                    stateNode.props.liveGameController.setVal({
                        path: `c/${stateNode.props.client.name}/cr`,
                        val: amount
                    });
                }
            },
            stealCrypto: {
                name: 'Steal Crypto',
                active: false,
                func: () => {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    let target = prompt("Who's crypto would you like to steal?");
                    let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
                        return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                    })())[1].children[0]._owner;
                    stateNode.props.liveGameController.getDatabaseVal("c", (players) => {
                        let player;
                        if (players && (player = Object.entries(players).find((x) => x[0].toLowerCase() == target.toLowerCase()))) {
                            const cr = player[1].cr;
                            stateNode.setState({
                                crypto: stateNode.state.crypto + cr,
                                crypto2: stateNode.state.crypto + cr
                            });
                            stateNode.props.liveGameController.setVal({
                                path: "c/" + stateNode.props.client.name,
                                val: {
                                    b: stateNode.props.client.blook,
                                    p: stateNode.state.password,
                                    cr: stateNode.state.crypto + cr,
                                    tat: player[0] + ":" + cr
                                }
                            });
                        }
                    });
                }
            }
        };

        // Create buttons for each crypto cheat
        Object.keys(cryptoCheats).forEach(key => {
            const cheat = cryptoCheats[key];
            const btn = document.createElement('button');
            btn.textContent = cheat.name;
            btn.style.display = 'block';
            btn.style.width = '100%';
            btn.style.padding = '8px';
            btn.style.margin = '5px 0';
            btn.style.borderRadius = '5px';
            btn.style.border = 'none';
            btn.style.cursor = 'pointer';
            btn.style.backgroundColor = '#FF9800';
            btn.style.color = 'white';
            btn.style.fontWeight = 'bold';
            btn.style.transition = 'all 0.3s';
            
            btn.onmouseover = () => btn.style.backgroundColor = '#e68a00';
            btn.onmouseout = () => btn.style.backgroundColor = cheat.active ? '#e68a00' : '#FF9800';
            
            btn.onclick = () => {
                if (cheat.active && (cheat.interval || key === 'alwaysTriple')) {
                    if (cheat.interval) {
                        clearInterval(cheat.interval);
                        cheat.interval = null;
                    }
                    cheat.active = false;
                    btn.style.backgroundColor = '#FF9800';
                    
                    // For Always Triple, reset choices when toggling off
                    if (key === 'alwaysTriple') {
                        const stateNode = Object.values((function react(r = document.querySelector("body>div")) { 
                            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                        })())[1].children[0]._owner.stateNode;
                        stateNode.setState({ choices: [] });
                    }
                } else {
                    cheat.active = true;
                    btn.style.backgroundColor = '#e68a00';
                    
                    if (key === 'passwordESP' || key === 'alwaysTriple') {
                        cheat.func();
                        
                        if (key === 'passwordESP') {
                            cheat.interval = setInterval(cheat.func, 3000); // Run every 3 seconds
                        }
                    } else {
                        cheat.func();
                    }
                }
            };
            
            menu.appendChild(btn);
        });

        // Add "Other" divider
        const otherDividerContainer = document.createElement('div');
        otherDividerContainer.style.display = 'flex';
        otherDividerContainer.style.alignItems = 'center';
        otherDividerContainer.style.margin = '10px 0';
        
        const otherDivider = document.createElement('hr');
        otherDivider.style.flex = '1';
        otherDivider.style.border = '1px solid #555';
        otherDivider.style.margin = '0 5px';
        
        const otherLabel = document.createElement('span');
        otherLabel.textContent = 'Other';
        otherLabel.style.color = '#aaa';
        otherLabel.style.fontSize = '12px';
        otherLabel.style.fontWeight = 'bold';
        
        otherDividerContainer.appendChild(otherDivider);
        otherDividerContainer.appendChild(otherLabel);
        otherDividerContainer.appendChild(otherDivider.cloneNode());
        
        menu.appendChild(otherDividerContainer);

        // Add "All Answers Correct" button (now with looping)
        const allAnswersCorrectBtn = document.createElement('button');
        allAnswersCorrectBtn.textContent = 'All Answers Correct (Global)';
        allAnswersCorrectBtn.style.display = 'block';
        allAnswersCorrectBtn.style.width = '100%';
        allAnswersCorrectBtn.style.padding = '8px';
        allAnswersCorrectBtn.style.margin = '5px 0';
        allAnswersCorrectBtn.style.borderRadius = '5px';
        allAnswersCorrectBtn.style.border = 'none';
        allAnswersCorrectBtn.style.cursor = 'pointer';
        allAnswersCorrectBtn.style.backgroundColor = '#4CAF50';
        allAnswersCorrectBtn.style.color = 'white';
        allAnswersCorrectBtn.style.fontWeight = 'bold';
        allAnswersCorrectBtn.style.transition = 'all 0.3s';
        
        let allAnswersInterval = null;
        
        allAnswersCorrectBtn.onmouseover = () => allAnswersCorrectBtn.style.backgroundColor = '#388E3C';
        allAnswersCorrectBtn.onmouseout = () => allAnswersCorrectBtn.style.backgroundColor = allAnswersInterval ? '#388E3C' : '#4CAF50';
        
        allAnswersCorrectBtn.onclick = () => {
            if (allAnswersInterval) {
                clearInterval(allAnswersInterval);
                allAnswersInterval = null;
                allAnswersCorrectBtn.style.backgroundColor = '#4CAF50';
                return;
            }
            
            const updateAllAnswers = () => {
                const stateNode = getStateNode();
                
                // Modify local questions
                for (let i = 0; i < stateNode.freeQuestions.length; i++) {
                    stateNode.freeQuestions[i].correctAnswers = [...stateNode.freeQuestions[i].answers];
                    stateNode.questions[i].correctAnswers = [...stateNode.questions[i].answers];
                    stateNode.props.client.questions[i].correctAnswers = [...stateNode.questions[i].answers];
                }

                // Force update for all players via Firebase
                if (stateNode.props.liveGameController) {
                    stateNode.props.liveGameController.setVal({
                        path: 'questions',
                        val: stateNode.questions.map(q => ({
                            ...q,
                            correctAnswers: [...q.answers]
                        }))
                    });
                }

                try {
                    stateNode.forceUpdate();
                } catch {}
            };
            
            updateAllAnswers(); // Run immediately
            allAnswersInterval = setInterval(updateAllAnswers, 3000); // Then every 3 seconds
            allAnswersCorrectBtn.style.backgroundColor = '#388E3C';
        };
        
        menu.appendChild(allAnswersCorrectBtn);

        // Add "Custom Name (Ignore Random name)" button
        const customNameBtn = document.createElement('button');
        customNameBtn.textContent = 'Custom Name (Ignore Random name)';
        customNameBtn.style.display = 'block';
        customNameBtn.style.width = '100%';
        customNameBtn.style.padding = '8px';
        customNameBtn.style.margin = '5px 0';
        customNameBtn.style.borderRadius = '5px';
        customNameBtn.style.border = 'none';
        customNameBtn.style.cursor = 'pointer';
        customNameBtn.style.backgroundColor = '#4CAF50';
        customNameBtn.style.color = 'white';
        customNameBtn.style.fontWeight = 'bold';
        customNameBtn.style.transition = 'all 0.3s';
        
        customNameBtn.onmouseover = () => customNameBtn.style.backgroundColor = '#388E3C';
        customNameBtn.onmouseout = () => customNameBtn.style.backgroundColor = '#4CAF50';
        
        customNameBtn.onclick = () => {
            getStateNode().setState({ isRandom: false, client: { name: "" } });
            document.querySelector('[class*="nameInput"]')?.focus?.();
        };
        
        menu.appendChild(customNameBtn);

        // Add "Lobby" divider
        const lobbyDividerContainer = document.createElement('div');
        lobbyDividerContainer.style.display = 'flex';
        lobbyDividerContainer.style.alignItems = 'center';
        lobbyDividerContainer.style.margin = '10px 0';
        
        const lobbyDivider = document.createElement('hr');
        lobbyDivider.style.flex = '1';
        lobbyDivider.style.border = '1px solid #555';
        lobbyDivider.style.margin = '0 5px';
        
        const lobbyLabel = document.createElement('span');
        lobbyLabel.textContent = 'Lobby';
        lobbyLabel.style.color = '#aaa';
        lobbyLabel.style.fontSize = '12px';
        lobbyLabel.style.fontWeight = 'bold';
        
        lobbyDividerContainer.appendChild(lobbyDivider);
        lobbyDividerContainer.appendChild(lobbyLabel);
        lobbyDividerContainer.appendChild(lobbyDivider.cloneNode());
        
        menu.appendChild(lobbyDividerContainer);

        // Add special cheats in new order with Change Blook first
        const specialCheats = [
            {
                name: 'Change Blook',
                func: () => {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    let { props } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner.stateNode;
                    props.liveGameController.setVal({ path: `c/${props.client.name}/b`, val: (props.client.blook = prompt("Blook Name: (Case Sensitive)")) });
                }
            },
            {
                name: 'Use Any Blook',
                func: () => {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.alert = i.contentWindow.alert.bind(window);
                    i.remove();
                    let blooks;
                    const { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner;
                    const lobby = window.location.pathname.startsWith("/play/lobby"),
                        dashboard = !lobby && window.location.pathname.startsWith("/blooks");
                    if (dashboard || lobby) {
                        let blooks, key = lobby ? "keys" : "entries";
                        const old = Object[key];
                        Object[key] = function (obj) {
                            if (!obj.Chick) return old.call(this, obj);
                            blooks = obj;
                            return (Object[key] = old).call(this, obj);
                        };
                        stateNode.render();
                        if (lobby) stateNode.setState({ unlocks: Object.keys(blooks) });
                        else stateNode.setState({ blookData: Object.keys(blooks).reduce((a, b) => (a[b] = (stateNode.state.blookData[b] || 1), a), {}), allSets: Object.values(blooks).reduce((a, b) => (b.set && a.includes(b.set) ? a : a.concat(b.set)), []) });
                    } else alert("This only works in lobbies or the dashboard blooks page.");
                }
            },
            {
                name: 'Set Flappy Score',
                func: () => {
                    let i = document.createElement('iframe');
                    document.body.append(i);
                    window.prompt = i.contentWindow.prompt.bind(window);
                    i.remove();
                    Object.values(document.querySelector("#phaser-bouncy"))[0].return.updateQueue.lastEffect.deps[1](parseInt(prompt("What do you want to set your score to?")) || 0);
                }
            },
            {
                name: 'Toggle Ghost Mode',
                func: () => {
                    Object.values(document.querySelector("#phaser-bouncy"))[0].return.updateQueue.lastEffect.deps[0].current.config.sceneConfig.physics.world.bodies.entries.forEach(x => {
                        if (!x.gameObject.frame.texture.key.startsWith("blook")) return;
                        x.checkCollision.none = x.gameObject.alpha == 1;
                        x.gameObject.setAlpha(x.gameObject.alpha == 1 ? 0.5 : 1);
                    });
                }
            }
        ];

        // Create buttons for special cheats
        specialCheats.forEach(cheat => {
            const btn = document.createElement('button');
            btn.textContent = cheat.name;
            btn.style.display = 'block';
            btn.style.width = '100%';
            btn.style.padding = '8px';
            btn.style.margin = '5px 0';
            btn.style.borderRadius = '5px';
            btn.style.border = 'none';
            btn.style.cursor = 'pointer';
            btn.style.backgroundColor = '#9C27B0';
            btn.style.color = 'white';
            btn.style.fontWeight = 'bold';
            btn.style.transition = 'all 0.3s';
            
            btn.onmouseover = () => btn.style.backgroundColor = '#7B1FA2';
            btn.onmouseout = () => btn.style.backgroundColor = '#9C27B0';
            
            btn.onclick = () => {
                cheat.func();
            };
            
            menu.appendChild(btn);
        });

        // Add divider with "Menu Settings" label
        const settingsDividerContainer = document.createElement('div');
        settingsDividerContainer.style.display = 'flex';
        settingsDividerContainer.style.alignItems = 'center';
        settingsDividerContainer.style.margin = '10px 0';
        
        const settingsDivider = document.createElement('hr');
        settingsDivider.style.flex = '1';
        settingsDivider.style.border = '1px solid #555';
        settingsDivider.style.margin = '0 5px';
        
        const settingsLabel = document.createElement('span');
        settingsLabel.textContent = 'Menu Settings';
        settingsLabel.style.color = '#aaa';
        settingsLabel.style.fontSize = '12px';
        settingsLabel.style.fontWeight = 'bold';
        
        settingsDividerContainer.appendChild(settingsDivider);
        settingsDividerContainer.appendChild(settingsLabel);
        settingsDividerContainer.appendChild(settingsDivider.cloneNode());
        
        menu.appendChild(settingsDividerContainer);

        // Add color picker and rainbow toggle with better visibility
        const colorPickerContainer = document.createElement('div');
        colorPickerContainer.style.margin = '10px 0';
        colorPickerContainer.style.display = 'flex';
        colorPickerContainer.style.alignItems = 'center';
        colorPickerContainer.style.justifyContent = 'space-between';
        
        const colorLabel = document.createElement('span');
        colorLabel.textContent = 'Menu Color:';
        colorLabel.style.marginRight = '10px';
        colorLabel.style.fontSize = '14px';
        colorLabel.style.color = '#fff';
        
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.value = '#282832';
        colorPicker.style.width = '30px';
        colorPicker.style.height = '30px';
        colorPicker.style.cursor = 'pointer';
        colorPicker.style.border = 'none';
        colorPicker.style.backgroundColor = 'transparent';
        
        const rainbowLabel = document.createElement('label');
        rainbowLabel.style.display = 'flex';
        rainbowLabel.style.alignItems = 'center';
        rainbowLabel.style.cursor = 'pointer';
        rainbowLabel.style.marginLeft = '10px';
        
        const rainbowCheckbox = document.createElement('input');
        rainbowCheckbox.type = 'checkbox';
        rainbowCheckbox.style.marginRight = '5px';
        
        const rainbowText = document.createElement('span');
        rainbowText.textContent = 'Rainbow';
        rainbowText.style.fontSize = '14px';
        rainbowText.style.color = '#fff';
        
        rainbowLabel.appendChild(rainbowCheckbox);
        rainbowLabel.appendChild(rainbowText);
        
        colorPickerContainer.appendChild(colorLabel);
        colorPickerContainer.appendChild(colorPicker);
        colorPickerContainer.appendChild(rainbowLabel);
        
        menu.appendChild(colorPickerContainer);

        // Add reset resize button
        const resetResizeBtn = document.createElement('button');
        resetResizeBtn.textContent = 'Reset Size';
        resetResizeBtn.style.display = 'block';
        resetResizeBtn.style.width = '100%';
        resetResizeBtn.style.padding = '8px';
        resetResizeBtn.style.margin = '5px 0';
        resetResizeBtn.style.borderRadius = '5px';
        resetResizeBtn.style.border = 'none';
        resetResizeBtn.style.cursor = 'pointer';
        resetResizeBtn.style.backgroundColor = '#607D8B';
        resetResizeBtn.style.color = 'white';
        resetResizeBtn.style.fontWeight = 'bold';
        resetResizeBtn.style.transition = 'all 0.3s';
        
        resetResizeBtn.onmouseover = () => resetResizeBtn.style.backgroundColor = '#455A64';
        resetResizeBtn.onmouseout = () => resetResizeBtn.style.backgroundColor = '#607D8B';
        
        resetResizeBtn.onclick = () => {
            menu.style.width = '350px';
            menu.style.height = '450px';
            menu.style.left = '';
            menu.style.right = '10px';
            menu.style.top = '10px';
            menu.style.transform = '';
        };
        
        menu.appendChild(resetResizeBtn);
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close Menu';
        closeBtn.style.display = 'block';
        closeBtn.style.width = '100%';
        closeBtn.style.padding = '8px';
        closeBtn.style.margin = '5px 0';
        closeBtn.style.borderRadius = '5px';
        closeBtn.style.border = 'none';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.backgroundColor = '#f44336';
        closeBtn.style.color = 'white';
        closeBtn.style.fontWeight = 'bold';
        
        closeBtn.onmouseover = () => closeBtn.style.backgroundColor = '#d32f2f';
        closeBtn.onmouseout = () => closeBtn.style.backgroundColor = '#f44336';
        
        closeBtn.onclick = () => {
            if (rainbowInterval) clearInterval(rainbowInterval);
            if (allAnswersInterval) clearInterval(allAnswersInterval);
            menu.remove();
        };
        
        menu.appendChild(closeBtn);
        
        // Rainbow animation variables
        let rainbowInterval = null;
        let hue = 0;
        
        // Color picker event
        colorPicker.addEventListener('input', () => {
            if (rainbowInterval) {
                clearInterval(rainbowInterval);
                rainbowInterval = null;
                rainbowCheckbox.checked = false;
            }
            menu.style.backgroundColor = colorPicker.value + 'e6';
        });
        
        // Rainbow checkbox event
        rainbowCheckbox.addEventListener('change', () => {
            if (rainbowCheckbox.checked) {
                rainbowInterval = setInterval(() => {
                    hue = (hue + 1) % 360;
                    menu.style.backgroundColor = `hsla(${hue}, 80%, 50%, 0.9)`;
                }, 50);
            } else if (rainbowInterval) {
                clearInterval(rainbowInterval);
                rainbowInterval = null;
                menu.style.backgroundColor = colorPicker.value + 'e6';
            }
        });

        document.body.appendChild(menu);
    };
// Function to create the Monster Brawl menu
const createMonsterBrawlMenu = () => {
    modePopup.remove();
    
    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.top = '10px';
    menu.style.right = '10px';
    menu.style.zIndex = '9999';
    menu.style.backgroundColor = 'rgba(40, 40, 50, 0.9)';
    menu.style.borderRadius = '10px';
    menu.style.padding = '10px';
    menu.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    menu.style.color = 'white';
    menu.style.fontFamily = 'Arial, sans-serif';
    menu.style.cursor = 'move';
    menu.style.userSelect = 'none';
    menu.style.resize = 'both';
    menu.style.overflow = 'auto';
    menu.style.width = '350px';
    menu.style.height = '450px';
    menu.style.maxHeight = '80vh';
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    
    // Set as current menu
    currentMenu = menu;
    
    // Make menu draggable (same as other menus)
    let isDragging = false;
    let offsetX, offsetY;
    
    menu.addEventListener('mousedown', (e) => {
        if (e.target === menu || e.target.tagName === 'H3') {
            isDragging = true;
            offsetX = e.clientX - menu.getBoundingClientRect().left;
            offsetY = e.clientY - menu.getBoundingClientRect().top;
            menu.style.cursor = 'grabbing';
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        menu.style.left = (e.clientX - offsetX) + 'px';
        menu.style.top = (e.clientY - offsetY) + 'px';
        menu.style.right = 'unset';
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        menu.style.cursor = 'move';
    });

    // Add resize handles (same as other menus)
    const createResizeHandle = (position) => {
        const resizeHandle = document.createElement('div');
        resizeHandle.style.position = 'fixed';
        resizeHandle.style.width = '20px';
        resizeHandle.style.height = '20px';
        resizeHandle.style.cursor = position.includes('right') ? 
            (position.includes('bottom') ? 'nwse-resize' : 'nesw-resize') :
            (position.includes('bottom') ? 'nesw-resize' : 'nwse-resize');
        
        if (position.includes('right')) resizeHandle.style.right = '0';
        else resizeHandle.style.left = '0';
        if (position.includes('bottom')) resizeHandle.style.bottom = '0';
        else resizeHandle.style.top = '0';

        resizeHandle.style.backgroundColor = 'rgba(255,255,255,0.3)';
        resizeHandle.style.borderRadius = position.includes('right') ? 
            (position.includes('bottom') ? '0 0 5px 0' : '0 5px 0 0') :
            (position.includes('bottom') ? '0 0 0 5px' : '5px 0 0 0');
        
        let isResizing = false;
        let startX, startY, startWidth, startHeight, startTop, startLeft;
        
        resizeHandle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(menu).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(menu).height, 10);
            startTop = parseInt(document.defaultView.getComputedStyle(menu).top, 10);
            startLeft = parseInt(document.defaultView.getComputedStyle(menu).left, 10);
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            if (position.includes('right')) {
                menu.style.width = (startWidth + deltaX) + 'px';
            } else {
                menu.style.width = (startWidth - deltaX) + 'px';
                menu.style.left = (startLeft + deltaX) + 'px';
            }

            if (position.includes('bottom')) {
                menu.style.height = (startHeight + deltaY) + 'px';
            } else {
                menu.style.height = (startHeight - deltaY) + 'px';
                menu.style.top = (startTop + deltaY) + 'px';
            }
            
            const buttons = menu.querySelectorAll('button');
            buttons.forEach(btn => {
                btn.style.width = '100%';
                btn.style.padding = `${Math.max(6, parseInt(menu.style.height, 10)/30)}px`;
            });
        });
        
        document.addEventListener('mouseup', () => {
            isResizing = false;
        });
        
        return resizeHandle;
    };
    
    // Create a container for resize handles
    const resizeContainer = document.createElement('div');
    resizeContainer.style.position = 'sticky';
    resizeContainer.style.bottom = '0';
    resizeContainer.style.width = '100%';
    resizeContainer.style.height = '20px';
    resizeContainer.style.zIndex = '10000';
    
    // Add all 4 resize handles
    resizeContainer.appendChild(createResizeHandle('top-left'));
    resizeContainer.appendChild(createResizeHandle('top-right'));
    resizeContainer.appendChild(createResizeHandle('bottom-left'));
    resizeContainer.appendChild(createResizeHandle('bottom-right'));
    menu.appendChild(resizeContainer);
    
    // Menu title
    const title = document.createElement('h3');
    title.textContent = 'Monster Brawl Cheats (Press K to hide/show)';
    title.style.margin = '0 0 10px 0';
    title.style.textAlign = 'center';
    title.style.color = '#795548';
    menu.appendChild(title);

    // Set up fetch interception
    let iframe = document.querySelector("iframe");
    if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.append(iframe);
    }

    if (window.fetch && window.fetch.call.toString() === 'function call() { [native code] }') {
        const call = window.fetch.call;
        window.fetch.call = function () {
            if (!arguments[1] || !arguments[1].includes("s.blooket.com/rc")) {
                return call.apply(this, arguments);
            }
        };
    }

    // Add "Game" divider at the top
    const gameDividerContainer = document.createElement('div');
    gameDividerContainer.style.display = 'flex';
    gameDividerContainer.style.alignItems = 'center';
    gameDividerContainer.style.margin = '10px 0';
    
    const gameDivider = document.createElement('hr');
    gameDivider.style.flex = '1';
    gameDivider.style.border = '1px solid #555';
    gameDivider.style.margin = '0 5px';
    
    const gameLabel = document.createElement('span');
    gameLabel.textContent = 'Game';
    gameLabel.style.color = '#aaa';
    gameLabel.style.fontSize = '12px';
    gameLabel.style.fontWeight = 'bold';
    
    gameDividerContainer.appendChild(gameDivider);
    gameDividerContainer.appendChild(gameLabel);
    gameDividerContainer.appendChild(gameDivider.cloneNode());
    
    menu.appendChild(gameDividerContainer);

    // Auto Answer cheat (same as other menus)
    const autoAnswerCheat = {
        name: 'Auto Answer',
        active: false,
        interval: null,
        func: () => {
            const cheat = (async () => {
                const { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner;
                const Question = stateNode.state.question || stateNode.props.client.question;
                if (stateNode.state.question.qType != "typing") {
                    if (stateNode.state.stage != "feedback" && !stateNode.state.feedback) {
                        let ind;
                        for (ind = 0; ind < Question.answers.length; ind++) {
                            let found = false;
                            for (let j = 0; j < Question.correctAnswers.length; j++)
                                if (Question.answers[ind] == Question.correctAnswers[j]) {
                                    found = true;
                                    break;
                                }
                            if (found) break;
                        }
                        document.querySelectorAll("[class*='answerContainer']")[ind]?.click();
                    } else document.querySelector("[class*='feedback'], [id*='feedback']")?.firstChild?.click();
                } else Object.values(document.querySelector("[class*='typingAnswerWrapper']"))[1].children._owner.stateNode.sendAnswer?.(Question.answers[0]);
            });
            cheat();
        }
    };

    // Create Auto Answer button
    const autoAnswerBtn = document.createElement('button');
    autoAnswerBtn.textContent = autoAnswerCheat.name;
    autoAnswerBtn.style.display = 'block';
    autoAnswerBtn.style.width = '100%';
    autoAnswerBtn.style.padding = '8px';
    autoAnswerBtn.style.margin = '5px 0';
    autoAnswerBtn.style.borderRadius = '5px';
    autoAnswerBtn.style.border = 'none';
    autoAnswerBtn.style.cursor = 'pointer';
    autoAnswerBtn.style.backgroundColor = '#795548';
    autoAnswerBtn.style.color = 'white';
    autoAnswerBtn.style.fontWeight = 'bold';
    autoAnswerBtn.style.transition = 'all 0.3s';
    
    autoAnswerBtn.onmouseover = () => autoAnswerBtn.style.backgroundColor = '#5D4037';
    autoAnswerBtn.onmouseout = () => autoAnswerBtn.style.backgroundColor = autoAnswerCheat.active ? '#5D4037' : '#795548';
    
    autoAnswerBtn.onclick = () => {
        if (autoAnswerCheat.active && autoAnswerCheat.interval) {
            clearInterval(autoAnswerCheat.interval);
            autoAnswerCheat.active = false;
            autoAnswerBtn.style.backgroundColor = '#795548';
        } else {
            autoAnswerCheat.interval = setInterval(autoAnswerCheat.func, 500);
            autoAnswerCheat.active = true;
            autoAnswerBtn.style.backgroundColor = '#5D4037';
        }
    };
    
    menu.appendChild(autoAnswerBtn);

    // Monster Brawl specific cheats
    const monsterBrawlCheats = {
        doubleEnemyXP: {
            name: 'Double Enemy XP',
            func: () => {
                const colliders = Object.values((function react(r = document.querySelector("body>div")) { 
                    return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                })())[1].children[0]._owner.stateNode.game.current.config.sceneConfig.physics.world.colliders._active.filter(x => x.callbackContext?.toString?.()?.includes?.('dmgCd'));
                for (let i = 0; i < colliders.length; i++) {
                    const enemies = colliders[i].object2;
                    let _start = enemies.classType.prototype.start;
                    enemies.classType.prototype.start = function () { _start.apply(this, arguments); this.val *= 2; };
                    enemies.children.entries.forEach(e => e.val *= 2);
                }
            }
        },
        halfEnemySpeed: {
            name: 'Half Enemy Speed',
            func: () => {
                const colliders = Object.values((function react(r = document.querySelector("body>div")) { 
                    return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                })())[1].children[0]._owner.stateNode.game.current.config.sceneConfig.physics.world.colliders._active.filter(x => x.callbackContext?.toString?.()?.includes?.('dmgCd'));
                for (let i = 0; i < colliders.length; i++) {
                    const enemies = colliders[i].object2;
                    let _start = enemies.classType.prototype.start;
                    enemies.classType.prototype.start = function () { _start.apply(this, arguments); this.speed *= 0.5; };
                    enemies.children.entries.forEach(e => e.speed *= 0.5);
                }
            }
        },
        instantKill: {
            name: 'Instant Kill',
            func: () => {
                const colliders = Object.values((function react(r = document.querySelector("body>div")) { 
                    return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                })())[1].children[0]._owner.stateNode.game.current.config.sceneConfig.physics.world.colliders._active.filter(x => x.callbackContext?.toString?.()?.includes?.('dmgCd'));
                for (let i = 0; i < colliders.length; i++) {
                    const enemies = colliders[i].object2;
                    let _start = enemies.classType.prototype.start;
                    enemies.classType.prototype.start = function () { _start.apply(this, arguments); this.hp = 1; };
                    enemies.children.entries.forEach(e => e.hp = 1);
                }
            }
        },
        invincibility: {
            name: 'Invincibility',
            func: () => {
                for (const collider of Object.values((function react(r = document.querySelector("body>div")) { 
                    return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                })())[1].children[0]._owner.stateNode.game.current.config.sceneConfig.physics.world.colliders._active.filter(x => x.callbackContext?.toString().includes('invulnerableTime') || x.callbackContext?.toString().includes('dmgCd'))) {
                    collider.collideCallback = () => { };
                }
            }
        },
        killEnemies: {
            name: 'Kill Enemies',
            func: () => {
                Object.values((function react(r = document.querySelector("body>div")) { 
                    return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                })())[1].children[0]._owner.stateNode.game.current.config.sceneConfig.physics.world.bodies.entries.forEach(x => x?.gameObject?.receiveDamage?.(x.gameObject.hp, 1));
            }
        },
        magnet: {
            name: 'Magnet',
            func: () => {
                Object.values((function react(r = document.querySelector("body>div")) { 
                    return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                })())[1].children[0]._owner.stateNode.game.current.config.sceneConfig.physics.world.colliders._active.find(x => x.collideCallback?.toString().includes('magnetTime')).collideCallback({ active: true }, { active: true, setActive() { }, setVisible() { } });
            }
        },
        maxAbilities: {
            name: 'Max Abilities',
            func: () => {
                const { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
                    return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                })())[1].children[0]._owner;
                for (const [ability, level] of Object.entries(stateNode.state.abilities)) {
                    for (let i = 0; i < (10 - level); i++) {
                        stateNode.game.current.config.sceneConfig.game.events.emit("level up", ability, stateNode.state.abilities[ability]++);
                    }
                }
                stateNode.setState({
                    level: stateNode.game.current.config.sceneConfig.level = [1, 3, 5, 10, 15, 25, 35].sort((a, b) => Math.abs(a - stateNode.state.level) - Math.abs(b - stateNode.state.level))[0] - 1
                });
            }
        },
        nextLevel: {
            name: 'Next Level',
            func: () => {
                let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
                    return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                })())[1].children[0]._owner;
                let { object1: player, object2: xp } = stateNode.game.current.config.sceneConfig.physics.world.colliders._active.find(x => x.collideCallback?.toString().includes('emit("xp'));
                xp.get().spawn(player.x, player.y, ((e) => 1 === e ? 1 : e < 5 ? 5 : e < 10 ? 10 : e < 20 ? 20 : e < 30 ? 30 : e < 40 ? 40 : e < 50 ? 50 : 100)(stateNode.state.level) - stateNode.xp);
            }
        },
        removeObstacles: {
            name: 'Remove Obstacles',
            func: () => {
                Object.values((function react(r = document.querySelector("body>div")) { 
                    return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                })())[1].children[0]._owner.stateNode.game.current.config.sceneConfig.physics.world.bodies.entries.forEach(body => { 
                    try { 
                        if (body.gameObject.frame.texture.key.includes("obstacle")) {
                            body.gameObject.destroy(); 
                        } 
                    } catch { } 
                });
            }
        },
        resetHealth: {
            name: 'Reset Health',
            func: () => {
                Object.values((function react(r = document.querySelector("body>div")) { 
                    return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")); 
                })())[1].children[0]._owner.stateNode.game.current.events._events.respawn.fn();
            }
        }
    };

    // Create buttons for each Monster Brawl cheat
    Object.keys(monsterBrawlCheats).forEach(key => {
        const cheat = monsterBrawlCheats[key];
        const btn = document.createElement('button');
        btn.textContent = cheat.name;
        btn.style.display = 'block';
        btn.style.width = '100%';
        btn.style.padding = '8px';
        btn.style.margin = '5px 0';
        btn.style.borderRadius = '5px';
        btn.style.border = 'none';
        btn.style.cursor = 'pointer';
        btn.style.backgroundColor = '#795548';
        btn.style.color = 'white';
        btn.style.fontWeight = 'bold';
        btn.style.transition = 'all 0.3s';
        
        btn.onmouseover = () => btn.style.backgroundColor = '#5D4037';
        btn.onmouseout = () => btn.style.backgroundColor = '#795548';
        
        btn.onclick = () => {
            cheat.func();
        };
        
        menu.appendChild(btn);
    });

    // Add "Other" divider and the rest of the common menu items (All Answers Correct, Custom Name, etc.)
    // ... (same as other menus)
    
    // Add "Other" divider
    const otherDividerContainer = document.createElement('div');
    otherDividerContainer.style.display = 'flex';
    otherDividerContainer.style.alignItems = 'center';
    otherDividerContainer.style.margin = '10px 0';
    
    const otherDivider = document.createElement('hr');
    otherDivider.style.flex = '1';
    otherDivider.style.border = '1px solid #555';
    otherDivider.style.margin = '0 5px';
    
    const otherLabel = document.createElement('span');
    otherLabel.textContent = 'Other';
    otherLabel.style.color = '#aaa';
    otherLabel.style.fontSize = '12px';
    otherLabel.style.fontWeight = 'bold';
    
    otherDividerContainer.appendChild(otherDivider);
    otherDividerContainer.appendChild(otherLabel);
    otherDividerContainer.appendChild(otherDivider.cloneNode());
    
    menu.appendChild(otherDividerContainer);

    // Add "All Answers Correct" button (now with looping)
    const allAnswersCorrectBtn = document.createElement('button');
    allAnswersCorrectBtn.textContent = 'All Answers Correct (Global)';
    allAnswersCorrectBtn.style.display = 'block';
    allAnswersCorrectBtn.style.width = '100%';
    allAnswersCorrectBtn.style.padding = '8px';
    allAnswersCorrectBtn.style.margin = '5px 0';
    allAnswersCorrectBtn.style.borderRadius = '5px';
    allAnswersCorrectBtn.style.border = 'none';
    allAnswersCorrectBtn.style.cursor = 'pointer';
    allAnswersCorrectBtn.style.backgroundColor = '#4CAF50';
    allAnswersCorrectBtn.style.color = 'white';
    allAnswersCorrectBtn.style.fontWeight = 'bold';
    allAnswersCorrectBtn.style.transition = 'all 0.3s';
    
    let allAnswersInterval = null;
    
    allAnswersCorrectBtn.onmouseover = () => allAnswersCorrectBtn.style.backgroundColor = '#388E3C';
    allAnswersCorrectBtn.onmouseout = () => allAnswersCorrectBtn.style.backgroundColor = allAnswersInterval ? '#388E3C' : '#4CAF50';
    
    allAnswersCorrectBtn.onclick = () => {
        if (allAnswersInterval) {
            clearInterval(allAnswersInterval);
            allAnswersInterval = null;
            allAnswersCorrectBtn.style.backgroundColor = '#4CAF50';
            return;
        }
        
        const updateAllAnswers = () => {
            const stateNode = getStateNode();
            
            // Modify local questions
            for (let i = 0; i < stateNode.freeQuestions.length; i++) {
                stateNode.freeQuestions[i].correctAnswers = [...stateNode.freeQuestions[i].answers];
                stateNode.questions[i].correctAnswers = [...stateNode.questions[i].answers];
                stateNode.props.client.questions[i].correctAnswers = [...stateNode.questions[i].answers];
            }

            // Force update for all players via Firebase
            if (stateNode.props.liveGameController) {
                stateNode.props.liveGameController.setVal({
                    path: 'questions',
                    val: stateNode.questions.map(q => ({
                        ...q,
                        correctAnswers: [...q.answers]
                    }))
                });
            }

            try {
                stateNode.forceUpdate();
            } catch {}
        };
        
        updateAllAnswers(); // Run immediately
        allAnswersInterval = setInterval(updateAllAnswers, 3000); // Then every 3 seconds
        allAnswersCorrectBtn.style.backgroundColor = '#388E3C';
    };
    
    menu.appendChild(allAnswersCorrectBtn);

    // Add "Custom Name (Ignore Random name)" button
    const customNameBtn = document.createElement('button');
    customNameBtn.textContent = 'Custom Name (Ignore Random name)';
    customNameBtn.style.display = 'block';
    customNameBtn.style.width = '100%';
    customNameBtn.style.padding = '8px';
    customNameBtn.style.margin = '5px 0';
    customNameBtn.style.borderRadius = '5px';
    customNameBtn.style.border = 'none';
    customNameBtn.style.cursor = 'pointer';
    customNameBtn.style.backgroundColor = '#4CAF50';
    customNameBtn.style.color = 'white';
    customNameBtn.style.fontWeight = 'bold';
    customNameBtn.style.transition = 'all 0.3s';
    
    customNameBtn.onmouseover = () => customNameBtn.style.backgroundColor = '#388E3C';
    customNameBtn.onmouseout = () => customNameBtn.style.backgroundColor = '#4CAF50';
    
    customNameBtn.onclick = () => {
        getStateNode().setState({ isRandom: false, client: { name: "" } });
        document.querySelector('[class*="nameInput"]')?.focus?.();
    };
    
    menu.appendChild(customNameBtn);

    // Add "Lobby" divider
    const lobbyDividerContainer = document.createElement('div');
    lobbyDividerContainer.style.display = 'flex';
    lobbyDividerContainer.style.alignItems = 'center';
    lobbyDividerContainer.style.margin = '10px 0';
    
    const lobbyDivider = document.createElement('hr');
    lobbyDivider.style.flex = '1';
    lobbyDivider.style.border = '1px solid #555';
    lobbyDivider.style.margin = '0 5px';
    
    const lobbyLabel = document.createElement('span');
    lobbyLabel.textContent = 'Lobby';
    lobbyLabel.style.color = '#aaa';
    lobbyLabel.style.fontSize = '12px';
    lobbyLabel.style.fontWeight = 'bold';
    
    lobbyDividerContainer.appendChild(lobbyDivider);
    lobbyDividerContainer.appendChild(lobbyLabel);
    lobbyDividerContainer.appendChild(lobbyDivider.cloneNode());
    
    menu.appendChild(lobbyDividerContainer);

    // Add special cheats in new order with Change Blook first
    const specialCheats = [
        {
            name: 'Change Blook',
            func: () => {
                let i = document.createElement('iframe');
                document.body.append(i);
                window.prompt = i.contentWindow.prompt.bind(window);
                i.remove();
                let { props } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner.stateNode;
                props.liveGameController.setVal({ path: `c/${props.client.name}/b`, val: (props.client.blook = prompt("Blook Name: (Case Sensitive)")) });
            }
        },
        {
            name: 'Use Any Blook',
            func: () => {
                let i = document.createElement('iframe');
                document.body.append(i);
                window.alert = i.contentWindow.alert.bind(window);
                i.remove();
                let blooks;
                const { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner;
                const lobby = window.location.pathname.startsWith("/play/lobby"),
                    dashboard = !lobby && window.location.pathname.startsWith("/blooks");
                if (dashboard || lobby) {
                    let blooks, key = lobby ? "keys" : "entries";
                    const old = Object[key];
                    Object[key] = function (obj) {
                        if (!obj.Chick) return old.call(this, obj);
                        blooks = obj;
                        return (Object[key] = old).call(this, obj);
                    };
                    stateNode.render();
                    if (lobby) stateNode.setState({ unlocks: Object.keys(blooks) });
                    else stateNode.setState({ blookData: Object.keys(blooks).reduce((a, b) => (a[b] = (stateNode.state.blookData[b] || 1), a), {}), allSets: Object.values(blooks).reduce((a, b) => (b.set && a.includes(b.set) ? a : a.concat(b.set)), []) });
                } else alert("This only works in lobbies or the dashboard blooks page.");
            }
        },
        {
            name: 'Set Flappy Score',
            func: () => {
                let i = document.createElement('iframe');
                document.body.append(i);
                window.prompt = i.contentWindow.prompt.bind(window);
                i.remove();
                Object.values(document.querySelector("#phaser-bouncy"))[0].return.updateQueue.lastEffect.deps[1](parseInt(prompt("What do you want to set your score to?")) || 0);
            }
        },
        {
            name: 'Toggle Ghost Mode',
            func: () => {
                Object.values(document.querySelector("#phaser-bouncy"))[0].return.updateQueue.lastEffect.deps[0].current.config.sceneConfig.physics.world.bodies.entries.forEach(x => {
                    if (!x.gameObject.frame.texture.key.startsWith("blook")) return;
                    x.checkCollision.none = x.gameObject.alpha == 1;
                    x.gameObject.setAlpha(x.gameObject.alpha == 1 ? 0.5 : 1);
                });
            }
        }
    ];

    // Create buttons for special cheats
    specialCheats.forEach(cheat => {
        const btn = document.createElement('button');
        btn.textContent = cheat.name;
        btn.style.display = 'block';
        btn.style.width = '100%';
        btn.style.padding = '8px';
        btn.style.margin = '5px 0';
        btn.style.borderRadius = '5px';
        btn.style.border = 'none';
        btn.style.cursor = 'pointer';
        btn.style.backgroundColor = '#607D8B';
        btn.style.color = 'white';
        btn.style.fontWeight = 'bold';
        btn.style.transition = 'all 0.3s';
        
        btn.onmouseover = () => btn.style.backgroundColor = '#455A64';
        btn.onmouseout = () => btn.style.backgroundColor = '#607D8B';
        
        btn.onclick = () => {
            cheat.func();
        };
        
        menu.appendChild(btn);
    });

    // Add divider with "Menu Settings" label
    const settingsDividerContainer = document.createElement('div');
    settingsDividerContainer.style.display = 'flex';
    settingsDividerContainer.style.alignItems = 'center';
    settingsDividerContainer.style.margin = '10px 0';
    
    const settingsDivider = document.createElement('hr');
    settingsDivider.style.flex = '1';
    settingsDivider.style.border = '1px solid #555';
    settingsDivider.style.margin = '0 5px';
    
    const settingsLabel = document.createElement('span');
    settingsLabel.textContent = 'Menu Settings';
    settingsLabel.style.color = '#aaa';
    settingsLabel.style.fontSize = '12px';
    settingsLabel.style.fontWeight = 'bold';
    
    settingsDividerContainer.appendChild(settingsDivider);
    settingsDividerContainer.appendChild(settingsLabel);
    settingsDividerContainer.appendChild(settingsDivider.cloneNode());
    
    menu.appendChild(settingsDividerContainer);

    // Add color picker and rainbow toggle with better visibility
    const colorPickerContainer = document.createElement('div');
    colorPickerContainer.style.margin = '10px 0';
    colorPickerContainer.style.display = 'flex';
    colorPickerContainer.style.alignItems = 'center';
    colorPickerContainer.style.justifyContent = 'space-between';
    
    const colorLabel = document.createElement('span');
    colorLabel.textContent = 'Menu Color:';
    colorLabel.style.marginRight = '10px';
    colorLabel.style.fontSize = '14px';
    colorLabel.style.color = '#fff';
    
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = '#282832';
    colorPicker.style.width = '30px';
    colorPicker.style.height = '30px';
    colorPicker.style.cursor = 'pointer';
    colorPicker.style.border = 'none';
    colorPicker.style.backgroundColor = 'transparent';
    
    const rainbowLabel = document.createElement('label');
    rainbowLabel.style.display = 'flex';
    rainbowLabel.style.alignItems = 'center';
    rainbowLabel.style.cursor = 'pointer';
    rainbowLabel.style.marginLeft = '10px';
    
    const rainbowCheckbox = document.createElement('input');
    rainbowCheckbox.type = 'checkbox';
    rainbowCheckbox.style.marginRight = '5px';
    
    const rainbowText = document.createElement('span');
    rainbowText.textContent = 'Rainbow';
    rainbowText.style.fontSize = '14px';
    rainbowText.style.color = '#fff';
    
    rainbowLabel.appendChild(rainbowCheckbox);
    rainbowLabel.appendChild(rainbowText);
    
    colorPickerContainer.appendChild(colorLabel);
    colorPickerContainer.appendChild(colorPicker);
    colorPickerContainer.appendChild(rainbowLabel);
    
    menu.appendChild(colorPickerContainer);

    // Add reset resize button
    const resetResizeBtn = document.createElement('button');
    resetResizeBtn.textContent = 'Reset Size';
    resetResizeBtn.style.display = 'block';
    resetResizeBtn.style.width = '100%';
    resetResizeBtn.style.padding = '8px';
    resetResizeBtn.style.margin = '5px 0';
    resetResizeBtn.style.borderRadius = '5px';
    resetResizeBtn.style.border = 'none';
    resetResizeBtn.style.cursor = 'pointer';
    resetResizeBtn.style.backgroundColor = '#607D8B';
    resetResizeBtn.style.color = 'white';
    resetResizeBtn.style.fontWeight = 'bold';
    resetResizeBtn.style.transition = 'all 0.3s';
    
    resetResizeBtn.onmouseover = () => resetResizeBtn.style.backgroundColor = '#455A64';
    resetResizeBtn.onmouseout = () => resetResizeBtn.style.backgroundColor = '#607D8B';
    
    resetResizeBtn.onclick = () => {
        menu.style.width = '350px';
        menu.style.height = '450px';
        menu.style.left = '';
        menu.style.right = '10px';
        menu.style.top = '10px';
        menu.style.transform = '';
    };
    
    menu.appendChild(resetResizeBtn);
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close Menu';
    closeBtn.style.display = 'block';
    closeBtn.style.width = '100%';
    closeBtn.style.padding = '8px';
    closeBtn.style.margin = '5px 0';
    closeBtn.style.borderRadius = '5px';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.backgroundColor = '#f44336';
    closeBtn.style.color = 'white';
    closeBtn.style.fontWeight = 'bold';
    
    closeBtn.onmouseover = () => closeBtn.style.backgroundColor = '#d32f2f';
    closeBtn.onmouseout = () => closeBtn.style.backgroundColor = '#f44336';
    
    closeBtn.onclick = () => {
        if (rainbowInterval) clearInterval(rainbowInterval);
        if (allAnswersInterval) clearInterval(allAnswersInterval);
        menu.remove();
    };
    
    menu.appendChild(closeBtn);
    
    // Rainbow animation variables
    let rainbowInterval = null;
    let hue = 0;
    
    // Color picker event
    colorPicker.addEventListener('input', () => {
        if (rainbowInterval) {
            clearInterval(rainbowInterval);
            rainbowInterval = null;
            rainbowCheckbox.checked = false;
        }
        menu.style.backgroundColor = colorPicker.value + 'e6';
    });
    
    // Rainbow checkbox event
    rainbowCheckbox.addEventListener('change', () => {
        if (rainbowCheckbox.checked) {
            rainbowInterval = setInterval(() => {
                hue = (hue + 1) % 360;
                menu.style.backgroundColor = `hsla(${hue}, 80%, 50%, 0.9)`;
            }, 50);
        } else if (rainbowInterval) {
            clearInterval(rainbowInterval);
            rainbowInterval = null;
            menu.style.backgroundColor = colorPicker.value + 'e6';
        }
    });

    document.body.appendChild(menu);
};
    // Set up button event listeners
    fishingBtn.onclick = createFishingMenu;
    cryptoBtn.onclick = createCryptoMenu;
    monsterBrawlBtn.onclick = createMonsterBrawlMenu;
    td2Btn.onclick = () => { modePopup.remove(); createTD2menu(); };
    battleRoyaleBtn.onclick = () => { modePopup.remove(); createBattleRoyaleMenu(); };

    modePopup.appendChild(fishingBtn);
    modePopup.appendChild(cryptoBtn);
    modePopup.appendChild(td2Btn);
    modePopup.appendChild(battleRoyaleBtn);
    modePopup.appendChild(monsterBrawlBtn);
    document.body.appendChild(modePopup);
})();




