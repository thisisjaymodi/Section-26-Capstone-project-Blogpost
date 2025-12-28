// Getting Model window input fields
const inputPid = $("#exampleModalEdit #update-pid, #exampleModalDelete #delete-pid");;
const inputTitle = $("#exampleModalEdit #update-title");
const inputContent = $("#exampleModalEdit #update-content");

// Upon open model show data.
$("#exampleModalEdit").on("show.bs.modal", (e) =>{
    const clickedBtn = $(e.relatedTarget);
    console.log(clickedBtn);
    // Getting data from Page
    const dataPid = clickedBtn.data("pid");
    const dataTitle = clickedBtn.data("title");
    const dataContent = clickedBtn.data("content");

    inputPid.val(dataPid);
    inputTitle.val(dataTitle);
    inputContent.val(dataContent);
});

$("#exampleModalDelete").on("show.bs.modal", (e) =>{
    const clickedBtn = $(e.relatedTarget);
    console.log(clickedBtn);
    
    // Getting data from Page
    const dataPid = clickedBtn.data("pid");
    inputPid.val(dataPid);
});


if ("geolocation" in navigator) {
    /* geolocation is available */
    async function locationSuccess(pos) {
      try {
        const crd = pos.coords;
        console.log(crd["latitude"], crd["longitude"]);
        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            latitude: crd["latitude"],
            longitude: crd["longitude"],
          }),
        };
        /* Response sent to backend */
        const response = await fetch("/api/location", config);
        if (!response.ok) {
            throw new Error(response.json()["error"]); /* we are sending server-side error to frontend */
        }
        /* Retrieve the response */
        const data = await response.json();
        console.log(data["temp"]);
        document.getElementById("weather").innerHTML =
          data["temp"] + " degree celsius";
      } catch (error) {
            document.getElementById("weather").innerHTML = error;
      }
    }
    function locationError(error){
        document.getElementById("weather").innerHTML = "Geolocation denied by user."
    }
    let loc = navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
} else {
  console.log("geolocation is not available");
  document.getElementById("weather").innerHTML = "Geolocation is not available."
}