const addresses = (state = [], action) => {
  // console.log(action)
  switch (action.type) {
    case 'ADD_ADDRESS':
      return [
        ...state,
        {
          id: action.id,
          address: action.address,
          path: action.path
        }
      ]
    case 'SET_BALANCE':
      return state.map(item =>
        item.address === action.address ?
          { ...item, balance: action.balance } :
          item
      )
    default:
      return state
  }
}

export default addresses
