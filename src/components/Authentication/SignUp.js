import React, { useState } from 'react';
import './signUp.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
import { app, db } from './config/config';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const SignUp = () => {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorReg, setErrorReg] = useState('');

  const  handleSubmit = async (e) => {
    e.preventDefault();

    // Perform signup logic or API call here
    try {
        // Perform signup logic or API call here
        const auth = getAuth(app);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
        // Create user in Firebase Authentication
        const { user } = userCredential;
    if(userCredential!=null)
    {
        await setDoc(doc(db, 'users', user.uid), {  name: firstName,
            email: email,
            password: password });
       
            history.push('/');
        console.log('User created successfully!');
    }
        // Store user data in Firestore
      
      } catch (error) {
        console.error('Error creating user:', error);
        setErrorReg(error);
        
      }
   

   

    // Reset form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };
    return (
        <div>
            <br /><br />
          
      <form className="signup-form" onSubmit={handleSubmit}>
      <h2 style={{color:'#eea01b'}}>Signup Form</h2>
        <label>
       
          <input
            type="text"
            value={firstName}
            placeholder='name'
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
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
        <button type="submit">Signup</button>
        {
        errorReg&& <div style={{color:'red'}}>
            {errorReg}
        </div>
      }
      </form>
   
        </div>
    );
};

export default SignUp;