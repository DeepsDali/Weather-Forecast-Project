import { getLongLat } from "./utils/api/getLongLat.js";
import { getLocation } from "./utils/api/getLocation.js";
import { getMap } from "./utils/api/getMap.js";
import { getMessage } from "./utils/api/getMessage.js";
import { appendElements } from "./utils/helpers/appendElements.js";
import { getFormattedWeekdate } from "./utils/helpers/getFormattedWeekDate.js";
import { showBufferingOverlay } from "./utils/helpers/showBufferingOverlay.js";
import { hideBufferingOverlay } from "./utils/helpers/hideBufferingOverlay.js";
import { createElement } from "./utils/helpers/createElement.js";
const form = document.querySelector("form");
const output = document.querySelector("#post-code");
const county = document.querySelector("#county");
const current = document.querySelector("#current");
const currentsun = document.querySelector("#currentsun");
const currSunrise = document.querySelector("#current-sunrise");
const currSunset = document.querySelector("#current-sunset");
const forecastMessage = document.querySelector(".forecast-message");
const invalidMessage = document.querySelector(".invalid-message");
const mapDiv = document.querySelector("#location");
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
  const searchedPostcode = formData
    .get("postcode")
    .toUpperCase()
    .replace(/(\d{3})$/, " $1");
  form.reset();

  try {
    const validateResultFetch = await fetch(
      `https://api.postcodes.io/postcodes/${searchedPostcode}/validate`
    );
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
          windspeed: current_windSpeed,
        },
        daily: {
          sunrise: s_rise,
          sunset: s_set,
          temperature_2m_max: fore_max,
          temperature_2m_min: fore_min,
          weathercode: fore_code,
          time: date_arr,
        },
      } = resData;

      invalidMessage.style.display = "none";
      county.textContent = location.admin_district;
      output.textContent = searchedPostcode;
      const newImage = createElement("img", {
        src: `${imageURL}`,
        className: "map-image",
        alt: "map of searched postcode",
      });

      if (image) {
        mapDiv.removeChild(image);
      }

      image = newImage;
      mapDiv.appendChild(newImage);

      const message = await getMessage(current_temp_code);
      forecastMessage.textContent = `Today's forecast: ${message}`;

      const temperatureHeading = createElement("h3", {
        textContent: `${current_temp}°`,
      });
      const windSpeedHeading = createElement("h3", {
        textContent: `${current_windSpeed} km/h`,
      });

      const current_icon = createElement("img", {
        src: `./utils/icons/${current_temp_code}.svg`,
        className: "icon",
        alt: "forecast icon",
      });

      const wind_icon = createElement("img", {
        src: `./utils/icons/wind.svg`,
        className: "icon",
        alt: "Wind speed con",
      });
      const sunrise = createElement("h3", {
        textContent: s_rise[0].split("T")[1].slice(0, 5),
      });

      const sunrise_icon = createElement("img", {
        src: `./utils/icons/sunrise.svg`,
        className: "icon",
        alt: "Sunrise icon",
      });
      const sunset = createElement("h3", {
        textContent: s_set[0].split("T")[1].slice(0, 5),
      });
      const sunset_icon = createElement("img", {
        src: `./utils/icons/sunset.svg`,
        className: "icon",
        alt: "Sunset icon",
      });

      current.innerHTML = "";
      currentsun.innerHTML = "";
      currSunrise.innerHTML = "";
      currSunset.innerHTML = "";

      appendElements(current, [
        current_icon,
        temperatureHeading,
        wind_icon,
        windSpeedHeading,
      ]);
      appendElements(currentsun, [currSunrise, currSunset]);
      appendElements(currSunrise, [sunrise_icon, sunrise]);
      appendElements(currSunset, [sunset_icon, sunset]);

      for (let i = 1; i < 6; i++) {
        const weekday = new Date(date_arr[i - 1]).getDay();
        const weekdate = getFormattedWeekdate(weekday);
        const forecast_icon = createElement("img", {
          src: `./utils/icons/${fore_code[i - 1]}.svg`,
          className: "icon",
          alt: "forecast icon",
        });
        const forecast_max = createElement("h4");
        forecast_max.textContent = `${fore_max[i - 1]}°`;

        const forecast_min = createElement("h4");
        forecast_min.textContent = `${fore_min[i - 1]}°`;

        const day = createElement("div");

        const forecast_date = createElement("h4");
        forecast_date.textContent = weekdate;

        const forecast_day = createElement("h4");
        forecast_day.textContent = weekdays[weekday];

        appendElements(day, [
          forecast_date,
          forecast_day,
          forecast_icon,
          forecast_max,
          forecast_min,
        ]);
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
