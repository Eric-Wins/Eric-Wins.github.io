const contentContainer = document.querySelector('.content-container');
const title = document.getElementById('title');

const IMG_PATH = 'https://image.tmdb.org/t/p/original/';
const url_Popular = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=92dbdfa8e87fd0b164219bf61011fa8b&page=1';
const url_Trending = 'https://api.themoviedb.org/3/trending/movie/day?api_key=92dbdfa8e87fd0b164219bf61011fa8b';
const url_Upcoming = 'https://api.themoviedb.org/3/movie/upcoming?api_key=92dbdfa8e87fd0b164219bf61011fa8b&language=en-US&page=2';
const url_Showing = 'https://api.themoviedb.org/3/movie/now_playing?api_key=92dbdfa8e87fd0b164219bf61011fa8b&language=en-US&page=1';
const url_search = 'https://api.themoviedb.org/3/search/movie?&api_key=92dbdfa8e87fd0b164219bf61011fa8b&query="'

const page = new URL(window.location.href);
const params = page.searchParams.get('page');

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}

function start() {
    if(params === 'trending') {
        getMovies(url_Trending);
        title.innerText = 'Trending';
        document.title = title.innerText + ' - MovieDB by Eric';
    }
    else if (params === 'upcoming') {
        getMovies(url_Upcoming);
        title.innerText = 'Coming Soon';
        document.title = title.innerText + ' - MovieDB by Eric';
    }
    else if (params === 'nowshowing') {
        getMovies(url_Showing);
        title.innerText = 'Now Playing';
        document.title = title.innerText + ' - MovieDB by Eric';
    }
    else {
        getMovies(url_search + params);
        title.innerText = `Showing search results for ${params}`;
        document.title = title.innerText + ' - MovieDB by Eric';
    }

}

function showMovies(movies) {
    movies.forEach(movie => {
        const  { poster_path, title, id } = movie;
        if(poster_path === null) return;
        const movieLink = document.createElement('a');
        movieLink.setAttribute('href', `detail.html?id=${id}`);
        contentContainer.appendChild(movieLink);
        const movieEl = document.createElement('img');
        movieEl.classList.add('list-poster');
        movieEl.setAttribute('src', `${IMG_PATH + poster_path}`);
        movieEl.setAttribute('alt', `${title}`);
        movieLink.appendChild(movieEl);
    });


}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    location.assign(`list.html?page=${search.value}`);
})

start();




