"use strict";

const express = require("express");
const http = require("http");
const canvas = require("canvas");
const blockies = require("@download/blockies");

const app = express();

app.get("/:seed", (req, res) => {
    res.setHeader("Content-Type", "image/png");

    const size = req.query.size || 8;
    const scale = req.query.scale || 16;
    const rounded = req.query.rounded === "1";

    const wh = size * scale;
    const cnv = new canvas.Canvas(wh, wh);

    blockies.renderIcon({
        seed: req.params.seed,
        size,
        scale,
    }, cnv);

    if (rounded) {
        const ctx = cnv.getContext("2d");
        ctx.beginPath();
        ctx.arc(wh/2, wh/2, wh/2, 0, 2*Math.PI);
        ctx.closePath();
        ctx.globalCompositeOperation = "destination-in";
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fill();
    }

    cnv.pngStream().pipe(res);
});

const server = http.createServer(app);
server.listen(8080);
