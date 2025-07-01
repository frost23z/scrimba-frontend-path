/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const inputEl = document.getElementById("input-value")
const convertBtn = document.getElementById("convert-btn")
const lengthEl = document.getElementById("length-conversion")
const volumeEl = document.getElementById("volume-conversion")
const massEl = document.getElementById("mass-conversion")

updateConversions()

convertBtn.addEventListener("click", updateConversions)

function updateConversions() {
	const value = parseFloat(inputEl.value)

	if (Number.isNaN(value)) {
		return
	}

	// Length conversion: meters to feet and feet to meters
	const metersToFeet = (value * 3.281).toFixed(3)
	const feetToMeters = (value / 3.281).toFixed(3)
	lengthEl.textContent = `${value} meters = ${metersToFeet} feet | ${value} feet = ${feetToMeters} meters`

	// Volume conversion: liters to gallons and gallons to liters
	const litersToGallons = (value * 0.264).toFixed(3)
	const gallonsToLiters = (value / 0.264).toFixed(3)
	volumeEl.textContent = `${value} liters = ${litersToGallons} gallons | ${value} gallons = ${gallonsToLiters} liters`

	// Mass conversion: kilos to pounds and pounds to kilos
	const kilosToPounds = (value * 2.204).toFixed(3)
	const poundsToKilos = (value / 2.204).toFixed(3)
	massEl.textContent = `${value} kilos = ${kilosToPounds} pounds | ${value} pounds = ${poundsToKilos} kilos`
}
