function move(req, res, next) {
    const idPlayer = req.query.idPlayer;
    const idRoom = req.params.idRoom;
    const body = req.body;
    for (let i = 0; i < global.ROOMS[idRoom][idPlayer].army.length; i++) {
        if (global.ROOMS[idRoom][idPlayer].army[i].idx === body.idx) {
            global.ROOMS[idRoom][idPlayer].army[i].x = body.x;
            global.ROOMS[idRoom][idPlayer].army[i].y = body.y;
        }
    }    
    for (let i = 0; i < global.ROOMS[idRoom][idPlayer].army.length; i++) {
        if (global.ROOMS[idRoom][idPlayer].army[i].idx === body.idx) {
            global.ROOMS[idRoom][idPlayer].army[i].hasMoved = true;
        }
    }
    res.send({});
}

module.exports = move;