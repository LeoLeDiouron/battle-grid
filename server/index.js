const express = require('express');
const router = express.Router();

// controllers
const generateIdPlayer = require("./controllers/generateIdPlayer");
const createRoom = require("./controllers/createRoom");
const joinRoom = require("./controllers/joinRoom");
const randomRoom = require("./controllers/randomRoom");
const waitRoom = require("./controllers/statusRoom");
const createArmy = require("./controllers/createArmy");
const statusGame = require("./controllers/statusGame");
const move = require("./controllers/move");
const attack = require("./controllers/attack");
const turnOver = require("./controllers/turnOver");

// instanciate global rooms
global.ROOMS = {};

// routes
// get
router.get("/id_player", generateIdPlayer);
router.get("/create_room", createRoom);
router.get("/join_room/:idRoom", joinRoom);
router.get("/random_room", randomRoom);
router.get("/status_room/:idRoom", waitRoom);
router.get("/status_game/:idRoom", statusGame);
router.get("/turn_over/:idRoom", turnOver);
// post
router.post("/create_army/:idRoom", createArmy);
router.post("/move/:idRoom", move);
router.post("/attack/:idRoom", attack);

/*
status for room
1: created, need a second player
2: second player here (need to choose army)
3: round
*/

module.exports = router;