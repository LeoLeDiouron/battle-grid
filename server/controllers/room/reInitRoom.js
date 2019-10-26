const fs = require('fs');

const listTypes = ["wall", "rockAndSword", "deadTree", "house", "animationFireHouse"]

function randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function loadMap() {
    const mapIni = fs.readFileSync("./server/map.ini").toString();
    const map = [];
    let y = 0;

    for (const row of mapIni.split('\n')) {
        let x = 0;
        for (const cell of row.split(',')) {
            if (parseInt(cell) !== 0) {
                map.push({
                    x,
                    y,
                    type: listTypes[parseInt(cell) - 1]
                })
            }
            x++;
        }
        y++;
    }
    return map;
}

function newRoom(idPlayer) {
    return {
        createdAt: new Date(),
        status: 1,
        turnPlayer: idPlayer,
        nbActions: 4,
        winner: null,
        firstPlayer: idPlayer,
        players: [],
        obstacles: loadMap()
    };
}

function reInitRoom(req, res, next) {
    const idRoom = req.params.idRoom;
    const idPlayer = req.query.idPlayer;
    let firstToRetry = false;

    if (idRoom in global.ROOMS) {
        if (global.ROOMS[idRoom].winner !== null) {
            firstToRetry = true;
            global.ROOMS[idRoom] = newRoom(idPlayer);
        } else {
            global.ROOMS[idRoom].status = 2;
        }
        global.ROOMS[idRoom][idPlayer] = {};
        global.ROOMS[idRoom].players.push(idPlayer);
    }
    res.send({
        firstToRetry: firstToRetry
    });
}

module.exports = reInitRoom;