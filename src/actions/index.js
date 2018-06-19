let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const setMnemonic = mnemonic => ({
  type: 'SET_MNEMONIC',
  mnemonic
})

let nextAddress = 0
export const addAddress = (address, path) => ({
  type: 'ADD_ADDRESS',
  id: nextAddress++,
  address,
  path
})

export const setBalance = (address, balance) => ({
  type: 'SET_BALANCE',
  address,
  balance
})

export const setEstimatedFees = (fees) => ({
  type: 'SET_ESTIMATED_FEES',
  fees
})

export const setFee = (fee) => ({
  type: 'SET_FEE',
  fee
})