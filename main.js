// Selector Variables here

var saveButton = document.querySelector(".main-input-save");
var ideaTitle = document.querySelector(".main-input-title");
var ideaBody = document.querySelector(".main-input-body");
var ideaContainer = document.querySelector(".idea-container");


// Global Variable

var ideas = [];


// Event Listeners here

saveButton.addEventListener('click', loadIdeaGrid);



// Event handlers here


function loadIdeaGrid(e) {
    e.preventDefault();
    checkInputs();
    saveIdea();
    createIdeaCard();  
}


function createIdeaCard () {
    ideaContainer.innerHTML = "";
    for (var i = 0; i < ideas.length; i ++) {
        ideaContainer.innerHTML += `
        <div class="idea-card-container" id=${ideas[i].id}>
            <div class="idea-header"></div>
            <div class="idea-body">
                <h4>${ideas[i].title}</h4>
                <p>${ideas[i].body}</p>
            </div>
            <div class="idea-footer"></div>
        </div>`
    }
}

function saveIdea() {
    var currentIdea = new Idea(ideaTitle.value, ideaBody.value);
    ideas.push(currentIdea)
};

function checkInputs() {
    if (ideaTitle.value && ideaBody.value) {
        saveButton.disabled = false;
        console.log("test")
    }
};









