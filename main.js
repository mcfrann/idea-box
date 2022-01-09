// Selector Variables here

var saveButton = document.querySelector(".main-input-save");
var ideaTitle = document.querySelector(".main-input-title");
var ideaBody = document.querySelector(".main-input-body");
var ideaContainer = document.querySelector(".idea-container");
var showStarred = document.querySelector(".starred-btn");




// Global Variable

var ideas = [];


// Event Listeners here

saveButton.addEventListener('click', loadIdeaGrid);
ideaTitle.addEventListener('keyup', enableSaveButton);
ideaContainer.addEventListener('click', handleDeleteOrFavorite);
showStarred.addEventListener('click', showFavorites);


// Event handlers here


function loadIdeaGrid(e) {
  e.preventDefault();
  if (ideaTitle.value && ideaBody.value) {
      saveIdea();
      renderIdeaCard();
      clearFormInputs();
      disableSaveButton();
  }
};

function renderIdeaCard() {
  ideaContainer.innerHTML = "";
  for (var i = 0; i < ideas.length; i ++) {
      ideaContainer.innerHTML += `
    <div class="idea-card-container" id=${ideas[i].id}>
        <div class="idea-header">
        <img class="favorite-icon" id=${ideas[i].id} src="${handleStar(ideas[i])}" alt="favorite-idea"/>
        <img class="delete-icon" id=${ideas[i].id} src="assets/delete.svg" alt="delete-idea"/>
        </div>
        <div class="idea-body">
            <h4>${ideas[i].title}</h4>
            <p>${ideas[i].body}</p>
        </div>
        <div class="idea-footer"></div>
    </div>`
  }
  // showAllCards();
};

function handleStar(idea) {
  if (idea.star) {
    return "assets/star-active.svg";
  } else {
    return "assets/star.svg";
  }
};

function saveIdea() {
  var currentIdea = new Idea(ideaTitle.value, ideaBody.value);
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

function deleteIdea(event) {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id == event.target.closest(".idea-card-container").id) {
      ideas.splice(i, 1);
    }
  }
  renderIdeaCard();
};

function handleDeleteOrFavorite(e) {
  if (e.target.classList.value === "delete-icon") {
    deleteIdea(e);
  } else if (e.target.classList.value === "favorite-icon") {
    addToFavorite(e);
  }
};

function addToFavorite(event) {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id == event.target.closest(".idea-card-container").id) {
      ideas[i].updateIdea();
    }
  }
  renderIdeaCard();
};

function showFavorites() {
  if (showStarred.innerText === "Show Starred Ideas") {
    showStarred.innerText = "Show All Ideas";
    renderFavoriteCards();
  } else {
    showStarred.innerText = "Show Starred Ideas";
    showAllCards();
  }
};

function renderFavoriteCards() {
  ideaContainer.innerHTML = "";
  for (var i = 0; i < ideas.length; i ++) {
    if (ideas[i].star) {
      ideaContainer.innerHTML += `
      <div class="idea-card-container" id=${ideas[i].id}>
          <div class="idea-header">
          <img class="favorite-icon hidden" id=${ideas[i].id} src="assets/star.svg" alt="favorite-idea"/>
          <img class="favorite-icon-active" id=${ideas[i].id} src="assets/star-active.svg" alt="active-favorite-idea"/>
          <img class="delete-icon" id=${ideas[i].id} src="assets/delete.svg" alt="delete-idea"/>
          </div>
          <div class="idea-body">
              <h4>${ideas[i].title}</h4>
              <p>${ideas[i].body}</p>
          </div>
          <div class="idea-footer"></div>
      </div>`
    }
  }
};

function showAllCards() {
  renderIdeaCard();
  var favoriteIcon = document.querySelector(".favorite-icon");
  var favoriteIconActive = document.querySelector(".favorite-icon-active");
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].star) {
      showIcon(favoriteIconActive);
      hideIcon(favoriteIcon);
    } else {
      showIcon(favoriteIcon);
      hideIcon(favoriteIconActive);
    }
  }
};

function showIcon(selectorVariable) {
  selectorVariable.classList.toggle("hidden");
};

function hideIcon(selectorVariable) {
  selectorVariable.classList.toggle("hidden");
};
