const { hallwayBalls, hallway2Balls,
    hallway3Balls, classroomBalls,
    classroom2Balls, classroom3Balls,
    courtyardBalls, hallwayWalls,
    hallway2Walls, hallway3Walls,
    classroomWalls, classroom2Walls,
    classroom3Walls, courtyardWalls, } = require('./item-dir');
const GameState = require('../models/GameState');

module.exports = {
    hallway: new GameState('hallway', hallwayBalls, hallwayWalls),
    classroom: new GameState('classroom', classroomBalls, classroomWalls),
    classroom2: new GameState('classroom2', classroom2Balls, classroom2Walls),
    classroom3: new GameState('classroom3', classroom3Balls, classroom3Walls),
    hallway2: new GameState('hallway2', hallway2Balls, hallway2Walls),
    hallway3: new GameState('hallway3', hallway3Balls, hallway3Walls),
    courtyard: new GameState('courtyard', courtyardBalls, courtyardWalls),
    frogger: new GameState('frogger', [], [])
};
