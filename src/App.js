import {getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';


initializeAuthentication();

const provider = new GoogleAuthProvider();


function App() {
    const [user,setUser] =useState({})


    const auth = getAuth();

  const handleGoogleSignIn =() => {
    
    signInWithPopup(auth, provider)
      .then(result =>{
        // const loginUser = result.user;
        const {displayName, email, photoURL} = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
        // console.log(user);
      })
      .catch(error =>{
        console.log(error.message);
      })         
  }

  const handleSignOut=()=>{
    // const auth = getAuth();
    signOut(auth)
    .then(() => {
      setUser({});
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      }


  return (
    <div className="App">

        {!user.name ?
          <button onClick={handleGoogleSignIn}>Google sign in </button>
           :
        <button onClick={handleSignOut}>Google/any Sign Out </button>
        }
        <br/>
        {
          user.email && <div>
              <h2>welcome:  {user.name} </h2>
              <p>i know ur email add:  {user.email}   </p>
              <img src={user.photo} alt=""/>
          
          </div>
        }
      
    </div>
  );
}

export default App;
