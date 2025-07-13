// Movie Watchlist App (watchlist.html)
class WatchlistPage {
	constructor() {
		this.watchlist = JSON.parse(localStorage.getItem("movieWatchlist")) || []

		this.initializeElements()
		this.displayWatchlist()
	}

	initializeElements() {
		this.emptyWatchlist = document.getElementById("empty-watchlist")
		this.watchlistMovies = document.getElementById("watchlist")
	}

	displayWatchlist() {
		if (this.watchlist.length === 0) {
			this.emptyWatchlist.style.display = "flex"
			this.watchlistMovies.style.display = "none"
		} else {
			this.emptyWatchlist.style.display = "none"
			this.watchlistMovies.style.display = "flex"
			this.watchlistMovies.innerHTML = ""

			this.watchlist.forEach(movie => {
				const buttonConfig = {
					text: "Remove",
					icon: "do_not_disturb_on",
					additionalClass: "remove-action",
					onClick: (mov, btn) => this.removeFromWatchlist(mov.imdbID)
				}
				const movieCard = createMovieCard(movie, buttonConfig)
				this.watchlistMovies.appendChild(movieCard)
			})
		}
	}

	removeFromWatchlist(imdbID) {
		this.watchlist = this.watchlist.filter(movie => movie.imdbID !== imdbID)
		localStorage.setItem("movieWatchlist", JSON.stringify(this.watchlist))
		this.displayWatchlist()
	}
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	new WatchlistPage()
})
