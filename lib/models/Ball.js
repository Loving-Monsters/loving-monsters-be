

module.exports = class Ball {
    id;
    position;
    dimension;
    speed;
    avatar;
    currentRoom;

    constructor(id, position, currentRoom) {
        this.id = id;
        this.position = position;
        this.dimension = { x: 50, y: 50 };
        this.speed = 75;
        this.avatar = '/ball.png';
        this.currentRoom = currentRoom;
    }

    collisionCheck(userArray) {
        for (const user of userArray) {

            if (user.position.y < this.position.y + this.dimension.y) {
                if (user.position.y + user.dimension.y > this.position.y) {
                    if (user.position.x < this.position.x + this.dimension.x) {
                        if (user.position.x + user.dimension.x > this.position.x) {
                            this.position = this._move(user.dir);
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
};

