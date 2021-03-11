const Ball = require('../../models/Ball');

module.exports = [
    new Ball('courtyardBall1', { x: 200, y: 475 }, 'courtyard'),
    new Ball('courtyardBall2', { x: 150, y: 1200 }, 'courtyard'),
    new Ball('courtyardBall3', { x: 1000, y: 2000 }, 'courtyard'),
    new Ball('courtyardBall4', { x: 100, y: 100 }, 'courtyard')
];
