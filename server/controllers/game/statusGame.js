function isFirstPlayer(idRoom, idPlayer) {
    if (global.ROOMS[idRoom].firstPlayer === idPlayer) {
        return true;
    } else {
        return false;
    }
}

function getLeaderOfArmy(idRoom, idPlayer) {
    for (const unit of global.ROOMS[idRoom][idPlayer].army) {
        if (unit.idx === 0) {
            return unit.type;
        }
    }
    return null;
}

function statusGame(req, res, next) {
    const idPlayer = req.query.idPlayer;
    const idRoom = req.params.idRoom;

    if (idRoom in global.ROOMS && idPlayer in global.ROOMS[idRoom]) {
        const idEnemy = (isFirstPlayer(idRoom, idPlayer) === true) ? global.ROOMS[idRoom].players[1] : global.ROOMS[idRoom].players[0];
        const animations = global.ROOMS[idRoom][idPlayer].animations;
        global.ROOMS[idRoom][idPlayer].animations = [];
        const maxNbActions = (getLeaderOfArmy(idRoom, global.ROOMS[idRoom].turnPlayer) === "queen_of_slaves") ? global.CONFIG.round.maxNbActions + 1 : global.CONFIG.round.maxNbActions;
        res.send({
            myArmy: global.ROOMS[idRoom][idPlayer].army,
            enemyArmy: global.ROOMS[idRoom][idEnemy].army,
            turnPlayer: global.ROOMS[idRoom].turnPlayer,
            nbActions: global.ROOMS[idRoom].nbActions,
            maxNbActions,
            firstPlayer: global.ROOMS[idRoom].firstPlayer,
            obstacles: global.ROOMS[idRoom].obstacles,
            animations
        });
    } else {
        res.send({});
    }
}

module.exports = statusGame;