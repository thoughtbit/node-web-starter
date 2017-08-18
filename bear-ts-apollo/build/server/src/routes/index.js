"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = require("./user/user.routes");
const role_routes_1 = require("./role/role.routes");
exports.default = (app) => {
    app.get('health-check', (req, res) => {
        res.status(200);
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.json({
            health: 'good',
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage()
        });
    });
    app.use('users', user_routes_1.default);
    app.use('roles', role_routes_1.default);
};
//# sourceMappingURL=index.js.map