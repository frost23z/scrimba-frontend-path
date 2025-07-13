const PLACEHOLDER_POSTER_URL = "https://via.placeholder.com/99x147/374151/9CA3AF?text=No+Poster"

function createMovieCard(movie, buttonConfig) {
	const movieCard = document.createElement("div")
	movieCard.className = "movie-card"

	// Standardize genre display to first two genres
	const genres =
		movie.Genre && movie.Genre !== "N/A" ? movie.Genre.split(",").slice(0, 2).join(", ") : "N/A"

	movieCard.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER_POSTER_URL}"
             alt="${movie.Title}" class="movie-poster">
        <div class="movie-details">
            <h3 class="movie-title">
                ${movie.Title}
                <span class="movie-rating">
                    ⭐ ${movie.imdbRating !== "N/A" ? movie.imdbRating : "N/A"}
                </span>
            </h3>
            <div class="movie-meta">
                <span>${movie.Runtime !== "N/A" ? movie.Runtime : "N/A"}</span>
                <span>${genres}</span>
                <button class="watchlist-action ${buttonConfig.additionalClass || ""}"
                    data-imdb-id="${movie.imdbID}">
                    <span class="material-symbols-outlined">
                        ${buttonConfig.icon || "add_circle"}
                    </span>
                    ${buttonConfig.text}
                </button>
            </div>
            <p class="movie-plot">${movie.Plot !== "N/A" ? movie.Plot : "No plot available."}</p>
        </div>
    `

	const actionBtn = movieCard.querySelector(".watchlist-action")
	if (buttonConfig.onClick) {
		actionBtn.addEventListener("click", () => buttonConfig.onClick(movie, actionBtn))
	}

	return movieCard
}
