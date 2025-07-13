export default function getRandomColorClass() {
	const colors = ["navy", "pink", "red", "blue", "green"]
	const randomIndex = Math.floor(Math.random() * colors.length)
	return colors[randomIndex]
}
