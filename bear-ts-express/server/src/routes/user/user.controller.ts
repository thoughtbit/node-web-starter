export async function getUser(req, res, next) {
  try {
    return await res.status(200).json({
      username: 'moocss'
    })
  } catch (error) {
    return next(error)
  }
}
