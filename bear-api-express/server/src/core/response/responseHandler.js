function responseHandler(res, status, data) {
  return res.status(status || 200).json(data)
}

module.exports = responseHandler
