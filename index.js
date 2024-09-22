/*
Things to implement:
- On folder click, add/change active folder class so main section knows what to display
- noteFolders map should add the current folder names as keys and array of note names as values
- 
*/ 

//Sidebar Container variables
const sidebarContainer = document.querySelector(".sidebar-container");
//Folder Container variables
const folderContainer = document.querySelector(".folder-btn-container");
let folders = document.querySelectorAll(".folder");
const folderPopUp = document.querySelector(".folder-creation-menu");
const folderInput = document.getElementById("folderName");
const folderSubmitBtn = document.getElementById("folderSubmitBtn");
//Note Container variables
const noteSubmitBtn = document.getElementById("noteSubmitBtn");
const noteName = document.getElementById("noteName");
const noteDescription = document.getElementById("noteDesc");
//Pop Up Container
const popupContainer = document.querySelector(".popup-container");
const noteViewContainer = document.querySelector(".note-view-container");
//General
const homeContainer = document.getElementById("homeContainer");
const menuBtns = document.querySelectorAll(".menu-btn");
const noFolderText = document.querySelector(".folder-text");
const noteFolders = {};

folderSubmitBtn.addEventListener('click', createNewFolder);
noteSubmitBtn.addEventListener('click', createNewNote);

//Menu Button Events
for(const btn of menuBtns) {
    btn.addEventListener('click', function() {
        switch(this.id) {
            case "closePopUpBtn":
            case "closeFolderPopUpBtn":
            case "closeNotePopUpBtn":
                popupContainer.style.display = "none";
                this.parentNode.parentNode.style.display = "none";
                break;
            case "openSidebarBtn":
                sidebarContainer.classList.add("sidebar-open");
                break;
            case "closeSidebarBtn":
                sidebarContainer.classList.remove("sidebar-open");
                break;
            case "newNoteBtn":
                if(currentFolder === null) {
                    return;
                }
                popupContainer.style.display = "grid";
                noteViewContainer.style.display = "flex";
                break;
            case "folderCreateBtn":
                popupContainer.style.display = "grid";
                folderPopUp.style.display = "flex";
                break;
        }
    });
}

let currentFolder = document.querySelector(".folder-active");

function clearNoteContainer() {
    while(homeContainer.lastElementChild) {
        homeContainer.removeChild(homeContainer.lastElementChild);
    }
}

function createNewFolder() {
    if(!folderInput.value) {
        return;
    }
    
    const folder = document.createElement("li");
    folder.classList.add("folder");
    folder.textContent = folderInput.value + " ";
    folder.id = folderInput.value.replaceAll(" ", "-");
    
    const noteCount = document.createElement("span");
    noteCount.classList.add("note-counter");
    noteCount.textContent = "0";
    folder.append(noteCount);
    folderContainer.append(folder);

    folderInput.value = "";
    popupContainer.style.display = "none";
    this.parentNode.style.display = "none";
    updateFolderQuery();
    noteFolders[folder.id] = [];
    folder.addEventListener('click', selectFolder);
}

function createNewNote() {
    const time = new Date();

    const noteContainer = document.createElement("div");
    noteContainer.classList.add("cube", "content-box");
    noteContainer.id = `${time.getHours()}-${time.getMonth()}-${time.getDay()}`;

    const noteTitle = document.createElement("h2");
    noteTitle.classList.add("note-title");
    noteTitle.textContent = noteName.value;
    noteContainer.append(noteTitle);

    const noteParagraph = document.createElement("p");
    noteParagraph.classList.add("note-paragraph");
    noteParagraph.textContent = noteDescription.value;
    noteContainer.append(noteParagraph);
    homeContainer.append(noteContainer);

    updateFolderContent(noteContainer.id, noteName.value, noteDescription.value);

    noteName.value = "";
    noteDescription.value = "";
    popupContainer.style.display = "none";
    this.parentNode.style.display = "none";
}

function selectFolder() {
    if(currentFolder === null) {
        console.log("No Current Folder");
    } else if(currentFolder.id === this.id) {
        this.classList.remove("folder-active");
        currentFolder = null;
        clearNoteContainer();
        return updateCurrentFolder();
    } else if(currentFolder !== null) {
        currentFolder.classList.remove("folder-active");
    }
    this.classList.add("folder-active");
    currentFolder = this;
    clearNoteContainer();
    updateNoteContainer();
    updateCurrentFolder();
}

function updateCurrentFolder() {
    if(currentFolder === null) {
        noFolderText.style.visibility = "visible";
    } else {
        noFolderText.style.visibility = "hidden";
    }
}

function updateFolderQuery() {
    folders = document.querySelectorAll(".folder");
}

function updateFolderContent(id, name, desc) {
    noteFolders[currentFolder.id].push({
        "noteId": id,
        "noteName": name,
        "noteDescription": desc
    });
}

function updateNoteContainer() {
    for(const data of noteFolders[currentFolder.id]) {
        const noteContainer = document.createElement("div");
        noteContainer.classList.add("cube", "content-box");
        noteContainer.id = data["noteId"];

        const noteTitle = document.createElement("h2");
        noteTitle.classList.add("note-title");
        noteTitle.textContent = data["noteName"];
        noteContainer.append(noteTitle);

        const noteParagraph = document.createElement("p");
        noteParagraph.classList.add("note-paragraph");
        noteParagraph.textContent = data["noteDescription"];
        noteContainer.append(noteParagraph);
        homeContainer.append(noteContainer);
    }
}