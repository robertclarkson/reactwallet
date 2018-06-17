import React, { Component } from 'react';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
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

export default class App extends Component {

  constructor(props) {
  	super(props);
  }

  handleSignIn(e) {
    e.preventDefault();
    redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
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
