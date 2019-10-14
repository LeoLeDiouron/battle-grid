const listUnits = ["peasant", "shieldman", "soldier", "bowman", "ninja", "doctor", "knight", "crossbowman", "necromancer"];

function copyJson(json) {
    return JSON.parse(JSON.stringify(json));
}

function createUnit(unitType, x, y, idxUnit, isLeader) {
    let newUnit = null;
    if (isLeader) {
        newUnit = copyJson(global.CONFIG.leaders[unitType]);
    } else {
        newUnit = copyJson(global.CONFIG.units[unitType]);
    }
    newUnit["x"] = x;
    newUnit["y"] = y;
    newUnit["idx"] = idxUnit;
    newUnit["hp"] = newUnit.maxHp;
    newUnit["hasAttacked"] = false;
    return newUnit;
}

function generateJsonArmy(leader, nbUnits, idRoom, idPlayer) {
    const firstPlayer = isFirstPlayer(idRoom, idPlayer)
    const army = [];
    let idxUnit = 1;
    let y = (firstPlayer === true) ? 13 : 1;
    let offset = 1;
    let nbLines = 1;
    let nbUnitOnLine = 0;

    army.push(createUnit(leader, 7, (firstPlayer === true) ? 14 : 0, 0, true));
    for (const unit of listUnits) {
        for (let idx = 0; idx < nbUnits[unit]; idx++) {
            army.push(createUnit(unit, offset + 7, y, idxUnit, false));
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

function getLeaderOfArmy(idRoom, idPlayer) {
    for (const unit of global.ROOMS[idRoom][idPlayer].army) {
        if (unit.idx === 0) {
            return unit.type;
        }
    }
    return null;
}

function createArmy(req, res, next) {
    const leader = req.body.leader;
    const nbUnits = req.body.army;
    const idPlayer = req.query.idPlayer;
    const idRoom = req.params.idRoom;
    global.ROOMS[idRoom][idPlayer]["army"] = generateJsonArmy(leader, nbUnits, idRoom, idPlayer);
    if (checkReady(idRoom) === true) {
        global.ROOMS[idRoom]["nbActions"] = (getLeaderOfArmy(idRoom, global.ROOMS[idRoom].firstPlayer) === "queen_of_slaves") ? global.CONFIG.round.maxNbActions + 1 : global.CONFIG.round.maxNbActions;
        global.ROOMS[idRoom].status = 3;
    }
    res.send({
        idRoom: req.params.idRoom
    });
}

module.exports = createArmy;