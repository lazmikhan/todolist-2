import React, { useState } from 'react';
import './Todo.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, setDoc, doc, collection ,getDocs} from 'firebase/firestore';
import { app, db } from '../Authentication/config/config';
const Todo = (props) => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setTodos(e.target.value);
  };
  const getAllDocuments = async () => {
    const todosCollectionRef = collection(db, `todos of ${props.userUID}`);
    const querySnapshot = await getDocs(todosCollectionRef);
  
    const todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({ id: doc.id, ...doc.data() });
    });
  
    return todos;
  };
  const handleAddTodo = async () => {
    const todosCollectionRef = collection(db, `todos of ${props.userUID}`);
    const newDocRef = doc(todosCollectionRef); // Generate a new document reference
  
   
    await setDoc(newDocRef, {
      email: props.currentUser,
      todos: todos,
    });
   
  };
  
  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleUpdateTodo = (index, newValue) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = newValue;
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1 style={{textAlign:'center',color:'#eea01b'}}> {props.currentUser}'s Todo List</h1>
      <div className="todo-form">
        <input
          type="text"
          placeholder="Enter a todo..."
        
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
      
      </ul>
    </div>
  );
};

export default Todo;
