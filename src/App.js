// App.js
import React, { useState, useEffect } from 'react';
import TableRow from './TableRow';
import SearchComponent from './SearchComponent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const parseCSV = (text) => {
  const lines = text.split('\n');
  const fields = lines.shift().split(';');
  return lines.map(line => {
    const data = line.split(';');
    return fields.reduce((obj, nextKey, index) => {
      obj[nextKey] = data[index];
      return obj;
    }, {});
  });
};


const App = () => {
  const [filter, setFilter] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('./data/paphos.csv')
      .then(response => response.text())
      .then(text => {
        const parsedData = parseCSV(text);
        setServices(parsedData);
      });
  }, []);

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
