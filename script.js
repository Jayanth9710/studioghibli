// Div for displaying the logo of Studio Ghibli//
const query = document.createElement("div");
query.className = "searchmovie";
query.innerHTML = `
<img class="github-logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/1200px-Studio_Ghibli_logo.svg.png"></img>

`
document.body.append(query); // Appending the query element to body of HTML using DOM. //
// Function to creating div and for Each to display run through the array to display all info.//
function loadmovies(movies){        
  const movieList = document.createElement("div");
  movieList.className="movies-list";
  movies.forEach( (movies)=>{
    const moviescontainer = document.createElement("div");
    moviescontainer.className="movies-container";  // The container will have the DOM Elements like creating HTML tags using JS.//
                                        // innerHTML lets us to create HTML elements similar to that of in HTML using DOM.
    moviescontainer.innerHTML = ` 
    <div>
    <h4 class="movie-title">Movie: ${movies.title}<h4>
    <h4 class="director">Director: ${movies.director}<h4>
    <h4 class="release-date">Released on: ${movies.release_date}<h4>
    </div>
    `;
    movieList.append(moviescontainer); // Appending moviescontainer div to the movielist .//
  });
  document.body.append(movieList);  // Appending movie list to the body of HTML. //
}

//Fetching data from API URL.//

async function getmovies(movie){  // Async and Await method to fetch the data from API URL.//
  
  
 const data = await fetch("https://ghibliapi.herokuapp.com/films",{
    method:"GET"  // GET Method to get (Display) the data from the REST API. //
  });
  const users = await data.json();  // Converting the received data into json. //
  // Buttons for Pages-->Pagination//
    const Pages = Math.ceil(users.length / 10);
  
  const pagination = document.getElementById('pagination');
  
  // creating button element as per the data//
  for (let i = 1; i <= Pages; i++) {
    const page = document.createElement("button");
    page.className = "page-button";
    page.innerText = i;


    page.onclick = function () {
         
  
      const pageUsers = users.filter(
        (user, index) => index >= (i - 1) * 10 && index < i * 10
      );
      document.querySelector(".movies-list").remove(); // Using query selector the select elements using class name and perform  any functions or operations for ex. here removing or clearing. //
      
     loadmovies(pageUsers);  // Calling the loadmovies function. //
    };
    
    pagination.append(page);  
  } 

  //Displaying the First ten data alone.//

  const firstTenUsers = users.filter((user, index) => index < 10);
  console.log(firstTenUsers);

  console.log("No of users are ", users.length);

  
  loadmovies(firstTenUsers); // Calling the function loadmovies to display the first 10 objects of the array. //
}
getmovies();  // Calling the function getmovies to display information from fetch.//

const pagination = document.createElement("div");
pagination.className = "pagesss"; 
pagination.innerHTML = `
<div class="paginations" id="pagination"></div>
`
document.body.append(pagination)
