import React from 'react';
import PropTypes from 'prop-types';

function TodoForm({ 
  title, setTitle, 
  priority, setPriority, 
  category, setCategory, 
  handleSubmit, 
  editingId, 
  cancelEdit 
}) {
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Enter todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      
      <select 
        className="todo-select" 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>
      
      <select 
        className="todo-select" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <button type="submit" className="btn-primary">
        {editingId ? 'Update' : 'Add'}
      </button>
      {editingId && (
        <button type="button" className="btn-danger" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}

TodoForm.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  priority: PropTypes.string.isRequired,
  setPriority: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  editingId: PropTypes.number,
  cancelEdit: PropTypes.func.isRequired,
};

export default TodoForm;
