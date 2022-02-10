// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
const donelist = document.querySelector("#my-done");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (let todo of todos) {
  addItem(todo);
}

// 函式
function addItem(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}
// Create
addBtn.addEventListener("click", function () {
  let inputValue = input.value;
  if (inputValue.trim().length > 0) {
    addItem(inputValue);
    input.value = "";
  }
});
input.addEventListener("keydown", function (key) {
  const inputValue = input.value;
  if (inputValue.trim().length > 0 && key.code === "Enter") {
    addItem(inputValue);
    input.value = "";
  }
});

// Delete and check to DoneList
list.addEventListener("click", function (event) {
  const target = event.target;
  const parentElement = target.parentElement;
  if (target.classList.contains("delete")) {
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    target.classList.toggle("checked");
    donelist.innerHTML += `<li >
    <label for="todo" class = "checked">${target.innerText}</label>
    <i class="delete fa fa-trash"></i>
    </li>`;
    parentElement.remove();
  }
});

donelist.addEventListener("click", function (event) {
  const target = event.target;
  const parentElement = target.parentElement;
  if (target.classList.contains("delete")) {
    parentElement.remove();
  }
  if (target.classList.contains("checked")) {
    list.innerHTML += `<li >
    <label for="todo">${target.innerText}</label>
    <i class="delete fa fa-trash"></i>
    </li>`;
    parentElement.remove();
  }
});

// 本次作業重點：
// 1.有關keydown的使用
// 原本是把它加到Add裡面，但其實是要對input做addEventListener。
// 2.在做todo到done卡了最久的一部分是有關如何把點擊項目的事件渲染出來。思考邏輯可以往兩個方向想
// 項目從Todo到Done(點擊項目->把項目checked->把項目刪除->新增Done裡面的項目)
// 項目從Done到Todo or Delete(點擊項目->把項目解除checked或著Delete->(如果是解除checked)在Todo新增項目->刪除Done項目)

// 每次輸入完後讓輸入欄清空。一開始是使用前面的inputValue = ''，但這樣是行不通的，因為inputValue是一個變數、一個值，更動變數也不會造成畫面上的輸入欄位清空，所以要直接輸入input.value = ""，這樣就是直接對輸入欄進行清空的動作了
// inputValue = '' ---> 只是更改變數，畫面不會改變。如果要的話還要回傳到HTML裡
// input.value = ''---> 直接對HTML要求欄位清空
