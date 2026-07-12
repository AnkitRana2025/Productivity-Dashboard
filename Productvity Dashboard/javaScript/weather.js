const city = document.getElementById("city");

const temprature = document.getElementById("temprature");

const weatherStatus = document.getElementById("weatherStatus");

const humidity = document.getElementById("humidity");

const wind = document.getElementById("wind");

const weatherTemp = document.getElementById("weatherTemp");

const weatherIcon = document.getElementById("weatherIcon");

function getLocation() {

    if (!navigator.geolocation) {

        alert("Geolocation is not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition((position) => {

    getWeather(
        position.coords.latitude,
        position.coords.longitude
    );

});

}

async function getWeather(lat, lon) {

    try {

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        );

        const data = await response.json();

        const cityResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );

        const cityData = await cityResponse.json();

        city.textContent =
            cityData.address.city ||
            cityData.address.town ||
            cityData.address.village ||
            "Unknown";

        const current = data.current;

        temprature.textContent =
            `${Math.round(current.temperature_2m)}°C`;

        weatherTemp.textContent =
            `${Math.round(current.temperature_2m)}°C`;

        humidity.textContent =
            `${current.relative_humidity_2m}%`;

        wind.textContent =
            `${current.wind_speed_10m} km/h`;

        weatherStatus.textContent =
            weatherCodes[current.weather_code] || "Unknown";

        changeWeatherIcon(current.weather_code);

    }

    catch (error) {

        console.log(error);

    }

}

const weatherCodes = {

    0: "Clear Sky",

    1: "Mainly Clear",

    2: "Partly Cloudy",

    3: "Cloudy",

    45: "Fog",

    48: "Fog",

    51: "Light Drizzle",

    53: "Drizzle",

    55: "Heavy Drizzle",

    61: "Light Rain",

    63: "Rain",

    65: "Heavy Rain",

    71: "Snow",

    73: "Heavy Snow",

    80: "Rain Showers",

    95: "Thunderstorm"

};

function changeWeatherIcon(code) {

    if (code === 0) {

        weatherIcon.src = "./assets/sunny.png";

    }

    else if (code >= 1 && code <= 3) {

        weatherIcon.src = "./assets/cloudy sun.png";

    }

    else if (code >= 51 && code <= 65) {

        weatherIcon.src = "./assets/rainy.png";

    }

    else if (code >= 71 && code <= 86) {

        weatherIcon.src = "./assets/snow.png";

    }

    else if (code >= 95) {

        weatherIcon.src = "./assets/storm.png";

    }

    else {

        weatherIcon.src = "./assets/cloudy sun.png";

    }

}




getLocation();