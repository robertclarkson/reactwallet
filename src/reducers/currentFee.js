const currentFee = (state = '0', action) => {
	// console.log('fee', action)
  switch (action.type) {
    case 'SET_FEE':
      return action.fee
    default:
      return state
  }
}

export default currentFee
