import * as path from 'path';
import { Model } from 'objection';
import Role from './role';

export interface Address {
  street: string;
  city: string;
  zipCode: string;
}

class User extends Model {
  readonly id: number;
  password: string;
  username: string;
  address: Address;

  static tableName = 'user';

  static jsonSchema = {
    type: 'object',
    required: ['email', 'password', 'username'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
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
  static modelPaths = [__dirname];

  static get relationMappings() {
    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
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
  }
}

export default User;
