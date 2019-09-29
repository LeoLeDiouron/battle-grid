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

function setHasAttacked(idRoom, idPlayer, body) {
    for (let i = 0; i < global.ROOMS[idRoom][idPlayer].army.length; i++) {
        if (global.ROOMS[idRoom][idPlayer].army[i].idx === body.idx) {
            global.ROOMS[idRoom][idPlayer].army[i].hasAttacked = true;
        }
    }
}

function dealDamages(idRoom, idPlayer, body) {
    const otherPlayer = findOtherPlayer(idRoom, idPlayer);

    for (let i = 0; i < global.ROOMS[idRoom][otherPlayer].army.length; i++) {
        if (global.ROOMS[idRoom][otherPlayer].army[i].idx === body.idxEnemy) {
            global.ROOMS[idRoom][otherPlayer].army[i].hp -= findDmgUnit(global.ROOMS[idRoom][idPlayer].army, body.idx);
            if (global.ROOMS[idRoom][otherPlayer].army[i].hp <= 0) {
                if (global.ROOMS[idRoom][otherPlayer].army[i].type !== "king") {
                    global.ROOMS[idRoom][otherPlayer].army.splice(i, 1);
                } else {
                    global.ROOMS[idRoom].winner = idPlayer;
                    global.ROOMS[idRoom].status = 4;
                }
            }
        }
    }
}

function attack(req, res, next) {
    const idPlayer = req.query.idPlayer;
    const idRoom = req.params.idRoom;
    const body = req.body;
    
    if (idRoom in global.ROOMS && idPlayer in global.ROOMS[idRoom]) {
        dealDamages(idRoom, idPlayer, body);
        setHasAttacked(idRoom, idPlayer, body);
        global.ROOMS[idRoom].nbActions--;
    }
    res.send({});
}

module.exports = attack;