// CreateServiceModal.js
import React, { useState } from 'react';
import { Modal, ButtonGroup, Button, ToggleButton, Form } from 'react-bootstrap';

import recommendedImg from './recommended.png';
import notRecommendedImg from './notrecommended.png';
import mixedImg from './mixed.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import Rating from './Rating';

const CreateServiceModal = ({ show, onClose, onConfirm }) => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState([{ name: '', url: '' }]);
  const [tags, setTags] = useState([]);
  const [rating, setRating] = useState('5.0');

  if (!show) {
    return null;
  }

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const addLinkField = () => {
    setLinks([...links, { name: '', url: '' }]);
  };

  const handleTagChange = (index, tag) => {
    const newLinks = [...tags];
    newLinks[index] = tag;
    setTags(newLinks);
  }

  const addTag = (tag) => {
    setTags([...tags, '']);
  }

  const handleSubmit = () => {
    onConfirm({ serviceName, description, links, tags, rating });
    onClose();
  };

  const rating_options = [
    { name: 'Not Recommended', value: '1.0' },
    { name: 'Mixed', value: '3.5' },
    { name: 'Recommended', value: '5.0' },
  ];

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group style={{ marginTop: '8px' }}>
            <Form.Control type="text" placeholder="Service Name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
          </Form.Group>
          <Form.Group style={{ marginTop: '8px' }}>
            <Form.Control as="textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          {links.map((link, index) => (
            <div key={index}  className="link-inputs-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <Form.Control type="text" placeholder="Link Name" value={link.name} onChange={(e) => handleLinkChange(index, 'name', e.target.value)} />
              <Form.Control type="url" placeholder="Link URL" value={link.url} onChange={(e) => handleLinkChange(index, 'url', e.target.value)} />
            </div>
          ))}
          <Button variant="secondary" onClick={addLinkField}>Add Link</Button>
          <Form.Group style={{ marginTop: '8px' }}>
            {tags.map((tag, index) => (
              <Form.Control key={index} type="text" placeholder="Tags" value={tag} onChange={(e) => handleTagChange(index, e.target.value)} />
            ))}
          </Form.Group>
          <Button variant="secondary" onClick={addTag}>Add Tag</Button>
          <ButtonGroup style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {rating_options.map((option, idx) => (
              <ToggleButton key={idx} id={`radio-${idx}`} type="radio"
                variant={option.value <= 2.5 ? 'outline-danger' : (option.value >= 4 ? 'outline-success' : 'outline-warning') }
                name="radio" value={option.value} checked={rating === option.value}
                onChange={(e) => setRating(e.currentTarget.value)}
              >
                <Rating rating={option.value} />
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateServiceModal;