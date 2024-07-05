// App.js
import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/core';

import TableRow from './TableRow';
import SearchComponent from './SearchComponent';
import CitySelect from './CitySelect';
import CreateServiceModal from './CreateServiceModal';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const octokit = new Octokit({
  // Oh nooo! Someone leaked the GitHub PAT! 😱
  auth: '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'
})

const App = () => {
  const [filter, setFilter] = useState([]);
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const filteredServices = services.filter(service =>
    filter.length === 0 ||
    filter.every(term => {
      return service.name.toLowerCase().includes(term.toLowerCase()) ||
      service.tags.split(', ').some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    }
    )
  );

  const handleAddClick = () => {
    setShowModal(true); // Show modal when Add button is clicked
  };

  const handleModalClose = () => {
    setShowModal(false); // Hide modal
  };

  const handleConfirm = async (serviceName, description, links, tags, rating) => {
    console.log("Add button clicked");

    const serviceData = {
      name: serviceName,
      description: description,
      links: links,
      tags: tags,
      rating: rating
    };

    // Here you can add logic to handle the addition of a new service or any other action
    // Octokit.js
    // https://github.com/octokit/core.js#readme
    await octokit.request('POST /repos/relocationguide/relocationguide/dispatches', {
      event_type: 'add_service_request',
      client_payload: serviceData,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
  };

  return (
    <div className="container">
      <div class="container-fluid">
        <CitySelect onSelect={setServices} />
        <SearchComponent onSearch={setFilter} />
        <CreateServiceModal show={showModal} onClose={handleModalClose} onConfirm={handleConfirm} />
        <button className="btn btn-primary" onClick={handleAddClick}>Add</button>
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
