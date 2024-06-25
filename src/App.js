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

function Dropdown({ options, onSelect }) {
  return (
    <select class="form-select" onChange={(e) => onSelect(e.target.value)}>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}


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

  const handleDropdownSelect = (selectedValue) => {
    const cities = selectedValue.split(',');
    const fetchPromises = cities.map(city => {
      const filePath = `./data/${city}.csv`;
      return fetch(filePath)
        .then(response => response.text())
        .then(parseCSV);
    });

    Promise.all(fetchPromises)
    .then(results => {
      const data = [].concat(...results);
      setServices(data);
    })
    .catch(error => console.error("Error fetching data:", error));
  };

  const dropdownOptions = [
    { value: 'paphos,limassol', label: 'All cyprus' },
    { value: 'paphos', label: 'Paphos' },
    { value: 'limassol', label: 'Limassol' },
  ];

  return (
    <div className="container">
      <div class="container-fluid">
        <Dropdown options={dropdownOptions} onSelect={handleDropdownSelect} />
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
