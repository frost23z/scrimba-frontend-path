let count = 0
let savePrev = 0
const saveEl = document.getElementById("save-el")
const countEl = document.getElementById("count-el")

document.getElementById("increment-btn").addEventListener("click", () => {
	count += 1
	countEl.textContent = count
})

document.getElementById("save-btn").addEventListener("click", () => {
	const countStr = savePrev === 0 ? ` ${count}` : ` - ${count}`
	saveEl.textContent += countStr
	countEl.textContent = 0
	count = 0
	savePrev = 1
})
