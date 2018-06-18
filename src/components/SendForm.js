import React from 'react'
import { connect } from 'react-redux'

let bitcoin = require('bitcoinjs-lib')
let bip39 = require('bip39')
let bip32 = require('bip32')
const cointypes = require('bip44-constants')
let dhttp = require('dhttp/200')
let index = 0

const SendForm = ({mnemonic,addresses,handleSend,maxsend}) => {
  let addressinput
  let amountinput
  let form
  return(
    <form ref={node => form = node} onSubmit={e => {
      // e.preventDefault()
      // if (!input.value.trim()) {
      //   return
      // }
      // dispatch(addTodo(input.value))
      // input.value = ''
    }}>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <h2>Send Bitcoins</h2>
            <div className="row">
              <div className="form-group col-12">
                <label>Address</label>
                <input ref={node => addressinput = node} 
                  className="form-control input-status"
                  id="sendaddress"
                  placeholder="Address"
                />
              </div>
              <div className="form-group col-12">
                <label>Amount</label>
                <div className="row">
                  <div className="form-group col-10">
                    <input ref={node => amountinput = node} 
                      className="form-control input-status"
                      id="amount"
                      placeholder="Amount"
                    />
                  </div>
                  <div className="col-2">
                    <button className="btn btn-default" onClick={(e) => {
                      e.preventDefault()
                      amountinput.value=maxsend
                    }}>Max</button>
                  </div>
                </div>
              </div>
              
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault()
                    let seed = bip39.mnemonicToSeed(mnemonic)
                    let rootkey = bip32.fromSeed(seed)
                    
                    var txb = new bitcoin.TransactionBuilder()

                    txb.setVersion(1)
                    txb.addInput('61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d', 0) // Alice's previous transaction output, has 15000 satoshis
                    txb.addOutput('1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP', 12000)
                    // (in)15000 - (out)12000 = (fee)3000, this is the miner fee

                    txb.sign(0, rootkey)


                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}


const mapStateToProps = (state, ownProps) => ({
  addresses: state.addresses,
  mnemonic: state.mnemonic.mnemonic,
  maxsend: state.addresses.reduce(function(sum, d) {
    return d.balance ? sum + d.balance : 0;
  }, 0)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  // handleSend: () => {
  //   console.log('hi')
   
  // }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendForm)

