let countdown;
let promptTimer;
const countdownDisplay = document.querySelector(".countdown-display");
const promptDisplay = document.querySelector(".prompt-display");
const promptContainer = document.querySelector(".prompt-container");
const promptCountdownDisplay = document.querySelectorAll(".prompt-container, .countdown-display, .visualiser-container");
const start = document.querySelector(".start-btn");
const visualiserContainer = document.querySelector(".visualiser-container");
const visualiserSVG = document.querySelector(".visualiser");
promptCountdownDisplay.forEach(elem => clear(elem))

start.addEventListener('click', async () => {
    await fadeOut(start);
    await promptCountdownDisplay.forEach(elem => fadeIn(elem));
    await timer(60000);
    await promptCountdownDisplay.forEach(elem => fadeOut(elem));
    await fadeIn(start);
    await clear(promptContainer);
})

function timer(duration) {
    return new Promise((resolve, reject) => {
        clearInterval(countdown);
        prompt();
        visualiserSVG.classList.add("visualiser-animation");

        const end = Date.now() + duration;
        displayTimeRemaining(duration / 1000);

        countdown = setInterval(() => {
            const timeLeft = Math.round((end - Date.now()) / 1000);

            if (timeLeft < 0) {
                visualiserSVG.classList.remove("visualiser-animation");
                clearInterval(promptTimer);
                clearInterval(countdown);
                resolve();
                return;
            }

            displayTimeRemaining(timeLeft);
        }, 1000);
    })
}

function displayTimeRemaining(duration) { 
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    countdownDisplay.innerHTML = `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
}

function fadeOut(elem) {
    return new Promise((resolve, reject) => {
        clearInterval(outTransition);
        elem.style.pointerEvents = "none";

        let opacity = 1;
        function outTransition () {
            if (opacity < 0.01) {
                clearInterval(outTransition);
                resolve();
                return;
            }
            elem.style.opacity = opacity;
            opacity -= opacity * 0.1;
            requestAnimationFrame(outTransition);
        }
        outTransition()
    })
}

function fadeIn(elem) {
    return new Promise((resolve, reject) => {
        clearInterval(inTransition);
        elem.style.pointerEvents = "auto";

        let opacity = 0.1;
        function inTransition () {
            if (opacity > 9.9) {
                clearInterval(inTransition);
                resolve();
                return;
            }
            elem.style.opacity = opacity;
            opacity += opacity * 0.1;
            requestAnimationFrame(inTransition);
        }
        inTransition()
    })
}

function prompt() {
    promptText = 'Breathe in'
    promptTransition(promptText);

    promptTimer = setInterval(() => {
        if (promptText === "Breathe in") {
            promptText = 'Breathe out';
        } else {
            promptText = 'Breathe in';
        }

        promptTransition(promptText);
    }, 5000)

}

function promptTransition(text) {
    fadeOut(promptContainer)
    promptDisplay.innerHTML = text;
    fadeIn(promptContainer);
}

function clear(elem) {
    elem.style.opacity = 0;
}

