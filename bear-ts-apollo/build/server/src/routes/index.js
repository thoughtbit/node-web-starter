"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = require("./user/user.routes");
const role_routes_1 = require("./role/role.routes");
exports.default = (server) => {
    server.get('/health-check', (req, res) => {
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
    server.use('/users', user_routes_1.default);
    server.use('/roles', role_routes_1.default);
};
//# sourceMappingURL=index.js.map