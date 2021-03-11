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
            x: 1500, y: 10
        }
    },
    {
        type: 'object',
        name: 'Lockers1',
        position: {
            x: 0, y: 200
        },
        dimension: {
            x: 125, y: 200
        }
    },
    {
        type: 'object',
        name: 'Lockers2',
        position: {
            x: 450, y: 200
        },
        dimension: {
            x: 450, y: 200
        }
    },
    {
        type: 'portal',
        position: {
            x: 150,
            y: 300
        },
        dimension: {
            x: 150,
            y: 80
        },
        name: 'classroom3',
        startingPosition: {
            x: 85,
            y: 600
        }
    },
    {
        type: 'portal',
        position: {
            x: -25, y: 0
        },
        dimension: {
            x: 25, y: 625
        },
        name: 'hallway2',
        startingPosition: {
            x: 950,
            y: 450
        }
    },
    {
        type: 'portal',
        position: {
            x: 1000, y: 0
        },
        dimension: {
            x: 50, y: 640
        },
        name: 'courtyard',
        startingPosition: {
            x: 100,
            y: 1275
        }
    }
];
