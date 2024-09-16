//Sidebar Container variables
const sidebarContainer = document.querySelector(".sidebar-container");
const openSidebarBtn = document.getElementById("openSidebarBtn");
const closeSidebarBtn = document.getElementById("closeSidebarBtn");
//Folder Container variables
const folderContainer = document.querySelector(".folder-btn-container");
const folderPopUp = document.querySelector(".folder-creation-menu");
const folderInput = document.getElementById("folderName");
const folderCreationBtn = document.getElementById("folderCreateBtn");
const folderSubmitBtn = document.getElementById("folderSubmitBtn");
//Pop Up Container
popupContainer = document.querySelector(".popup-container");
//General
menuBtns = document.querySelectorAll(".menu-btn");

//Sidebar Interaction Buttons
openSidebarBtn.addEventListener('click', function() {
    sidebarContainer.classList.add("sidebar-open");
});

closeSidebarBtn.addEventListener('click', function() {
    sidebarContainer.classList.remove("sidebar-open");
});

//Folder Creation
folderCreationBtn.addEventListener('click', function() {
    popupContainer.style.display = "grid";
    folderPopUp.style.display = "flex";
});

folderSubmitBtn.addEventListener('click', function() {
    const folder = document.createElement("li");
    folderContainer.append(folder);
});

//Menu Button Events
for(const btn of menuBtns) {
    btn.addEventListener('click', function() {
        switch(this.id) {
            case "closePopUpBtn":
                popupContainer.style.display = "none";
                this.parentNode.parentNode.style.display = "none";
                break;
        }
    });
}