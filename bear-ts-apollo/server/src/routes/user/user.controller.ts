import User from './../../models/user'

export async function getUser(req, res, next) {
  try {
    const user = await User.query()
      .findById(req.params.id)
      .eager('[roles]')
      .omit(['password'])
    return res.send(user)
  } catch (error) {
    return next(error)
  }
}

export async function getUsername(req, res, next) {
  try {
    const user = await User.query()
      .where({ username: req.params.username })
      .eager('[roles]')
      .omit(['password'])
      .first()
    return res.send(user)
  } catch (error) {
    return next(error)
  }
}
