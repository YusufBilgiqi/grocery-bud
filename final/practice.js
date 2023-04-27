// ****** select items **********

const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// ***** edit option ******

let editElement;
let editFlag = false;
let editID = "";

// submit form
form.addEventListener("submit", addItem);

// clear list
clearBtn.addEventListener("click", clearItems);

// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// ****** functions **********

function addItem(e) {
  e.preventDefault();

  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    const attr = document.createAttribute("data-id");
    attr = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
<div class="btn-container">
  <!-- edit btn -->
  <button type="button" class="edit-btn">
    <i class="fas fa-edit"></i>
  </button>
  <!-- delete btn -->
  <button type="button" class="delete-btn">
    <i class="fas fa-trash"></i>
  </button>
</div>`;

    const deleteBtn = document.querySelector("delete-btn");
    deleteBtn.addEventListener("click", deleteItem);

    list.append(element);

    container.classList.add("show-container");
    displayAlert("Item added", "success");
  }
  setBackToDefault();
}

const displayAlert = (text, value) => {
  alert.textContent = text;
  alert.classList.add(`alert-${value}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${value}`);
  });
};

const clearItems = () => {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach((item) => {
      list.appendChild.remove(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("all items removed", "danger");
};

const deleteItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }

  displayAlert("Item removed", "danger");
  setBackToDefault();
};

const setBackToDefault = () => {
  grocery.value = "";
  editFlag = "false";
  editID = "";
  submitBtn.textContent = "";
};

// === Local storage ===

function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
