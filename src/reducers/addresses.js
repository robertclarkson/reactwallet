const addresses = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ADDRESS':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          path: action.path
        }
      ]
    
    default:
      return state
  }
}

export default addresses
