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
    const timeProcessed = 1730769906975;
    let latestProcess = -1;
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
    
    // Remove the image loading and update checking logic
    // Set up the interval to run the cheat every 0.5 seconds
    setInterval(cheat, 500);
})();
