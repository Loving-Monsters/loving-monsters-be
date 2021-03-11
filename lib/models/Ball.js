const dirOpposites = {
    'up': 'down',
    'down': 'up',
    'left': 'right',
    'right': 'left'
};

module.exports = class Ball {
    id;
    position;
    dimension;
    speed;
    avatar;
    currentRoom;
    idle;

    constructor(id, position, currentRoom) {
        this.id = id;
        this.position = position;
        this.dimension = { x: 50, y: 50 };
        this.speed = 50;
        this.avatar = '/snotball.png';
        this.currentRoom = currentRoom;
        this.idle = true;
    }

    userCollisionCheck(userArray, wallArray, roomsObj) {
        this.idle = true;
        for(const user of userArray) {
            if((user.position.y + (user.dimension.y)) < this.position.y + this.dimension.y) {
                if(user.position.y + (user.dimension.y) > this.position.y) {
                    if(user.position.x + 25 < this.position.x + this.dimension.x) {
                        if(user.position.x + user.dimension.x > this.position.x) {
                            const newPosition = this._move(user.dir);
                            const collision = this._wallCollisionCheck(newPosition, wallArray);
                            if(collision === false) {
                                this.position = newPosition;
                                this.idle = false;
                            } else if(collision.type === 'object') {
                                const newDir = dirOpposites[user.dir];
                                this.position = this._move(newDir);
                            } else if(collision.type === 'portal') {
                                const { currentRoom, ballId, startingPosition, nextRoom } = collision;
                                roomsObj[currentRoom].removeBall(ballId);
                                roomsObj[nextRoom].addBall(ballId, startingPosition);
                            }
                        }
                    }
                }
            }
        }
    }

    _move(dir) {
        switch(dir) {
            case 'up':
                return {
                    x: this.position.x,
                    y: this.position.y - this.speed,
                };
            case 'down':
                return {
                    x: this.position.x,
                    y: this.position.y + this.speed
                };
            case 'left':
                return {
                    x: this.position.x - this.speed,
                    y: this.position.y
                };
            case 'right':
                return {
                    x: this.position.x + this.speed,
                    y: this.position.y
                };
        }
    }

    _wallCollisionCheck(newPosition, wallArray) {
        for(const wall of wallArray) {
            if(wall.position.y < newPosition.y + this.dimension.y) {
                if(wall.position.y + wall.dimension.y > newPosition.y) {
                    if(wall.position.x < newPosition.x + this.dimension.x) {
                        if(wall.position.x + wall.dimension.x > newPosition.x) {
                            if(wall.type == 'portal') {
                                return {
                                    type: 'portal',
                                    currentRoom: this.currentRoom,
                                    nextRoom: wall.name,
                                    startingPosition: wall.startingPosition,
                                    ballId: this.id
                                };
                            }
                            return { type: wall.type };
                        }
                    }
                }
            }
        }
        return false;
    }
};
