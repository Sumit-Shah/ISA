// Selecting HTML elements
const searchForm = document.querySelector('.Weather_search'); // The search form element
const searchInput = document.querySelector('.Weather_searchform'); // The input field for city name
const cityHeader = document.querySelector('.weather_city'); // Element for displaying city name
const dateTime = document.querySelector('.weather_datetime'); // Element for displaying date and time
const forecast = document.querySelector('.weather_forecast'); // Element for displaying weather forecast
const weatherIcon = document.querySelector('.weather_icon'); // Element for displaying weather icon
const temperature = document.querySelector('.weather_temperature'); // Element for displaying temperature
const minMax = document.querySelector('.weather_minmax'); // Element for displaying min and max temperatures
const realFeel = document.querySelector('.weather_realfeel'); // Element for displaying real feel temperature
const pressure = document.querySelector('.weather_pressure'); // Element for displaying atmospheric pressure
const windSpeed = document.querySelector('.weather__ind'); // Element for displaying wind speed
const humidity = document.querySelector('.weather_humidity'); // Element for displaying humidity

// Function to update the weather information in the HTML
function updateWeatherData(data) {
  // Updating HTML elements with weather data
  cityHeader.textContent = data.name;
  dateTime.textContent = new Date(data.dt * 1000).toLocaleString();
  forecast.textContent = data.weather[0].description;
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  minMax.innerHTML = `<p>Min: ${Math.round(data.main.temp_min)}°</p><p>Max: ${Math.round(data.main.temp_max)}°</p>`;
  realFeel.textContent = `${Math.round(data.main.feels_like)}°C`;
  pressure.textContent = `${data.main.pressure} hPa`;
  windSpeed.textContent = `${data.wind.speed} m/s`;
  humidity.textContent = `${data.main.humidity}%`;
}

// Function to fetch weather data from the API
function fetchWeatherData(city) {
  const apiKey = '815e5e85907659dda79aa952df3df600';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  // Fetching weather data from the API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      return response.json();
    })
    .then(data => {
      updateWeatherData(data);
    })
    .catch(error => {
      console.log(error);
    });
}

// Event listener for the form submission
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const city = searchInput.value;
  fetchWeatherData(city);
  searchInput.value = '';
});

// Initial weather data for a default city
const defaultCity = 'swale';
fetchWeatherData(defaultCity);
