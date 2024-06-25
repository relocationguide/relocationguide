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


    return (
    <tr>
        <td>{service.name}</td>
        <td>{service.description}</td>
        <td><a href="#">{service.link}</a></td>
        <td>{service.tags}</td>
        <td><img width="40" height="40" src={ratingImg} alt="Rating" /></td>
    </tr>
    );
};

export default TableRow;