'use strict'

function rate(score) {

    const scoreStar = ['☆', '☆', '☆', '☆', '☆'];
    return (score === 0) ? '★☆☆☆☆' : scoreStar.fill('★', 0, Math.ceil(score / 20)).join('');

}


