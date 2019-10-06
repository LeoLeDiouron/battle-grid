function findOtherPlayer(idRoom, idPlayer) {
    return (global.ROOMS[idRoom].players[0] === idPlayer) ? global.ROOMS[idRoom].players[1] : global.ROOMS[idRoom].players[0];
}

function resetHasAttacked(idRoom, idPlayer, idOtherPlayer) {
    for (let i = 0; i < global.ROOMS[idRoom][idPlayer].army.length; i++) {
        global.ROOMS[idRoom][idPlayer].army[i].nbAttack = global.ROOMS[idRoom][idPlayer].army[i].maxNbAttack;
    }
    for (let i = 0; i < global.ROOMS[idRoom][idOtherPlayer].army.length; i++) {
        global.ROOMS[idRoom][idOtherPlayer].army[i].nbAttack = global.ROOMS[idRoom][idOtherPlayer].army[i].maxNbAttack;
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

function addHealAnimation(idRoom, idPlayer, idOtherPlayer, idxAllie) {
    const animHeal = {
        type: "animationHeal",
        speed: 5,
        x: global.ROOMS[idRoom][idPlayer].army[idxAllie].x,
        y: global.ROOMS[idRoom][idPlayer].army[idxAllie].y,
    };
    global.ROOMS[idRoom][idPlayer].animations.push(animHeal);
    global.ROOMS[idRoom][idOtherPlayer].animations.push(animHeal);
}

function healAllie(idRoom, idPlayer, offsetX, offsetY, unit, idOtherPlayer) {
    const idxAllie = isOnAllie(idRoom, idPlayer, offsetX, offsetY, unit);
    if (idxAllie !== -1) {
        const maxHp = global.ROOMS[idRoom][idPlayer].army[idxAllie].maxHp;
        global.ROOMS[idRoom][idPlayer].army[idxAllie].hp += global.CONFIG.round.healDoctor;
        if (global.ROOMS[idRoom][idPlayer].army[idxAllie].hp > maxHp) {
            global.ROOMS[idRoom][idPlayer].army[idxAllie].hp = maxHp;
        }
        addHealAnimation(idRoom, idPlayer, idOtherPlayer, idxAllie);
    }
}

function doctorsAction(idRoom, idPlayer, idOtherPlayer) {
    for (let i = 0; i < global.ROOMS[idRoom][idPlayer].army.length; i++) {
        const unit = global.ROOMS[idRoom][idPlayer].army[i];
        if (unit.type === "doctor") {
            for (let offsetX = unit.x - (unit.move + unit.range); offsetX <= unit.x + (unit.move + unit.range); offsetX++) {
                for (let offsetY = unit.y - (unit.move + unit.range); offsetY <= unit.y + (unit.move + unit.range); offsetY++) {
                    healAllie(idRoom, idPlayer, offsetX, offsetY, unit, idOtherPlayer);
                }
            }
        }
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

function turnOver(req, res, next) {
    const idPlayer = req.query.idPlayer;
    const idRoom = req.params.idRoom;

    if (idRoom in global.ROOMS && idPlayer in global.ROOMS[idRoom]) {
        const idOtherPlayer = findOtherPlayer(idRoom, idPlayer);
        global.ROOMS[idRoom].turnPlayer = idOtherPlayer;
        global.ROOMS[idRoom].nbActions = (getLeaderOfArmy(idRoom, idOtherPlayer) === "queen_of_slaves") ? global.CONFIG.round.maxNbActions + 1 : global.CONFIG.round.maxNbActions;
        doctorsAction(idRoom, idPlayer, idOtherPlayer);
        resetHasAttacked(idRoom, idPlayer, idOtherPlayer);
    }
    res.send({});
}

module.exports = turnOver;