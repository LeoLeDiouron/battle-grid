function findUnit(army, idx) {
    for (let i = 0; i < army.length; i++) {
        if (army[i].idx === idx) {
            return army[i];
        }
    }
    return null;
}

function findOtherPlayer(idRoom, idPlayer) {
    return (global.ROOMS[idRoom].players[0] === idPlayer) ? global.ROOMS[idRoom].players[1] : global.ROOMS[idRoom].players[0];
}

function setHasAttacked(idRoom, idPlayer, body) {
    for (let i = 0; i < global.ROOMS[idRoom][idPlayer].army.length; i++) {
        const unit = global.ROOMS[idRoom][idPlayer].army[i];
        if (unit.idx === body.idx) {
            global.ROOMS[idRoom][idPlayer].army[i].hasAttacked = true;
            if (unit.type === "ninja" && unit.invisible === true) {
                global.ROOMS[idRoom][idPlayer].army[i].invisible = false;
            }
        }
    }
}

function createNewZombie(deadUnit) {
    return {
        type: "zombie",
        hp: 6,
        maxHp: 6,
        dmg: 1,
        move: 1,
        range: 0,
        idx: deadUnit.idx,
        hasAttacked: false,
        x: deadUnit.x,
        y: deadUnit.y,
    }
}

function necromancerAction(idRoom, otherPlayer, idxUnit) {
    for (let i = 0; i < global.ROOMS[idRoom][otherPlayer].army.length; i++) {
        const currentUnit = global.ROOMS[idRoom][otherPlayer].army[i];
        if (i !== idxUnit && currentUnit.type === "necromancer") {
            const zombieUnit = createNewZombie(global.ROOMS[idRoom][otherPlayer].army[idxUnit]);
            global.ROOMS[idRoom][otherPlayer].army.push(zombieUnit);
            return;
        }
    }
}

function dealDamages(idRoom, idPlayer, body) {
    const idOtherPlayer = findOtherPlayer(idRoom, idPlayer);

    for (let i = 0; i < global.ROOMS[idRoom][idOtherPlayer].army.length; i++) {
        if (global.ROOMS[idRoom][idOtherPlayer].army[i].idx === body.idxEnemy) {
            const attackUnit = findUnit(global.ROOMS[idRoom][idPlayer].army, body.idx)
            global.ROOMS[idRoom][idOtherPlayer].army[i].hp -= attackUnit.dmg;
            if (global.ROOMS[idRoom][idOtherPlayer].army[i].hp <= 0) {
                if (body.idxEnemy !== 0) {
                    if (global.ROOMS[idRoom][idOtherPlayer].army[i].type !== "zombie" && global.ROOMS[idRoom][idOtherPlayer].army[i].type !== "necromancer") {
                        necromancerAction(idRoom, idOtherPlayer, i);
                    }
                    newLog(idRoom, idPlayer, `[${attackUnit.type}] has killed [${global.ROOMS[idRoom][idOtherPlayer].army[i].type}]`);
                    global.ROOMS[idRoom][idOtherPlayer].army.splice(i, 1);
                } else {
                    global.ROOMS[idRoom].winner = idPlayer;
                    global.ROOMS[idRoom].status = 4;
                }
            } else {
                newLog(idRoom, idPlayer, `[${attackUnit.type}] has attacked [${global.ROOMS[idRoom][idOtherPlayer].army[i].type}] (-${attackUnit.dmg})`);
                addAttackAnimation(idRoom, idPlayer, idOtherPlayer, i);
            }
            break;
        }
    }
}

function newLog(idRoom, idPlayer, message) {
    while (message.indexOf('_') !== -1) {
        message = message.replace('_', ' ');
    }
    global.ROOMS[idRoom].logs.splice(0, 0, {
        player: idPlayer,
        msg: message
    });
}

function addAttackAnimation(idRoom, idPlayer, idOtherPlayer, idxUnit) {
    const x = global.ROOMS[idRoom][idOtherPlayer].army[idxUnit].x;
    const y = global.ROOMS[idRoom][idOtherPlayer].army[idxUnit].y
    const animAttack = {
        type: "animationAttack",
        speed: 12,
        x: x + ((idPlayer === global.ROOMS[idRoom].firstPlayer) ? 0.5 : -0.5),
        y: y + ((idPlayer === global.ROOMS[idRoom].firstPlayer) ? -0.5 : 0.5)
    };
    const animAttackEnemy = {
        type: "animationAttack",
        speed: 12,
        x: x + ((idPlayer === global.ROOMS[idRoom].firstPlayer) ? -0.5 : 0.5),
        y: y + ((idPlayer === global.ROOMS[idRoom].firstPlayer) ? 0.5 : -0.5)
    };
    global.ROOMS[idRoom][idPlayer].animations.push(animAttack);
    global.ROOMS[idRoom][idOtherPlayer].animations.push(animAttackEnemy);
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