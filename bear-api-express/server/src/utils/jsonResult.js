import invokeMap from 'lodash/invokemap'

const jsonResult = a => {
  return Array.isArray(a) ? invokeMap(a, 'toJSON') : a.toJSON()
}

export default jsonResult
