function randomRoom(req, res, next) {
    for (const [idRoom, room] of Object.entries(global.ROOMS)) {
        if (global.ROOMS[idRoom].status === 1) {
            global.ROOMS[idRoom].status = 2;
            global.ROOMS[idRoom][req.query.idPlayer] = {};
            global.ROOMS[idRoom].players.push(req.query.idPlayer);
            res.send({idRoom});
            break;
        }
    }
    // res.send({});
    // console.log(JSON.stringify(global.ROOMS));
}

module.exports = randomRoom;