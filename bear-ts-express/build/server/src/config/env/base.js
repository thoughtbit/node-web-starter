"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // ------------------------------------------------------------------------------
    // Server Config
    // ------------------------------------------------------------------------------
    server: {
        port: 9090,
        host: '127.0.0.1',
        apiPrefix: '/api/v1',
        siteUrl: 'http://localhost:3000'
    },
    // ------------------------------------------------------------------------------
    // 数据库 Config
    // ------------------------------------------------------------------------------
    db: {
        url: 'postgres://postgres@127.0.0.1:5432/bear',
        name: 'bear',
        debug: false
    }
};
//# sourceMappingURL=base.js.map