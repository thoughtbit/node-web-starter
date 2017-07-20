import { GraphQLError } from 'graphql/error'
import { Kind } from 'graphql/language'
import { Factory } from './factory'
import { GraphQLCustomScalarType } from './types'

const factory = new Factory()

export const GraphQLEmail = factory.getRegexScalar({
  name: 'Email',
  regex: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  description: 'The Email scalar type represents E-Mail addresses compliant to RFC 822.',
  error: 'Query error: Not a valid Email address',
})

export const GraphQLURL = factory.getRegexScalar({
  name: 'URL',
  // RegExp taken from https://gist.github.com/dperini/729294
  regex: new RegExp(
    '^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$',
    'i',
  ),
  description: 'The URL scalar type represents URL addresses.',
  error: 'Query error: Not a valid URL',
})

export const GraphQLUUID = factory.getRegexScalar({
  name: 'UUID',
  // https://github.com/chriso/validator.js/blob/master/src/lib/isUUID.js#L7
  regex: new RegExp(
    '^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$',
    'i',
  ),
  description: 'The UUID scalar type represents a UUID.',
  error: 'Query error: Not a valid UUID',
})
