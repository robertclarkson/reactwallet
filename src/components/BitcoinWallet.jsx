import React, { Component } from 'react';
import AddressList from '../components/AddressList'
import addAddress from '../actions/index'
import { connect } from 'react-redux'

import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  getFile,
  signUserOut,
} from 'blockstack';


let bitcoin = require('bitcoinjs-lib')
var bip39 = require('bip39')
var bip32 = require('bip32')
const cointypes = require('bip44-constants')

export default class BitcoinWallet extends Component {

	constructor(props) {
		super(props);
		console.log(props)
		// this.addnewaddress = this.props.addnewaddress 
		// this.addnewaddress
		
	}

	generateNewAddress(event) {
		console.log('new address');
		
	}

	render() {
		return (
		  <div>
			<h1>Bitcoin</h1>
			<AddressList  />
		  </div>
		);
	}
}
