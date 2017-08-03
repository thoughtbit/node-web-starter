"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_1 = require("./models/user");
function default_1(router) {
    router.get('/api/users/:id', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.query()
            .findById(req.params.id)
            .eager('[roles]')
            .omit(['password']);
        res.send(user);
    }));
    router.get('/api/users/:username/profile', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.query()
            .where({ username: req.params.username })
            .eager('[roles]')
            .omit(['password'])
            .first();
        res.send(user);
    }));
}
exports.default = default_1;
//# sourceMappingURL=api.js.map