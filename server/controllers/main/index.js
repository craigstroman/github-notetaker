function main(req, res) {
  res.render('index', {
    title: req.app.locals.title,
    content: req.app.locals.description,
    javascript: req.app.locals.javascript,
    user: req.user,
    path: req.path,
  });
}

function login(req, res) {
  const referer = req.headers['referer'];

  if (referer.indexOf('/profile/') >= 1) {
    if (typeof res === 'object') {
      res.cookie('profile', referer, {
        domain: 'localhost',
        secure: false,
      });
      res.render('login', {
        title: req.app.locals.title,
        content: req.app.locals.description,
        user: req.user,
        path: req.path,
      });
      res.end();
    }
  }

  res.render('login', {
    title: req.app.locals.title,
    content: req.app.locals.description,
    user: req.user,
    path: req.path,
  });
}

function logout(req, res) {
  req.logout();
  req.session.destroy();
  res.render('logout', {
    title: req.app.locals.title,
    content: req.app.locals.description,
  });
}

function googleLogin(req, res, next) {
  const profileCookie = req.cookies['profile'];

  if (profileCookie) {
    res.clearCookie('profile');
    res.redirect(profileCookie);
  } else {
    res.redirect('/');
  }
}

function facebookLogin(req, res, next) {
  const profileCookie = req.cookies['profile'];

  if (profileCookie) {
    res.clearCookie('profile');
    res.redirect(profileCookie);
  } else {
    res.redirect('/');
  }
}

function githubLogin(req, res, next) {
  const profileCookie = req.cookies['profile'];

  if (profileCookie) {
    res.clearCookie('profile');
    res.redirect(profileCookie);
  } else {
    res.redirect('/');
  }
}

function sessionStatus(req, res, next) {
  res.send({
    user: req.user,
  });
}

module.exports = {
  main,
  login,
  logout,
  googleLogin,
  facebookLogin,
  githubLogin,
  sessionStatus,
};
