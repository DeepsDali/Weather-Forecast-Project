export const getLongLat = async (postcode) => {
  try {
    const postcodeApiUrl = `https://api.postcodes.io/postcodes/${postcode}`;
    const response = await fetch(postcodeApiUrl);

    if (response.ok) {
      const data = await response.json();
      const { latitude, longitude } = data.result;
      return { latitude, longitude };
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    if (error.message === "404") {
      console.error(`⚠️ Couldn't find "${postcode}"`);
      throw new NotFoundError();
    } else {
      console.error("⚠️ Something went wrong");
      throw new Error("Failed to fetch latitude and longitude");
    }
  }
};
