// App.js
import React, { useState, useEffect } from 'react';
import TableRow from './TableRow';
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
          />
          <button class="btn btn-outline-success" onClick={handleSearchClick} type="button">Search</button>
        </form>
      </div>
      <div class="btn-group" id="tag-cloud">
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

const App = () => {
  const [filter, setFilter] = useState([]);
  const services = [
    { name: 'Service 1', description: 'This is a description for Service 1', link: 'Link 1', tags: 'Tag1, Tag2', rating: 4.5 },
    { name: 'Service 2', description: 'This is a description for Service 2', link: 'Link 2', tags: 'Tag3, Tag4', rating: 4.0 },
    { name: 'Service 3', description: 'This is a description for Service 3', link: 'Link 3', tags: 'Tag5, Tag6', rating: 4.7 },
    // Add more services as needed
  ];

  const filteredServices = services.filter(service =>
    filter.length === 0 ||
    filter.every(term => {
      return service.name.toLowerCase().includes(term.toLowerCase()) ||
      service.tags.split(', ').some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    }
    )
);

  return (
    <div className="container">
      <SearchComponent onSearch={setFilter} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name of Service</th>
            <th>Description</th>
            <th>Links</th>
            <th>Related Tags</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map(service => <TableRow key={service.name} service={service} />)}
        </tbody>
      </table>
    </div>
  );
};

export default App;
