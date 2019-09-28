function findOtherPlayer(idRoom, idPlayer) {
    return (global.ROOMS[idRoom].players[0] === idPlayer) ? global.ROOMS[idRoom].players[1] : global.ROOMS[idRoom].players[0];
}

function resetHasAttacked(idRoom, idPlayer, idOtherPlayer) {
    for (let i = 0; i < global.ROOMS[idRoom][idPlayer].army.length; i++) {
        global.ROOMS[idRoom][idPlayer].army[i].hasAttacked = false;
    }
    for (let i = 0; i < global.ROOMS[idRoom][idOtherPlayer].army.length; i++) {
        global.ROOMS[idRoom][idOtherPlayer].army[i].hasAttacked = false;
    }
}

function turnOver(req, res, next) {
    const idPlayer = req.query.idPlayer;
    const idRoom = req.params.idRoom;
    const idOtherPlayer = findOtherPlayer(idRoom, idPlayer);
    global.ROOMS[idRoom].turnPlayer = idOtherPlayer;
    global.ROOMS[idRoom].nbActions = 3;
    resetHasAttacked(idRoom, idPlayer, idOtherPlayer);
    res.send({});
}

module.exports = turnOver;