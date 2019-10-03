const statsAllUnit = {
    king: createUnitType("king", 8, 2, 1, 0),
    peasant: createUnitType("peasant", 5, 2, 2, 0),
    shieldman: createUnitType("shieldman", 10, 0, 2, 0),
    soldier: createUnitType("soldier", 6, 3, 2, 0),
    bowman: createUnitType("bowman", 5, 3, 2, 2),
    ninja: createUnitType("ninja", 7, 3, 3, 0),
    doctor: createUnitType("doctor", 7, 1, 2, 1),
    knight: createUnitType("knight", 12, 4, 2, 0),
    crossbowman: createUnitType("crossbowman", 7, 4, 1, 5),
    necromancer: createUnitType("necromancer", 6, 4, 1, 0)
};

const listUnits = ["peasant", "shieldman", "soldier", "bowman", "ninja", "doctor", "knight", "crossbowman", "necromancer"];

function createUnitType(type, hp, dmg, move, range) {
    return {
        type, hp, maxHp: hp, dmg, move, range
    };
}

function copyJson(json) {
    return JSON.parse(JSON.stringify(json));
}

function getKingStats(firstPlayer, idxUnit) {
    const king = copyJson(statsAllUnit.king);
    king["x"] = 7;
    king["y"] = (firstPlayer === true) ? 14 : 0;
    king["idx"] = idxUnit;
    king["hasAttacked"] = false;
    return king;
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
            const newUnit = copyJson(statsAllUnit[unit]);
            newUnit["x"] = 7 + offset;
            newUnit["y"] = y;
            newUnit["idx"] = idxUnit;
            newUnit["hasAttacked"] = false;
            army.push(newUnit);
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
    army.push(getKingStats(firstPlayer, idxUnit))
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