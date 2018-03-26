// The store should have 4 parts
// 1. The state
// 2. Get the state (getState)
// 3. Listen to changes on the state (subscribe)
// 4. Update the state (dispatch)


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

// Reducer function
function todos (state = [], action) {
  switch(action.type){
    case 'ADD_TODO' :
      return state.concat([action.todo])
    case 'REMOVE_TODO' :
      return state.filter((todo) => todo.id !== action.id)
    case 'TOGGLE_TODO' :
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, {complete: !todo.complete})
      )
    default :
      return state
  }
}

function goals (state =  [], action) {
  switch(action.type){
    case 'ADD_GOAL' :
      return state.concat([action.goal])
    case 'REMOVE_GOAL' :
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

const store = createStore(app)

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Make breakfast',
    complete: false,
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    name: 'Let out and feed dog',
    complete: true,
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 2,
    name: 'Check email',
    complete: false,
  }
})

store.dispatch({
  type: 'REMOVE_TODO',
    id: 1
})

store.dispatch({
  type: 'TOGGLE_TODO',
    id: 0
})

store.dispatch({
  type: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Learn Redux'
  }
})

store.dispatch({
  type: 'ADD_GOAL',
  goal: {
    id: 1,
    name: 'Make commit to github'
  }
})

store.dispatch({
  type: 'REMOVE_GOAL',
  id: 0
})
