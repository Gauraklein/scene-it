document.addEventListener('DOMContentLoaded', onDOMLoad)


function onDOMLoad () {
    
    let movieContainer = document.getElementById("movie-container")
    let watchlist = localStorage.getItem('watchlist')
    if (watchlist === null) {
        movieContainer.innerHTML = `<h3>Your watchlist is empty, add some films from the homepage!</h3>`
    } else {
        movieContainer.innerHTML = renderWatchedMovies(watchlist);
    }          
}


function renderWatchedMovies (watchlistJSON) {
    // loops through the array and renders the movie

    watchlistArray = JSON.parse(watchlistJSON)

    let movieHTML = watchlistArray.map(currentMovie => {
        
        return `
        <div class="movie-card card" style="width: 18rem;">
            <img class="card-img-top movie-poster" src="${currentMovie.Poster}" alt="Movie Poster" / >
            <div class="card-body">
                <h5 class="card-title text-center">${currentMovie.Title}</h5>
                <p class="movie-year card-text text-center">${currentMovie.Year}</p>
                <div class="text-center">
                    <button value="${currentMovie.imdbID}"class="btn btn-primary">ADD</button>
                </div>
            </div>
        </div>`
        
    })

    return movieHTML.join('');

    }