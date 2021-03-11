module.exports = [
    {
        type: 'object',
        name: 'NorthWall',
        position: {
            x: 0, y: 0
        },
        dimension: {
            x: 1100, y: 350
        },
    },
    {
        type: 'object',
        name: 'SouthWall',
        position: {
            x: 0, y: 625
        },
        dimension: {
            x: 1600, y: 50
        }
    },
    {
        type: 'object',
        name: 'Lockers1',
        position: {
            x: 25, y: 275
        },
        dimension: {
            x: 125, y: 101
        }
    },
    {
        type: 'object',
        name: 'Lockers2',
        position: {
            x: 700, y: 250
        },
        dimension: {
            x: 250, y: 150
        }
    },
    {
        type: 'object',
        name: 'Cal',
        position: {
            x: 500,
            y: 200
        },
        dimension: {
            x: 100,
            y: 200
        }
    },
    {
        type: 'portal',
        position: {
            x: 150,
            y: 0
        },
        dimension: {
            x: 200,
            y: 400
        },
        name: 'classroom2',
        startingPosition: {
            x: 100,
            y: 650
        }
    },
    {
        type: 'portal',
        position: {
            x: -25, y: 0
        },
        dimension: {
            x: 10, y: 625
        },
        name: 'hallway',
        startingPosition: {
            x: 1250,
            y: 450
        }
    }, 
    {
        type: 'portal',
        position: {
            x: 1000, y: 0
        },
        dimension: {
            x: 10, y: 640
        },
        name: 'hallway3',
        startingPosition: {
            x: 75,
            y: 450
        }
    }
];
