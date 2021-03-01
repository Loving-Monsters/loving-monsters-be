
module.exports = (io, socket, gameState, localUser) => {
    const newGameState = gameState.update(localUser);
    io.to(socket.id).emit('GAME_STATE', newGameState);
};
