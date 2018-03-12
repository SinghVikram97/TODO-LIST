let todos=[];      // Copy of internal storage
let todoList;
window.onload=function () {
    let inputTodo=$("#todo-tasks");
    let addButton=$("#addButton");
    let deleteButton=$("#deleteButton");
    todoList=$("#todosAppend");

    // First thing to do is to check for any saved todos
    if(todos)
    {
        // Not empty so display them
        refreshTodos(true);
    }
    // Add tasks to todos array on clicking add button
    addButton.click(function () {
        console.log(todoList)
        addTodos(inputTodo.val())
        inputTodo.val("")
    })

    deleteButton.click(function () {
        deleteTodos();
    })

    inputTodo.keyup(function (e) {
        if(e.which==13)
        {
            addButton.click();
        }
    })
};

function deleteTodos() {

    // Clear todos from internal storage
    todos = todos.filter((todo) => !todo.done);
    localStorage.setItem("todos",JSON.stringify(todos));
    refreshTodos();
}
function addTodos(taskInput) {
    // Push a todo to todos array
    todos.push({
        task:taskInput,
        done:false
    });
    // Refresh todos
    refreshTodos();
}
function refreshTodos(firstTime=false) {

    // Save todos to local storage
    if(!firstTime)
    {
       saveTodos();
    }
    // Delete existing todos from view
    todoList.empty();

    // Get updated todos from local storage
    retrieveTodos();

    // Display
    for(i in todos)
    {
        console.log(1)
        let todoItem=createTodoItem(+i);
        todoList.append(todoItem);
    }
}
function saveTodos() {
    localStorage.setItem("todos",JSON.stringify(todos));
}
function retrieveTodos() {
    let savedTodos=localStorage.getItem("todos");
    if(savedTodos)
    {
        todos=JSON.parse(savedTodos);
    }
}
function moveUp(index) {
   // let temp;
    // temp=todos[index];
    // todos[index]=todos[index-1];
    // todos[index-1]=temp;
    // refreshTodos();
    let deletedItem=todos.splice(index,1);
    deletedItem=deletedItem[0];
    todos.splice(index-1,0,deletedItem);
    refreshTodos();
}
function moveDown(index) {

    let deletedItem=todos.splice(index,1);
    deletedItem=deletedItem[0];
    todos.splice(index+1,0,deletedItem);
    refreshTodos();
}
function createTodoItem(i) {

     let li=$("<li class='list-group-item'></li>");
     let divRow;
     if(i==0)
     {
         divRow=$("<div class='row mt-3'></div>");
     }
     else
     {
         divRow=$("<div class='row mt-0'></div>");
     }
     let divCol=$("<div class='col offset-3 pl-3 pr-0'></div>");
     let checkBox=$("<input type='checkbox' class='mr-1'>").click(function () {
         todos[i].done=!(todos[i].done);
         refreshTodos();
     });
     let span;
     if(todos[i].done)
     {
        span=$("<span class='todoItem checked'> " + todos[i].task + " </span>");
        checkBox.prop("checked",true);
     }
     else
     {
        span=$("<span class='todoItem'> " + todos[i].task + " </span>");
     }
     // Add click functionality on creating it
     let arrowUp=$("<i class='fas fa-chevron-up up'></i>").click(function () {
         moveUp(i);
     });
     let arrowDown=$("<i class='fas fa-chevron-down'></i>").click(function () {
         moveDown(i);
     })

     // Insert div row inside li
     divCol.append(checkBox);
     divCol.append(span);
     divCol.append(arrowUp);
     divCol.append(arrowDown);

     divRow.append(divCol);

     li.append(divRow);
    // Insert this at end of todoItem list (ul)
     return li;

}