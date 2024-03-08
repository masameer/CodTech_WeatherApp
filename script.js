// API key for accessing OpenWeatherMap API
const apiKey = "b2e929f04358943bf0beae6386453948";
// API URL for fetching weather data (metric units)
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// DOM elements
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to check the weather for a given city
async function checkWeather(city) {
    // Fetch weather data from the OpenWeatherMap API
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Check if the response status is 404 (city not found)
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // Parse the JSON response
        let data = await response.json();
        console.log(data);

        // Display weather information on the webpage
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        // Set weather icon based on weather conditions
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        // Display weather information and hide the error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for the search button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchInput.value);
});

// Event listener for pressing Enter in the search input field
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchInput.value);
    }
});
