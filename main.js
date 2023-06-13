import { getLongLat } from "./utils/getLongLat.js";
import { getLocation } from "./utils/getLocation.js";
import { getMap } from "./utils/getMap.js";

const form = document.querySelector("form");
const output = document.querySelector("#post-code");
const county = document.querySelector("#county");
const current = document.querySelector("#current");
const currentsun = document.querySelector("#currentsun");

const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let image = null;

document.addEventListener("DOMContentLoaded", function() {
  // Set the default postcode
  const defaultPostcode = "n2 9nx";

  // Dispatch a submit event on the form element with the default postcode
  const submitEvent = new Event("submit");
  form.querySelector("[name='postcode']").value = defaultPostcode;
  form.dispatchEvent(submitEvent);
});
  
form.addEventListener("submit", async (event) =>{
  event.preventDefault();

  current.innerHTML = "";
  currentsun.innerHTML = "";
  output.innerHTML = "";
  county.innerHTML = "";

  const formData = new FormData(form);
  const searchedPostcode = formData.get("postcode");

  output.innerHTML = searchedPostcode;
  form.reset();

  try {
    const location = await getLocation(searchedPostcode);
    let loc = location.admin_district;
    county.innerHTML = loc;
    const coordinates = await getLongLat(searchedPostcode);
    let lat = coordinates.latitude;
    let lon = coordinates.longitude;
    const imageURL = await getMap(lat, lon);
    const mapDiv = document.querySelector("#map");
    const newImage = document.createElement("img");
    newImage.src = imageURL;
    newImage.alt = "map of searched postcode";
    if (image) {
      // If a previous map exists, remove it from the DOM
      mapDiv.removeChild(image);
    }
    // Append the new map to the mapDiv
    image = newImage; // Update the reference to the new map
    mapDiv.appendChild(newImage);

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FLondon`

    const response = await fetch(apiUrl);

    if (response.ok) {
      const resData = await response.json();
      console.log(resData);

      let current_temp = resData.current_weather.temperature;
      let current_temp_code = resData.current_weather.weathercode;
      let current_windSpeed = resData.current_weather.windspeed;
      let s_rise = resData.daily.sunrise;
      let s_set = resData.daily.sunset;
      let fore_max = resData.daily.temperature_2m_max
      let fore_min = resData.daily.temperature_2m_min
      let fore_code = resData.daily.weathercode
      let date_arr = resData.daily.time
      console.log(date_arr)

      const temperatureHeading = document.createElement("h4");
      temperatureHeading.textContent = `Temperature: ${current_temp} °C`;

      const windSpeedHeading = document.createElement("h4");
      windSpeedHeading.textContent = `Wind Speed: ${current_windSpeed} km/h`;

      const current_icon = document.createElement("h4");
      current_icon.textContent = `code: ${current_temp_code} `;

      const sunrise = document.createElement("p");
      const sunriseTime = s_rise[0].split("T")[1].slice(0, 5);
      sunrise.textContent = `${sunriseTime}`;

      const sunset = document.createElement("p");
      const sunsetTime = s_set[0].split("T")[1].slice(0, 5);
      sunset.textContent = `${sunsetTime}`;

      // forecast
      for (let i=1;i<8;i++){
        let weekday = date_arr[i-1]
        weekday = new Date(weekday)
        weekday = weekday.getDay()
        weekday = weekdays[weekday]
        console.log(weekday)
        // day.appendChild(weekday)

        const day = document.createElement("div");
        const forecast_max = document.createElement("h4");
        forecast_max.textContent = `${fore_max[i-1]}°C`;
        day.appendChild(forecast_max);

        const forecast_min = document.createElement("h4");
        forecast_min.textContent = `${fore_min[i-1]}°C`;
        day.appendChild(forecast_min);

        const forecast_code = document.createElement("h4");
        forecast_code.textContent = `code: ${fore_code[i-1]}`;
        day.appendChild(forecast_code);

        document.querySelector(`#day${i}`).innerHTML = "";
        document.querySelector(`#day${i}`).appendChild(day);

      }

      current.appendChild(temperatureHeading);
      current.appendChild(windSpeedHeading);
      current.appendChild(current_icon);
      currentsun.appendChild(sunrise);
      currentsun.appendChild(sunset);

    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.log(error);
  }
});
