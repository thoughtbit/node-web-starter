"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const role_1 = require("./../role");
const user_1 = require("./../user");
class UserRole extends objection_1.Model {
}
UserRole.tableName = 'user_role';
UserRole.jsonSchema = {
    type: 'object',
    required: ['userId', 'roleId'],
    properties: {
        id: {
            type: 'string',
            minLength: 36,
            maxLength: 36,
            pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        },
        roleId: {
            type: 'string',
            minLength: 36,
            maxLength: 36,
            pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        },
        userId: {
            type: 'string',
            minLength: 36,
            maxLength: 36,
            pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        }
    }
};
// Centralize the models.
UserRole.modelPaths = [__dirname];
UserRole.relationMappings = {
    role: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: role_1.default,
        join: {
            from: 'user_role.roleId',
            to: 'role.id'
        }
    },
    user: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: user_1.default,
        join: {
            from: 'user_role.userId',
            to: 'user.id'
        }
    }
};
exports.default = UserRole;
//# sourceMappingURL=user_role.js.map