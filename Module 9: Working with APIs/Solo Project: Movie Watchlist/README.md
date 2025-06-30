# Movie Watchlist

A movie search and watchlist application that allows users to search for movies and manage their personal watchlist using the OMDb API.

## Features

- **Movie Search**: Search for movies using the OMDb API
- **Movie Details**: View detailed information including plot, rating, and cast
- **Watchlist Management**: Add and remove movies from personal watchlist
- **Local Storage**: Persistent watchlist data between browser sessions
- **Responsive Design**: Works on desktop and mobile devices
- **Movie Posters**: Display high-quality movie poster images
- **Empty States**: User-friendly messages when no movies are found or watchlist is empty

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- OMDb API
- Fetch API
- Local Storage API

## How It Works

1. User enters a movie title in the search input
2. App makes API request to OMDb API to fetch movie data
3. Search results are displayed with movie details and "Add to Watchlist" buttons
4. Users can add movies to their watchlist, which is saved to localStorage
5. Watchlist page shows all saved movies with "Remove from Watchlist" options
6. Data persists between browser sessions using localStorage

## Credits

- Part of the Scrimba Frontend Developer Career Path
- Uses [OMDb API](http://www.omdbapi.com/) for movie data
