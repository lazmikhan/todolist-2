import React, { useEffect, useState } from 'react';
import './Todo.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, setDoc, doc,deleteDoc, collection ,getDocs,updateDoc} from 'firebase/firestore';
import { app, db } from '../Authentication/config/config';
const Todo = (props) => {
  const [todos, setTodos] = useState([]);
  const [todoArray, setTodoArray] = useState([]);
  const [time, setTime] = useState(null);
const [currT, setCurrT]= useState(new Date());

 
  const handleInputChange = (e) => {
    setTodos(e.target.value);
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
    console.log(time);
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
      time: time,
      todos: todos,
    });

  };
  useEffect(()=>{
    const timeoutIds = [];
   const getData=async()=>{
    console.log(await getAllDocuments());
    const todoArr = await getAllDocuments();
    setTodoArray(todoArr);
   }
    getData();
     todoArray.forEach(todo => {
    const [hours, minutes] = todo.time.split(':');
    const reminderTime = new Date();
    reminderTime.setHours(hours);
    reminderTime.setMinutes(minutes);

    const currentTime = new Date();
    const timeDifference = reminderTime - currentTime;
console.log(timeDifference);
    if (timeDifference > 0) {
      const timeoutId = setTimeout(() => {
        alert(`Reminder: ${todo.todos}`);
        const result =alert(`Reminder: ${todo.todos}`);
        if (result) {
            clearTimeout(timeoutId);
          }
      }, timeDifference);
      timeoutIds.push(timeoutId);
      return () => {
       
      };
    }
  });
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
const newTime=prompt("Edit Your Time- (example-18:03)");
  const newValue = {
    todos: newTodo,
    time: newTime
    
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
         <p>
                <span style={{color:'grey'}}>Deadline At -example 12 which is 12pm : </span>
             <input onChange={handleTimeChange} type="time" name="" id=""/>
             </p>
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    
      <ul className="todo-list">
      {todoArray.map((todo, index) => (
          <li key={index}>
         <p>{todo.todos}</p>
     
         <button className='update' onClick={() => handleUpdateTodo(todo.id)}>Update</button> 
            <button className='delete' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <p>
                
            <p>Deadline at: {todo.time}</p>
             </p>
          </li>
           
        ))}
      </ul>
    </div>
  );
      };

export default Todo;
