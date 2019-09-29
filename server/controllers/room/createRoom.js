const alphaNum = "abcdefghijklmnopqrstuvwxyz0123456789";

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

function createRoom(req, res, next) {
    let idRoom = "";
    for (let i = 0; i < 4; i++) {
        const rnd = Math.round(Math.random() * alphaNum.length - 1);
        idRoom += alphaNum.charAt(rnd);
    }
    global.ROOMS[idRoom] = {
        status: 1,
        turnPlayer: null,
        nbActions: 4,
        winner: null,
        firstPlayer: req.query.idPlayer,
        players: [],
        obstacles: createObstacles()
    };
    global.ROOMS[idRoom][req.query.idPlayer] = {};
    global.ROOMS[idRoom].players.push(req.query.idPlayer);
    global.ROOMS[idRoom].turnPlayer = req.query.idPlayer;
    // console.log(JSON.stringify(global.ROOMS));
    res.send({idRoom});
}

module.exports = createRoom;