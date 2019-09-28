const alphaNum = "abcdefghijklmnopqrstuvwxyz0123456789";

function createRoom(req, res, next) {
    let idRoom = "";
    for (let i = 0; i < 4; i++) {
        const rnd = Math.round(Math.random() * alphaNum.length - 1);
        idRoom += alphaNum.charAt(rnd);
    }
    global.ROOMS[idRoom] = {
        status: 1,
        turnPlayer: null,
        nbActions: 3,
        winner: null,
        firstPlayer: req.query.idPlayer,
        players: []
    };
    global.ROOMS[idRoom][req.query.idPlayer] = {};
    global.ROOMS[idRoom].players.push(req.query.idPlayer);
    global.ROOMS[idRoom].turnPlayer = req.query.idPlayer;
    // console.log(JSON.stringify(global.ROOMS));
    res.send({idRoom});
}

module.exports = createRoom;