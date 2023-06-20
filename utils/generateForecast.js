import { getFormattedWeekdate } from "./helpers/getFormattedWeekDate.js";
import { createElement, appendElements } from "./helpers/handleElements.js";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const generateForecast = (date, code, max, min) => {
  for (let i = 1; i < 6; i++) {
    const weekday = new Date(date[i - 1]).getDay();
    const weekdate = getFormattedWeekdate(weekday);
    const forecast_icon = createElement("img", {
      src: `./utils/icons/${code[i - 1]}.svg`,
      className: "icon",
      alt: "forecast icon",
    });
    const forecast_max = createElement("h4");
    forecast_max.textContent = `${max[i - 1]}°`;

    const forecast_min = createElement("h4");
    forecast_min.textContent = `${min[i - 1]}°`;

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
};
