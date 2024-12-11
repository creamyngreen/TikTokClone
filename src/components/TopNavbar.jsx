import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';
import './TopNavbar.css';
const TopNavbar = ({ setSearchTerm }) => {
  const [isSearchOpen, setSearchOpen] = React.useState(false);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setSearchTerm(event.target.value);
      setSearchOpen(false);
    }
  };

  return (
    <div className="top-navbar">
      <FontAwesomeIcon icon={faTv} className="icon" />
      <h2>Following | <span>For you</span></h2>
      <FontAwesomeIcon 
        icon={faSearch} 
        className="icon" 
        onClick={() => setSearchOpen(true)}
      />
      {isSearchOpen && (
        <input 
          type="text" 
          className="search-input"
          placeholder="Search by hashtag" 
          onKeyPress={handleSearch}
          onBlur={() => setSearchOpen(false)}
        />
      )}
    </div>
  );
};

export default TopNavbar;
