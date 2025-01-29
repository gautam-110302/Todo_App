let todoTextBox = document.querySelector("#todo-textbox");
let listBox = document.querySelector(".list-box");
let dateSelector = document.querySelector("#date-selector")

let todoTextArray;
let localTextArray = localStorage.getItem('insideTextArray');
let dateArray;
let localDateArray = localStorage.getItem('insideDateArray');
if(localTextArray !== null && localDateArray !== null){
    todoTextArray = JSON.parse(localTextArray);
    dateArray = JSON.parse(localDateArray);
    renderList();
} else {
    todoTextArray = [];
    dateArray = [];
}

function addItem() {
    let insideText = todoTextBox.value;
    let selectedDate = dateSelector.value;
    if(insideText === "" || selectedDate === "") {
        return;
    }
    todoTextArray.push(insideText);
    dateArray.push(selectedDate);
    let listItemDiv = createListItem(insideText, selectedDate, todoTextArray.length - 1);
    listBox.appendChild(listItemDiv);

    storeTextArray(todoTextArray,dateArray);
    todoTextBox.value = '';
    dateSelector.value = '';
    updatePlaceholderMessage();
}

function deleteItem(index) {
    todoTextArray.splice(index, 1);
    dateArray.splice(index,1);
    storeTextArray(todoTextArray,dateArray);
    renderList();
}

function renderList() {
    listBox.innerHTML = '';

    if (todoTextArray.length === 0) {
        updatePlaceholderMessage();
    } else {
        for (let i = 0; i < todoTextArray.length; i++) {
            let listItemDiv = createListItem(todoTextArray[i],dateArray[i], i);
            listBox.appendChild(listItemDiv);
        }
    }
}

function createListItem(text, selectedDate, index) {
    let listItemDiv = document.createElement('div');
    let listItemTextDiv = document.createElement('div');
    let deleteButton = document.createElement('button');
    let buttonDiv = document.createElement('div');
    let dateDiv = document.createElement('div');

    listItemDiv.classList.add("list-item-div");
    listItemTextDiv.classList.add("list-item-text-div");
    deleteButton.classList.add("delete-button");
    buttonDiv.classList.add("button-div");
    dateDiv.classList.add("date-box");

    listItemTextDiv.innerText = text;
    dateDiv.innerText = selectedDate;
    deleteButton.innerText = 'Delete';

    listItemDiv.appendChild(listItemTextDiv);
    listItemDiv.appendChild(dateDiv);
    listItemDiv.appendChild(buttonDiv);
    buttonDiv.appendChild(deleteButton);

    
    deleteButton.addEventListener('click', function() {
        deleteItem(index);
    });

    return listItemDiv;
}

function storeTextArray(arr1,arr2) {
    localStorage.setItem("insideTextArray", JSON.stringify(arr1));
    localStorage.setItem("insideDateArray", JSON.stringify(arr2));
}

function updatePlaceholderMessage() {
    
    const placeholder = document.querySelector('.placeholder-message');
    
    if (todoTextArray.length === 0 && !placeholder) {
        const newPlaceholder = document.createElement('div');
        newPlaceholder.classList.add("placeholder-message");
        newPlaceholder.innerText = "No tasks yet";
        listBox.appendChild(newPlaceholder);
    } else if (todoTextArray.length > 0 && placeholder) {
        placeholder.remove();
    }
}

let addButton = document.querySelector("#add-button");
addButton.addEventListener("click", addItem);
