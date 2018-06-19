import React, { Component } from 'react';
import { connect } from 'react-redux'
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
  getFile,
  putFile,
} from 'blockstack';

import { BrowserRouter, Router, Route, NavLink, Link, Switch } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import jquery from 'jquery';

import 'bootstrap'

import Footer from './Footer'
import Settings from './Settings'
import BitcoinWallet from './BitcoinWallet.jsx'
import Home from './Home.jsx'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import {setMnemonic} from '../actions'

let bitcoin = require('bitcoinjs-lib')
var bip39 = require('bip39')
var bip32 = require('bip32')
const cointypes = require('bip44-constants')

class App extends Component {

  constructor(props) {
  	super(props);
    this.fetchData()
  }

  handleSignIn(e) {
    e.preventDefault();
    redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  fetchData(){
    // this.setState({isLoading:true})
    getFile('mnemonic.json')
    .then((file) => {
      if(file != null) {
        var mnemonic = JSON.parse(file || '[]')
        if(mnemonic.words){
          var words = mnemonic.words

          var seed = bip39.mnemonicToSeed(words)
          var rootkey = bip32.fromSeed(seed)
          // var address = this.getAddress(rootkey.derivePath("m/44'/1'/0'/0/0"))
          // var txs = this.getTransactions(address, this)
          // var trans = this.getTxs(address, this)
            
            this.props.updateMnemonic(mnemonic)

          // this.setState({
          //  mnemonic:mnemonic
          //  created_at:new Date(mnemonic.created_at).toString()
          // })
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
      // this.setState({isLoading:false})
    })
  }

  render() {
    return (
      <div>
        { !isUserSignedIn() ?
          <Signin handleSignIn={ this.handleSignIn } />
          : <BrowserRouter>
              <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                  <Link className="navbar-brand" to="/">Simple Wallet</Link>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/" activeClassName="active">Home</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/bitcoin" activeClassName="active">Bitcoin</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/settings" activeClassName="active">Settings</NavLink>
                      </li>
                    </ul>
                  </div>
                </nav>
                <switch>
                  <Route path="/bitcoin" component={BitcoinWallet}/>
                  <Route path="/settings" component={Settings}/>
                  <Route exact path="/" component={Home}/>
                </switch>
              </div>
            </BrowserRouter>
        }
      </div>
    );
  }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
  }
}

const mapStateToProps = state => ({
  mnemonic: state.mnemonic
})

const mapDispatchToProps = dispatch => ({
  updateMnemonic: (mnemonic) => dispatch(setMnemonic(mnemonic))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

