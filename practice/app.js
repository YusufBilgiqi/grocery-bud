// selectors
const form = document.querySelector(".grocery-form");
let grocery = document.getElementById("grocery");
const submit = document.getElementsByClassName("submit-btn");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const clearBtn = document.querySelector(".reset-btn");
const container = document.querySelector(".grocery-container");

// events

let editElement;
let editFlag = false;
let editID = "";

//  submit form
form.addEventListener("submit", addItem);

//  clear list
clearBtn.addEventListener("click", clearItems);

// functions

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;

  // create unique id
  const id = new Date().getTime().toString();
  console.log(id);

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
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

    //   add event listeners to delete buttom
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);

    // append child ()
    list.append(element);

    // display alert
    displayAlert("item added to the list", "success");

    // show container
    container.classList.add("show-container");
  }

  // set back to default
  setBackToDefault();
}

// //  2. display alert

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// // 3. clear items

function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
}

// // 4. delete item

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  // const length = list.children.length;
  // console.log(length);

  console.log(element);
  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
}

// // 5. set back to default

function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submit.textContent = "submit";
}
