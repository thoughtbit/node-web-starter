"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const copy_webpack_plugin_1 = require("copy-webpack-plugin");
const lodash_1 = require("lodash");
exports.default = {
    webpack: (config) => (Object.assign({}, config, { plugins: lodash_1.union(config.plugins, [
            new copy_webpack_plugin_1.default([
                {
                    from: 'src/static',
                    to: '../../build/static'
                }
            ], { copyUnmodified: true })
        ]) }))
};
//# sourceMappingURL=next.config.js.map