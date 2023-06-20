import { getLongLat } from "./utils/getLongLat.js";
import { getLocation } from "./utils/getLocation.js";
import { getMap } from "./utils/getMap.js";
import { getMessage } from "./utils/getMessage.js";

const form = document.querySelector("form");
const place = document.querySelector("#county-post");
const output = document.querySelector("#post-code");
const county = document.querySelector("#county");
const current = document.querySelector("#current");
const currentsun = document.querySelector("#currentsun");
const currSunrise = document.querySelector("#current-sunrise");
const currSunset = document.querySelector("#current-sunset");
const forecastMessage = document.querySelector(".forecast-message");
const invalidMessage = document.querySelector(".invalid-message");

const bufferingOverlay = document.querySelector("#buffering-overlay");
const bufferingContent = document.querySelector(".buffering-content");

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let image = null;

document.addEventListener("DOMContentLoaded", async () => {
  const defaultPostcode = "N2 9NX";
  const submitEvent = new Event("submit");
  form.querySelector("[name='postcode']").value = defaultPostcode;
  form.dispatchEvent(submitEvent);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  showBufferingOverlay();

  const formData = new FormData(form);
  const searchedPostcode = formData.get("postcode").toUpperCase().replace(/(\d{3})$/, " $1");
  form.reset();

  try {
    const validateResultFetch = await fetch(`https://api.postcodes.io/postcodes/${searchedPostcode}/validate`);
    const validateResult = await validateResultFetch.json();

    if (!validateResult.result) {
      throw new Error("Invalid postcode");
    }

    invalidMessage.style.display = "none";
    const location = await getLocation(searchedPostcode);
    const coordinates = await getLongLat(searchedPostcode);
    const imageURL = await getMap(coordinates.latitude, coordinates.longitude);
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FLondon`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const resData = await response.json();
      const {
        current_weather: {
          temperature: current_temp,
          weathercode: current_temp_code,
          windspeed: current_windSpeed
        },
        daily: {
          sunrise: s_rise,
          sunset: s_set,
          temperature_2m_max: fore_max,
          temperature_2m_min: fore_min,
          weathercode: fore_code,
          time: date_arr
        }
      } = resData;

      invalidMessage.style.display = "none";
      county.textContent = location.admin_district;
      output.textContent = searchedPostcode;
      const mapDiv = document.querySelector("#location");
      const newImage = document.createElement("img");
      newImage.classList.add("map-image");
      newImage.src = imageURL;
      newImage.alt = "map of searched postcode";

      if (image) {
        mapDiv.removeChild(image);
      }

      image = newImage;
      mapDiv.appendChild(newImage);

      const message = await getMessage(current_temp_code);
      forecastMessage.textContent = `Today's forecast: ${message}`;

      const temperatureHeading = createHeadingElement("h3", `${current_temp}°`);
      const windSpeedHeading = createHeadingElement("h3", `${current_windSpeed} km/h`);
      const current_icon = createImageElement("img", `./icons/${current_temp_code}.svg`);
      const wind_icon = createImageElement("img", `./icons/wind.svg`);
      const sunrise = createHeadingElement("h3", s_rise[0].split("T")[1].slice(0, 5));
      const sunrise_icon = createImageElement("img", `./icons/sunrise.svg`);
      const sunset = createHeadingElement("h3", s_set[0].split("T")[1].slice(0, 5));
      const sunset_icon = createImageElement("img", `./icons/sunset.svg`);

      current.innerHTML = "";
      currentsun.innerHTML = "";
      currSunrise.innerHTML = "";
      currSunset.innerHTML = "";

      appendElements(current, [current_icon, temperatureHeading, wind_icon, windSpeedHeading]);
      appendElements(currentsun, [currSunrise, currSunset]);
      appendElements(currSunrise, [sunrise_icon, sunrise]);
      appendElements(currSunset, [sunset_icon, sunset]);

      for (let i = 1; i < 6; i++) {
        const weekday = new Date(date_arr[i - 1]).getDay();
        const weekdate = getFormattedWeekdate(weekday);
        const forecast_icon = createImageElement("img", `./icons/${fore_code[i - 1]}.svg`);
        const forecast_max = createHeadingElement("h4", `${fore_max[i - 1]}°`);
        const forecast_min = createHeadingElement("h4", `${fore_min[i - 1]}°`);

        const day = document.createElement("div");
        const forecast_date = createHeadingElement("h4", weekdate);
        const forecast_day = createHeadingElement("h4", weekdays[weekday]);

        appendElements(day, [forecast_date, forecast_day, forecast_icon, forecast_max, forecast_min]);
        document.querySelector(`#day${i}`).innerHTML = "";
        document.querySelector(`#day${i}`).appendChild(day);
      }
      hideBufferingOverlay();
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    if (invalidMessage) {
      invalidMessage.style.display = "block";
    }
    hideBufferingOverlay();
  }
});

function createHeadingElement(tagName, textContent) {
  const heading = document.createElement(tagName);
  heading.textContent = textContent;
  return heading;
}

function createImageElement(tagName, src) {
  const image = document.createElement(tagName);
  image.classList.add("icon");
  image.src = src;
  return image;
}

function appendElements(parent, elements) {
  elements.forEach((element) => parent.appendChild(element));
}

function getFormattedWeekdate(weekday) {
  const date = new Date().getDate();
  const suffix =
    date === 1 || date === 21 || date === 31
      ? "st"
      : date === 2 || date === 22
      ? "nd"
      : date === 3 || date === 23
      ? "rd"
      : "th";

  return `${date}${suffix}`;
}

function showBufferingOverlay() {
  bufferingOverlay.style.display = "flex";
  bufferingContent.classList.add("buffering");
}

function hideBufferingOverlay() {
  bufferingOverlay.style.display = "none";
  bufferingContent.classList.remove("buffering");
}