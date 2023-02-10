const Allmovies = [
    { title: "The Shawshank Redemption", genre: "Drama" },
    { title: "The Godfather", genre: "Crime" },
    { title: "The Godfather: Part II", genre: "Crime" },
    { title: "The Dark Knight", genre: "Action" },
    { title: "12 Angry Men", genre: "Drama" },
    { title: "Schindler's List", genre: "Drama" },
    { title: "The Lord of the Rings: The Return of the King", genre: "Adventure" },
    { title: "Pulp Fiction", genre: "Crime" },
    { title: "The Good, the Bad and the Ugly", genre: "Western" },
    { title: "Fight Club", genre: "Drama" },
    { title: "Forrest Gump", genre: "Drama" },
    { title: "Inception", genre: "Action" },
    { title: "The Lord of the Rings: The Fellowship of the Ring", genre: "Adventure" },
    { title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Action" },
    { title: "The Lord of the Rings: The Two Towers", genre: "Adventure" },
    { title: "The Matrix", genre: "Action" },
    { title: "Goodfellas", genre: "Crime" },
    { title: "One Flew Over the Cuckoo's Nest", genre: "Drama" },
    { title: "Seven Samurai", genre: "Adventure" },
    { title: "Se7en", genre: "Crime" },
    { title: "City of God", genre: "Crime" },
    { title: "The Silence of the Lambs", genre: "Thriller" },
    { title: "It's a Wonderful Life", genre: "Drama" },
    { title: "Life is Beautiful", genre: "Comedy" },
    { title: "The Usual Suspects", genre: "Crime" },
    { title: "Léon: The Professional", genre: "Action" },
    { title: "Spirited Away", genre: "Animation" },
    { title: "Saving Private Ryan", genre: "Drama" },
    { title: "Interstellar", genre: "Adventure" },
    { title: "The Green Mile", genre: "Drama" },
    { title: "The Prestige", genre: "Drama" },
    { title: "The Intouchables", genre: "Comedy" },
    { title: "The Lion King", genre: "Animation" },
    { title: "The Pianist", genre: "Drama" },
    { title: "The Departed", genre: "Crime" },
    { title: "Whiplash", genre: "Drama" },
    { title: "Gladiator", genre: "Action" }
]


localStorage.setItem("allMovies", JSON.stringify(Allmovies));
const movies = JSON.parse(localStorage.getItem("allMovies"));

const title = document.getElementById("title");
const genre = document.getElementById("genre");
const search = document.getElementById("search");
const result = document.getElementById("results");
const SortByTitle = document.getElementById("SortByTitle");
const SortByGenre = document.getElementById("SortByGenre");
const countGenre = document.getElementById("countGenre");
let li;
//SEARCH BTN LISTENER
let searchMovie;
let sortByTitleVal = true;
search.addEventListener("click", () => {
    if (title.value) {
        searchMovie = title.value
    }
    else if (genre.value) {
        searchMovie = genre.value
    }
    //removing CHILD of previous result
    while (countGenre.firstElementChild) {
        countGenre.removeChild(countGenre.firstElementChild);
    }
    sortByTitleVal = true
    displayList(searchMovie);
})

//SORT BY TITLE LISTENER
SortByTitle.addEventListener("click", () => {
    // sortByTitleVal = true;
    displayList(searchMovie);

})
//SORT BY GENRE LISTENER
SortByGenre.addEventListener("click", () => {
    displayList(searchMovie);
})

//DISPLAY FUNCTION
function displayList(inputsValue) {
    let filteredMovies
    result.innerHTML = "";
    countGenre.innerHTML += "";
    //FILTER ON THE BASIS OF MOVIE TITLE
    if (title.value) {
        filteredMovies = movies.filter(movie => {
            return movie.title.toLowerCase().includes(inputsValue.toLowerCase())
        })
    }
    //FILTER ON THE BASIS OF MOVIE GENRE
    else if (genre.value) {
        filteredMovies = movies.filter(movie => {
            return movie.genre.toLowerCase().includes(inputsValue.toLowerCase())
        })
    }

    //FOR SORT BY TITLE || GENRE
    if (sortByTitleVal == true) {
        filteredMovies.sort((a, b) => (a.title > b.title ? 1 : -1));
    }

    //INSERTING RESULT
    filteredMovies.map(item => {
        const li = document.createElement("li");
        li.innerText = `${item.title} : (${item.genre})`
        result.appendChild(li);
    })

    console.log(filteredMovies);

    //COUNT OF GENRE
    let map = new Map();
    for (let i = 0; i < filteredMovies.length; i++) {
        if (map.has(filteredMovies[i].genre)) {
            map.set(filteredMovies[i].genre, map.get(filteredMovies[i].genre) + 1)
        } else {
            map.set(filteredMovies[i].genre, 1)
        }
    }

    //DISPLAYING COUNT OF GENRE
    console.log(sortByTitleVal)
    if (sortByTitleVal == true) {
        map.forEach((value, key) => {
            li = document.createElement('li');
            li.innerHTML = `${key}: ${value}`;
            countGenre.appendChild(li);
        });
        sortByTitleVal = false;
    }

}




