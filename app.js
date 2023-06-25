const apiKey = "4cdd26ba31fa0780dd24973ba991d3dc";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + " °C";
  document.querySelector(".low").innerHTML =
    Math.round(data.main.temp_min) + " °C";
  document.querySelector(".high").innerHTML =
    Math.round(data.main.temp_max) + " °C";
  document.querySelector(".pressure").innerHTML = data.main.pressure + " Pa";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(
    ".weather-icon"
  ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
const forecastContainer = document.querySelector(".forecast-container");

function displayForecast(forecastData) {
  forecastContainer.innerHTML = "";

  forecastData.list.forEach((forecast) => {
    const forecastTime = new Date(forecast.dt * 1000).toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        hour12: true,
      }
    );
    const forecastTemperature = Math.round(forecast.main.temp);
    const forecastDescription = forecast.weather[0].description;
    const forecastIcon = forecast.weather[0].icon;

    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    const forecastTimeElement = document.createElement("p");
    forecastTimeElement.classList.add("forecast-time");
    forecastTimeElement.textContent = forecastTime;

    const forecastTempElement = document.createElement("p");
    forecastTempElement.classList.add("forecast-temp");
    forecastTempElement.innerHTML = `${forecastTemperature} °C`;

    const forecastDescElement = document.createElement("p");
    forecastDescElement.classList.add("forecast-desc");
    forecastDescElement.textContent = forecastDescription;

    const forecastIconElement = document.createElement("img");
    forecastIconElement.classList.add("forecast-icon");
    forecastIconElement.src = `https://openweathermap.org/img/wn/${forecastIcon}.png`;

    forecastCard.appendChild(forecastTimeElement);
    forecastCard.appendChild(forecastTempElement);
    forecastCard.appendChild(forecastDescElement);
    forecastCard.appendChild(forecastIconElement);

    forecastContainer.appendChild(forecastCard);
  });
}
searchBtn.addEventListener("click", async () => {
  const city = searchBox.value;
  await checkWeather(city);

  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?appid=4cdd26ba31fa0780dd24973ba991d3dc&units=metric&q=${city}`
  );
  const forecastData = await forecastResponse.json();

  displayForecast(forecastData);
});
