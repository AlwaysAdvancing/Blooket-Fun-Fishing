(() => {
    // Function to execute the main logic
    const executeCheat = () => {
        let iframe = document.querySelector("iframe");
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.style.display = "none";
            document.body.append(iframe);
        }
        /* By AlwaysAdvancing on Github */
        if (window.fetch.call.toString() == 'function call() { [native code] }') {
            const call = window.fetch.call;
            window.fetch.call = function () {
                if (!arguments[1].includes("s.blooket.com/rc")) return call.apply(this, arguments);
            }
        }
        
        // Run cheat
        const cheat = (async () => {
            let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
                return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
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
        });
        
        cheat(); // Execute
        
        // Optional: Still check for updates in background
        let img = new Image;
        img.src = "https://raw.githubusercontent.com/Blooket-Council/Blooket-Cheats/main/autoupdate/timestamps/fishing/frenzy.png?" + Date.now();
        img.crossOrigin = "Anonymous";
    };

    // Execute immediately
    executeCheat();
    

    setInterval(executeCheat, 1000);
})();
