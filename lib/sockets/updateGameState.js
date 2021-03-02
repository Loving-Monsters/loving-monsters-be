
module.exports = (io, socket, gameState, localUser) => {
    // console.log('{}{}{}{}{}{}{}{}{}{}{}{}{}');
    // console.log('LOCAL USER');
    // console.log(localUser);
    // console.log('{}{}{}{}{}{}{}{}{}{}{}{}{}');

    const newGameState = gameState.update(localUser);
    // console.log(newGameState);
    io.to(socket.id).emit('GAME_STATE', newGameState);
};
