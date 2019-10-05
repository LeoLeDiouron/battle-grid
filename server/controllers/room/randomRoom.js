function randomRoom(req, res, next) {
    let roomFound = false;
    for (const [idRoom, room] of Object.entries(global.ROOMS)) {
        if (global.ROOMS[idRoom].status === 1) {
            global.ROOMS[idRoom].status = 2;
            global.ROOMS[idRoom][req.query.idPlayer] = {
                animations: []
            };
            global.ROOMS[idRoom].players.push(req.query.idPlayer);
            console.log(`Player ${req.query.idPlayer} join the room ${idRoom}`);
            res.send({idRoom});
            roomFound = true;
            break;
        }
    }
    if (roomFound === false) {
        res.send({idRoom: null});
    }
}

module.exports = randomRoom;