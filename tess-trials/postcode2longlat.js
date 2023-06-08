const form = document.querySelector("form");
const output = document.querySelector("output");

form.addEventListener("submit", (event) => {
  // stop the form submitting and reloading the page
  event.preventDefault();

  // clear out any previous results
  output.innerHTML = "";

  // get the value of the field with name="pokemon"
  const formData = new FormData(form);
  const post_code = formData.get("postcode");

  // request that pokemon from PokeAPI
  fetch(`https://api.postcodes.io/postcodes/${post_code}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
 
    // if we get a successful response
    .then((postcodeData) => {
        console.log(postcodeData)
        // const data = document.createElement("p");
        // data.textContent = postcodeData;
        
      const long = document.createElement("h2");
      long.textContent = postcodeData.result.longitude + " longitude"

      const lat = document.createElement("h2");
      lat.textContent = postcodeData.result.latitude + " latitude"

      output.append(long, lat);
      // output.append(heading);
    })
    // if the request is unsuccessful
    .catch((error) => {
      console.log(error);
      if (error.message === "404") {
        output.textContent = `⚠️ Couldn't find "${post_code}"`;
      } else {
        output.textContent = "⚠️ Something went wrong";
      }
    });
});

// store long: -0.157138, lat: 51.593724