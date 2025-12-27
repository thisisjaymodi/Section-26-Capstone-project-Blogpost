


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