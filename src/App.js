// App.js
import React, { useState, useEffect } from 'react';
import TableRow from './TableRow';
import SearchComponent from './SearchComponent';
import CitySelect from './CitySelect';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [filter, setFilter] = useState([]);
  const [services, setServices] = useState([]);

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
      <div class="container-fluid">
        <CitySelect onSelect={setServices} />
        <SearchComponent onSearch={setFilter} />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name of Service</th>
            <th>Description</th>
            <th>Links</th>
            <th>Related Tags</th>
            <th>Recommended</th>
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
