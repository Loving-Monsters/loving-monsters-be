import User from '../models/User';
import { gameState } from '../app';

export default (io, socket) => {
    const newUser = new User.create(socket.id);
    gameState.insert(newUser);
    io.to(socket.id).emit('CREATE_USER', { newUser });
}; 
