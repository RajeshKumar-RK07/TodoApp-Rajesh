import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, searchTodos, getByCategory } from '../services/todoService';
import TodoForm from './TodoForm';
import TodoControls from './TodoControls';
import TodoItem from './TodoItem';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('High');
  const [category, setCategory] = useState('Work');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('All');
  
  const [editingId, setEditingId] = useState(null);
  
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setError('');
      const response = await getTodos();
      setTodos(response.data);
      setCurrentFilter('All');
    } catch (err) {
      setError('Failed to fetch todos.');
    }
  };

  const handleSearch = async (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);
    if (!keyword.trim()) {
      fetchTodos();
      return;
    }
    try {
      setError('');
      const response = await searchTodos(keyword);
      setTodos(response.data);
      setCurrentFilter('All');
    } catch (err) {
      setError('Failed to search todos.');
    }
  };

  const filterByCategory = async (cat) => {
    setCurrentFilter(cat);
    setSearchQuery('');
    if (cat === 'All') {
      fetchTodos();
      return;
    }
    try {
      setError('');
      const response = await getByCategory(cat);
      setTodos(response.data);
    } catch (err) {
      setError(`Failed to fetch ${cat} todos.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setError('');
      if (editingId) {
        await updateTodo(editingId, {
          id: editingId,
          title,
          description: '',
          priority,
          category,
          isCompleted: false
        });
        setEditingId(null);
      } else {
        await createTodo({
          title,
          description: '',
          priority,
          category,
          isCompleted: false
        });
      }
      
      setTitle('');
      setPriority('High');
      setCategory('Work');
      
      if (currentFilter === 'All') {
        fetchTodos();
      } else {
        filterByCategory(currentFilter);
      }
    } catch (err) {
      setError('Failed to save todo.');
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setTitle(todo.title);
    setPriority(todo.priority);
    setCategory(todo.category);
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      await deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo.');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setPriority('High');
    setCategory('Work');
  };

  return (
    <div>
      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button onClick={() => setError('')} className="btn-danger" style={{padding: '4px 8px', fontSize: '0.8rem'}}>X</button>
        </div>
      )}

      <TodoControls 
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        currentFilter={currentFilter}
        filterByCategory={filterByCategory}
      />

      <TodoForm 
        title={title} setTitle={setTitle}
        priority={priority} setPriority={setPriority}
        category={category} setCategory={setCategory}
        handleSubmit={handleSubmit}
        editingId={editingId}
        cancelEdit={cancelEdit}
      />

      <ul className="todo-list">
        {todos.length === 0 ? (
          <p style={{textAlign: 'center', color: 'var(--text-muted)'}}>No todos found.</p>
        ) : (
          todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              handleEdit={handleEdit} 
              handleDelete={handleDelete} 
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;