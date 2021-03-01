import { gameState } from '../app';

export default ({ userName }) => {
    gameState.delete(userName);
};
