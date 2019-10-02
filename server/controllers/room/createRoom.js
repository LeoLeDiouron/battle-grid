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
    const idPlayer = req.query.idPlayer;
    let idRoom = "";

    for (let i = 0; i < 4; i++) {
        const rnd = randomNumber(alphaNum.length - 1);
        idRoom += alphaNum.charAt(rnd);
    }
    global.ROOMS[idRoom] = {
        status: 1,
        turnPlayer: idPlayer,
        nbActions: 4,
        winner: null,
        firstPlayer: idPlayer,
        players: [],
        obstacles: createObstacles()
    };
    global.ROOMS[idRoom][idPlayer] = {};
    global.ROOMS[idRoom].players.push(idPlayer);
    console.log(`New room created: ${idRoom} by the player ${idPlayer}`);
    res.send({idRoom});
}

module.exports = createRoom;