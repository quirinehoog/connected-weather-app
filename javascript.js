let now = new Date();

let h6 = document.querySelector("h6");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
let minutes = now.getMinutes();
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
  "Saturday",
];
let day = days[now.getDay()];

h6.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
  let cityElement = document.querySelector("#cityName");
  let temperatureElement= document.querySelector("#temperature"); 
  let descriptionElement=document.querySelector("#description");
  let humidityElement=document.querySelector("#humidity");
  let windElement=document.querySelector("#wind");
  let iconElement=document.querySelector("#icon");
 
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(
    response.data.main.temp
  );
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML =  Math.round(
    response.data.wind.speed
  );
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
}


function searchCity(cityName) {
  let apiKey = "cf0f1f173fb62dd2bd98180f65a77eaf";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function goSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityinput");
  searchCity(cityInputElement.value);
}

function retrievePosition(position) {
  let apiKey = "cf0f1f173fb62dd2bd98180f65a77eaf";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function gpsLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", goSearch);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", gpsLocation);

