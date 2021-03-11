
const dirOpposites = {
    'up': 'down',
    'down': 'up',
    'left': 'right',
    'right': 'left'
}
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

    userCollisionCheck(userArray, wallArray) {
        this.idle = true;
        for (const user of userArray) {
            if ((user.position.y + (user.dimension.y)) < this.position.y + this.dimension.y) {
                if (user.position.y + (user.dimension.y) > this.position.y) {

                    if (user.position.x + 25 < this.position.x + this.dimension.x) {

                        if (user.position.x + user.dimension.x > this.position.x) {
                            const newPosition = this._move(user.dir);
                            if (!this._wallCollisionCheck(newPosition, wallArray)) {
                                this.position = newPosition;
                                this.idle = false;
                            } else {
                                const newDir = dirOpposites[user.dir]
                                this.position = this._move(newDir)
                            }
                        }
                    }
                }
            }
        }
    }

    _move(dir) {
        switch (dir) {
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
        for (const wall of wallArray) {

            if (wall.position.y < newPosition.y + this.dimension.y) {
                if (wall.position.y + wall.dimension.y > newPosition.y) {

                    if (wall.position.x < newPosition.x + this.dimension.x) {

                        if (wall.position.x + wall.dimension.x > newPosition.x) {
                            console.log("🚀 ~ file: Ball.js ~ line 74 ~ Ball ~ _wallCollisionCheck ~ wall", wall)
                            console.log('WALL COLLISION!')
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
}
