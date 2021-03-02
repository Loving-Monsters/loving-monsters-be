

module.exports = (gameState, { userName }) => {
    console.log(userName);
    gameState.delete(userName);
};
