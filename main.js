// Selector Variables here

var saveButton = document.querySelector(".main-input-save");
var ideaTitle = document.querySelector(".main-input-title");
var ideaBody = document.querySelector(".main-input-body");
var ideaContainer = document.querySelector(".idea-container");



// Global Variable

var ideas = [];


// Event Listeners here

saveButton.addEventListener('click', loadIdeaGrid);
ideaTitle.addEventListener('keyup', enableSaveButton);
ideaContainer.addEventListener('click', deleteIdea);



// Event handlers here


function loadIdeaGrid(e) {
    e.preventDefault();
    if (ideaTitle.value && ideaBody.value) {
        saveIdea();
        createIdeaCard();
        clearFormInputs();
        disableSaveButton()
    }
};

function createIdeaCard () {
    ideaContainer.innerHTML = "";
    for (var i = 0; i < ideas.length; i ++) {
        ideaContainer.innerHTML += `
        <div class="idea-card-container" id=${ideas[i].id}>
            <div class="idea-header">
            <img class="favorite-icon" src="assets/star.svg" alt="favorite-idea"/>
            <img class="delete-icon" id=${ideas[i].id} src="assets/delete.svg" alt="delete-idea"/></div>
            <div class="idea-body">
                <h4>${ideas[i].title}</h4>
                <p>${ideas[i].body}</p>
            </div>
            <div class="idea-footer"></div>
        </div>`
    }
};

function saveIdea() {
    var currentIdea = new Idea(ideaTitle.value, ideaBody.value);
    ideas.push(currentIdea)
};

function enableSaveButton() {
  saveButton.disabled = false;
};

function disableSaveButton() {
  saveButton.disabled = true;
};


function clearFormInputs() {
    ideaTitle.value = "";
    ideaBody.value = ""
};

function deleteIdea() {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id == event.target.closest(".delete-icon").id){
      ideas.splice(i,1)
  }
  }
  createIdeaCard();
}
