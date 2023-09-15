//  API keys and endpoints
const openWeatherMapApiKey = '430b694a7dd7b9982830ab6b65dec4b0';
const geoLocationApiEndpoint = 'http://api.openweathermap.org/geo/1.0/direct';

// Function to fetch geo location (latitude and longitude) for a city name
function fetchGeoLocation(city) {
  const url = `${geoLocationApiEndpoint}?q=${city}&limit=1&appid=${openWeatherMapApiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Check if the response contains location data
      if (data.length > 0) {
        const location = data[0];
        const latitude = location.lat;
        const longitude = location.lon;

        // Use the obtained coordinates (latitude and longitude) as needed
        console.log(`Coordinates for ${city}: Latitude ${latitude}, Longitude ${longitude}`);
        
        // Now, you can proceed to fetch weather data using these coordinates
        fetchWeatherData(latitude, longitude);
      } else {
        console.error('No location data found for the city:', city);
      }
    })
    .catch((error) => {
      console.error('Error fetching geo location:', error);
    });
}

// Function to fetch weather data for given coordinates
function fetchWeatherData(latitude, longitude) {
  const weatherApiEndpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapApiKey}&units=metric`;

  fetch(weatherApiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      // Handle and display weather data as needed
      // Update your UI with the weather information based on the coordinates
      // Example: Display current weather and 5-day forecast
      displayCurrentWeather(data);
      displayFiveDayForecast(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

// Function to display the current weather
function displayCurrentWeather(data) {
  const currentWeatherSection = document.getElementById('current-weather');
  // Extract and display current weather information here
}

// Function to display the 5-day forecast
function displayFiveDayForecast(data) {
  const forecastSection = document.getElementById('forecast');
  // Extract and display 5-day forecast information here
}

// Event listener for the search form submission
document.getElementById('search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const city = document.getElementById('search-input').value.trim();

  // Call the function to fetch geo location for the city
  fetchGeoLocation(city);

  // Update the search history and UI as needed
  // ...
});
