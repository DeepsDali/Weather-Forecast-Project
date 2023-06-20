import { createElement, appendElements } from "./helpers/handleElements.js";

export const generateCurrent = (
  current_temp,
  current_windSpeed,
  current,
  current_temp_code
) => {
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

  current.innerHTML = "";
  appendElements(current, [
    current_icon,
    temperatureHeading,
    wind_icon,
    windSpeedHeading,
  ]);
};
