module.exports = [
    {
        type: 'object',
        name: 'NorthWall',
        position: {
            x: 0, y: 25
        },
        dimension: {
            x: 1000, y: 175
        }
    },
    {
        type: 'object',
        name: 'EastWall',
        position: {
            x: 750, y: 0
        },
        dimension: {
            x: 25, y: 1000
        }
    },
    {
        type: 'object',
        name: 'SouthWall',
        position: {
            x: 0, y: 725
        },
        dimension: {
            x: 1000, y: 150
        }
    },
    {
        type: 'object',
        name: 'WestWall',
        position: {
            x: 50, y: 0
        },
        dimension: {
            x: 10, y: 900
        }
    },
    {
        type: 'object',
        name: 'MissCreech',
        position: {
            x: 500,
            y: 0
        },
        dimension: {
            x: 200,
            y: 250
        }
    },
    {
        type: 'portal',
        position: {
            x: 0,
            y: 700
        },
        dimension: {
            x: 150,
            y: 25
        },
        name: 'hallway2',
        startingPosition: {
            x: 250,
            y: 425
        }
    }
];
