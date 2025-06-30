const uppercaseChars = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z"
]
const lowercaseChars = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z"
]
const numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const symbolChars = [
	"~",
	"`",
	"!",
	"@",
	"#",
	"$",
	"%",
	"^",
	"&",
	"*",
	"(",
	")",
	"_",
	"-",
	"+",
	"=",
	"{",
	"[",
	"}",
	"]",
	",",
	"|",
	":",
	";",
	"<",
	">",
	".",
	"?",
	"/"
]

const generateBtn = document.getElementById("generate-btn")
const passwordOneEl = document.getElementById("password-one")
const passwordTwoEl = document.getElementById("password-two")
const passwordLengthEl = document.getElementById("password-length")
const includeUppercaseEl = document.getElementById("include-uppercase")
const includeNumbersEl = document.getElementById("include-numbers")
const includeSymbolsEl = document.getElementById("include-symbols")
const copyMessageEl = document.getElementById("copy-message")

const DEFAULT_PASSWORD_LENGTH = 15

function getCharacterSet() {
	let charSet = lowercaseChars

	if (includeUppercaseEl.checked) {
		charSet = charSet.concat(uppercaseChars)
	}

	if (includeNumbersEl.checked) {
		charSet = charSet.concat(numberChars)
	}

	if (includeSymbolsEl.checked) {
		charSet = charSet.concat(symbolChars)
	}

	return charSet
}

function generateRandomPassword() {
	let password = ""
	const charSet = getCharacterSet()

	const passwordLength = parseInt(passwordLengthEl.value) || DEFAULT_PASSWORD_LENGTH

	for (let i = 0; i < passwordLength; i++) {
		const randomIndex = Math.floor(Math.random() * charSet.length)
		password += charSet[randomIndex]
	}

	return password
}

function generateNewPasswords() {
	const passwordOne = generateRandomPassword()
	const passwordTwo = generateRandomPassword()

	passwordOneEl.textContent = passwordOne
	passwordTwoEl.textContent = passwordTwo
}

function copyToClipboard(text) {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			// console.log('Text copied to clipboard: ', text);
			showCopyMessage()
		})
		.catch(err => {
			// console.error('Failed to copy text: ', err);
			alert("Failed to copy password to clipboard")
		})
}

function showCopyMessage() {
	copyMessageEl.classList.add("show")

	setTimeout(() => {
		copyMessageEl.classList.remove("show")
	}, 2000)
}

generateBtn.addEventListener("click", generateNewPasswords)

passwordOneEl.addEventListener("click", () => {
	if (passwordOneEl.textContent) {
		copyToClipboard(passwordOneEl.textContent)
	}
})

passwordTwoEl.addEventListener("click", () => {
	if (passwordTwoEl.textContent) {
		copyToClipboard(passwordTwoEl.textContent)
	}
})

generateNewPasswords()
