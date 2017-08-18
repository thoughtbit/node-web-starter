"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const user_1 = require("./user");
class Role extends objection_1.Model {
}
Role.tableName = 'role';
Role.jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
        id: {
            type: 'number'
        },
        uuid: {
            type: 'string',
            minLength: 36,
            maxLength: 36,
            pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        },
        name: {
            type: 'string',
            minLength: 3,
            maxLength: 64,
            pattern: '^[A-Za-z0-9-_]+$'
        },
        image: {
            type: 'string',
            maxLength: 255
        },
        description: {
            type: 'string',
            maxLength: 255
        }
    }
};
// Centralize the models.
Role.modelPaths = [__dirname];
Role.relationMappings = {
    users: {
        relation: objection_1.Model.ManyToManyRelation,
        modelClass: user_1.default,
        join: {
            from: 'role.id',
            through: {
                from: 'user_role.roleId',
                to: 'user_role.userId'
            },
            to: 'user.id'
        }
    }
};
exports.default = Role;
//# sourceMappingURL=role.js.map