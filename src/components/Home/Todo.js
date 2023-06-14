import React, { useEffect, useState } from 'react';
import './Todo.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, setDoc, doc,deleteDoc, collection ,getDocs,updateDoc} from 'firebase/firestore';
import { app, db } from '../Authentication/config/config';
const Todo = (props) => {
  const [todos, setTodos] = useState([]);
  const [todoArray, setTodoArray] = useState([]);

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
  useEffect(()=>{
   const getData=async()=>{
    console.log(await getAllDocuments());
    const todoArr = await getAllDocuments();
    setTodoArray(todoArr);
   }
    getData();
    return () => {
        // Cleanup logic
      };
  },[todoArray])
  const handleDeleteTodo = async(todoId) => {
    const todoRef = doc(db, `todos of ${props.userUID}`, todoId);

    try {
      await deleteDoc(todoRef);
      console.log('Todo deleted successfully.');
     
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdateTodo = async(todoId) => {
    const todoRef = doc(db, `todos of ${props.userUID}`, todoId);
const newTodo=prompt("Edit Your Todo");
  const newValue = {
    todos: newTodo,
    email: props.currentUser,
    
  };
    try {
      await updateDoc(todoRef, newValue);
      console.log('Todo updated successfully.');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  
  // ...
  
  // Example usage
//   const todoId = 'your-todo-id';

  

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
      {todoArray.map((todo, index) => (
          <li key={index}>
         <p>{todo.todos}</p>
         <button className='update' onClick={() => handleUpdateTodo(todo.id)}>Update</button> 
            <button className='delete' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
      };

export default Todo;
