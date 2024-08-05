// to do list project

//to do item 
function TodoItem(title, description, dueDate){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = false;
}

//to do list maneger

const TodoList = {
    items:[],
    //add item function
    addItem: function (title, description, dueDate) {
        const newItem = new TodoItem(title , description, dueDate);
        this.items.push(newItem);
    },

    // mark commpleted
    markCompleted: function(index) {
        if (index >= 0 && index < this.items.length){
            this.items[index].completed = true;

        }
    },

    // remove item 
    removeItem: function(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
    },

    // displaylist
    displayList: function () {
        this.items.forEach((item, index) => {
            console.log(`${index + 1}. [${item.completed ? 'X' : '  '}] ${item.title} - ${item.description} - ${item.dueDate}`);
        });
    },

    // filter by completeion 
    filterByCompleteion: function(completed) {
        return this.items.filter(item => item.completed === completed);
    }
};
// test to do list
TodoList.addItem("Buy stuff", "milk, gas, weed,", "2024-08-10");
TodoList.addItem("Dumb Things To Do", "Beat Meat, call Stacy", "2024-08-10");
TodoList.addItem("Make bread", "Finish Bike Build", "2024-08-20");

console.log("My Todo List:");
TodoList.displayList();





