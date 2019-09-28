function statusRoom(req, res, next) {
    res.send({
        status: global.ROOMS[req.params.idRoom].status,
        winner: global.ROOMS[req.params.idRoom].winner
    });
}

module.exports = statusRoom;