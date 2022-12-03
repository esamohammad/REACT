import React, { useContext, useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";
import { Route, Redirect } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthContextProvider = (props) =>{
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const getUser = user => {
    const {displayName, email, photoURL} = user;
    return {name: displayName, email, photo: photoURL}; 
}

const Auth = () => {
    const [user, setUser] = useState(null);
    
    const singInWithGoogle = () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const singedInUser = getUser(res.user);
            setUser(singedInUser);
            return res.user;
        })
        .catch(err => {
            setUser(null);
            return err.mesage;
        })
    }
    const signOut = () => {
        return firebase.auth().signOut().then(function() {
            setUser(null);
            return true;
          }).catch(function(error) {
            console.log(error);
            return false;
          });
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(usr) {
            if (usr) {
                const currUser = getUser(usr);
                setUser(currUser);
            } else {
              // No user is signed in.
            }
          });
    } , [])


    return {
        user,
        singInWithGoogle,
        signOut
    }
}

export default Auth;