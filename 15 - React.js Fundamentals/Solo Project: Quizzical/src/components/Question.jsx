import { decode } from "html-entities"
import { useState } from "react"

function Question({ questions, onSubmit }) {
	const [selectedAnswers, setSelectedAnswers] = useState({})
	const [showResults, setShowResults] = useState(false)

	const handleAnswerSelect = (questionIndex, answer) => {
		setSelectedAnswers(prev => ({
			...prev,
			[questionIndex]: answer
		}))
	}

	const handleSubmit = () => {
		setShowResults(true)
		if (onSubmit) {
			onSubmit(selectedAnswers)
		}
	}

	const handlePlayAgain = () => {
		setSelectedAnswers({})
		setShowResults(false)
		if (onSubmit) {
			onSubmit(null, true)
		}
	}

	const calculateScore = () => {
		let correct = 0
		questions.forEach((question, index) => {
			if (selectedAnswers[index] === question.correct_answer) {
				correct++
			}
		})
		return correct
	}

	return (
		<>
			<section className="questions">
				{questions.map((question, questionIndex) => {
					const allAnswers = [
						...question.incorrect_answers,
						question.correct_answer
					].sort()

					return (
						<article key={questionIndex} className="question-container">
							<h3 className="question">{decode(question.question)}</h3>
							<div className="answers">
								{allAnswers.map((answer, answerIndex) => {
									const isSelected = selectedAnswers[questionIndex] === answer
									const isCorrect = answer === question.correct_answer
									const isIncorrect = showResults && isSelected && !isCorrect

									let className = "answer-btn"
									if (showResults) {
										if (isCorrect) className += " correct"
										else if (isIncorrect) className += " incorrect"
										else if (!isSelected) className += " faded"
									} else if (isSelected) {
										className += " selected"
									}

									return (
										<button
											key={answerIndex}
											className={className}
											onClick={() =>
												!showResults &&
												handleAnswerSelect(questionIndex, answer)
											}
											disabled={showResults}
										>
											{decode(answer)}
										</button>
									)
								})}
							</div>
						</article>
					)
				})}
			</section>

			<footer className="quiz-footer">
				{showResults ? (
					<>
						<p className="score">
							You scored {calculateScore()}/{questions.length} correct answers
						</p>
						<button className="play-again-btn" onClick={handlePlayAgain}>
							Play again
						</button>
					</>
				) : (
					<button
						className="check-answers-btn"
						onClick={handleSubmit}
						disabled={Object.keys(selectedAnswers).length !== questions.length}
					>
						Check answers
					</button>
				)}
			</footer>
		</>
	)
}

export default Question
