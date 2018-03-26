// The store should have 4 parts
// 1. The state
// 2. Get the state (getState)
// 3. Listen to changes on the state (subscribe)
// 4. Update the state (dispatch)

//Library Code
function createStore (reducer) {
  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    // call todos
    state = reducer(state, action)
    // loop over listeners and invoke item
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}

// This is the way I would most likely code this but the code below is more concise
// The below uses "switch" instead of the if/else if/else

// if (action.type === 'ADD_TODO') {
//   return state.concat([action.todo])
// } else if (action.type === 'REMOVE_TODO') {
//   return state.filter((todo) => todo.id !== action.id)
// } else if (action.type === 'TOGGLE_TODO') {
//   return state.map((todo) => todo.id !== action.id ? todo :
//     Object.assign({}, todo, {complete: !todo.complete})
//   )
// } else{
//
//   return state
// }

// App Code
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function addTodoAction (todo) {
  return {
    type: ADD_TODO,
    todo,
  }
}

function removeTodoAction (id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodoAction (id) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

function addGoalAction (goal) {
  return {
    type: ADD_GOAL,
    goal,
  }
}

function removeGoalAction (id) {
  return {
    type: REMOVE_GOAL,
    id,
  }
}

// Reducer function
function todos (state = [], action) {
  switch(action.type){
    case ADD_TODO :
      return state.concat([action.todo])
    case REMOVE_TODO :
      return state.filter((todo) => todo.id !== action.id)
    case TOGGLE_TODO :
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, {complete: !todo.complete})
      )
    default :
      return state
  }
}

function goals (state =  [], action) {
  switch(action.type){
    case ADD_GOAL :
      return state.concat([action.goal])
    case REMOVE_GOAL :
      return state.filter((goal) => goal.id !== action.id)
    default :
      return state
  }
}

function app (state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}


const store = createStore(app)

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

store.dispatch(addTodoAction({
  id: 0,
  name: 'Make breakfast',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 1,
  name: 'Let out and feed dog',
  complete: true,
}))

store.dispatch(addTodoAction({
  id: 2,
  name: 'Check email',
  complete: false,
}))

store.dispatch(removeTodoAction(1))

store.dispatch(toggleTodoAction(0))

store.dispatch(addGoalAction({
  id: 0,
  name: 'Learn Redux'
}))

store.dispatch(addGoalAction({
  id: 1,
  name: 'Make commit to github'
}))

store.dispatch(removeGoalAction(0))
