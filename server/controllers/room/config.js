function config(req, res, next) {
    res.send({
        config: global.CONFIG,
    });
}

module.exports = config;