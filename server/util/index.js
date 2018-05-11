export function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(400).send({
      error: 'Not logged in.',
      loggedIn:false,
    }).end();
  }
}
