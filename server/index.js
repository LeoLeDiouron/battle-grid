const express = require('express');
const router = express.Router();

// controllers
const generateIdPlayer = require("./controllers/room/generateIdPlayer");
const createRoom = require("./controllers/room/createRoom");
const joinRoom = require("./controllers/room/joinRoom");
const randomRoom = require("./controllers/room/randomRoom");
const waitRoom = require("./controllers/room/statusRoom");
const reInitRoom = require("./controllers/room/reInitRoom");
const createArmy = require("./controllers/room/createArmy");
const statusGame = require("./controllers/game/statusGame");
const move = require("./controllers/game/move");
const attack = require("./controllers/game/attack");
const turnOver = require("./controllers/game/turnOver");

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
router.get("/reinit_room/:idRoom", reInitRoom);
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