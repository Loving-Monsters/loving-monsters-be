module.exports = [
    {
        type: 'object',
        name: 'NorthWall',
        position: {
            x: 0, y: 0
        },
        dimension: {
            x: 1100, y: 375
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
        name: 'WestWall',
        position: {
            x: 25, y: 0
        },
        dimension: {
            x: 10, y: 625
        }
    },
    {
        type: 'object',
        name: 'Lockers1',
        position: {
            x: 25, y: 275
        },
        dimension: {
            x: 325, y: 101
        }
    },
    {
        type: 'object',
        name: 'Lockers2',
        position: {
            x: 1000, y: 275
        },
        dimension: {
            x: 500, y: 150
        }
    },
    {
        type: 'object',
        name: 'Barker',
        position: {
            x: 850,
            y: 250
        },
        dimension: {
            x: 100,
            y: 150
        }
    },
    {
        type: 'portal',
        position: {
            x: 560,
            y: 0
        },
        dimension: {
            x: 150,
            y: 400
        },
        name: 'classroom',
        startingPosition: {
            x: 100,
            y: 650
        }
    },
    {
        type: 'portal',
        position: {
            x: 1380, y: 0
        },
        dimension: {
            x: 100, y: 700
        },
        name: 'hallway2',
        startingPosition: {
            x: 100,
            y: 475
        }
    }
];
