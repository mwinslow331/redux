// The store should have 4 parts
// 1. The state
// 2. Get the state (getState)
// 3. Listen to changes on the state (subscribe)
// 4. Update the state (dispatch)

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

if (action.type === 'ADD_TODO') {
  return state.concat([action.todo])
} else if (action.type === 'REMOVE_TODO') {
  return state.filter((todo) => todo.id !== action.id)
} else if (action.type === 'TOGGLE_TODO') {
  return state.map((todo) => todo.id !== action.id ? todo :
    Object.assign({}, todo, {complete: !todo.complete})
  )
} else{

  return state
}
