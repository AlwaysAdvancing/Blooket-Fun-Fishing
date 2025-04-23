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

    // Immediately set lure to 5 (maximum) without any prompts
    (async () => {
        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { 
            return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) 
        })())[1].children[0]._owner;
        stateNode.setState({ lure: 4 }); // 4 represents lure level 5 (since it's 0-indexed)
    })();

    // Remove the update checking completely since we don't need it
})();
