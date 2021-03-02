
module.exports = (io, socket, gameState, localUser) => {

    const newGameState = gameState.update(localUser);

    const returnGameState = newGameState.filter(user => user.id !== localUser.id);

    io.to(socket.id).emit('GAME_STATE', returnGameState);

};
