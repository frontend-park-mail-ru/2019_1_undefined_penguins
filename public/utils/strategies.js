import SinglePlayerStrategy from '../game/game-strategies/SinglePlayerStrategy.js';
import MultiPlayerStrategy from '../game/game-strategies/MultiPlayerStrategy.js';
import OfflineStrategy from '../game/game-strategies/OfflineStrategy.js';

export const STRATEGIES = {
    SINGLE: SinglePlayerStrategy,
    OFFLINE: OfflineStrategy,
    MULTI: MultiPlayerStrategy
};