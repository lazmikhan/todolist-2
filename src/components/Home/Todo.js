import React, { useState } from 'react';
import './Todo.css';
const Todo = (props) => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
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
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="text"
              value={todo}
              onChange={(e) => handleUpdateTodo(index, e.target.value)}
            />
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
