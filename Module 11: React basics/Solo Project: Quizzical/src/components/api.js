export const fetchCategories = async () => {
	const response = await fetch("https://opentdb.com/api_category.php")
	const data = await response.json()

	if (!response.ok) {
		throw new Error("Failed to fetch categories")
	}

	return data.trivia_categories
}

export const fetchQuestions = async options => {
	const { amount = 5, category, difficulty, type } = options

	let url = `https://opentdb.com/api.php?amount=${amount}`

	if (category && category !== "any") {
		url += `&category=${category}`
	}

	if (difficulty && difficulty !== "any") {
		url += `&difficulty=${difficulty}`
	}

	if (type && type !== "any") {
		url += `&type=${type}`
	}

	const response = await fetch(url)
	const data = await response.json()

	if (!response.ok || data.response_code !== 0) {
		throw new Error("Failed to fetch questions")
	}

	return data.results
}
