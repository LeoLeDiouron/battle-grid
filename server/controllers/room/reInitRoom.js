function randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createObstacles() {
    const obstacles = [];
    const nbObstacles = 25;

    while (obstacles.length < nbObstacles) {
        obstacles.push({
            x: randomNumber(14),
            y: 4 + randomNumber(7)
        });
    }
    return obstacles;
}

function newRoom(idPlayer) {
    return {
        status: 1,
        turnPlayer: idPlayer,
        nbActions: 4,
        winner: null,
        firstPlayer: idPlayer,
        players: [],
        obstacles: createObstacles()
    };
}

function reInitRoom(req, res, next) {
    const idRoom = req.params.idRoom;
    const idPlayer = req.query.idPlayer;

    if (idRoom in global.ROOMS) {
        if (global.ROOMS[idRoom].winner !== null) {
            global.ROOMS[idRoom] = newRoom(idPlayer);
        } else {
            global.ROOMS[idRoom].status = 2;
        }
        global.ROOMS[idRoom][idPlayer] = {};
        global.ROOMS[idRoom].players.push(idPlayer);
    }
    console.log(`REINIT -> ${JSON.stringify(global.ROOMS[idRoom])}`);
    res.send({});
}

module.exports = reInitRoom;