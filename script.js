//setup input variables
const inputTitle = document.querySelector("#inputTitle");
const inputIdea = document.querySelector("#inputIdea");
const inputCreate = document.querySelector("#btnNew");

//set variable for the main container to append on
const mainContainer = document.querySelector("#mainContainer");

//put new Entry in localStorage from the form by clicking create-button
inputCreate.addEventListener("click", function(){
    localStorage.setItem(`TitelNo${findHighestIndexPlusOne()}`, inputTitle.value);
    localStorage.setItem(`IdeaNo${findHighestIndexPlusOne() - 1}`, inputIdea.value);
    
});

setupNote();

//set variables for edit and deletebutton
const inputEdit = document.querySelectorAll(".btnEdit");
const inputDelete = document.querySelectorAll(".btnDelete");

//on click on edit-button 
for(let i = 0; i < getSortedIndexes().length; i++){
    inputEdit[i].addEventListener("click", function(){
        inputTitle.value = localStorage["TitelNo" + getSortedIndexes()[i]]
        inputIdea.value = localStorage["IdeaNo" + getSortedIndexes()[i]]
        document.querySelector("#note" + getSortedIndexes()[i]).remove();
        delete localStorage["TitelNo" + getSortedIndexes()[i]];
        delete localStorage["IdeaNo" + getSortedIndexes()[i]];
    });
}

//on click on delete-button delete local.storage entry and divcontainer
for(let i = 0; i < getSortedIndexes().length; i++){
    inputDelete[i].addEventListener("click", function(){
        document.querySelector("#note" + getSortedIndexes()[i]).remove();
        delete localStorage["TitelNo" + getSortedIndexes()[i]];
        delete localStorage["IdeaNo" + getSortedIndexes()[i]];
    });
}

//Dsiplay new note including edit and delete button
function setupNote(){
    for(let i = 0; i < Math.floor(localStorage.length / 2); i++){
        let newdiv = document.createElement('div');
        newdiv.className = "note";
        newdiv.id = "note" + (i + 1);
        mainContainer.appendChild(newdiv);
        let h2 = document.createElement('h2');
        newdiv.appendChild(h2);
        h2.textContent = localStorage["TitelNo" + getSortedIndexes()[i]];
        let p = document.createElement('p');
        newdiv.appendChild(p);
        p.textContent = localStorage["IdeaNo" + getSortedIndexes()[i]];
        let buttonEdit = document.createElement('button');
        buttonEdit.className = "btn btn-warning btnEdit"
        buttonEdit.id = "edit" + (i + 1);
        newdiv.appendChild(buttonEdit);
        buttonEdit.textContent = "Edit";
        let buttonDelete = document.createElement('button');
        buttonDelete.className = "btn btn-danger btnDelete"
        buttonDelete.id = "delete" + (i + 1);
        newdiv.appendChild(buttonDelete);
        buttonDelete.textContent = "Delete";
    }   
}

// find highest index and add 1
function findHighestIndexPlusOne(){
    let highestIndex = 0;
    for(let i = 0; i < Object.keys(localStorage).length; i++){
        if(Object.keys(localStorage)[i]){
            let checkedIndex = Object.keys(localStorage)[i][Object.keys(localStorage)[i].length - 1];
            if(checkedIndex > highestIndex){
                highestIndex = checkedIndex;
            }
        } 
    }
    return Number(highestIndex) + 1;
} 

// get sorted array with Note-indexes that are stored in localStorage
function getSortedIndexes(){
    let indexArr = [];
    for(let i = 0; i < Object.keys(localStorage).length; i++){
        let index = Object.keys(localStorage).sort()[i][Object.keys(localStorage).sort()[i].length - 1]
        indexArr.push(index);
    }
    indexArr.splice(Math.round(indexArr.length / 2))
    return indexArr; 
}
