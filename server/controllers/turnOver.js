function findOtherPlayer(idRoom, idPlayer) {
    return (global.ROOMS[idRoom].players[0] === idPlayer) ? global.ROOMS[idRoom].players[1] : global.ROOMS[idRoom].players[0];
}

function turnOver(req, res, next) {
    const idPlayer = req.query.idPlayer;
    const idRoom = req.params.idRoom;
    const idOtherPlayer = findOtherPlayer(idRoom, idPlayer);
    global.ROOMS[idRoom].turnPlayer = idOtherPlayer;
    for (let i = 0; i < global.ROOMS[idRoom][idOtherPlayer].army.length; i++) {
        global.ROOMS[idRoom][idOtherPlayer].army[i].hasMoved = false;
    }
    res.send({});
}

module.exports = turnOver;