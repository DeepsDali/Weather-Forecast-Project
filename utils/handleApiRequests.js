import { getMap } from "./api/getMap.js";
import { getLongLat } from "./api/getLongLat.js";
import { getLocation } from "./api/getLocation.js";

export const handleApiRequests = async (searchedPostcode) => {
  const location = await getLocation(searchedPostcode);
  const coordinates = await getLongLat(searchedPostcode);
  const imageURL = await getMap(coordinates.latitude, coordinates.longitude);
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FLondon`;

  const response = await fetch(apiUrl);
  return {
    imageURL,
    response,
    location,
  };
};
