"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ctrl = require("./user.controller");
let router = express.Router();
router.get('/', function (req, res, next) {
    res.send('Hello World!');
});
router.get('/:id', ctrl.getUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map