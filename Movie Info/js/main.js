$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        var searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    fetch('http://www.omdbapi.com/?apikey=2d0f88d3&s=' + searchText).then(response => response.text()).then(data => {
        let movies = JSON.parse(data).Search;
        let output = '';
        $.each(movies, (index, movie) => {

            let moviePoster = '';
            if (movie.Poster == 'N/A')
                moviePoster = 'img/image_not_available.png';
            else {
                moviePoster = movie.Poster;
            }

            output += `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4">
                            <div class="card m-4 text-center">
                                <div class="card-img-top" id="dvImg" style="background-image: url('${moviePoster}');"></div>                                
                                <div class="card-body">
                                    <h6 class="card-title">${movie.Title}</h6> 
                                    <a href="#" class="btn btn-primary" role="button" onclick="movieSelected('${movie.imdbID}');">Movie Details</a>
                                </div>
                            </div>
                        </div>`;

        });
        $('#dvMovies').html(output);
    }).catch((err) => console.log(err));
}

function movieSelected(imdbID) {
    sessionStorage.setItem('imdbID', imdbID);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    var imdbID = sessionStorage.getItem('imdbID');
    fetch('http://www.omdbapi.com/?apikey=2d0f88d3&plot=full&i=' + imdbID).then(res => res.text()).then(data => {

        let movie = JSON.parse(data);

        let moviePoster = '';
        if (movie.Poster == 'N/A')
            moviePoster = 'img/image_not_available.png';
        else {
            moviePoster = movie.Poster;
        }

        let output = '';

        output += `<div class="row">
            <div id="dvPoster" class="col-md-4"><img src="${moviePoster}" alt="${movie.Title}" class="rounded"></div>
            <div id="dvMovieDetails" class="col-md-8">
                <h3 class="text-primary">${movie.Title}</h3>
                <ul class="list-group">
                    <li class="list-group-item text-white"><b>Director : </b> ${movie.Director}</li>
                    <li class="list-group-item text-white"><b>Actors : </b> ${movie.Actors}</li>
                    <li class="list-group-item text-white"><b>Released : </b> ${movie.Released}</li>
                    <li class="list-group-item text-white"><b>Runtime : </b> ${movie.Runtime}</li>
                    <li class="list-group-item text-white"><b>Country : </b> ${movie.Country}</li>
                    <li class="list-group-item text-white"><b>Language : </b> ${movie.Language}</li>
                    <li class="list-group-item text-white"><b>Awards : </b> ${movie.Awards}</li>
                    <li class="list-group-item text-white"><b>Genre : </b> ${movie.Genre}</li>
                    <li class="list-group-item text-white"><b>Writer : </b> ${movie.Writer}</li>
                    <li class="list-group-item text-white"><b>IMDB Rating : ${movie.imdbRating}</b> </li>
                </ul>
            </div>
        </div>
        <div class="row mt-3">
            <div class="card p-4 text-white">
                <div class="card-body">
                    <h4 class="card-title">Plot</h4>
                    <p class="card-text">${movie.Plot}</p>
                    <hr style="border: 0.5px solid #888;">
                    <a href="http://www.imdb.com/title/${movie.imdbID}" class="btn btn-primary" target="_blank" role="button">Visit IMDB</a>
                    <a href="index.html" class="btn btn-secondary ml-sm-4">Go back to Search</a>
                </div>
            </div>
        </div>`;

        $('#dvMovie').html(output);

    }).catch(err => console.log(err));
}
