// CitySelect.js
import React from 'react';

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

function CitySelect({ onSelect }) {
    const dropdownOptions = [
        { value: 'paphos,limassol', label: 'All cyprus' },
        { value: 'paphos', label: 'Paphos' },
        { value: 'limassol', label: 'Limassol' },
    ];

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
          onSelect(data);
        })
        .catch(error => console.error("Error fetching data:", error));
    };


    return (
        <select class="form-select" onChange={(e) => handleDropdownSelect(e.target.value)}>
        {dropdownOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
        </select>
    );
}

export default CitySelect;