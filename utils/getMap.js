export const getMap = async (lat, lon) => {
  try {
    const z = 13;

    const x = Math.floor(((lon + 180) / 360) * Math.pow(2, z));

    const y = Math.floor(
      ((1 -
        Math.log(
          Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
        ) /
          Math.PI) /
        2) *
        Math.pow(2, z)
    );

    const response = await fetch(
      `https://tile.thunderforest.com/neighbourhood/${z}/${x}/${y}.png?apikey=98a643ecd1a94eb2b459dc994b6a2de7`
    );

    if (response.ok) {
      const mapData = await response.blob();
      const mapURL = URL.createObjectURL(mapData);

      return mapURL;
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    if (error.message === "404") {
      console.log(`⚠️ Couldn't find "${x} and ${y}"`);
    } else {
      console.log("⚠️ Something went wrong");
    }
  }
};
