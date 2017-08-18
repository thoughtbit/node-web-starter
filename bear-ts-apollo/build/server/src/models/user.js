"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const role_1 = require("./role");
class User extends objection_1.Model {
}
User.tableName = 'user';
User.jsonSchema = {
    type: 'object',
    required: ['email', 'password', 'username'],
    properties: {
        id: {
            type: 'string',
            minLength: 36,
            maxLength: 36,
            pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        },
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        website: { type: 'string' },
        avatarUrl: { type: 'string' },
        address: {
            type: 'object',
            properties: {
                street: { type: 'string' },
                city: { type: 'string' },
                zipCode: { type: 'string' }
            }
        },
        verified: { type: 'boolean' },
        createdAt: { type: 'date-time' },
        updatedAt: { type: 'date-time' },
        deletedAt: { type: 'date-time' }
    }
};
// Centralize the models.
User.modelPaths = [__dirname];
User.relationMappings = {
    roles: {
        relation: objection_1.Model.ManyToManyRelation,
        modelClass: role_1.default,
        join: {
            from: 'user.id',
            through: {
                from: 'user_role.userId',
                to: 'user_role.roleId'
            },
            to: 'role.id'
        }
    }
};
exports.default = User;
//# sourceMappingURL=user.js.map