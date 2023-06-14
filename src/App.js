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

function App() {
  
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
      
        const uid = user.email;
        setCurrentUser(user.email);
        console.log("state changed:", uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

  
  }, []); 


  return (
   
    <Router>
    <div>
    

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <Home currentUser={currentUser} />
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
