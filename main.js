import { getLongLat } from "./utils/getLongLat.js";

const form = document.querySelector("form");
const output = document.querySelector("#post-code");
const current = document.querySelector("#current");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  output.innerHTML = "";
  const formData = new FormData(form);
  const searchedPostcode = formData.get("postcode");

  output.innerHTML = searchedPostcode;
  form.reset();

  try {
    const coordinates = await getLongLat(searchedPostcode);
    let lat = coordinates.latitude;
    let lon = coordinates.longitude;
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

      sunrise.textContent = `Sunrise: ${s_rise}`;

      const sunset = document.createElement("h4");
      sunset.textContent = `Sunset: ${s_set}`;

      const windSpeedHeading = document.createElement("h4");
      windSpeedHeading.textContent = `Wind Speed: ${current_windSpeed} km/h`;

      current.appendChild(temperatureHeading);
      current.appendChild(windSpeedHeading);
      current.appendChild(sunrise);
      current.appendChild(sunset);

      console.log(resData);
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.log(error);
  }
});
