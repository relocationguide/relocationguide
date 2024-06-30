// TableRow.js
import React from 'react';

import recommendedImg from './recommended.png';
import notRecommendedImg from './notrecommended.png';
import mixedImg from './mixed.png';

const TableRow = ({ service }) => {
    let ratingImg;
    if (service.rating >= 4) {
        ratingImg = recommendedImg;
    } else if (service.rating <= 2.5) {
        ratingImg = notRecommendedImg;
    } else {
        ratingImg = mixedImg;
    }

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
        <td><img width="40" height="40" src={ratingImg} alt="Rating" /></td>
    </tr>
    );
};

export default TableRow;