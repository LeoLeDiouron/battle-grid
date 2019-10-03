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

function isOnAllie(idRoom, idPlayer, offsetX, offsetY, currentUnit) {
    let idx = 0;
    for (const unit of global.ROOMS[idRoom][idPlayer].army) {
        if (unit.idx !== currentUnit.idx && unit.x === offsetX && unit.y === offsetY) {
            return idx;
        }
        idx++;
    }
    return -1;
}

function doctorsAction(idRoom, idPlayer) {
    for (let i = 0; i < global.ROOMS[idRoom][idPlayer].army.length; i++) {
        const unit = global.ROOMS[idRoom][idPlayer].army[i];
        if (unit.type === "doctor") {
            for (let offsetX = unit.x - (unit.move + unit.range); offsetX <= unit.x + (unit.move + unit.range); offsetX++) {
                for (let offsetY = unit.y - (unit.move + unit.range); offsetY <= unit.y + (unit.move + unit.range); offsetY++) {
                    const idxAllie = isOnAllie(idRoom, idPlayer, offsetX, offsetY, unit);
                    if (idxAllie !== -1) {
                        const maxHp = global.ROOMS[idRoom][idPlayer].army[idxAllie].maxHp;
                        global.ROOMS[idRoom][idPlayer].army[idxAllie].hp += 2;
                        if (global.ROOMS[idRoom][idPlayer].army[idxAllie].hp > maxHp) {
                            global.ROOMS[idRoom][idPlayer].army[idxAllie].hp = maxHp;
                        }
                    }
                }
            }
        }
    }
}

function turnOver(req, res, next) {
    const idPlayer = req.query.idPlayer;
    const idRoom = req.params.idRoom;

    if (idRoom in global.ROOMS && idPlayer in global.ROOMS[idRoom]) {
        const idOtherPlayer = findOtherPlayer(idRoom, idPlayer);
        global.ROOMS[idRoom].turnPlayer = idOtherPlayer;
        global.ROOMS[idRoom].nbActions = 4;
        doctorsAction(idRoom, idPlayer);
        resetHasAttacked(idRoom, idPlayer, idOtherPlayer);
    }
    res.send({});
}

module.exports = turnOver;