const slideImageWrapper = document.querySelector('.image-wrapper');
const listContainer = document.querySelector('.list');
const search = document.getElementById('search')
const form = document.getElementById('form')

const IMG_PATH = 'https://image.tmdb.org/t/p/original/';

// Slide Variable
let px = 0;
const totalSlide = 6;

// Trending list Variable
const trendingLeftArrow = document.getElementById('left-trending');
const trendingRightArrow = document.getElementById('right-trending');
const trendingPosterContainer = document.getElementById('trending');
let trendingPosterActive = '';
let trendingLeftPoster = 0;
let trendingRightPoster = '';
let trendingPosterEl = '';
let trendingPoster = '';
const totalSmalltrending = 20;

// NowShowing list Variable
const nowShowLeftArrow = document.getElementById('left-now-showing');
const nowShowRightArrow = document.getElementById('right-now-showing');
const nowShowPosterContainer = document.getElementById('now-showing');
let nowShowPosterActive = '';
let nowShowLeftPoster = 0;
let nowShowRightPoster = '';
let nowShowPosterEl = '';
let nowShowPoster = '';
const totalSmallNowShow = 20;

// NowShowing list Variable
const upcomingLeftArrow = document.getElementById('left-upcoming');
const upcomingRightArrow = document.getElementById('right-upcoming');
const upcomingPosterContainer = document.getElementById('upcoming');
let upcomingPosterActive = '';
let upcomingLeftPoster = 0;
let upcomingRightPoster = '';
let upcomingPosterEl = '';
let upcomingPoster = '';
const totalSmallUpcoming = 20;


async function getTrending() {
    trendingMovieData = [];
    popularMovieData = [];

    const url_Popular = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=92dbdfa8e87fd0b164219bf61011fa8b&page=1';
    const url_Trending = 'https://api.themoviedb.org/3/trending/movie/day?api_key=92dbdfa8e87fd0b164219bf61011fa8b';

    const res1 = await fetch(url_Popular);
    const data1 = await res1.json();

    const res2 = await fetch(url_Trending);
    const data2 = await res2.json();

    showTrending(data1.results, data2.results);


}

function showTrending(moviesPopular, moviesTrending) {

    moviesTrending.forEach((e) => {
        trendingMovieData.push({backdropPath: e.backdrop_path ,posterPath: e.poster_path, id : e.id});
    });
    moviesPopular.forEach((e) => {
        popularMovieData.push({backdropPath: e.backdrop_path ,posterPath: e.poster_path, id : e.id});
    });

    for(let i = 0; i < totalSlide; i++) {
        createPoster(i, popularMovieData);
    }

    for(let i = 0; i < totalSmalltrending; i++) {
        createSmallPoster(i, trendingMovieData, trendingPosterContainer);
    }
    
    trendingPosterEl = document.querySelector('#trending > a');
    trendingPoster = document.querySelectorAll('#trending > *');
    trendingPosterActive = Math.floor(listContainer.offsetWidth/ trendingPosterEl.offsetWidth);
    trendingRightPoster = trendingPoster.length - trendingPosterActive;
    
    let interval = setInterval(slideMove, 1000/60);
}

function createPoster(i, data) {
    const posterlink = document.createElement('a');
    posterlink.setAttribute('href',`detail.html?id=${data[i].id}`);
    slideImageWrapper.appendChild(posterlink);
    const trendingPosterEl = document.createElement('img');
    trendingPosterEl.classList.add('slide');
    trendingPosterEl.src = `${IMG_PATH + data[i].backdropPath}`
    posterlink.appendChild(trendingPosterEl);
}

function createSmallPoster(i, data, container) {
    const smallPosterLink = document.createElement('a');
    smallPosterLink.setAttribute('href', `detail.html?id=${data[i].id}`);
    container.appendChild(smallPosterLink);
    
    const smallPosterEl = document.createElement('img');
    smallPosterEl.classList.add('small-poster');
    smallPosterEl.src = `${IMG_PATH + data[i].posterPath}`
    smallPosterLink.appendChild(smallPosterEl);

}

trendingRightArrow.addEventListener('click', function(e){
    trendingSwipeLeft(trendingLeftPoster, trendingRightPoster, trendingPosterContainer, trendingPosterActive, trendingPosterEl);
    buttonCheck(trendingLeftArrow, trendingRightArrow, trendingLeftPoster, trendingRightPoster);
})

