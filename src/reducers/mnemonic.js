const mnemonic = (state = '', action) => {
  switch (action.type) {
    case 'SET_MNEMONIC':
      return action.mnemonic
    default:
      return state
  }
}

export default mnemonic
