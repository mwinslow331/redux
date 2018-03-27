<div>
  <h1>Todo List</h1>
  <input id='todo' type='text' placeholder="Add Todo" />
  <button id='todoBtn'>Add Todo</button>
  <ul id='todos'></ul>
</div>
<div>
  <h1>Goals</h1>
  <input id='goal' type='text' placeholder="Add Goal" />
  <button id='goalBtn'>Add Goal</button>
  <ul id='goals'></ul>
</div>

<hr />


store.subscribe(() => {
  const { goals, todos } = store.getState()

  document.getElementById('goals').innerHTML = ''
  document.getElementById('todos').innerHTML = ''

  goals.forEach(addGoalToDOM)
  todos.forEach(addTodoToDOM)
})

// DOM Code
function createRemoveButton(onClick) {
  const removeBtn = document.createElement('button')
  removeBtn.innerHTML = 'x'
  removeBtn.addEventListener('click', onClick)

  return removeBtn
}

function addTodoToDOM (todo) {
  const node = document.createElement('li')
  const text = document.createTextNode(todo.name)

  const removeBtn = createRemoveButton(() => {
    store.dispatch(removeTodoAction(todo.id))
  })

  node.appendChild(text)
  node.appendChild(removeBtn)

  node.style.textDecoration = todo.complete ? 'line-through' : 'none'
  node.addEventListener('click', () => {
    store.dispatch(toggleTodoAction(todo.id))
  })

  document.getElementById('todos')
    .appendChild(node)
}

function addGoalToDOM (goal) {
  const node = document.createElement('li')
  const text = document.createTextNode(goal.name)

  const removeBtn = createRemoveButton(() => {
    store.dispatch(removeGoalAction(goal.id))
  })

  node.appendChild(text)
  node.appendChild(removeBtn)

  document.getElementById('goals')
    .appendChild(node)
}

function addTodo () {
  const input = document.getElementById('todo')
  const name = input.value
  input.value = ''

  store.dispatch(addTodoAction({
    id: generateId(),
    name,
    complete: false,
  }))
}

function addGoal () {
  const input = document.getElementById('goal')
  const name = input.value
  input.value = ''

  store.dispatch(addGoalAction({
    id: generateId(),
    name,
  }))
}

document.getElementById('todoBtn')
  .addEventListener('click', addTodo)
document.getElementById('goalBtn')
  .addEventListener('click', addGoal)
