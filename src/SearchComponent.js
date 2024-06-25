// SearchComponent.js
import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchComponent({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTerms, setSearchTerms] = useState([]);

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
      setSearchTerms(previousSearchTerms => [...previousSearchTerms, searchTerm]);
      setSearchTerm("");
    };

    useEffect(() => {
      onSearch(searchTerms);
    }, [searchTerms]);

    return (
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <form class="d-flex w-100" role="search">
            <input
              class="form-control me-2 w-80"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearchClick();
                }
              }}
            />
            <button class="btn btn-outline-success" onClick={handleSearchClick} type="button">Search</button>
          </form>
        </div>
        <div class="btn-group mt-3" id="tag-cloud">
            {searchTerms.map((term, index) => (
              <button
                key={index} className="btn btn-info search-option"
                onClick={() => {
                    setSearchTerms(searchTerms.filter((val, _) => val !== term ));
                    onSearch(searchTerms);
                  }
                }
              >
                {term}
              </button>
            ))}
        </div>
      </nav>
    );
}

export default SearchComponent;