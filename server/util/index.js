export function loggedIn(req, res, next) {
  console.log('loggedIn: ');
  console.log('user: ', req.user);
  console.log('session: ', req.session.token);
  if (req.user) {
    next();
  } else {
    res.status(400).send({
      error: 'Not logged in.',
      loggedIn:false,
    }).end();
  }
}
