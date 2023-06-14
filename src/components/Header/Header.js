import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import  './Header.css';
import { getAuth, signOut } from "firebase/auth";
import { app } from '../Authentication/config/config';
const Header = (props) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
  

    setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
  }, []);

    const handleLogin = () => {
        // Handle login logic here
        console.log(currentDateTime);
      };
    
      const handleSignup = () => {
        // Handle signup logic here
        console.log('Signup button clicked');
      };
      const linkStyle = {
        textDecoration: 'none',
        color:'white'
      };
    return (
        <div className="header">
        <h1 className='todoList-header' >To-Do List</h1>
        <i style={{color:'grey'}} >Please Login to Make your custom To do List</i>
     {
      props.currentUser==null?
      <div>
       <br />
      <button className="button login-button" onClick={handleLogin}>
       <Link to='login' style={linkStyle } > Login</Link>
      </button>
      <button className="button signup-button" onClick={handleSignup}>
      <Link to='signUp' style={linkStyle } > Sign Up</Link>
      </button>
      </div>:<div>
        <br />
      <button onClick={()=>{
const auth = getAuth(app);
signOut(auth).then(() => {
  console.log('logged out');
  window.location.reload();
}).catch((error) => {
  // An error happened.
});
      }} className="button signup-button" >
     Logout
      </button>
      </div>
     }
        <div>
     

    </div>
    <div>
      <br />
<i style={{color:'grey'}}>{currentDateTime.toLocaleString()}</i>
    </div>
      </div>
    );
};

export default Header;