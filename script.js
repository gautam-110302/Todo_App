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
    let listItemDiv = createListItem(insideText, selectedDate, todoTextArray.length - 1); // Pass the correct index
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
    renderList(); // Re-render the list to reflect the updated array
}

function renderList() {
    listBox.innerHTML = ''; // Clear the list container before re-rendering

    if (todoTextArray.length === 0) {
        updatePlaceholderMessage(); // Update placeholder when the list is empty
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

    // Attach event listener to the delete button with the correct index
    deleteButton.addEventListener('click', function() {
        deleteItem(index); // Use the correct index for deletion
    });

    return listItemDiv;
}

function storeTextArray(arr1,arr2) {
    localStorage.setItem("insideTextArray", JSON.stringify(arr1));
    localStorage.setItem("insideDateArray", JSON.stringify(arr2));
}

function updatePlaceholderMessage() {
    // Check if there are no tasks and show the placeholder message
    const placeholder = document.querySelector('.placeholder-message');
    
    if (todoTextArray.length === 0 && !placeholder) {
        const newPlaceholder = document.createElement('div');
        newPlaceholder.classList.add("placeholder-message");
        newPlaceholder.innerText = "No tasks yet";
        listBox.appendChild(newPlaceholder);
    } else if (todoTextArray.length > 0 && placeholder) {
        // Remove the placeholder when there are tasks
        placeholder.remove();
    }
}

let addButton = document.querySelector("#add-button");
addButton.addEventListener("click", addItem);
