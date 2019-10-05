function joinRoom(req, res, next) {
    const idRoom = req.params.idRoom;
    const idPlayer = req.query.idPlayer;
    let status = 0;
    let errorMessage = '';

    if (idRoom in global.ROOMS) {
        if (global.ROOMS[idRoom].players.length === 1) {
            global.ROOMS[req.params.idRoom].status = 2;
            global.ROOMS[req.params.idRoom][idPlayer] = {
                animations: []
            };
            global.ROOMS[idRoom].players.push(idPlayer);
            console.log(`Player ${idPlayer} join the room ${idRoom}`);
        } else {
            status = -1;
            errorMessage = `This game is already full.`;
        }
    } else {
        status = -1;
        errorMessage = `The game with code '${idRoom}' doesn't exist.`
    }
    res.send({
        status: status,
        errorMessage: errorMessage
    });
}

module.exports = joinRoom;