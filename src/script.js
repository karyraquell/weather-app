function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let year = date.getFullYear();
  let currentDate = date.getDate();
  let day = days[current.getDay()];
  let month = months[current.getMonth()];

  return `${day}, ${month} ${currentDate}, ${year} ${hours}:${minutes}`;
}

function displayCity(city) {
  let apiKey = "976b89f445ce6f533868a11eba113753";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  displayCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function displayTemp(response) {
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  let feelsLikeTemp = document.querySelector("#feels-like");
  let highTemp = document.querySelector("#high");
  let lowTemp = document.querySelector("#low");
  let weatherIcon = document.querySelector("#weather-icon");

  celsiusTemp = response.data.main.temp;
  celsiusFeelsLike = response.data.main.feels_like;
  celsiusHighTemp = response.data.main.temp_max;
  celsiusLowTemp = response.data.main.temp_min;

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(celsiusTemp);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  description.innerHTML = response.data.weather[0].main;
  feelsLikeTemp.innerHTML = Math.round(celsiusFeelsLike);
  highTemp.innerHTML = Math.round(celsiusHighTemp);
  lowTemp.innerHTML = Math.round(celsiusLowTemp);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showPosition(position) {
  let apiKey = "976b89f445ce6f533868a11eba113753";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCity = document.querySelector("#search-current");
currentCity.addEventListener("click", getCurrentPosition);

function displayCelsius(event) {
  event.preventDefault();

  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemp);

  let feelsLikeTemp = document.querySelector("#feels-like");
  feelsLikeTemp.innerHTML = Math.round(celsiusFeelsLike);

  let highTemp = document.querySelector("#high");
  highTemp.innerHTML = Math.round(celsiusHighTemp);

  let lowTemp = document.querySelector("#low");
  lowTemp.innerHTML = Math.round(celsiusLowTemp);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

function displayFahrenheit(event) {
  event.preventDefault();

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);

  let fahrenheitFeelsLike = (celsiusFeelsLike * 9) / 5 + 32;
  let feelsLikeTemp = document.querySelector("#feels-like");
  feelsLikeTemp.innerHTML = Math.round(fahrenheitFeelsLike);

  let fahrenheitHigh = (celsiusHighTemp * 9) / 5 + 32;
  let highTemp = document.querySelector("#high");
  highTemp.innerHTML = Math.round(fahrenheitHigh);

  let fahrenheitLow = (celsiusLowTemp * 9) / 5 + 32;
  let lowTemp = document.querySelector("#low");
  lowTemp.innerHTML = Math.round(fahrenheitLow);
}

let celsiusTemp = null;
let celsiusFeelsLike = null;
let celsiusHighTemp = null;
let celsiusLowTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let dateToday = document.querySelector("#date");
let current = new Date();
dateToday.innerHTML = formatDate(current);

displayCity("Parma");