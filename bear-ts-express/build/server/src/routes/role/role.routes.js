"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ctrl = require("./role.controller");
let router = express.Router();
router.get('/', ctrl.listRoles);
router.get('/:id', ctrl.getRole);
router.get('/:id/users', ctrl.getRoleUsers);
exports.default = router;
//# sourceMappingURL=role.routes.js.map