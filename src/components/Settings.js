import React, {Component}from 'react'
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

export default class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mnemonic: "",
			newMnemonic: "",
			isLoading: false
		};
	}
	handleMnemonicChange(event) {
		this.setState({
			newMnemonic: event.target.value
		})
	}

	handleNewMnemonicSubmit(event) {
		if(!confirm('This will erase your existing mnemonic! Are you sure?')) return;
		this.saveNewMnemonic(this.state.newMnemonic)
		$('#changeMnemonic').modal('hide');
		this.setState({
			newMnemonic: ""
		})
	}
	
	handleGenerateNewMnemonicSubmit(event) {
		if(!confirm('This will erase your existing mnemonic! Are you sure?')) return;
		var mnemonicText = bip39.generateMnemonic()
		let mnemonic = {
		  words: mnemonicText,
		  created_at: Date.now()
		}
		this.saveMnemonicToGaia(mnemonic)
	}
	saveMnemonicToGaia(mnemonic) {
		putFile('mnemonic.json', JSON.stringify(mnemonic))
		  .then(() => {
		    this.setState({
		      mnemonic: mnemonic
		    })
		})
	}

	saveNewMnemonic(mnemonicText) {

		let mnemonic = {
		  words: mnemonicText,
		  created_at: Date.now()
		}

		this.saveMnemonicToGaia(mnemonic)
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

	storeMnemonic() {
		putFile('mnemonic.json', JSON.stringify(btc))
	      .then(() => {
	        // this.setState({
	        //   mnemonic:mnemonic,
	        //   address:address,
	        //   created_at:new Date(btc.created_at).toString()
	        // })
	      })
	}

	componentDidMount() {
		this.fetchData()
	}

	render() {
		return (
			<div>
				<h1>Settings</h1>

				<div className="settings">
	                <div className="col-md-6 offset-md-3">
		                <table className="table">
			                <tbody>
				                <tr>
				                	<th>Created</th>
				                	<td>
				                		{!this.state.isLoading?new Date(this.state.mnemonic.created_at).toString():'Loading...'}
				                	</td>
				                </tr>
				                <tr>
				                	<th>Mnemonic</th>
				                	<td>
				                		{!this.state.isLoading?this.state.mnemonic.words:'Loading...'}
					                </td>
				                </tr>
				            </tbody>
		                </table>
		                
		                <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#changeMnemonic">
						  Restore Mnemonic
						</button> &nbsp;
						<button
							className="btn btn-danger btn-lg"
							onClick={e => this.handleGenerateNewMnemonicSubmit(e)}
						>
							Generate Seed
						</button>

						<div className="modal fade" id="changeMnemonic" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						  <div className="modal-dialog" role="document">
						    <div className="modal-content">
						      <div className="modal-header">
						        <h5 className="modal-title" id="exampleModalLabel">Set new mnemonic</h5>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div className="modal-body">
						      <div className="alert alert-danger">
						      	Warning: Changing the mnemonic will overwrite your existing wallet seed.
						      </div>
						        <textarea className="form-control input-status"
				                    value={this.state.newMnemonic}
				                    onChange={e => this.handleMnemonicChange(e)}
				                    placeholder="Enter new Mnemonic"
				                  />
				              </div>
						      <div className="modal-footer">
						        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
						        <button
				                    className="btn btn-primary btn-lg"
				                    onClick={e => this.handleNewMnemonicSubmit(e)}
				                  >
				                    Submit
				                  </button>
						      </div>
						    </div>
						  </div>
						</div>
					</div>
				</div>	
			</div>	
		);
		
	}

	
	
}