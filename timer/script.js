document.addEventListener("DOMContentLoaded", async function() {
    let timer;
    let timeLeft = 25 * 60; // 25 minutes
    let isRunning = false;
    let isBreak = false;
    let sessionCount = localStorage.getItem("sessionCount") ? parseInt(localStorage.getItem("sessionCount")) : 0;
    const timerDisplay = document.getElementById("timer");
    const startButton = document.getElementById("start");
    const pauseButton = document.getElementById("pause");
    const resetButton = document.getElementById("reset");
    const sessionCountDisplay = document.getElementById("session-count");
    const alarm = document.getElementById("alarm");

    sessionCountDisplay.textContent = sessionCount;

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    isRunning = false;
                    alarm.play();
                    if (!isBreak) {
                        sessionCount++;
                        localStorage.setItem("sessionCount", sessionCount);
                        sessionCountDisplay.textContent = sessionCount;
                        timeLeft = 5 * 60; // 5-minute break
                        isBreak = true;
                    } else {
                        timeLeft = 25 * 60; // 25-minute work session
                        isBreak = false;
                    }
                    updateDisplay();
                    startTimer();
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        clearInterval(timer);
        isRunning = false;
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        timeLeft = 25 * 60;
        isBreak = false;
        sessionCount = 0;
        localStorage.setItem("sessionCount", sessionCount);
        sessionCountDisplay.textContent = sessionCount;
        updateDisplay();
    }

    startButton.addEventListener("click", startTimer);
    pauseButton.addEventListener("click", pauseTimer);
    resetButton.addEventListener("click", resetTimer);

    updateDisplay();
});