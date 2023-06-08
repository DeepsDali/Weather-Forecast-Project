form = document.querySelector("form");
const output = document.querySelector("output");

form.addEventListener("submit", (event) => {
    // stop the form submitting and reloading the page
    event.preventDefault();

    // clear out any previous results
    output.innerHTML = "";

    // get the value of the field with name="map"
    const x = 3; 
    const y=3; 
    const z=3;

    // request that map from OpenCycleMap API
    fetch(`https://tile.thunderforest.com/cycle/${z}/${x}/${y}.png?apikey=98a643ecd1a94eb2b459dc994b6a2de7`)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.blob()
        // return response.json();
      })

      // if we get a successful response
      .then((mapData) => {
        const imageURL = URL.createObjectURL(mapData);
    
        const image = document.createElement("img");
        image.src = imageURL;
        image.alt = "";
    
        output.append(image);
      })
      
      // if the request is unsuccessful
      .catch((error) => {
        console.log(error);
        if (error.message === "404") {
          output.textContent = `⚠️ Couldn't find "${x}"`;
        } else {
          output.textContent = "⚠️ Something went wrong";
        }
      });
  });

//   const region_id = 3600065600
// store long: -0.157138, lat: 51.593724