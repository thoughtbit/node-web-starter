"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_1 = require("./../../models/user");
const role_1 = require("./../../models/role");
function listRoles(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const roles = yield role_1.default.query().eager('users').omit(user_1.default, ['password']);
            return res.send(roles);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.listRoles = listRoles;
function getRole(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const role = yield role_1.default.query().findById(req.params.id);
            return res.send(role);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getRole = getRole;
function getRoleUsers(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const role = yield role_1.default.query()
                .findById(req.params.id)
                .eager('users')
                .omit(user_1.default, ['password']);
            return res.send(role);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getRoleUsers = getRoleUsers;
//# sourceMappingURL=role.controller.js.map