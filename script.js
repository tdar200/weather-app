const form = document.querySelector("#form");
const search = document.querySelector(".search");
const cityTitle = document.querySelector(".city");
const temperatureTitle = document.querySelector(".temperature");
const highTitle = document.querySelector(".high");
const lowTitle = document.querySelector(".low");
const cloudTitle = document.querySelector(".cloud");
const weatherContainer = document.querySelectorAll(".weather");
const container2 = document.querySelector(".container-2");
const table = document.querySelector(".table-body");

let city = "London";
const APIKEY = "4fbbc083a194648d84f044ca33381cb6";
const URLString = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}&units=metric`;

async function getData(url) {
  const response = await fetch(url);

  const data = await response.json();

  getWeather(data);
}

const getWeather = (weather) => {

  weatherContainer[0].innerHTML = ""
  table.innerHTML = ""
  container2.innerHTML = ""


  cityTitle.innerHTML = weather.city.name;
  temperatureTitle.innerHTML = `${weather.list[0].main.temp}° C`;
  highTitle.innerHTML = `high: ${weather.list[0].main.temp_max}° C`;
  lowTitle.innerHTML = `low: ${weather.list[0].main.temp_min}° C`;
  cloudTitle.innerHTML = weather.list[0].weather[0].main;

  const divContainer2 = document.createElement("div");

  divContainer2.classList.add("wrapper");

  const sunrise = new Date(weather.city.sunrise * 1000);
  const sunset = new Date(weather.city.sunset * 1000);

  divContainer2.innerHTML = `
  <div>
  <h2>Sunrise</h2>
  <p>${sunrise.getHours()}:${
    sunrise.getMinutes() < 10
      ? "0" + sunrise.getMinutes()
      : sunrise.getMinutes()
  }</p>
  </div>
  <div>
  <h2>Sunset</h2>
  <p>${sunset.getHours()}:${
    sunset.getMinutes() < 10 ? "0" + sunset.getMinutes() : sunset.getMinutes()
  }</p>
  </div>
  <div>
  <h2>Feels Like</h2>
  <p>${weather.list[0].main.feels_like}° C</p>
  </div>
  <div>
  <h2>Humidity</h2>
  <p>${weather.list[0].main.humidity}%</p>
  </div>
  <div>
  <h2>Pressure</h2>
  <p>${weather.list[0].main.pressure} hPa</p>
  </div>
  <div>
  <h2>Wind</h2>
  <p>${weather.list[0].wind.speed} km/h</p>
  </div>

  `;

  container2.appendChild(divContainer2);

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  let idx = 0;

  weather.list.forEach((item, index) => {
    const divContainer = document.createElement("div");
    const divContainer3 = document.createElement("div");

    let date = new Date(item.dt_txt).toLocaleDateString();
    let time = new Date(item.dt_txt).toLocaleTimeString();
    let day = new Date(item.dt_txt).getDay();

    divContainer.innerHTML = `
    <h3>${date}</h3>
    <h3>${time}</h3>
    <img src=${
      "http://openweathermap.org/img/w/" + item.weather[0].icon + ".png"
    } />
    <p>${item.main.temp}° C</p>

  `;

    if (idx === index) {
      divContainer3.innerHTML = `
    <h3>${days[day]}</h3>
    <h3>${item.wind.speed} km/h</h3>
    <h3>${item.main.humidity}%</h3>
    <h3>${item.main.temp}° C</h3>
    <img style="max-width:65PX" src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" />
    `;

      table.appendChild(divContainer3);
      idx = idx + 7;
    }

    weatherContainer[0].appendChild(divContainer);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getData(
      `http://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${APIKEY}&units=metric`
    );
  } else {
    window.location.reload();
  }
});

getData(URLString);
