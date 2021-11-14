const isAuthenticated = (req, res, next) => {
  if (req.session.username && req.session.password) {
    // console.log('authenticated')
    next()
  } else {
    // console.log('un-authenticated')
    next(new Error('un-authenticated'))
  }
}

module.exports = isAuthenticated
