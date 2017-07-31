import Promise from 'bluebird'
import Bcrypt from 'bcryptjs'
import _debug from 'debug'
import BaseModel, { mergeSchemas } from './base'
import Role from './role'
import Article from './article'
import Social from './social'

const bcrypt = Promise.promisifyAll(Bcrypt)
const debug = _debug('bear:server:models:user')

class User extends BaseModel {
  static tableName = 'user'

  fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  stripPassword() {
    delete this.password
    return this
  }

  /**
   * authenticate is specific to the user instance. compares the hashed password
   * with the password from the request.
   */
  authenticate(plainText) {
    return bcrypt.compareAsync(plainText, this.password)
  }

  /**
   * Checks to see if this user has the provided role or not.
   */
  hasRole(role) {
    if (!this.roles) {
      return false
    }
    const validRoles = this.roles.filter(({ name }) => name === role)
    return validRoles.length
  }

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
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
      verified: { type: 'boolean' },
      createdAt: { type: 'date-time' },
      updatedAt: { type: 'date-time' },
      deletedAt: { type: 'date-time' },
    },
  })

  static addTimestamps = true

  static hidden = []

  static get relationMappings() {
    return {
      roles: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: 'user.id',
          through: {
            from: 'user_role.userId',
            to: 'user_role.roleId',
          },
          to: 'role.id',
        },
      },
      articles: {
        relation: BaseModel.HasManyRelation,
        modelClass: Article,
        join: {
          from: 'user.id',
          to: 'article.userId',
        },
      },
      socialMedia: {
        relation: BaseModel.HasOneRelation,
        modelClass: Social,
        join: {
          from: 'user.id',
          to: 'user_social_media.userId',
        },
      },
    }
  }

  static getUserByUsername(username) {
    return User.query().where({ username }).eager('[roles,socialMedia]').then(x => x[0])
  }

  static getUsers() {
    return User.query().eager('[roles,socialMedia]')
  }

  static getUserById(id) {
    return User.query().findById(id).eager('[roles,socialMedia]')
  }

  static getUserByEmail(email) {
    return User.query().where({ email }).eager('[roles,socialMedia]').then(x => x[0])
  }

  /**
   * Before inserting make sure we hash the password if provided.
   */
  $beforeInsert(queryContext) {
    super.$beforeInsert(queryContext)

    if (this.hasOwnProperty('password')) {
      this.password = bcrypt.hashSync(this.password, 10)
    }
    if (this.firstName) {
      this.firstName = this.firstName.trim()
    }
    if (this.lastName) {
      this.lastName = this.lastName.trim()
    }
    this.email = this.email.trim()
  }

  /**
   * Before updating make sure we hash the password if provided.
   */
  $beforeUpdate(queryContext) {
    super.$beforeUpdate(queryContext)

    if (this.hasOwnProperty('password')) {
      this.password = bcrypt.hashAsync(this.password, 10)
    }
  }
}

export default User
