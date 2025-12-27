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

// Getting user location from frontend
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
    //   console.log(latitude,longitude);
    // passing location to backend
      fetch("/api/location", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latitude, longitude }),
      })
    //   receiving the weather info from server
        .then((res) => res.json())
    //   Printing info to frontend
        .then((data) => {
          document.getElementById("weather").innerText = `${data.temp} degree celsius`;
        })
        .catch(function (res) {
        //   console.log(res);
        });
    },
    (err) => {
      console.error("Geolocation error:", err);
    }
  );
} else {
  console.log("Geolocation not supported");
}

