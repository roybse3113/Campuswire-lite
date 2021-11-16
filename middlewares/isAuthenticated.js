const isAuthenticated = (req, res, next) => {
  if (req.session.user && (req.session.username && req.session.password) && req.session.username.length !== 0) {
    next()
  } else {
    next(new Error('un-authenticated'))
  }
}

module.exports = isAuthenticated
