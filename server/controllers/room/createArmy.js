const statsAllUnit = {
    peasant: createUnitType("peasant", 10, 4, 2, 0),
    ninja: createUnitType("ninja", 10, 4, 3, 0),
    knight: createUnitType("knight", 25, 5, 2, 0),
    bowman: createUnitType("bowman", 8, 6, 2, 2),
    king: createUnitType("king", 10, 4, 1, 0),
    doctor: createUnitType("doctor", 10, 2, 2, 0),
    goldenKnight: createUnitType("goldenKnight", 40, 10, 2, 1),
};

const listUnits = ["peasant", "ninja", "knight", "goldenKnight", "bowman", "doctor"];

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