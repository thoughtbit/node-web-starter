import invokeMap from 'lodash/invokeMap'

const jsonResult = a => Array.isArray(a) ? invokeMap(a, 'toJSON') : a.toJSON()

export default jsonResult
