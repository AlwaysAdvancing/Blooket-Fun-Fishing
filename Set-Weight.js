(() => {
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

    const parseWeightInput = (input) => {
        input = (input || "0").trim().toUpperCase();
        const multiplier = {
            'K': 1000,
            'M': 1000000,
            'B': 1000000000,
            'T': 1000000000000000000
        }[input.slice(-1)] || 1;
        
        const numberPart = parseFloat(input.replace(/[^0-9.]/g, '')) || 0;
        return Math.round(numberPart * multiplier);
    };

    const cheat = (async () => {
        let i = document.createElement('iframe');
        document.body.append(i);
        window.prompt = i.contentWindow.prompt.bind(window);
        i.remove();
        
        const weight = parseWeightInput(
            prompt("How much weight would you like? (e.g., 500, 5K, 2.5M, 1B, 2T)")
        );

        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
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
    });

    // Execute immediately
    cheat();
})();
