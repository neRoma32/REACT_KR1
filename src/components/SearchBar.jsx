import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
}

export default React.memo(SearchBar);