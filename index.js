document.addEventListener('DOMContentLoaded', onDOMLoad)


function onDOMLoad () {
    
    let movieContainer = document.getElementById("movie-container")
    let searchBox = document.querySelector('#search-form')
   

    searchBox.addEventListener('submit', function (e) {
        e.preventDefault(); //stops page from reloading

            var searchString = document.getElementById('search-bar').value; //whatever the user types into the search bar
            var urlEncodedSearchString = encodeURIComponent(searchString); //making the input url friendly

                axios.get("http://www.omdbapi.com/?apikey=3430a78&s=" + urlEncodedSearchString) //creates the url and gets the info
                .then(function (response) { //api call promise
                    // console.log(response.data);
                    movieContainer.innerHTML = renderMovies(response.data.Search);
                    let apiResult = response.data.Search;
                    
                        document.addEventListener('click', event => { //listens for clicks
                            let clickedItem = event.target; 
                    
                            if (clickedItem.value) { //only the add buttons have a value
                                saveToWatchlist(clickedItem.value, apiResult); //runs the save to watchlist function with the imdbID of the clicked film
                            }
                        })
                    console.log(apiResult)
                })
               
                    
           
            
    })

}


function renderMovies (movieArray) {
    // loops through the array and renders the movie

    let movieHTML = movieArray.map(currentMovie => {
        
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


    //add to watchlist

    

   

    function saveToWatchlist (movieID, movieArray) { //takes the imdbID and the array that it should search through
        console.log()
        var movie = movieArray.find(currentMovie => { //finds the clicked movie by referencing it against the search results (array)
            
            return currentMovie.imdbID == movieID; //checks if the imdbID of current movie in JSON matches the clicked imdbID
        })


        var watchlistJSON = localStorage.getItem('watchlist'); //watchlistJSON
        var watchlist = JSON.parse(watchlistJSON); 
        if (watchlist === null) { 
            watchlist = [];//if null, creates an array
        }
        watchlist.push(movie); //adds clicked movie to watchlist array
        watchlistJSON = JSON.stringify(watchlist); 
        localStorage.setItem('watchlist', watchlistJSON);

    }

    
    
    
   //console.application.localstorage