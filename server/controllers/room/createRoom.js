const alphaNum = "abcdefghijklmnopqrstuvwxyz0123456789";
const listObstacles = ["tree1", "tree2", "rock1", "rock2"];

function randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function chooseTypeObstacles() {
    
}

function createObstacles() {
    const obstacles = [];
    const nbObstacles = 25;

    while (obstacles.length < nbObstacles) {
        const x = randomNumber(14);
        const y = 4 + randomNumber(7);
        let isAlreadyIn = false;
        for (const obstacle of obstacles) {
            if (x === obstacle.x && y === obstacle.y) {
                isAlreadyIn = true;
                break;
            }
        }
        if (isAlreadyIn === false) {
            obstacles.push({
                x: x,
                y: y,
                type: listObstacles[randomNumber(listObstacles.length)]
            });
        }
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
        winner: null,
        firstPlayer: idPlayer,
        players: [],
        obstacles: createObstacles()
    };
    global.ROOMS[idRoom][idPlayer] = {
        animations: []
    };
    global.ROOMS[idRoom].players.push(idPlayer);
    console.log(`New room created: ${idRoom} by the player ${idPlayer}`);
    res.send({idRoom});
}

module.exports = createRoom;