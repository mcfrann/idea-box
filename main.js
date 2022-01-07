// Selector Variables here

var saveButton = document.querySelector(".main-input-save");
var ideaTitle = document.querySelector(".main-input-title");
var ideaBody = document.querySelector(".main-input-body");
var ideaContainer = document.querySelector(".idea-container");
var showStarred = document.querySelector(".starred-btn");


// Global Variable

var ideas = [];
var favoriteIdeas = [];
var currentIdea;


// Event Listeners here

saveButton.addEventListener('click', loadIdeaGrid);
ideaTitle.addEventListener('keyup', enableSaveButton);
ideaContainer.addEventListener('click', deleteIdea);
ideaContainer.addEventListener('click', toggleIcon);
showStarred.addEventListener('click', showFavorites);


// Event handlers here


function loadIdeaGrid(e) {
  e.preventDefault();
  if (ideaTitle.value && ideaBody.value) {
      saveIdea();
      createIdeaCard(ideas);
      clearFormInputs();
      disableSaveButton();
  }
};

function createIdeaCard(ideaArray) {
  ideaContainer.innerHTML = "";
  for (var i = 0; i < ideaArray.length; i ++) {
      ideaContainer.innerHTML += `
      <div class="idea-card-container" id=${ideaArray[i].id}>
          <div class="idea-header">
          <img class="favorite-icon" id=${ideaArray[i].id} src="assets/star.svg" alt="favorite-idea"/>
          <img class="favorite-icon-active hidden" id=${ideaArray[i].id} src="assets/star-active.svg" alt="active-favorite-idea"/>
          <img class="delete-icon" id=${ideaArray[i].id} src="assets/delete.svg" alt="delete-idea"/>
          </div>
          <div class="idea-body">
              <h4>${ideaArray[i].title}</h4>
              <p>${ideaArray[i].body}</p>
          </div>
          <div class="idea-footer"></div>
      </div>`
  }
};

function saveIdea() {
  currentIdea = new Idea(ideaTitle.value, ideaBody.value);
  ideas.push(currentIdea);
};

function enableSaveButton() {
  saveButton.disabled = false;
};

function disableSaveButton() {
  saveButton.disabled = true;
};


function clearFormInputs() {
  ideaTitle.value = "";
  ideaBody.value = "";
};

function deleteIdea() {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id == event.target.closest(".delete-icon").id) {
      ideas.splice(i, 1);
    }
  }
  createIdeaCard();
};

function toggleIcon() {
  var favoriteIcon = document.querySelectorAll(".favorite-icon");
  var favoriteIconActive = document.querySelectorAll(".favorite-icon-active");
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id == event.target.id) {
      addToFavorites(ideas[i]);
      favoriteIcon[i].classList.toggle("hidden");
      favoriteIconActive[i].classList.toggle("hidden");
    }
  }

  updateStar();
};

function updateStar() {
  currentIdea.updateIdea();
};

function addToFavorites(newFavIdea) {
  favoriteIdeas.push(newFavIdea);
}

function showFavorites() {
  toggleFavIcon();
  if (showStarred.innerText === "Show Starred Ideas") {
    showStarred.innerText = "Show All Ideas";
    createIdeaCard(favoriteIdeas);
  } else {
    showStarred.innerText = "Show Starred Ideas";
    createIdeaCard(ideas);
  }
}

function toggleFavIcon() {
  var favoriteIcon = document.querySelectorAll(".favorite-icon");
  var favoriteIconActive = document.querySelectorAll(".favorite-icon-active");
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].star) {
      favoriteIcon[i].classList.add("hidden");
      favoriteIconActive[i].classList.remove("hidden");
    }
  }
}


  // ideaContainer.innerHTML = "";
  // for (var i = 0; i < ideas.length; i ++) {
  //   if (ideas[i].star) {
  //     ideaContainer.innerHTML += `
  //     <div class="idea-card-container" id=${ideas[i].id}>
  //         <div class="idea-header">
  //         <img class="favorite-icon" id=${ideas[i].id} src="assets/star.svg" alt="favorite-idea"/>
  //         <img class="favorite-icon-active hidden" id=${ideas[i].id} src="assets/star-active.svg" alt="active-favorite-idea"/>
  //         <img class="delete-icon" id=${ideas[i].id} src="assets/delete.svg" alt="delete-idea"/>
  //         </div>
  //         <div class="idea-body">
  //             <h4>${ideas[i].title}</h4>
  //             <p>${ideas[i].body}</p>
  //         </div>
  //         <div class="idea-footer"></div>
  //     </div>`
    // }
  // }
// }

// function createFavoritesView() {
//
// }
