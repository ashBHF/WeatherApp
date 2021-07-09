let today = new Date();

let getDate = document.querySelector(".date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let time = today.toLocaleTimeString([], { timeStyle: "short" });

getDate.innerHTML = `${day}, ${time}`;
/*
function cityInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  //alert(searchInput.value);

 let divCity = document.querySelector(".city");
  if (searchInput.value) {
    divCity.innerHTML = `${searchInput.value}`;
  }}


let enterCity = document.querySelector("#city-search");
enterCity.addEventListener("submit", cityInput);

function outputCelsius(event) {
  event.preventDefault();
  let changeCelsius = document.querySelector("#number");
  changeCelsius.innerHTML = "16°";
}

let displayCelsius = document.querySelector("#celsius");
displayCelsius.addEventListener("click", outputCelsius);

function outputFarenheit(event) {
  event.preventDefault();
  let changeFarenheit = document.querySelector("#number");
  changeFarenheit.innerHTML = "60.8°";
}

let displayFarenheit = document.querySelector("#farenheit");
displayFarenheit.addEventListener("click", outputFarenheit);
*/

//https://api.openweathermap.org/data/2.5/weather?q=denver&appid=c284e41e5087d96e9a0af3b148134460


/*function currentPositionWeather(position) {
  let units = "metric";
  let apiKey = "c284e41e5087d96e9a0af3b148134460";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(populateCircleOne);
}

navigator.geolocation.getCurrentPosition(currentPositionWeather);
*/

function populateCircleOne(response) {
  
  let city = response.data.name;
  let cityHeader = document.querySelector(".city");
  cityHeader.innerHTML = `${city}`;

  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#number");
  currentTemperature.innerHTML = `${temperature}°`;

  let weather = response.data.weather[0].description;
  let weatherHeader = document.querySelector(".weather");
  weatherHeader.innerHTML = `${weather}`;

  let minTemp = Math.round(response.data.main.temp_min);
  let tempRangeLow = document.querySelector("#low");
  tempRangeLow.innerHTML = `${minTemp}°`;

  let maxTemp = Math.round(response.data.main.temp_max);
  let tempRangeHigh = document.querySelector("#high");
  tempRangeHigh.innerHTML = `${maxTemp}°`;

  let pngIdentifier = response.data.weather[0].icon;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${pngIdentifier}@2x.png`); 

  let windSummary = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = (`wind: ${windSummary} km/hr`);

  let humiditySummary = response.data.main.humidity;
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `humidity: ${humiditySummary}%`;
}

function search(city) {
  let apiKey = "c284e41e5087d96e9a0af3b148134460";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(populateCircleOne);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = searchInput.value;
  search(city);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", handleSubmit);

/*function displayFarenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#number");
  //let farenheitEquation = (`${temperature}` * 9) / 5 + 32;
  currentTemperature.innerHTML = (`${temperature}` * 9) / 5 + 32;
}

  //let temperature = Math.round(response.data.main.temp);
  //let currentTemperature = document.querySelector("#number");
  //currentTemperature.innerHTML = `${temperature}°`;

//let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#farenheit-conversion");
fahrenheitLink.addEventListener("click", displayFarenheitTemperature);
*/
search("fort collins");