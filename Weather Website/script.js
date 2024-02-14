function fetchWeatherData(city) {
    const apiKey = 'b4201261a1594f8aa98161030241402'; //WeatherAPI.com API key used to fetch real-time weather
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(city) {
    fetchWeatherData(city)
        .then(data => {
            const { current } = data;
            const temperature = current.temp_c;
            const windSpeed = current.wind_kph;
            const humidity = current.humidity;
            const condition = current.condition.text;
            const uvIndex = current.uv;
            const pressureMb = current.pressure_mb;
            const visibilityKm = current.vis_km;

            const weatherContainer = document.getElementById('weather');
            weatherContainer.innerHTML = `
                <div class="weather-data">
                    <span>Temperature:</span> ${temperature}°C
                </div>
                <div class="weather-data">
                    <span>Wind Speed:</span> ${windSpeed} kph
                </div>
                <div class="weather-data">
                    <span>Humidity:</span> ${humidity}%
                </div>
                <div class="weather-data">
                    <span>Condition:</span> ${condition}
                </div>
                <div class="weather-data">
                    <span>UV Index:</span> ${uvIndex}
                </div>
                <div class="weather-data">
                    <span>Air Pressure:</span> ${pressureMb} hPa
                </div>
                <div class="weather-data">
                    <span>Visibility:</span> ${visibilityKm} km
                </div>
            `;
        });
}

document.getElementById('cityForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityInput = document.getElementById('cityInput').value;
    displayWeather(cityInput);
});
