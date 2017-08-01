import _debug from 'debug'
import { responseHandler } from './../../core'
import Setting from './../../models/setting'

const debug = _debug('bear:settings-ctrl')

export async function listSettings(req, res, next) {
  try {
    const settings = await Setting.query()

    if (!settings) {
      return res.status(404).json({ message: 'Unable to find any settings. Theres a problem.' })
    }

    return responseHandler(res, 200, settings)
  } catch (error) {
    /* istanbul ignore next */
    return next(error)
  }
}

export async function getSetting(req, res, next) {
  try {
    const setting = await Setting.query().findById(req.params.id)
    if (!setting)
      return res.status(404).json({ error: 'Unable to find a setting matching the id' })
    return responseHandler(res, 200, setting)
  } catch (error) {
    /* istanbul ignore next */
    return next(error)
  }
}

export async function addSetting(req, res, next) {
  try {
    const settingPayload = {
      key: req.body.key,
      value: req.body.value,
      label: req.body.label,
      description: req.body.description,
    }

    const setting = await Setting.query().insert(settingPayload)

    return responseHandler(res, 201, setting)
  } catch (error) {
    /* istanbul ignore next */
    return next(error)
  }
}

export function updateSetting(req, res) {
  return Setting.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(setting => responseHandler(res, 202, setting))
}
