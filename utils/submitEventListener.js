import {
  showBufferingOverlay,
  hideBufferingOverlay,
} from "./helpers/bufferingOverlay.js";
import { createElement } from "./helpers/handleElements.js";
import { getMessage } from "./api/getMessage.js";
import { handleApiRequests } from "./handleApiRequests.js";
import { generateForecast } from "./generateForecast.js";
import { generateSun } from "./generateSun.js";
import { generateCurrent } from "./generateCurrent.js";

export const submitEventListener = () => {
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

  let image = null;

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
      const { imageURL, response, location } = await handleApiRequests(
        searchedPostcode
      );
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
        const message = await getMessage(current_temp_code);
        forecastMessage.textContent = `Today's forecast: ${message}`;
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

        generateCurrent(
          current_temp,
          current_windSpeed,
          current,
          current_temp_code
        );
        generateSun(s_rise, s_set, currentsun, currSunrise, currSunset);
        generateForecast(date_arr, fore_code, fore_max, fore_min);
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
};
