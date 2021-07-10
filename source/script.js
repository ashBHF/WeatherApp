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


//https://api.openweathermap.org/data/2.5/weather?q=denver&appid=c284e41e5087d96e9a0af3b148134460


/*function currentPositionWeather(position) {
  let units = "metric";
  let apiKey = "c284e41e5087d96e9a0af3b148134460";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(populateCircleOne);
}

navigator.geolocation.getCurrentPosition(currentPositionWeather);
*/
function displayForecastAbbreviated(){
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Tues", "Wed", "Thurs"];

  days.forEach(function(day) { 

  forecastHTML = forecastHTML + `
          <div class ="col-4 day4"><img src="https://openweathermap.org/img/wn/01d@2x.png" id = "weather-icon4"/><span>${day}</span></br>sunny</br>70° - 75°</div>`
 

})

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function populateCircleOne(response) {

  celsiusTemperature = response.data.main.temp;
  
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

  getForecast(response.data.coord);
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

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#number");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let farenheitEquation = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = `${Math.round(farenheitEquation)}°`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#number");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  currentTemperature.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#farenheit-conversion");
fahrenheitLink.addEventListener("click", displayFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-conversion");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function getForecast(coordinates) {
  let apiKey = "c284e41e5087d96e9a0af3b148134460";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}


function displayForecast(response) {
  console.log(response.data.daily[2].weather);

  let secondCircleDay = document.querySelector(".day");
  secondCircleDay.innerHTML = formatDay(response.data.daily[1].dt);

  let pngIdentifier2 = response.data.daily[1].weather[0].icon;
  let weatherIcon2 = document.querySelector("#weather-icon2");
  weatherIcon2.setAttribute("src", `https://openweathermap.org/img/wn/${pngIdentifier2}@2x.png`); 

  let secondCircleWeather = document.querySelector(".weather2");
  secondCircleWeather.innerHTML = response.data.daily[1].weather[0].description;

  let secondCircleTemp = document.querySelector(".avg-temp2");
  secondCircleTemp.innerHTML = `${Math.round(response.data.daily[1].temp.day)}°`;

  let secondCircleMin = document.querySelector("#second-circle-min");
  secondCircleMin.innerHTML = `${Math.round(response.data.daily[1].temp.min)}° -`;  

  let secondCircleMax = document.querySelector("#second-circle-max");
  secondCircleMax.innerHTML = ` ${Math.round(response.data.daily[1].temp.max)}°`; 

  let thirdCircleDay = document.querySelector(".day3");
  thirdCircleDay.innerHTML = formatDay(response.data.daily[2].dt);

  let pngIdentifier3 = response.data.daily[2].weather[0].icon;
  let weatherIcon3 = document.querySelector("#weather-icon3");
  weatherIcon3.setAttribute("src", `https://openweathermap.org/img/wn/${pngIdentifier3}@2x.png`); 

  let thirdCircleWeather = document.querySelector(".weather3");
  thirdCircleWeather.innerHTML = response.data.daily[2].weather[0].description;

  let thirdCircleTemp = document.querySelector(".avg-temp3");
  thirdCircleTemp.innerHTML = `${Math.round(response.data.daily[2].temp.day)}°`;

  let thirdCircleMin = document.querySelector("#third-circle-min");
  thirdCircleMin.innerHTML = `${Math.round(response.data.daily[2].temp.min)}° -`;  

  let thirdCircleMax = document.querySelector("#third-circle-max");
  thirdCircleMax.innerHTML = ` ${Math.round(response.data.daily[2].temp.max)}°`; 
}

displayForecastAbbreviated();
search("fort collins");