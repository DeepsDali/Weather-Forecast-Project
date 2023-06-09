export const getLocation = async (postcode) => {
  try {
    const postcodeApiUrl = `https://api.postcodes.io/postcodes/${postcode}`;
    const response = await fetch(postcodeApiUrl);

    if (response.ok) {
      const data = await response.json();
      const { admin_district } = data.result;
      console.log(admin_district);

      return { admin_district };
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.log(error);
  }
};
