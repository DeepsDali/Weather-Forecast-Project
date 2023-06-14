import { getLongLat } from "./utils/getLongLat.js";
import { getLocation } from "./utils/getLocation.js";
import { getMap } from "./utils/getMap.js";

const form = document.querySelector("form");
const place = document.querySelector("#county-post");
const output = document.querySelector("#post-code");
const county = document.querySelector("#county");
const current = document.querySelector("#current");
const currentsun = document.querySelector("#currentsun");
const currSunrise = document.querySelector("#current-sunrise");
const currSunset = document.querySelector("#current-sunset");

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let image = null;

document.addEventListener("DOMContentLoaded", function () {
  // Set the default postcode
  const defaultPostcode = "N2 9NX";

  // Dispatch a submit event on the form element with the default postcode
  const submitEvent = new Event("submit");
  form.querySelector("[name='postcode']").value = defaultPostcode;
  form.dispatchEvent(submitEvent);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const searchedPostcode = formData.get("postcode");

  output.textContent = searchedPostcode;
  form.reset();

  try {
    const location = await getLocation(searchedPostcode);
    let loc = location.admin_district;
    county.textContent = loc;
    const coordinates = await getLongLat(searchedPostcode);
    let lat = coordinates.latitude;
    let lon = coordinates.longitude;
    const imageURL = await getMap(lat, lon);
    const mapDiv = document.querySelector("#location");
    const newImage = document.createElement("img");
    newImage.classList.add("map-image");
    newImage.src = imageURL;
    newImage.alt = "map of searched postcode";
    if (image) {
      // If a previous map exists, remove it from the DOM
      mapDiv.removeChild(image);
    }
    // Append the new map to the mapDiv
    image = newImage; // Update the reference to the new map
    mapDiv.appendChild(newImage);

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FLondon`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const resData = await response.json();
      // console.log(resData);

      let current_temp = resData.current_weather.temperature;
      let current_temp_code = resData.current_weather.weathercode;
      let current_windSpeed = resData.current_weather.windspeed;
      let s_rise = resData.daily.sunrise;
      let s_set = resData.daily.sunset;
      let fore_max = resData.daily.temperature_2m_max;
      let fore_min = resData.daily.temperature_2m_min;
      let fore_code = resData.daily.weathercode;
      let date_arr = resData.daily.time;

      const temperatureHeading = document.createElement("h3");
      temperatureHeading.textContent = `${current_temp}°`;

      const windSpeedHeading = document.createElement("h3");
      windSpeedHeading.textContent = `${current_windSpeed} km/h`;

      const current_icon = document.createElement("img");
      current_icon.classList.add("icon");
      current_icon.src = `./icons/${current_temp_code}.svg `;

      const wind_icon = document.createElement("img");
      wind_icon.classList.add("icon");
      wind_icon.src = `./icons/wind.svg `;

      const sunrise = document.createElement("h3");
      const sunriseTime = s_rise[0].split("T")[1].slice(0, 5);
      sunrise.textContent = `${sunriseTime}`;
      const sunrise_icon = document.createElement("img");
      sunrise_icon.classList.add("icon");
      sunrise_icon.src = `./icons/sunrise.svg`;

      const sunset = document.createElement("h3");
      const sunsetTime = s_set[0].split("T")[1].slice(0, 5);
      sunset.textContent = `${sunsetTime}`;
      const sunset_icon = document.createElement("img");
      sunset_icon.classList.add("icon");
      sunset_icon.src = `./icons/sunset.svg`;
      // forecast
      for (let i = 1; i < 6; i++) {
        let weekday = date_arr[i - 1];
        weekday = new Date(weekday);
        weekday = weekday.getDay();
        weekday = weekdays[weekday];
        console.log(weekday);

        const day = document.createElement("div");

        const forecast_day = document.createElement("h4");
        forecast_day.className = "dayofweek";
        forecast_day.textContent = `${weekday}`;
        day.appendChild(forecast_day);

        const forecast_icon = document.createElement("img");
        forecast_icon.classList.add("icon");
        forecast_icon.src = `./icons/${fore_code[i - 1]}.svg`;
        day.appendChild(forecast_icon);

        const forecast_max = document.createElement("h4");
        forecast_max.className = "maxtemp";
        forecast_max.textContent = `${fore_max[i - 1]}°`;
        day.appendChild(forecast_max);

        const forecast_min = document.createElement("h4");
        forecast_min.className = "mintemp";
        forecast_min.textContent = `${fore_min[i - 1]}°`;
        day.appendChild(forecast_min);

        document.querySelector(`#day${i}`).innerHTML = "";
        document.querySelector(`#day${i}`).appendChild(day);
      }

      current.appendChild(current_icon);
      current.appendChild(temperatureHeading);
      current.appendChild(wind_icon);
      current.appendChild(windSpeedHeading);

      currentsun.appendChild(currSunrise);
      currentsun.appendChild(currSunset);
      currSunrise.appendChild(sunrise_icon);
      currSunrise.appendChild(sunrise);
      currSunset.appendChild(sunset_icon);
      currSunset.appendChild(sunset);
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.log(error);
  }
});
