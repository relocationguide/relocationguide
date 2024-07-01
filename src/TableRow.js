// TableRow.js
import React from 'react';

import Rating from './Rating';

const TableRow = ({ service }) => {
    const renderLinks = (links) => {
        return links.map((link, index) => (
            <a key={index} href={link.url} style={{ marginRight: '5px' }}>
                {link.name}
            </a>
        ));
    };
    const renderTags = (tags) => {
        return tags.map((tag, _) => (
            <span key={tag} style={{ marginRight: '5px' }}>
                {tag}
            </span>
        ));
    };

    return (
    <tr>
        <td>{service.name}</td>
        <td>{service.description}</td>
        <td>{renderLinks(service.links)}</td>
        <td>{renderTags(service.tags)}</td>
        <td><Rating rating={service.rating} /></td>
    </tr>
    );
};

export default TableRow;