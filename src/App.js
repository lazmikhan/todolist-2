import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home/Home';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { app, db } from './components/Authentication/config/config';
import { doc, getDoc } from 'firebase/firestore';
function App() {
  
  const [currentUser, setCurrentUser] = useState(null);
  const [userUID, setUserUID] = useState(null);
  useEffect(() => {
    const auth = getAuth(app);
    const handleAuthStateChange = async (user) => {
      if (user) {
       

        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setCurrentUser(userDocSnap.data().name);
            setUserUID(user.uid);
            console.log('state changed:', currentUser);
          }
        } catch (error) {
          console.error('Error retrieving user data:', error);
        }

      
      } else {
        // User is signed out
        setCurrentUser(null);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    return () => {
      unsubscribe(); // Unsubscribe from the onAuthStateChanged listener when component unmounts
    };
  }, []);


  return (
   
    <Router>
    <div>
    

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <Home currentUser={currentUser} userUID={userUID} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
      </Switch>
    </div>
  </Router>
   
  );
}

export default App;
