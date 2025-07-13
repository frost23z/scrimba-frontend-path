function Intro({ categories, onStartQuiz }) {
	const categoryElements = categories.map(category => (
		<option key={category.id} value={category.id}>
			{category.name}
		</option>
	))

	const handleSubmit = event => {
		event.preventDefault()

		const formData = new FormData(event.target)
		const options = {
			amount: parseInt(formData.get("amount")) || 5,
			category: parseInt(formData.get("category")) || "any",
			difficulty: formData.get("difficulty"),
			type: formData.get("type")
		}

		onStartQuiz(options)
	}

	return (
		<>
			<header className="intro">
				<h1>Quizzical</h1>
				<p>Select your options below to start the quiz!</p>
			</header>
			<section className="form-section">
				<form onSubmit={handleSubmit} className="intro-options">
					<label htmlFor="amount">Number of Questions:</label>
					<select id="amount" name="amount" defaultValue="5">
						<option value="5">5 Questions</option>
						<option value="10">10 Questions</option>
						<option value="15">15 Questions</option>
						<option value="20">20 Questions</option>
					</select>

					<label htmlFor="category">Category:</label>
					<select id="category" name="category" defaultValue="any">
						<option value="any">Any Category</option>
						{categoryElements}
					</select>

					<label htmlFor="difficulty">Difficulty:</label>
					<select id="difficulty" name="difficulty" defaultValue="any">
						<option value="any">Any Difficulty</option>
						<option value="easy">Easy</option>
						<option value="medium">Medium</option>
						<option value="hard">Hard</option>
					</select>

					<label htmlFor="type">Type:</label>
					<select id="type" name="type" defaultValue="any">
						<option value="any">Any Type</option>
						<option value="multiple">Multiple Choice</option>
						<option value="boolean">True/False</option>
					</select>

					<button type="submit" className="start-btn">
						Start quiz
					</button>
				</form>
			</section>
		</>
	)
}

export default Intro
