import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({ //initial value ta object pass kortesi.aeto din single value pass korsi
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;//jehetu authenticate hoye gese
      const signedInUser ={
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL

      }
      setUser(signedInUser);//3
      console.log(displayName, email);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }
  const handleSignOut =() => {//2
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        photo: '',
        email: ''
      }
      setUser(signedOutUser);

    })
    .catch(err => {

    })
  }
//4
  return (
    <div >
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button>:
        <button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && <div>
            <p>Welcome, {user.name}</p>
            <p>Your email: {user.email}</p>
            <img src ={user.photo} alt="" ></img>

          </div>
      }
      
    </div>
  );
}

export default App;
