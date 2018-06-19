import React from 'react'
import { connect } from 'react-redux'
import {setEstimatedFees,setFee} from '../actions'

let dhttp = require('dhttp/200')
let index = 0


const FeeSelector = ({setFees, feeSelected, feeEstimates}) => {
  let select
  return (
    <div>
      <select ref={node => select = node} onChange={() => feeSelected(select.options[select.selectedIndex].value)} className="form-control">
        <option >Select...</option>
        <option value={feeEstimates.fastestFee}>Fastest</option>
        <option value={feeEstimates.halfHourFee}>Half hour</option>
        <option value={feeEstimates.hourFee}>Within an Hour</option>
      </select>
    </div>
  )
}


const mapStateToProps = state => ({
  feeEstimates: state.estimatedFees
})

const mapDispatchToProps = dispatch => ({
  feeSelected: fee => dispatch(setFee(fee))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeeSelector)

