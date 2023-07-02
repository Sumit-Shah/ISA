// API key for accessing the movie database as per the request of the user.
const apiKey = '791122d8';

// Get references to HTML elements
const searchInput = document.getElementById('searchInput'); // Input field for movie title
const searchButton = document.getElementById('searchButton'); // Button to initiate search
const resultsContainer = document.getElementById('resultsContainer'); // Container to display search results

// Event listener for search button click
searchButton.addEventListener('click', () => {
  // Get the trimmed movie title from the input field
  const searchTerm = searchInput.value.trim();

  // Check if the movie title is empty
  if (searchTerm === '') {
    showError('Please enter a movie title');
    return;
  }

  // Call the function to search for movies with the entered title
  searchMovies(searchTerm);
});

// Function to search for movies using the movie title
async function searchMovies(searchTerm) {
  try {
    // Send a request to the movie database API
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`);

    // Parse the response data as JSON
    const data = await response.json();

    // Check if the response indicates an error
    if (data.Response === 'False') {
      showError(data.Error);
      return;
    }

    // Display the search results
    displayMovies(data.Search);
  } catch (error) {
    showError('An error occurred while fetching movie data');
  }
}

// Function to display the search results on the webpage
function displayMovies(movies) {
  // Clear the previous search results
  resultsContainer.innerHTML = '';

  // Loop through each movie in the search results
  movies.forEach(movie => {
    const { Title, Year, Poster, Plot } = movie;

    // Create a container for each movie
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    // Create an image element for the movie poster
    const image = document.createElement('img');
    image.src = Poster === 'N/A' ? 'placeholder.png' : Poster;
    image.alt = Title;

    // Create a heading element for the movie title
    const title = document.createElement('h3');
    title.textContent = Title;

    // Create a paragraph element for the movie year
    const year = document.createElement('p');
    year.textContent = Year;

    // Append the elements to the movie container
    movieCard.appendChild(image);
    movieCard.appendChild(title);
    movieCard.appendChild(year);

    // Add click event listener to the movie card
    movieCard.addEventListener('click', () => {
      displayMovieDescription(Title, Plot);
    });

    // Append the movie container to the results container
    resultsContainer.appendChild(movieCard);
  });
}

// Function to display the movie description
function displayMovieDescription(title, plot) {
  console.log(plot)
  // Clear the previous search results
  resultsContainer.innerHTML = '';

  // Create a container for the movie details
  const movieDetails = document.createElement('div');
  movieDetails.classList.add('movie-details');

  // Create a heading element for the movie title
  const titleElement = document.createElement('h3');
  titleElement.textContent = title;

  // Create a paragraph element for the movie plot
  const plotElement = document.createElement('p');
  plotElement.textContent = plot;

  // Append the elements to the movie details container
  movieDetails.appendChild(titleElement);
  movieDetails.appendChild(plotElement);

  // Append the movie details container to the results container
  resultsContainer.appendChild(movieDetails);
}

// Function to display an error message
function showError(message) {
  // Create an error message element
  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;

  // Clear the previous search results and display the error message
  resultsContainer.innerHTML = '';
  resultsContainer.appendChild(errorMessage);
}