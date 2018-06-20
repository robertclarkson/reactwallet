import React from 'react'
import { connect } from 'react-redux'
import {setEstimatedFees,setFee} from '../actions'

let dhttp = require('dhttp/200')
let index = 0


const FeeSelector = ({onChange, setFees, feeSelected, feeEstimates}) => {
  let select
  return (
    <div>
      <select ref={node => select = node} onChange={() => {
       feeSelected(select.options[select.selectedIndex].value)
       onChange(select.options[select.selectedIndex].value)
     }} className="form-control">
        <option value="0">Select...</option>
        <option value={feeEstimates.fastestFee}>Fastest ({feeEstimates.fastestFee}sat)</option>
        <option value={feeEstimates.halfHourFee}>Half hour ({feeEstimates.halfHourFee}sat)</option>
        <option value={feeEstimates.hourFee}>Within an Hour ({feeEstimates.hourFee}sat)</option>
      </select>
    </div>
  )
}


const mapStateToProps = state => ({
  feeEstimates: state.estimatedFees
})

const mapDispatchToProps = dispatch => ({
  feeSelected: fee => dispatch(setFee((fee*0.00000001).toFixed(8)))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeeSelector)

