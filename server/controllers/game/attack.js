function findDmgUnit(army, idx) {
    for (let i = 0; i < army.length; i++) {
        if (army[i].idx === idx) {
            return army[i].dmg;
        }
    }
    return 0;
}

function findOtherPlayer(idRoom, idPlayer) {
    return (global.ROOMS[idRoom].players[0] === idPlayer) ? global.ROOMS[idRoom].players[1] : global.ROOMS[idRoom].players[0];
}

function move(req, res, next) {
    const idPlayer = req.query.idPlayer;
    const idRoom = req.params.idRoom;
    const body = req.body;
    const otherPlayer = findOtherPlayer(idRoom, idPlayer);
    for (let i = 0; i < global.ROOMS[idRoom][otherPlayer].army.length; i++) {
        if (global.ROOMS[idRoom][otherPlayer].army[i].idx === body.idxEnemy) {
            global.ROOMS[idRoom][otherPlayer].army[i].hp -= findDmgUnit(global.ROOMS[idRoom][idPlayer].army, req.body.idx);
            if (global.ROOMS[idRoom][otherPlayer].army[i].hp <= 0) {
                global.ROOMS[idRoom][otherPlayer].army.splice(i, 1);
            }
        }
    }
    for (let i = 0; i < global.ROOMS[idRoom][idPlayer].army.length; i++) {
        if (global.ROOMS[idRoom][idPlayer].army[i].idx === req.body.idx) {
            global.ROOMS[idRoom][idPlayer].army[i].hasMoved = true;
        }
    }
    res.send({});
}

module.exports = move;