const WEATHER_LAT = 14.6760;
const WEATHER_LON = 121.0437;
const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_LAT}&longitude=${WEATHER_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FManila&forecast_days=3`;

const weatherDescriptions = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Fog', 48: 'Depositing rime fog',
  51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
  71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow', 80: 'Rain showers', 81: 'Moderate rain showers',
  82: 'Violent rain showers', 95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail'
};

function weatherIcon(code) {
  if ([0, 1].includes(code)) return '☀️';
  if ([2, 3].includes(code)) return '⛅';
  if ([45, 48].includes(code)) return '🌫️';
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️';
  if ([95, 96, 99].includes(code)) return '⛈️';
  return '🌤️';
}

async function fetchWeather() {
  const current = document.getElementById('current-weather');
  const forecast = document.getElementById('forecast');
  if (!current || !forecast) return;
  try {
    const response = await fetch(WEATHER_URL);
    if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);
    const data = await response.json();
    displayCurrentWeather(data.current);
    displayForecast(data.daily);
  } catch (error) {
    current.innerHTML = '<p>Weather data is temporarily unavailable.</p>';
    forecast.innerHTML = '<p>Forecast unavailable.</p>';
    console.error('Weather error:', error);
  }
}

function displayCurrentWeather(data) {
  const container = document.getElementById('current-weather');
  const description = weatherDescriptions[data.weather_code] || 'Current conditions';
  container.innerHTML = `
    <div class="weather-main">
      <span aria-hidden="true" class="weather-symbol">${weatherIcon(data.weather_code)}</span>
      <div>
        <div class="weather-temp">${Math.round(data.temperature_2m)}°C</div>
        <div class="weather-desc">${description}</div>
        <small>Feels like ${Math.round(data.apparent_temperature)}°C • Humidity ${data.relative_humidity_2m}% • Wind ${Math.round(data.wind_speed_10m)} km/h</small>
      </div>
    </div>`;
}

function displayForecast(data) {
  const container = document.getElementById('forecast');
  container.innerHTML = data.time.map((date, index) => {
    const day = new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' });
    const description = weatherDescriptions[data.weather_code[index]] || 'Conditions';
    return `<article class="forecast-day"><strong>${day}</strong><div aria-hidden="true" class="forecast-icon">${weatherIcon(data.weather_code[index])}</div><p>${Math.round(data.temperature_2m_max[index])}° / ${Math.round(data.temperature_2m_min[index])}°C</p><small>${description}</small></article>`;
  }).join('');
}
fetchWeather();
