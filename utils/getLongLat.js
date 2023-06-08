export const getLongLat = async (postcode) => {
  try {
    const postcodeApiUrl = `https://api.postcodes.io/postcodes/${postcode}`;
    const response = await fetch(postcodeApiUrl);

    if (response.ok) {
      const data = await response.json();
      const { latitude, longitude } = data.result;
      console.log(latitude);
      console.log(longitude);
      return { latitude, longitude };
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.log(error);
  }
};
