// Define constants for your API keys and endpoints
const openWeatherMapApiKey = '430b694a7dd7b9982830ab6b65dec4b0';
const geoLocationApiEndpoint = 'http://api.openweathermap.org/geo/1.0/direct';

// Initialize an array to store search history
const searchHistory = [];

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
        fetchWeatherData(city, latitude, longitude);
      } else {
        console.error('No location data found for the city:', city);
      }
    })
    .catch((error) => {
      console.error('Error fetching geo location:', error);
    });
}

// Function to fetch weather data for given coordinates
function fetchWeatherData(city, latitude, longitude) {
  const weatherApiEndpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapApiKey}&units=metric`;

  fetch(weatherApiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      // Handle and display weather data as needed
      // Update your UI with the weather information based on the coordinates
      updateUI(city, data);
      // Add the city to the search history
      addToSearchHistory(city);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

// Function to display the current weather and 5-day forecast
function updateUI(city, data) {
  // Extract and display current weather information here
  const temperature = data.list[0].main.temp;
  const humidity = data.list[0].main.humidity;

  // Update the UI element with the weather information
  const currentWeatherSection = document.getElementById('current-weather');
  currentWeatherSection.innerHTML = `
    <h2>${city}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <!-- Add more weather details as needed -->
  `;

  // Extract and display 5-day forecast information here
  const forecastSection = document.getElementById('forecast');
  const forecasts = data.list.slice(1, 6); // Exclude the current day's data

  // Generate HTML for the forecast entries
  let forecastHtml = '<h2>5-Day Forecast</h2>';
  forecasts.forEach((forecast) => {
    const date = forecast.dt_txt; // Date and time
    const temperature = forecast.main.temp;
    const humidity = forecast.main.humidity;

    forecastHtml += `
      <div class="forecast-entry">
        <p>Date: ${date}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <!-- Add more forecast details as needed -->
      </div>
    `;
  });

  // Update the UI element with the forecast data
  forecastSection.innerHTML = forecastHtml;
}

// Function to add a city to the search history
function addToSearchHistory(city) {
  // Prevent duplicate entries in the search history
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);

    // Update the UI with the search history
    updateSearchHistoryUI();
  }
}

// Function to update the search history UI
function updateSearchHistoryUI() {
    const historyList = document.getElementById('history-list'); // Updated to 'history-list'
  
    // Clear the existing history list
    historyList.innerHTML = '';
  
    // Add each city in the search history as a clickable item
    searchHistory.forEach((city) => {
      const historyItem = document.createElement('li'); // Change to 'li' element
      historyItem.textContent = city;
      historyItem.addEventListener('click', () => {
        // When a user clicks on a city in the history, fetch weather data again
        fetchGeoLocation(city);
      });
  
      historyList.appendChild(historyItem);
    });
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
