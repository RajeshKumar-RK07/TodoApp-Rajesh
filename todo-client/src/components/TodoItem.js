import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ todo, handleEdit, handleDelete }) {
  return (
    <li className="todo-item">
      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        <div className="todo-meta">
          <span className={`badge ${todo.priority.toLowerCase()}`}>
            {todo.priority}
          </span>
          <span className="badge category">
            {todo.category}
          </span>
        </div>
      </div>
      <div className="todo-actions">
        <button className="btn-edit" onClick={() => handleEdit(todo)}>
          Edit
        </button>
        <button className="btn-danger" onClick={() => handleDelete(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TodoItem;
