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
			<div className="site-wrapper">
		        <div className="site-wrapper-inner">
					<div>
						<Profile handleSignOut={ this.handleSignOut } />
						<AddTodo />
						<VisibleTodoList />
						<Footer />
					</div>
				</div>
			</div>

		)
	}		
	
}
