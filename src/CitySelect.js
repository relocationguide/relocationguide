// CitySelect.js
import React, { useEffect } from 'react';

const parseJSON = (text) => JSON.parse(text);

function CitySelect({ onSelect }) {
    const handleDropdownSelect = (selectedValue) => {
        const cities = selectedValue.split(',');
        const fetchPromises = cities.map(city => {
          const filePath = `./data/${city}.json`;
          return fetch(filePath)
            .then(response => response.text())
            .then(parseJSON);
        });

        Promise.all(fetchPromises)
        .then(results => {
          const data = [].concat(...results);
          onSelect(data);
        })
        .catch(error => console.error("Error fetching data:", error));
    };

    const defaultCity = "limassol";
    useEffect(() => {
        handleDropdownSelect(defaultCity);
    }, []);



    return (
        <select class="form-select" defaultValue={defaultCity} onChange={(e) => handleDropdownSelect(e.target.value)}>
            <option key="cyprus" value="paphos,limassol">All cyprus</option>
            <option key="paphos" value="paphos">Paphos</option>
            <option key="limassol" value="limassol">Limassol</option>
        </select>
    );
}

export default CitySelect;