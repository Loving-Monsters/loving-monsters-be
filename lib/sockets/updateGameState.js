
import { gameState } from '../app';

export default (io, socket, localUser) => {
    const newGameState = gameState.update(localUser);
    io.to(socket.id).emit('GAME_STATE', newGameState);
};
