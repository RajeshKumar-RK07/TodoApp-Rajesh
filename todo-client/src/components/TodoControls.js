import React from 'react';
import PropTypes from 'prop-types';

function TodoControls({ searchQuery, handleSearch, currentFilter, filterByCategory }) {
  return (
    <div className="controls">
      <input
        type="text"
        className="search-bar"
        placeholder="Search todos..."
        value={searchQuery}
        onChange={handleSearch}
      />

      <div className="filters">
        <button 
          className={`filter-btn ${currentFilter === 'All' ? 'active' : ''}`}
          onClick={() => filterByCategory('All')}
        >
          All Todos
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'Work' ? 'active' : ''}`}
          onClick={() => filterByCategory('Work')}
        >
          View Work
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'Personal' ? 'active' : ''}`}
          onClick={() => filterByCategory('Personal')}
        >
          View Personal Todo
        </button>
      </div>
    </div>
  );
}

TodoControls.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  filterByCategory: PropTypes.func.isRequired,
};

export default TodoControls;
