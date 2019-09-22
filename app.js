const express = require("express");
const path = require('path');

const file = "views/index.html";
const rootPath = __dirname + "/";
const server = require(rootPath + "server/index");

const PORT = 8080;
const app = express();

app.use(express.json());

app.use("/api", server);
app.use(express.static(rootPath));

app.get("/", (req, res, next) => {
    res.sendFile(path.resolve(file));
});

app.listen(PORT, () => {
    console.log(`Listen on ${PORT}`);
});