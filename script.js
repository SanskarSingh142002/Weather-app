const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');

// Toggle buttons
const celsiusBtn = document.getElementById('celsiusBtn');
const fahrenheitBtn = document.getElementById('fahrenheitBtn');

let currentTemperature = null;
let currentUnit = "C"; // Default is Celsius

async function checkWeather(city){
    const api_key = "841d368ff2ece4d8c403db07d8deb4bf";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    
    // Store temperature in Kelvin for later conversion
    const kelvinTemp = weather_data.main.temp;
    currentTemperature = kelvinTemp;
    updateTemperature(kelvinTemp, currentUnit);

    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.png";
            break;
    }

    console.log(weather_data);
}

function updateTemperature(temp, unit){
    let temperatureInUnit;
    
    if(unit === "C"){
        temperatureInUnit = Math.round(temp - 273.15); // Celsius
    } else {
        temperatureInUnit = Math.round((temp - 273.15) * 9/5 + 32); // Fahrenheit
    }

    temperature.innerHTML = `${temperatureInUnit} <sup>°${unit}</sup>`;
}

// Event listeners for the unit toggle buttons
celsiusBtn.addEventListener('click', () => {
    currentUnit = "C";
    celsiusBtn.classList.add("active");
    fahrenheitBtn.classList.remove("active");
    if (currentTemperature !== null) {
        updateTemperature(currentTemperature, "C");
    }
});

fahrenheitBtn.addEventListener('click', () => {
    currentUnit = "F";
    fahrenheitBtn.classList.add("active");
    celsiusBtn.classList.remove("active");
    if (currentTemperature !== null) {
        updateTemperature(currentTemperature, "F");
    }
});

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