trendingLeftArrow.addEventListener('click', function(){
    trendingSwipeRight(trendingLeftPoster, trendingRightPoster, trendingPosterContainer, trendingPosterActive, trendingPosterEl);
    buttonCheck(trendingLeftArrow, trendingRightArrow, trendingLeftPoster, trendingRightPoster);
})

function trendingSwipeLeft(leftPoster, rightPoster, container, active, posterEl) {
    // If the amount of rest poster still sufficient then 
    if(rightPoster > active) {
        container.style.transform = `translateX(-${(active * posterEl.offsetWidth)}px)`;
        trendingLeftPoster += trendingPosterActive;
        trendingRightPoster -= trendingPosterActive;
    } else {
        const lastEl = document.querySelector('#trending > :last-child');
        const firstEl = document.querySelector('#trending > :first-child');
        //Get last Element X value.
        lastX = lastEl.getBoundingClientRect().left + posterEl.offsetWidth + window.scrollX;
        firstX = -firstEl.getBoundingClientRect().left;
        container.style.transform = `translateX(-${(lastX - listContainer.offsetWidth + firstX + 30)}px)`;
        trendingLeftPoster += (trendingRightPoster);
        trendingRightPoster = 0;
    }
};

function trendingSwipeRight(leftPoster, rightPoster, container, active, posterEl) {
    if(leftPoster > active) {
        const transformStyle = document.querySelector('#trending').style.transform;
        const translateX = +(transformStyle.replace(/[^\d.]/g, ''));
        container.style.transform = `translateX(${(active * posterEl.offsetWidth) - translateX}px)`;
        trendingRightPoster += trendingPosterActive;
        trendingLeftPoster -= trendingPosterActive;
    } else {
        container.style.transform = `translateX(0px)`;
        trendingRightPoster += (trendingLeftPoster);
        trendingLeftPoster = 0;
    }
};

function buttonCheck(left, right, leftPoster, rightPoster) {
    if(leftPoster > 0) left.classList.add('active');
    else left.classList.remove('active');
    
    if(rightPoster > 0) right.classList.add('active');
    else right.classList.remove('active');
}

function slideMove(){
    const firstEl = document.querySelector('.image-wrapper a > :first-child');
    px++;
    slideImageWrapper.style.left = `-${px}px`;

    if((firstEl.offsetWidth+20) === (px)) {
        const first_poster = document.querySelector('.image-wrapper > :first-child');
        slideImageWrapper.insertAdjacentHTML('beforeend', first_poster.outerHTML);
        first_poster.remove();
        slideImageWrapper.style.left = '0px';
        px = 0;
    }
}
async function getShowing () {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=92dbdfa8e87fd0b164219bf61011fa8b&language=en-US&page=1'
    const res = await fetch(url);
    const data = await res.json();
    const moviesNowShow = data.results;

    let showingMovieData = [];

    moviesNowShow.forEach((e) => {
        showingMovieData.push({backdropPath: e.backdrop_path ,posterPath: e.poster_path, id : e.id});
    });

    for(let i = 0; i < totalSmallNowShow; i++) {
        createSmallPoster(i, showingMovieData, nowShowPosterContainer);
    }


    nowShowPosterEl = document.querySelector('#now-showing > a');
    posterWidth = nowShowPosterEl.offsetWidth;
    nowShowPoster = document.querySelectorAll('#now-showing > *');
    nowShowPosterActive = Math.floor(listContainer.offsetWidth/ posterWidth);
    nowShowRightPoster = nowShowPoster.length - nowShowPosterActive;
}

nowShowRightArrow.addEventListener('click', function(e){
    nowShowSwipeLeft(nowShowLeftPoster, nowShowRightPoster, nowShowPosterContainer, nowShowPosterActive, nowShowPosterEl);
    buttonCheck(nowShowLeftArrow, nowShowRightArrow, nowShowLeftPoster, nowShowRightPoster);
})

nowShowLeftArrow.addEventListener('click', function(){
    nowShowSwipeRight(nowShowLeftPoster, nowShowRightPoster, nowShowPosterContainer, nowShowPosterActive, nowShowPosterEl);
    buttonCheck(nowShowLeftArrow, nowShowRightArrow, nowShowLeftPoster, nowShowRightPoster);
})

