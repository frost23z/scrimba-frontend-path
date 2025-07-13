import { useEffect, useState } from "react"
import "./App.css"
import { fetchCategories, fetchQuestions } from "./components/api"
import Intro from "./components/Intro"
import Question from "./components/Question"

function App() {
	const [categories, setCategories] = useState([])
	const [questions, setQuestions] = useState([])
	const [showQuiz, setShowQuiz] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchCategories()
			.then(categories => setCategories(categories))
			.catch(error => {
				console.error("Error fetching categories:", error)
			})
	}, [])

	const handleStartQuiz = async options => {
		setLoading(true)
		try {
			const questionData = await fetchQuestions(options)
			setQuestions(questionData)
			setShowQuiz(true)
		} catch (error) {
			console.error("Error fetching questions:", error)
			alert("Failed to fetch questions. Please try again.")
		} finally {
			setLoading(false)
		}
	}

	const handleQuizComplete = (answers, restart = false) => {
		if (restart) {
			setShowQuiz(false)
			setQuestions([])
		}
	}

	return (
		<main>
			{loading && <div className="loading">Loading questions...</div>}
			{!loading && !showQuiz && (
				<Intro categories={categories} onStartQuiz={handleStartQuiz} />
			)}
			{!loading && showQuiz && (
				<Question questions={questions} onSubmit={handleQuizComplete} />
			)}
		</main>
	)
}

export default App
