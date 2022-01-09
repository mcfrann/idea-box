// Selector Variables here

var saveButton = document.querySelector(".main-input-save");
var ideaTitle = document.querySelector(".main-input-title");
var ideaBody = document.querySelector(".main-input-body");
var ideaContainer = document.querySelector(".idea-container");
var showStarred = document.querySelector(".starred-btn");
var searchBar = document.querySelector(".search-box");


// Global Variable

var ideas = [];


// Event Listeners here

saveButton.addEventListener('click', loadIdeaGrid);
ideaTitle.addEventListener('keyup', enableSaveButton);
ideaContainer.addEventListener('click', handleDeleteOrFavorite);
showStarred.addEventListener('click', showFavorites);
searchBar.addEventListener('keyup', filterIdeas);


// Event handlers here


function loadIdeaGrid(e) {
  e.preventDefault();
  if (ideaTitle.value && ideaBody.value) {
      saveIdea();
      renderIdeaCard(ideas);
      clearFormInputs();
      disableSaveButton();
  }
};

function renderIdeaCard(ideas) {
  ideaContainer.innerHTML = "";
  for (var i = 0; i < ideas.length; i ++) {
      ideaContainer.innerHTML += `
    <div class="idea-card-container" id=${ideas[i].id}>
        <div class="idea-header">
        <img class="favorite-icon" src="${handleStar(ideas[i])}" alt="favorite-idea"/>
        <img class="delete-icon" src="assets/delete.svg" alt="delete-idea"/>
        </div>
        <div class="idea-body">
            <h4>${ideas[i].title}</h4>
            <p>${ideas[i].body}</p>
        </div>
        <div class="idea-footer">
        <img class="add-comments" src="assets/comment.svg" alt="comment-icon"/>
        </div>
    </div>`
  }
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
  renderIdeaCard(ideas);
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
  renderIdeaCard(ideas);
};

function showFavorites() {
  if (showStarred.innerText === "Show Starred Ideas") {
    showStarred.innerText = "Show All Ideas";
    renderFavoriteCards();
  } else {
    showStarred.innerText = "Show Starred Ideas";
    renderIdeaCard(ideas);
  }
};

function renderFavoriteCards() {
  var favIdeas = [];
  for (var i = 0; i < ideas.length; i ++) {
    if (ideas[i].star) {
      favIdeas.push(ideas[i]);
    }
  }
  renderIdeaCard(favIdeas);
};

function filterIdeas(e) {
  var searchString = e.target.value
  var filteredIdeas = ideas.filter(function(idea) {
      return (
        idea.title.includes(searchString) ||
        idea.body.includes(searchString)
      );
    });
  renderIdeaCard(filteredIdeas);
};
