// Selecting HTML elements
const cityHeader = document.querySelector('.weather_city');
const weatherIcon = document.querySelector('.weather_icon');
const temperature = document.querySelector('.weather_temperature');
const minMax = document.querySelector('.weather_minmax');
const realFeel = document.querySelector('.weather_realfeel');
const pressure = document.querySelector('.weather_pressure');
const windSpeed = document.querySelector('.weather__ind');
const humidity = document.querySelector('.weather_humidity');

// Function to update the weather information in the HTML
function updateWeatherData(data) {
    // Updating HTML elements with weather data
    cityHeader.textContent = data.city;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.icon}.png" alt="Weather Icon">`;
    temperature.textContent = `${Math.round(data.temperature)}°C`;
    minMax.innerHTML = `<p>Min: ${Math.round(data.tempMin)}°</p><p>Max: ${Math.round(data.tempMax)}°</p>`;
    realFeel.textContent = `${Math.round(data.feelsLike)}°C`;
    pressure.textContent = `${data.pressure} hPa`;
    windSpeed.textContent = `${data.windSpeed} m/s`;
    humidity.textContent = `${data.humidity}%`;
}



// Function to fetch weather data from the PHP script
function fetchWeatherData(city) {
    fetch(`http://localhost/weather/store.php?city=${city}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem(city,JSON.stringify(data))
            updateWeatherData(data);
            console.log("from web")
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

document.querySelector(".searchButton").addEventListener("click", () => {
    localFetch(document.getElementById("usercity").value);
});

function localFetch(city){
    if(!localStorage.getItem(city)){
        fetchWeatherData(city);
    }
    else{
        updateWeatherData(JSON.parse(localStorage.getItem(city)))
        console.log("from local strage")
        console.log(JSON.parse(localStorage.getItem(city)))
        clearLocalStorageAfterTimeout(city);
    }
}

// Function to clear local storage after 10 minutes
function clearLocalStorageAfterTimeout(city) {
    setTimeout(() => {
        localStorage.removeItem(city);
        console.log(`Cleared local storage for ${city} after 10 minutes`);
    }, 10 * 60 * 1000); // 10 minutes in milliseconds
}

// Initial weather data for a default city
const defaultCity = 'swale';

// Fetch weather data for the default city
fetchWeatherData(defaultCity);
