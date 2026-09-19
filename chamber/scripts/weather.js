// Replace with your personal OpenWeatherMap API key
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; 
const lat = 14.6760; // Manila/Quezon City latitude (adjust if needed)
const lon = 121.0437; // Longitude

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    // Current Weather Call
    const response = await fetch(currentWeatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayCurrentWeather(data);
    }

    // 3-Day Forecast Call
    const forecastResponse = await fetch(forecastUrl);
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      displayForecast(forecastData);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function displayCurrentWeather(data) {
  const container = document.getElementById('current-weather');
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  container.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <img src="${icon}" alt="${desc}">
      <div>
        <p style="font-size: 1.5rem; font-weight: bold; margin: 0;">${temp}°C</p>
        <p style="text-transform: capitalize; margin: 0;">${desc}</p>
      </div>
    </div>
  `;
}

function displayForecast(data) {
  const container = document.getElementById('forecast');
  container.innerHTML = '';

  // Get 3 forecast points spaced 24 hours apart (every 8th interval in a 3-hour forecast)
  const forecastList = data.list.filter((_, index) => index % 8 === 0).slice(0, 3);

  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
    const temp = Math.round(item.main.temp);

    const dayDiv = document.createElement('div');
    dayDiv.className = 'forecast-day';
    dayDiv.innerHTML = `
      <strong>${date}</strong>
      <p>${temp}°C</p>
    `;
    container.appendChild(dayDiv);
  });
}

fetchWeather();