function nowShowSwipeLeft(leftPoster, rightPoster, container, active) {
    // If the amount of rest poster still sufficient then 
    if(rightPoster > active) {
        container.style.transform = `translateX(-${(active * posterWidth)}px)`;
        nowShowLeftPoster += nowShowPosterActive;
        nowShowRightPoster -= nowShowPosterActive;
    } else {
        const lastEl = document.querySelector('#now-showing > :last-child');
        const firstEl = document.querySelector('#now-showing > :first-child');
        //Get last Element X value.
        lastX = lastEl.getBoundingClientRect().left + posterWidth + window.scrollX;
        firstX = -firstEl.getBoundingClientRect().left;
        container.style.transform = `translateX(-${(lastX - listContainer.offsetWidth + firstX + 30)}px)`;
        nowShowLeftPoster += (nowShowRightPoster);
        nowShowRightPoster = 0;
    }
};

function nowShowSwipeRight(leftPoster, rightPoster, container, active) {
    if(leftPoster > active) {
        const transformStyle = document.querySelector('#now-showing').style.transform;
        const translateX = +(transformStyle.replace(/[^\d.]/g, ''));
        container.style.transform = `translateX(${(active * posterWidth) - translateX}px)`;
        nowShowRightPoster += nowShowPosterActive;
        nowShowLeftPoster -= nowShowPosterActive;
    } else {
        container.style.transform = `translateX(0px)`;
        nowShowRightPoster += (nowShowLeftPoster);
        nowShowLeftPoster = 0;
    }
};

async function getUpcoming() {
    const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=92dbdfa8e87fd0b164219bf61011fa8b&language=en-US&page=2'
    const res = await fetch(url);
    const data = await res.json();
    const moviesUpcoming = data.results;
    let movieData = [];
    moviesUpcoming.forEach((e) => {
        movieData.push({backdropPath: e.backdrop_path ,posterPath: e.poster_path, id : e.id});
    });

    for(let i = 0; i < totalSmallUpcoming; i++) {
        createSmallPoster(i, movieData, upcomingPosterContainer);
    }

    upcomingPosterEl = document.querySelector('#upcoming > a');
    posterWidth = upcomingPosterEl.offsetWidth;
    upcomingPoster = document.querySelectorAll('#upcoming > *');
    upcomingPosterActive = Math.floor(listContainer.offsetWidth/ posterWidth);
    upcomingRightPoster = upcomingPoster.length - upcomingPosterActive;
}

upcomingRightArrow.addEventListener('click', function(e){
    upcomingSwipeLeft(upcomingLeftPoster, upcomingRightPoster, upcomingPosterContainer, upcomingPosterActive, upcomingPosterEl);
    buttonCheck(upcomingLeftArrow, upcomingRightArrow, upcomingLeftPoster, upcomingRightPoster);
})

upcomingLeftArrow.addEventListener('click', function(){
    upcomingSwipeRight(upcomingLeftPoster, upcomingRightPoster, upcomingPosterContainer, upcomingPosterActive, upcomingPosterEl);
    buttonCheck(upcomingLeftArrow, upcomingRightArrow, upcomingLeftPoster, upcomingRightPoster);
})

function upcomingSwipeLeft(leftPoster, rightPoster, container, active) {
    // If the amount of rest poster still sufficient then 
    if(rightPoster > active) {
        container.style.transform = `translateX(-${(active * posterWidth)}px)`;
        upcomingLeftPoster += upcomingPosterActive;
        upcomingRightPoster -= upcomingPosterActive;
    } else {
        const lastEl = document.querySelector('#upcoming > :last-child');
        const firstEl = document.querySelector('#upcoming > :first-child');
        //Get last Element X value.
        lastX = lastEl.getBoundingClientRect().left + posterWidth + window.scrollX;
        firstX = -firstEl.getBoundingClientRect().left;
        container.style.transform = `translateX(-${(lastX - listContainer.offsetWidth + firstX + 30)}px)`;
        upcomingLeftPoster += (upcomingRightPoster);
        upcomingRightPoster = 0;
    }
};

function upcomingSwipeRight(leftPoster, rightPoster, container, active) {
    if(leftPoster > active) {
        const transformStyle = document.querySelector('#upcoming').style.transform;
        const translateX = +(transformStyle.replace(/[^\d.]/g, ''));
        container.style.transform = `translateX(${(active * posterWidth) - translateX}px)`;
        upcomingRightPoster += upcomingPosterActive;
        upcomingLeftPoster -= upcomingPosterActive;
    } else {
        container.style.transform = `translateX(0px)`;
        upcomingRightPoster += (upcomingLeftPoster);
        upcomingLeftPoster = 0;
    }
};

form.addEventListener('submit', function(e) {
    e.preventDefault();
    location.assign(`list.html?page=${search.value}`);
})

getTrending();
getShowing();
getUpcoming();
