function joinRoom(req, res, next) {
    global.ROOMS[req.params.idRoom].status = 2;
    global.ROOMS[req.params.idRoom][req.query.idPlayer] = {};
    global.ROOMS[idRoom].players.push(req.query.idPlayer);
    console.log(JSON.stringify(global.ROOMS));
    res.send({
        idRoom: req.params.idRoom
    });
}

module.exports = joinRoom;