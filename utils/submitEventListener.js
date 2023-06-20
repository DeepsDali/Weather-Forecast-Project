import {
  showBufferingOverlay,
  hideBufferingOverlay,
} from "./helpers/bufferingOverlay.js";
import { createElement, appendElements } from "./helpers/handleElements.js";
import { getMessage } from "./api/getMessage.js";
import { handleApiRequests } from "./handleApiRequests.js";
import { generateForecast } from "./generateForecast.js";

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
