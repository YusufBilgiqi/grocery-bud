// *** selectors ***

const form = document.querySelector(".grocery-form");
let grocery = document.querySelector("#grocery");
const submit = document.querySelector(".submit-btn");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const clear = document.querySelector(".reset-btn");
const container = document.querySelector(".grocery-container");

// *** value ***

let editElement;
let editFlag = false;
let editID = "";

// *** events ***

// submit form
form.addEventListener("submit", addItem);

// clear list
clear.addEventListener("click", clearItems);

// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// *** functions ***

// 1. Add items
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    createListItem(id, value);
    displayAlert("item added", "success");
    container.classList.add("show-container");

    addToLocalStorage(id, value);
    setbacktodefault();

    // edit grocery ternary operator
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", "succes");

    // edit local storage
    editLocalStorage(editID, value);
    setbacktodefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}
// //  2. display alert

function displayAlert(text, value) {
  alert.textContent = text;
  alert.classList.add(`alert-${value}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${value}`);
  }, 1000);
}

// 3. Clear items
function clearItems() {
  const item = document.querySelectorAll(".grocery-item");
  if (item.length > 0) {
    item.forEach((item) => {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("list is empty", "danger");
  setbacktodefault();
  localStorage.removeItem("list");
}

// 4. Delete item
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setbacktodefault();

  removeFromLocalStorage(id);
}

// 5. edit item

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set from value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submit.textContent = "edit";
}

// set back to default
function setbacktodefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submit.textContent = "submit";
}

// **** Local Storage ****

// Add to local storage
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  // console.log(grocery);
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}
localStorage.setItem("city", "Medina");

// Get local storage
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

// Remove from local storage
function removeFromLocalStorage(id) {
  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

//

// **** Setup Items ****

function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
  element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
    <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
     </button>
     <button type="button" class="delete-btn">
     <i class="fas fa-trash"></i>
      </button>
    </div>`;

  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  list.append(element);
}
