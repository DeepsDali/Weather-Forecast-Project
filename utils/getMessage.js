export const getMessage = async (weatherCode) => {
  try {
    const response = await fetch("./utils/weatherCodes.json");
    if (response.ok) {
      const data = await response.json();
      const weather = data.find((item) => item.code === weatherCode);
      if (weather) {
        return weather.description;
      } else {
        return "Unknown weather code";
      }
    } else {
      throw new Error("Failed to fetch weather codes");
    }
  } catch (error) {
    console.log(error);
    return "Error fetching weather codes";
  }
};
