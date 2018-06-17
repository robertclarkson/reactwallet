import React, {Component} from 'react'
import {
  isSignInPending,
  loadUserData,
  Person,
  getFile,
  putFile,
  deleteFile
} from 'blockstack';

let bitcoin = require('bitcoinjs-lib')
var bip39 = require('bip39')
var bip32 = require('bip32')
const cointypes = require('bip44-constants')

export default class Wallet extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mnemonic: "",
			newMnemonic: "",
			isLoading: false
		};
	}

	componentDidMount() {
		this.fetchData()
	}

	fetchData(){
		this.setState({isLoading:true})
		getFile('mnemonic.json')
		.then((file) => {
			if(file != null) {
				var mnemonic = JSON.parse(file || '[]')
				console.log(mnemonic);
				if(mnemonic.words){
					var words = mnemonic.words
					var seed = bip39.mnemonicToSeed(words)
					var rootkey = bip32.fromSeed(seed)
					// var address = this.getAddress(rootkey.derivePath("m/44'/1'/0'/0/0"))
					// var txs = this.getTransactions(address, this)
					// var trans = this.getTxs(address, this)

					this.setState({
						mnemonic:mnemonic,
						created_at:new Date(mnemonic.created_at).toString()
					})
				}
				else {
					console.log('no mnemonic')
				}
			}
			else {
				console.log('no file')
			}
		})
		.catch((e) => {
			console.log('Bitcoin: Error getting bitcoin private key')
			console.log(e);
		})
		.finally(() => {
			this.setState({isLoading:false})
		})
	}

}