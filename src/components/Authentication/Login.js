import React, { useState } from 'react';
import { app } from './config/config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const handleSubmit = (e) => {
      e.preventDefault();
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          history.push('/');
          // ...
        })
        .catch((error) => {
        
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          
        });
      // Perform signup logic or API call here
      console.log('Signup form submitted');
      
    
      console.log('Email:', email);
      console.log('Password:', password);
  
      // Reset form fields
  

      setEmail('');
      setPassword('');
    };
    return (
        <div>
            <br /><br />
          
          <form className="signup-form" onSubmit={handleSubmit}>
          <h2 style={{color:'#eea01b'}}>Login Form</h2>
         
            <br />
          
            <br />
            <label>
          
              <input
                type="email"
                value={email}
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
            <label>
         
              <input
                type="password"
                value={password}
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Login</button>
            {
        error&& <div style={{color:'red'}}>
            {error}
        </div>
      }
          </form>
      
        </div>
    );
};

export default Login;