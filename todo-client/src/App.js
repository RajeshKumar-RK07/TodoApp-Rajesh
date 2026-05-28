import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Todo Application</h1>
      <TodoList />
    </div>
  );
}

export default App;