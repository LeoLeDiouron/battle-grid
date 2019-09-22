const alphaNum = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateIdPlayer(req, res, next) {
    let idPlayer = "";
    for (let i = 0; i < 6; i++) {
        const rnd = Math.round(Math.random() * alphaNum.length - 1);
        idPlayer += alphaNum.charAt(rnd);
    }
    res.send({idPlayer});
}

module.exports = generateIdPlayer;