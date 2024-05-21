document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("Search");
  const locationInput = document.getElementById("locationInput");

  const elements = {
    Location: document.getElementById("Location"),
    cloudPct: document.getElementById("Cloud_pct"),
    temp: document.getElementById("Temperature"),
    feelsLike: document.getElementById("Feels_Like"),
    humidity: document.getElementById("Hummidity"), // Corrected typo
    minTemp: document.getElementById("Min_Temp"),
    windDeg: document.getElementById("Wind_Deg"),
    sunrise: document.getElementById("Sunrise"),
    sunset: document.getElementById("Sunset"),
  };

  const apiOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c2d34aa336msh042d930343b639ap178eeejsn8da7b2a1efd2",
      "x-rapidapi-host": "weather-by-api-ninjas.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  const getWeather = async (city) => {
    try {
      const response = await fetch(
        `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`,
        apiOptions
      );
      const data = await response.json();
      updateWeatherUI(city, data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again.");
    }
  };

  const updateWeatherUI = (city, data) => {
    elements.Location.innerHTML = city;
    elements.cloudPct.innerHTML = data.cloud_pct;
    elements.temp.innerHTML = data.temp;
    elements.feelsLike.innerHTML = data.feels_like;
    elements.humidity.innerHTML = data.humidity;
    elements.minTemp.innerHTML = data.min_temp;
    elements.windDeg.innerHTML = data.wind_degrees;
    elements.sunrise.innerHTML = data.sunrise;
    elements.sunset.innerHTML = data.sunset;
  };

  const handleWeatherSearch = (event) => {
    event.preventDefault();
    let city = locationInput.value.trim();
    city = city[0].toUpperCase() + city.substring(1);
    if (city) {
      getWeather(city);
    } else {
      alert("Please enter a location.");
    }
  };

  btn.addEventListener("click", handleWeatherSearch);
  locationInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleWeatherSearch(event);
    }
  });
});
