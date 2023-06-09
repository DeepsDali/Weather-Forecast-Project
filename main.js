import { getLongLat } from "./utils/getLongLat.js";
import { getLocation } from "./utils/getLocation.js";
import { getMap } from "./utils/getMap.js";

const form = document.querySelector("form");
const output = document.querySelector("#post-code");
const county = document.querySelector("#county");
const current = document.querySelector("#current");
const currentsun = document.querySelector("#currentsun");
let image = null;
form.addEventListener("submit", async (event) => {
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
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;
    console.log(date);

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&current_weather=true&start_date=${date}&end_date=${date}&timezone=Europe%2FLondon`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const resData = await response.json();

      let current_temp = resData.current_weather.temperature;
      let current_windSpeed = resData.current_weather.windspeed;
      let s_rise = resData.daily.sunrise;
      let s_set = resData.daily.sunset;

      const temperatureHeading = document.createElement("h4");
      temperatureHeading.textContent = `Temperature: ${current_temp} °C`;

      const sunrise = document.createElement("h4");
      const sunriseTime = s_rise[0].split("T")[1].slice(0, 5);
      sunrise.textContent = `Sunrise: ${sunriseTime}`;

      const sunset = document.createElement("h4");
      const sunsetTime = s_set[0].split("T")[1].slice(0, 5);
      sunset.textContent = `Sunset: ${sunsetTime}`;

      const windSpeedHeading = document.createElement("h4");
      windSpeedHeading.textContent = `Wind Speed: ${current_windSpeed} km/h`;

      current.appendChild(temperatureHeading);
      current.appendChild(windSpeedHeading);
      currentsun.appendChild(sunrise);
      currentsun.appendChild(sunset);

      console.log(resData);
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.log(error);
  }
});
