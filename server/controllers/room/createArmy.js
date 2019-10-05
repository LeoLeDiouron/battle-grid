const listUnits = ["peasant", "shieldman", "soldier", "bowman", "ninja", "doctor", "knight", "crossbowman", "necromancer"];

function copyJson(json) {
    return JSON.parse(JSON.stringify(json));
}

function createUnit(unitType, x, y, idxUnit) {
    const newUnit = copyJson(global.CONFIG.units[unitType]);
    newUnit["x"] = x;
    newUnit["y"] = y;
    newUnit["idx"] = idxUnit;
    newUnit["hp"] = newUnit.maxHp;
    newUnit["nbAttack"] = newUnit.maxNbAttack;
    return newUnit;
}

function generateJsonArmy(nbUnits, idRoom, idPlayer) {
    const firstPlayer = isFirstPlayer(idRoom, idPlayer)
    const army = [];
    let idxUnit = 0;
    let y = (firstPlayer === true) ? 13 : 1;
    let offset = 1;
    let nbLines = 1;
    let nbUnitOnLine = 0;

    for (const unit of listUnits) {
        for (let idx = 0; idx < nbUnits[unit]; idx++) {
            army.push(createUnit(unit, offset + 7, y, idxUnit));
            offset *= -1;
            if ((nbLines % 2 === 1 && nbUnitOnLine % 2 === 1) || (nbLines % 2 === 0 && nbUnitOnLine % 2 === 0)) {
                offset += 2;
            }
            idxUnit++;
            nbUnitOnLine++;
            if (offset >= 8 || offset <= -8) {
                nbUnitOnLine = 0;
                nbLines++;
                if (nbLines % 2 === 0) {
                    offset = 0;
                } else {
                    offset = 1;
                }
                y += (firstPlayer === true) ? -1 : 1;
            }
        }
    }
    army.push(createUnit("king", 7, (firstPlayer === true) ? 14 : 0, idxUnit));
    return army;
}

function checkReady(idRoom) {
    for (const player of global.ROOMS[idRoom].players) {
        if (!("army" in global.ROOMS[idRoom][player])) {
            return false;
        }
    }
    return true;
}

function isFirstPlayer(idRoom, idPlayer) {
    if (global.ROOMS[idRoom].firstPlayer === idPlayer) {
        return true;
    } else {
        return false;
    }
}

function createArmy(req, res, next) {
    const nbUnits = req.body.army;
    const idPlayer = req.query.idPlayer;
    const idRoom = req.params.idRoom;
    global.ROOMS[idRoom][idPlayer]["army"] = generateJsonArmy(nbUnits, idRoom, idPlayer);
    if (checkReady(idRoom) === true) {
        global.ROOMS[idRoom].status = 3;
    }
    res.send({
        idRoom: req.params.idRoom
    });
}

module.exports = createArmy;