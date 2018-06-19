import React, { Component } from 'react';
import Address from './Address'
import { connect } from 'react-redux'
import {addAddress,setBalance} from '../actions'

let bitcoin = require('bitcoinjs-lib')
let bip39 = require('bip39')
let bip32 = require('bip32')
const cointypes = require('bip44-constants')
let dhttp = require('dhttp/200')
let index = 0

const getAddress = (node) => {
    var baddress = bitcoin.address
    var bcrypto = bitcoin.crypto

    return baddress.toBase58Check(
      bcrypto.hash160(node.publicKey), 
      bitcoin.networks.testnet.pubKeyHash
    )
}

const getTransactions = (address, setbalance) => {
	console.log('get TX: ',address.address)
	dhttp({
      method: 'GET',
      url: 'https://test-insight.bitpay.com/api/addr/'+address.address,
    }, function (err, transactions) {
      if (err) console.error(err)
      	console.log(transactions)
      	setbalance(address.address,transactions.balance)
    })
}

const AddressList = ({ addresses, mnemonicText, addnewaddress, setbalance }) => (
  <div>
  	<button className="btn btn-success" onClick={
	  	() => {
	  		if(!bip39.validateMnemonic(mnemonicText)) {
	  			console.error('Not a valid mnemonic: ', mnemonicText)
	  			return
	  		}
	  		// console.log(mnemonicText)
		  	let seed = bip39.mnemonicToSeed(mnemonicText)
	        let rootkey = bip32.fromSeed(seed)
	        let path = "m/44'/"+(index++)+"'/0'/0/0"
	        let address = getAddress(rootkey.derivePath(path))
		  	addnewaddress(address, path)
		}
	  }> + New Address</button>
	  <p></p>
	  <table className="table">
		  <thead>
		  	<tr>
		  		<th>Address</th>
		  		<th>Path</th>
		  		<th>Balance</th>
		  	</tr>
		  </thead>
	  	<tbody>
		    {addresses.map(address => (
		    	// console.log('new',address),	
				<Address
					key={address.id}
					{...address}
					onClick={() => {
					getTransactions(address, setbalance)
					}}
				/>
				)
		    )}
	    </tbody>
	  </table>
	  
	</div>
)

const mapStateToProps = state => ({
  addresses: state.addresses,
  mnemonicText: state.mnemonic.words
})

const mapDispatchToProps = dispatch => ({
  addnewaddress: (address, path) => dispatch(addAddress(address, path)),
  setbalance: (address, balance) => dispatch(setBalance(address, balance))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressList)

