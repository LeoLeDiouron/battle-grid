const fs = require('fs');

const alphaNum = "abcdefghijklmnopqrstuvwxyz0123456789";
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

function createRoom(req, res, next) {
    const idPlayer = req.query.idPlayer;
    let idRoom = "";

    for (let i = 0; i < 4; i++) {
        const rnd = randomNumber(alphaNum.length - 1);
        idRoom += alphaNum.charAt(rnd);
    }
    global.ROOMS[idRoom] = {
        status: 1,
        turnPlayer: idPlayer,
        winner: null,
        firstPlayer: idPlayer,
        players: [],
        obstacles: loadMap(),
        logs: []
    };
    global.ROOMS[idRoom][idPlayer] = {
        animations: []
    };
    global.ROOMS[idRoom].players.push(idPlayer);
    console.log(`New room created: ${idRoom} by the player ${idPlayer}`);
    res.send({idRoom});
}

module.exports = createRoom;