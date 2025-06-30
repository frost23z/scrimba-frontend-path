class MovieSearch {
	constructor() {
		this.apiKey = "24c559ae"
		this.baseUrl = "https://www.omdbapi.com/"

		this.initializeElements()
		this.bindEvents()
	}

	initializeElements() {
		this.searchInput = document.getElementById("searchInput")
		this.searchBtn = document.getElementById("searchBtn")
		this.searchResults = document.getElementById("searchResults")
		this.startExploring = document.getElementById("startExploring")
	}

	bindEvents() {
		this.searchBtn.addEventListener("click", () => this.searchMovies())
		this.searchInput.addEventListener("keypress", e => {
			if (e.key === "Enter") {
				this.searchMovies()
			}
		})
	}

	async searchMovies() {
		const query = this.searchInput.value.trim()
		if (!query) return

		this.showLoading()

		try {
			const response = await fetch(
				`${this.baseUrl}?s=${encodeURIComponent(query)}&apikey=${this.apiKey}`
			)
			const data = await response.json()

			if (data.Response === "True") {
				this.displaySearchResults(data.Search)
			} else {
				this.showError(data.Error || "No movies found")
			}
		} catch (error) {
			this.showError("Failed to fetch movies. Please try again.")
			console.error("Search error:", error)
		}
	}

	async getMovieDetails(imdbID) {
		try {
			const response = await fetch(`${this.baseUrl}?i=${imdbID}&apikey=${this.apiKey}`)
			const data = await response.json()
			return data.Response === "True" ? data : null
		} catch (error) {
			console.error("Error fetching movie details:", error)
			return null
		}
	}

	async displaySearchResults(movies) {
		this.startExploring.style.display = "none"
		this.searchResults.innerHTML = ""

		if (movies.length === 0) {
			this.showError("No movies found for your search.") // More specific message
			return
		}

		for (const movie of movies) {
			const movieDetails = await this.getMovieDetails(movie.imdbID)
			if (movieDetails) {
				const isInWatchlist = this.isMovieInWatchlist(movieDetails.imdbID)
				const buttonConfig = {
					text: isInWatchlist ? "Remove" : "Watchlist",
					icon: isInWatchlist ? "do_not_disturb_on" : "add_circle",
					additionalClass: isInWatchlist ? "added" : "",
					onClick: (mov, btn) => this.toggleWatchlist(mov, btn)
				}
				const movieCard = createMovieCard(movieDetails, buttonConfig) // Use shared function
				this.searchResults.appendChild(movieCard)
			}
		}
	}

	isMovieInWatchlist(imdbID) {
		const watchlist = JSON.parse(localStorage.getItem("movieWatchlist")) || []
		return watchlist.some(m => m.imdbID === imdbID)
	}

	toggleWatchlist(movie, button) {
		let watchlist = JSON.parse(localStorage.getItem("movieWatchlist")) || []
		const isInWatchlist = watchlist.some(m => m.imdbID === movie.imdbID)
		const iconSpan = button.querySelector(".material-symbols-outlined")

		if (isInWatchlist) {
			watchlist = watchlist.filter(m => m.imdbID !== movie.imdbID)
			button.classList.remove("added")
			button.innerHTML = `<span class="material-symbols-outlined">add_circle</span>Watchlist`
		} else {
			watchlist.push(movie)
			button.classList.add("added")
			button.innerHTML = `<span class="material-symbols-outlined">do_not_disturb_on</span>Remove`
		}

		localStorage.setItem("movieWatchlist", JSON.stringify(watchlist))
	}

	showLoading() {
		this.startExploring.style.display = "none"
		this.searchResults.innerHTML = '<div class=\"loading\">Searching for movies...</div>'
	}

	showError(message) {
		this.startExploring.style.display = "none"
		this.searchResults.innerHTML = `<div class=\"error\">${message}</div>` // Display the passed message
	}
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	new MovieSearch()
})
