import { combineReducers } from 'redux'
import todos from './todos'
import addresses from './addresses'
import visibilityFilter from './visibilityFilter'
import mnemonic from './mnemonic'

export default combineReducers({
  todos,
  visibilityFilter,
  addresses,
  mnemonic
})
