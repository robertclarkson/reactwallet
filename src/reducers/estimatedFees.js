const estimatedFees = (state = '', action) => {
console.log('fees', action)
  switch (action.type) {
    case 'SET_ESTIMATED_FEES':
      return action.fees
    default:
      return state
  }
}

export default estimatedFees
