import BaseModel, { mergeSchemas } from './base'
import User from './user'

class Social extends BaseModel {
  static tableName = 'user_social_media';
  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['id', 'userId'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      userId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      googleUrl: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      githubUrl: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
    },
  })

  static addTimestamps = false

  static relationMappings = {
    user: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'user_social_media.userId',
        to: 'user.id',
      },
    },
  }
}

export default Social
