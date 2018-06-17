import { connect } from 'react-redux'
// import { toggleTodo } from '../actions'
import AddressList from '../components/AddressList'
import { VisibilityFilters } from '../actions'

const mapStateToProps = state => ({
  addresses: state.addresses
})

const mapDispatchToProps = dispatch => ({
  /*getNextAddress: dispatch(getNextAddress())*/
  /*toggleTodo: id => dispatch(toggleTodo(id))*/
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressList)
