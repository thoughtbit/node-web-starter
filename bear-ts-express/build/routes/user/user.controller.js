"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function getUser(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            return yield res.status(200).json({
                username: 'moocss'
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getUser = getUser;
//# sourceMappingURL=user.controller.js.map