{
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
}

{
  type: 'REMOVE_TODO',
  id: 0,
}

{
  type: 'TOGGLE_TODO',
  id: 0,
}

{
  type: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Get a coding job',
  }
}

{
  type: 'REMOVE_GOAL',
  id: 0,
}

function todos (state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo])
  }
  return state
}

function createStore () {
  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  return {
    getState,
    subscribe,
  }
}
