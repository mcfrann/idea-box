// Selector Variables here

var saveButton = document.querySelector(".main-input-save");
var ideaTitle = document.querySelector(".main-input-title");
var ideaBody = document.querySelector(".main-input-body");
var ideaContainer = document.querySelector(".idea-container");
var showStarred = document.querySelector(".starred-btn");




// Global Variable

var ideas = [];
// var favoriteIdeas = [];
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
        <img class="favorite-icon" id=${ideas[i].id} src="assets/star.svg" alt="favorite-idea"/>
        <img class="favorite-icon-active hidden" id=${ideas[i].id} src="assets/star-active.svg" alt="active-favorite-idea"/>
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

function deleteIdea() {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id == event.target.closest(".delete-icon").id) {
      ideas.splice(i, 1);
    }
  }
  renderIdeaCard();
};

function toggleIcon() {
  var favoriteIcon = document.querySelectorAll(".favorite-icon");
  var favoriteIconActive = document.querySelectorAll(".favorite-icon-active");
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id == event.target.id) {
      favoriteIcon[i].classList.toggle("hidden");
      favoriteIconActive[i].classList.toggle("hidden");
      updateStar(ideas[i]);
    }
  }
};

function updateStar(idea) {
  idea.updateIdea();
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
