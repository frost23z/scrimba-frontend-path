let homeScore = 0;
let guestScore = 0;
let period = 1;
let timer = 600; // seconds
let timerInterval = null;
let isPaused = false;

const homeScoreEl = document.getElementById("home-score");
const guestScoreEl = document.getElementById("guest-score");
const periodEl = document.getElementById("period");
const timerEl = document.getElementById("timer");
const startTimerBtn = document.getElementById("start-timer");
const resetTimerBtn = document.getElementById("reset-timer");
const nextPeriodBtn = document.getElementById("next-period");
const resetBtn = document.getElementById("reset");
const newGameBtn = document.getElementById("new-game");

function addHome1() { addHomeScore(1); }
function addHome2() { addHomeScore(2); }
function addHome3() { addHomeScore(3); }
function addGuest1() { addGuestScore(1); }
function addGuest2() { addGuestScore(2); }
function addGuest3() { addGuestScore(3); }

function addHomeScore(points) {
    homeScore += points;
    updateScores();
}

function addGuestScore(points) {
    guestScore += points;
    updateScores();
}

function updateScores() {
    homeScoreEl.textContent = homeScore;
    guestScoreEl.textContent = guestScore;
}

function updatePeriod() {
    periodEl.textContent = period;
}

function nextPeriod() {
    period++;
    resetScores();
    resetTimer();
    updatePeriod();
}

function resetScores() {
    homeScore = 0;
    guestScore = 0;
    updateScores();
}

function newGame() {
    resetScores(); // Reset scores instead of duplicating code
    period = 1;
    timer = 600;
    stopTimer();
    isPaused = false;
    updatePeriod(); // Ensure period display is set to 1
    updateTimer();
    startTimerBtn.textContent = "Start";
}

function toggleTimer() {
    // If timer is not running at all, start it
    if (!timerInterval) {
        startTimerBtn.textContent = "Pause";
        isPaused = false;
        timerInterval = setInterval(() => {
            if (!isPaused && timer > 0) {
                timer--;
                updateTimer();
            } else if (timer === 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                startTimerBtn.textContent = "Start";
            }
        }, 1000);
    } 
    // If timer is running, toggle between pause and resume
    else {
        isPaused = !isPaused;
        startTimerBtn.textContent = isPaused ? "Resume" : "Pause";
    }
}

function updateTimer() {
    let min = Math.floor(timer / 60);
    let sec = timer % 60;
    timerEl.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
}

function resetTimer() {
    timer = 600;
    updateTimer();
    stopTimer();
    isPaused = false;
    startTimerBtn.textContent = "Start";
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Initial UI update
updateScores();
updatePeriod();
updateTimer();

