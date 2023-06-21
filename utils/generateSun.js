import { createElement, appendElements } from "./helpers/handleElements.js";
export const generateSun = (
  s_rise,
  s_set,
  currentsun,
  currSunrise,
  currSunset
) => {
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

  currentsun.innerHTML = "";
  currSunrise.innerHTML = "";
  currSunset.innerHTML = "";

  appendElements(currentsun, [currSunrise, currSunset]);
  appendElements(currSunrise, [sunrise_icon, sunrise]);
  appendElements(currSunset, [sunset_icon, sunset]);
};
