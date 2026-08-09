import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Circle } from 'lucide-react';
import './Todo.css';

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('ambient-todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('ambient-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodos([{ id: Date.now(), text: inputValue, completed: false }, ...todos]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="glass-panel todo-container">
      <h2 className="todo-header">TODAY</h2>
      
      <form onSubmit={addTodo} className="add-todo-form">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="+ Add task"
        />
        <button type="submit" className="add-btn"><Plus size={18} /></button>
      </form>

      <ul className="todo-list">
        {sortedTodos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <button className="toggle-btn" onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? <Check size={16} /> : <Circle size={16} />}
            </button>
            <span className="todo-text">{todo.text}</span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
