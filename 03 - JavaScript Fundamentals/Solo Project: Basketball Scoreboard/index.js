let homeScore = 0
let guestScore = 0
let period = 1
const TIMER_DURATION = 600 // seconds (10 minutes)
let timer = TIMER_DURATION
let timerInterval = null
let isPaused = false

const homeScoreEl = document.getElementById("home-score")
const guestScoreEl = document.getElementById("guest-score")
const periodEl = document.getElementById("period")
const timerEl = document.getElementById("timer")
const startTimerBtn = document.getElementById("start-timer")

function handleButtonClick(event) {
	if (event.target.tagName !== "BUTTON") return

	const buttonId = event.target.id

	switch (buttonId) {
		case "home-add-1":
			addScore(1, "home")
			break
		case "home-add-2":
			addScore(2, "home")
			break
		case "home-add-3":
			addScore(3, "home")
			break
		case "guest-add-1":
			addScore(1, "guest")
			break
		case "guest-add-2":
			addScore(2, "guest")
			break
		case "guest-add-3":
			addScore(3, "guest")
			break
		case "start-timer":
			toggleTimer()
			break
		case "reset-timer":
			resetTimer()
			break
		case "next-period":
			nextPeriod()
			break
		case "reset":
			resetScores()
			break
		case "new-game":
			newGame()
			break
	}
}

const container = document.querySelector(".container")
container.addEventListener("click", handleButtonClick)

function addScore(points, board) {
	if (board === "home") {
		homeScore += points
	} else {
		guestScore += points
	}
	updateScores()
}

function updateScores() {
	homeScoreEl.textContent = homeScore
	guestScoreEl.textContent = guestScore
}

function updatePeriod() {
	periodEl.textContent = period
}

function nextPeriod() {
	period++
	resetScores()
	resetTimer()
	updatePeriod()
}

function resetScores() {
	homeScore = 0
	guestScore = 0
	updateScores()
}

function newGame() {
	resetScores()
	period = 1
	timer = TIMER_DURATION
	stopTimer()
	isPaused = false
	updatePeriod()
	updateTimer()
	startTimerBtn.textContent = "Start"
}

function toggleTimer() {
	if (!timerInterval) {
		startTimer()
	} else {
		isPaused = !isPaused
		startTimerBtn.textContent = isPaused ? "Resume" : "Pause"
	}
}

function startTimer() {
	startTimerBtn.textContent = "Pause"
	isPaused = false
	timerInterval = setInterval(() => {
		if (!isPaused && timer > 0) {
			timer--
			updateTimer()
		} else if (timer === 0) {
			stopTimer()
			startTimerBtn.textContent = "Start"
		}
	}, 1000)
}

function updateTimer() {
	const min = Math.floor(timer / 60)
	const sec = timer % 60
	timerEl.textContent = `${min}:${sec.toString().padStart(2, "0")}`
}

function resetTimer() {
	timer = TIMER_DURATION
	updateTimer()
	stopTimer()
	isPaused = false
	startTimerBtn.textContent = "Start"
}

function stopTimer() {
	if (timerInterval) {
		clearInterval(timerInterval)
		timerInterval = null
	}
}

// Initial UI update
updateScores()
updatePeriod()
updateTimer()
