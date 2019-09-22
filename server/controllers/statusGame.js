function isFirstPlayer(idRoom, idPlayer) {
    if (global.ROOMS[idRoom].players[0] === idPlayer) {
        return true;
    } else {
        return false;
    }
}

function statusGame(req, res, next) {
    const idPlayer = req.query.idPlayer;
    const idRoom = req.params.idRoom;
    const idEnemy = (isFirstPlayer(idRoom, idPlayer) === true) ? global.ROOMS[idRoom].players[1] : global.ROOMS[idRoom].players[0];
    res.send({
        myArmy: global.ROOMS[idRoom][idPlayer].army,
        enemyArmy: global.ROOMS[idRoom][idEnemy].army,
        turnPlayer: global.ROOMS[idRoom].turnPlayer
    });
}

module.exports = statusGame;