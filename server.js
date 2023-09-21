const express = require("express");
const cors = require("cors");

const API_PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.get("/api", function(req, res) {
    console.log("Called");
    res.send({result: "hello"})
})

app.get("/quit", function(req, res) {
    console.log("Called quit");
    res.send({result: "goodbye"})
})

app.listen(API_PORT, () => console.log(`Lisening to port ${API_PORT}`));