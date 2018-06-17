const addresses = (state = [], action) => {
  console.log(action)
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
      return state.map(address =>
        address.address === action.address ?
          { ...address, balance: action.balance } :
          address
      )
    default:
      return state
  }
}

export default addresses
