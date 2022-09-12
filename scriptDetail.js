const poster = document.getElementById('poster-img');
const background = document.querySelector('.content-container');
const homepageEl = document.getElementById('homepage');
const title = document.getElementById('title');
const yearEl = document.getElementById('year');
const fulldate =  document.getElementById('released-date');
const genreEl = document.getElementById('genre');
const runtimeEl = document.getElementById('runtime');
const taglineEl = document.getElementById('tagline');
const summary = document.getElementById('summary-text');
const statusEl = document.getElementById('status');
const budget = document.getElementById('budget');
const revenue = document.getElementById('revenue');
const company = document.getElementById('company');
const directorEl = document.getElementById('director');

const url = new URL(window.location.href);
const id = url.searchParams.get('id');

const url_details = `https://api.themoviedb.org/3/movie/${id}?api_key=92dbdfa8e87fd0b164219bf61011fa8b`;
const url_crews = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=92dbdfa8e87fd0b164219bf61011fa8b&language=en-US`
const IMG_PATH = 'https://image.tmdb.org/t/p/original/';

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    
    updateData(data);
}

async function getCrew(url) {
    const res = await fetch(url);
    const data = await res.json();

    updateCrew(data.crew);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    location.assign(`list.html?page=${search.value}`);
})

function updateData(movie) {
    const details = {
        title: movie.title,
        genre: movie.genres,
        posterPath: movie.poster_path,
        backdrop: movie.backdrop_path,
        homepage: movie.homepage,
        releaseDate: movie.release_date,
        runtime: movie.runtime,
        tagline: movie.tagline,
        overview: movie.overview,
        status: movie.status,
        budget: movie.budget,
        revenue: movie.revenue,
        company: movie.production_companies[0]
    };

    const dt = new Date(details.releaseDate);
    const date = dt.getDate() >= 10 ? dt.getDate() : '0'+ dt.getDate();
    const month = dt.getMonth() >= 10 ? dt.getMonth() : '0'+ dt.getMonth();
    const year = dt.getFullYear();
    const hours = Math.floor(details.runtime / 60);
    const minute = details.runtime % 60;
    companyName = details.company ? details.company.name : '-';

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const budgetUsd = details.budget > 0 ? formatter.format(details.budget) : '-';
    const revenueUsd = details.revenue > 0 ? formatter.format(details.revenue) : '-';
    let count = 0;
    

    document.title = `${details.title} - MovieDB by Eric`
    poster.src = `${IMG_PATH + details.posterPath}`
    background.style.backgroundImage = `url(${IMG_PATH + details.backdrop})`;
    homepageEl.setAttribute('href', `${details.homepage}`);
    title.innerText = details.title;
    yearEl.innerText = `(${year})`
    fulldate.innerText = `${date}/${month}/${year}`;
    details.genre.forEach(genre => {
        genreEl.innerText += `${genre.name}`;
        count++;
        if(count < details.genre.length) genreEl.innerHTML += ',';
    });
    runtimeEl.innerText = `${hours}h ${minute}m`
    taglineEl.innerText = details.tagline;
    summary.innerText = details.overview;
    statusEl.innerText = details.status;
    budget.innerText = budgetUsd;
    revenue.innerText = revenueUsd;
    company.innerText = companyName;

}

function updateCrew(crew) {
    const director = crew.find(e => e.department === 'Directing');
    const directorName = director ? director.name : '-'
    directorEl.innerText = directorName;
}

getData(url_details);
getCrew(url_crews);

