// Rating.js
import React from 'react';

import recommendedImg from './recommended.png';
import notRecommendedImg from './notrecommended.png';
import mixedImg from './mixed.png';

const Rating = ({ rating }) => {
    let ratingImg;
    if (rating >= 4) {
        ratingImg = recommendedImg;
    } else if (rating <= 2.5) {
        ratingImg = notRecommendedImg;
    } else {
        ratingImg = mixedImg;
    }

    return (
        <img width="40" height="40" src={ratingImg} alt="Rating" />
    );
};

export default Rating;
