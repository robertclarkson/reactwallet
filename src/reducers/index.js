import { combineReducers } from 'redux'
import todos from './todos'
import addresses from './addresses'
import visibilityFilter from './visibilityFilter'
import mnemonic from './mnemonic'
import estimatedFees from './estimatedFees'
import currentFee from './currentFee'

export default combineReducers({
  todos,
  visibilityFilter,
  addresses,
  mnemonic,
  estimatedFees,
  currentFee
})
