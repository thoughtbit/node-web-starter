import BaseModel, { mergeSchemas } from './base'
import User from './user'

class VerificationToken extends BaseModel {
  static get tableName() {
    return 'verification_token'
  }
  static addTimestamps = true;

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'verification_token.userId',
          to: 'user.id',
        },
      },
    }
  }
}

export default VerificationToken
