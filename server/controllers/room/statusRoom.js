function statusRoom(req, res, next) {
    res.send({
        status: global.ROOMS[req.params.idRoom].status
    });
}

module.exports = statusRoom;