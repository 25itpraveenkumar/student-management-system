import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ search, setSearch, totalRecords }) => {
  return (
    <div className="controls-card">
      <div className="search-box">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by ID, Name, Email, or Department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')} title="Clear search">
            <X size={16} />
          </button>
        )}
      </div>
      <div className="records-count">
        Total Students: <strong>{totalRecords}</strong>
      </div>
    </div>
  );
};

export default SearchBar;
