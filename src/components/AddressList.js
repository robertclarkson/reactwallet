import React, { Component } from 'react';
import Address from './Address'
import { connect } from 'react-redux'
import {addAddress} from '../actions'

let bitcoin = require('bitcoinjs-lib')
let bip39 = require('bip39')
let bip32 = require('bip32')
const cointypes = require('bip44-constants')
let index = 0

const getAddress = (node) => {
    var baddress = bitcoin.address
    var bcrypto = bitcoin.crypto

    return baddress.toBase58Check(
      bcrypto.hash160(node.publicKey), 
      bitcoin.networks.testnet.pubKeyHash
    )
}

const AddressList = ({ addresses, mnemonic, addnewaddress }) => (
  <div>
	  <table className="table">
		  <thead>
		  	<tr>
		  		<th>Address</th>
		  		<th>Path</th>
		  		<th>Balance</th>
		  	</tr>
		  </thead>
	  	<tbody>
		    {addresses.map(address =>
		      <Address
		        key={address.id}
		        {...address}
		        onClick={() => getBalance(address.id)}
		      />
		    )}
	    </tbody>
	  </table>
	  <button onClick={
	  	() => {
		  	let seed = bip39.mnemonicToSeed(mnemonic)
	        let rootkey = bip32.fromSeed(seed)
	        let path = "m/44'/"+(index++)+"'/0'/0/0"
	        let address = getAddress(rootkey.derivePath(path))
		  	addnewaddress(address, path)
		}
	  }>New Address</button>
	</div>
)

const mapStateToProps = state => ({
  addresses: state.addresses,
  mnemonic: state.mnemonic.mnemonic
})

const mapDispatchToProps = dispatch => ({
  addnewaddress: (address, path) => dispatch(addAddress(address, path))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressList)

