"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_1 = require("./../../models/user");
function getUser(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.query()
                .findById(req.params.id)
                .eager('[roles]')
                .omit(['password']);
            return res.send(user);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getUser = getUser;
function getUsername(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.query()
                .where({ username: req.params.username })
                .eager('[roles]')
                .omit(['password'])
                .first();
            return res.send(user);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getUsername = getUsername;
//# sourceMappingURL=user.controller.js.map