const currentFee = (state = '', action) => {
	console.log('fee', action)
  switch (action.type) {
    case 'SET_FEE':
      return action.fee
    default:
      return state
  }
}

export default currentFee
