function statusRoom(req, res, next) {
    const idRoom = req.params.idRoom;
    if (idRoom in global.ROOMS) {
        res.send({
            status: global.ROOMS[idRoom].status,
            winner: global.ROOMS[idRoom].winner
        });
    } else {
        res.send({});
    }
}

module.exports = statusRoom;