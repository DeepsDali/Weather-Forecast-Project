form = document.querySelector("form");
const output = document.querySelector("output");

form.addEventListener("submit", (event) => {
    // stop the form submitting and reloading the page
    event.preventDefault();

    // clear out any previous results
    output.innerHTML = "";

    // store long: -0.157138, lat: 51.593724
    // get the value of the field with name="map"

    function lon2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }
    function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }
    
    const z=12;
    const x = lon2tile(-0.157138,z); 
    const y= lat2tile(51.593724,z); 

    // request that map from OpenCycleMap API
    // can do landscape/cycle/...
    fetch(`https://tile.thunderforest.com/neighbourhood/${z}/${x}/${y}.png?apikey=98a643ecd1a94eb2b459dc994b6a2de7`)
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