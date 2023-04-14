function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/login");
}

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return res.redirect("/dashboard");
  next();
}

module.exports = { checkAuthenticated, checkLoggedIn };
