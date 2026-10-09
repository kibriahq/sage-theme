// Countdown Timer Micro-Interaction
function initCountdown(timerSettings) {
    const targetDateTime = new Date(`${timerSettings.date} ${timerSettings.time}`);
    let secondsLeft = Math.floor((targetDateTime - new Date()) / 1000);

    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-mins');
    const secsEl = document.getElementById('timer-secs');

    setInterval(() => {
        if (secondsLeft > 0) {
            secondsLeft--;
            const d = Math.floor(secondsLeft / (24 * 3600));
            const h = Math.floor((secondsLeft % (24 * 3600)) / 3600);
            const m = Math.floor((secondsLeft % 3600) / 60);
            const s = secondsLeft % 60;

            if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
            if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
            if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
        }
    }, 1000);
};

window.initCountdown = initCountdown;