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
        while (global.ROOMS[idRoom].logs.length > global.CONFIG.round.maxLogs) {
            global.ROOMS[idRoom].logs.pop();
        }
        const room = global.ROOMS[idRoom];
        res.send({
            myArmy: room[idPlayer].army,
            enemyArmy: room[idEnemy].army,
            turnPlayer: room.turnPlayer,
            nbActions: room.nbActions,
            maxNbActions,
            firstPlayer: room.firstPlayer,
            obstacles: room.obstacles,
            animations,
            logs: room.logs
        });
    } else {
        res.send({});
    }
}

module.exports = statusGame;