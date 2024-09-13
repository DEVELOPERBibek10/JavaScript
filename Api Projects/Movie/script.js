const URL = "https://www.omdbapi.com/?";
const API_KEY = "75e60d99";

const searchBox = document.querySelector("#search-box");
const listContainer = document.querySelector(".movie-list");
const Info = document.querySelector(".info");

async function Movies(searchText) {
  const response = await fetch(
    `${URL}s=${searchText}&page=1&apikey=${API_KEY}`
  );
  const data = await response.json();
  console.log(data.Search);
  if (data.Response == "True") displayList(data.Search);
}

function fetchMovies() {
  let searchText = searchBox.value.trim();
  if (searchText.length > 0) {
    listContainer.classList.remove("hide");
    Movies(searchText);
  } else {
    listContainer.classList.add("hide");
  }
}

function displayList(movies) {
  listContainer.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[i].imdbID;
    movieListItem.classList.add("movie-list-item");
    if (movies[i].Poster != "N/A") moviePoster = movies[i].Poster;
    else moviePoster = "image_not_found.png";

    movieListItem.innerHTML = `
    <img
     src="${moviePoster}"
     alt=""
    />
    <h3 class="list-title">${movies[i].Title}</h3>
     <p class="list-year">${movies[i].Year}</p>`;
    listContainer.appendChild(movieListItem);
  }
  getMovieDetails();
}

function getMovieDetails() {
  let moviesList = document.querySelectorAll(".movie-list-item");
  moviesList.forEach((movie) => {
    movie.addEventListener("click", async () => {
      listContainer.classList.add("hide");
      searchBox.value = "";
      let reasult = await fetch(
        `${URL}i=${movie.dataset.id}&page=1&apikey=${API_KEY}`
      );
      let data = await reasult.json();
      displayMovieDetails(data);
    });
  });
}

function displayMovieDetails(movie) {
  Info.innerHTML = ` <div class="poster-left">
              <img
                src="${
                  movie.Poster != "N/A" ? movie.Poster : "image_not_found.png"
                }"
                alt="Movie IMG"
              />
            </div>
            <div class="description">
              <div class="basic">
                <h3 class="movie-title">${movie.Title}</h3>
                <ul class="movie-basic-info">
                  <li class="year">Year : ${
                    movie.Year != "N/A" ? movie.Year : "Not available"
                  }</li>
                  <li class="rated">Rated : ${
                    movie.Rated != "N/A" ? movie.Rated : "Not available"
                  }</li>
                  <li class="released">Released : ${
                    movie.Released != "N/A" ? movie.Released : "Not available"
                  }</li>
                </ul>
              </div>
              <div class="detail">
                <p class="genre"><b>Genre :</b> ${
                  movie.Genre != "N/A" ? movie.Genre : "Not available"
                }</p>
                <p class="director"><b>Director : </b>${
                  movie.Director != "N/A" ? movie.Director : "Not available"
                }</p>
                <p class="writer"><b>Writer : </b> ${
                  movie.Writer != "N/A" ? movie.Writer : "Not available"
                }.</p>
                <p class="actors">
                  <b>Actors :</b> ${
                    movie.Actors != "N/A" ? movie.Actors : "Not available"
                  }
                </p>
                <p class="plot">
                  <b>Plot : </b> ${
                    movie.Plot != "N/A" ? movie.Plot : "Not available"
                  }
                </p>
                <p class="language"><b>Language : </b> ${
                  movie.Language != "N/A" ? movie.Language : "Not available"
                }</p>
                <p class="awards">
                  <b>Awards: </b>${
                    movie.Awards != "N/A" ? movie.Awards : "Not available"
                  }
                </p>
              </div>
            </div>`;
}

window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    listContainer.classList.add("hide");
  }
});
