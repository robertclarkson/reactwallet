import React, { Component } from 'react';
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Profile from './Profile.jsx';
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';

export default class Home extends Component {
	handleSignOut(e) {
	    e.preventDefault();
	    signUserOut(window.location.origin);
	  }
	
	render(){
		return (
			<div className="container">
				<div className="col-sm-6 offset-sm-3 text-center">
			        <div className="site-wrapper-inner">
						<div>
							<Profile handleSignOut={ this.handleSignOut } />
						</div>
					</div>
				</div>
			</div>
		)
	}		
	
}
