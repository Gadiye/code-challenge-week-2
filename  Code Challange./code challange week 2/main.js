// Get dom elements 
const itemInput = document.getElementById('item-input');

const addBtn = document.getElementById('add-btn');

const itemList = document.getElementById('item-list');

const PurchasedBtn = document.getElementById('purchased-btn');

const clearListBtn = document.getElementById('clear-list-btn');
// event listeners
addBtn.addEventListener('click', addItem);
PurchasedBtn.addEventListener('click', purchased);
clearListBtn.addEventListener('click', clearList);

//adds a new item to list 
function addItem() {
    const itemText = itemInput.value.trim();
    if (itemText) {
        const li = document.createElement('li');
        li.textContent = itemText;
        itemList.appendChild(li);
        itemInput.value = '';
    }
}
//purchased
function purchased() {
    const items = itemList.getElementsByTagName('li');
    for (let item of items) {
        item.classList.toggle('purchased');
    }
}
//clear list function
function clearList() {
    itemList.innerHTML = '';
}