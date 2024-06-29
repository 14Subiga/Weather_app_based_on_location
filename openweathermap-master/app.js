// var input = document.querySelector('.input_text');
// var main = document.querySelector('#name');
// var temp = document.querySelector('.temp');
// var desc = document.querySelector('.desc');
// var clouds = document.querySelector('.clouds');
// var button= document.querySelector('.submit');


// button.addEventListener('click', function(name){
// fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=57ac2c73879e53c4846458b535fa088e')
// .then(response => response.json())
// .then(data => {
//   var tempValue = data['main']['temp'];
//   var nameValue = data['name'];
//   var descValue = data['weather'][0]['description'];

//   main.innerHTML = nameValue;
//   desc.innerHTML = "Desc - "+descValue;
//   temp.innerHTML = "Temp - "+tempValue;
//   input.value ="";

// })

// .catch(err => alert("Wrong city name!"));
// })




// var input = document.querySelector('.input_text');
// var container = document.querySelector('.container');
// var button = document.querySelector('.submit');

// button.addEventListener('click', function() {
//   fetch('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + input.value + '&units=metric&cnt=7&appid=57ac2c73879e53c4846458b535fa088e')
//     .then(response => response.json())
//     .then(data => {
//       container.innerHTML = ''; // Clear previous data

//       data.list.forEach(day => {
//         var card = document.createElement('div');
//         card.classList.add('card');

//         var date = new Date(day.dt * 1000).toLocaleDateString();
//         var temp = day.temp.day;
//         var humidity = day.humidity;
//         var pressure = day.pressure;
//         var weather = day.weather[0].description;
//         var windSpeed = day.speed;

//         card.innerHTML = `
//           <h1>${data.city.name} - ${date}</h1>
//           <p>Temp: ${temp}°C</p>
//           <p>Humidity: ${humidity}%</p>
//           <p>Pressure: ${pressure} hPa</p>
//           <p>Weather: ${weather}</p>
//           <p>Wind Speed: ${windSpeed} m/s</p>
//         `;

//         container.appendChild(card);
//         document.body.style.background = getBackgroundColor(weather);
//       });

//       input.value = '';
//     })
//     .catch(err => alert("City not found!"));
// });

// function getBackgroundColor(weather) {
//   if (weather.includes('cloud')) {
//     return '#d3d3d3';
//   } else if (weather.includes('rain')) {
//     return '#a4b0be';
//   } else if (weather.includes('clear')) {
//     return '#f7b733';
//   } else {
//     return '#f8f8f8';
//   }
// }



const API_KEY = '57ac2c73879e53c4846458b535fa088e';
const submitBtn = document.getElementById('submit-btn');
const countryInput = document.getElementById('country-input');
const weatherInfo = document.getElementById('weather-info');

submitBtn.addEventListener('click', () => {
    const country = countryInput.value.trim();
    if (country) {
        getWeatherData(country);
    } else {
        alert('Please enter a country name');
    }
});

function getWeatherData(country) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Could not fetch weather data. Please try again.');
        });
}

function displayWeatherData(data) {
    const { name, sys: { country, sunrise, sunset }, main: { temp, humidity, pressure }, wind: { speed } } = data;
    weatherInfo.innerHTML = `
        <div class="weather-item"><strong>Location:</strong> ${name}, ${country}</div>
        <div class="weather-item"><strong>Temperature:</strong> ${temp} °C</div>
        <div class="weather-item"><strong>Humidity:</strong> ${humidity} %</div>
        <div class="weather-item"><strong>Pressure:</strong> ${pressure} hPa</div>
        <div class="weather-item"><strong>Wind Speed:</strong> ${speed} m/s</div>
        <div class="weather-item"><strong>Sunrise:</strong> ${formatTime(sunrise)}</div>
        <div class="weather-item"><strong>Sunset:</strong> ${formatTime(sunset)}</div>
    `;
}

function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}
