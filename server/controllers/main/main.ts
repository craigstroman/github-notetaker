export const main = (req, res) => {
  res.render('index', {
    title: req.app.locals.title,
    content: req.app.locals.description,
    javascript: req.app.locals.javascript,
    user: req.user,
    path: req.path,
  });
};

export const login = (req, res) => {
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
};

export const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.render('logout', {
    title: req.app.locals.title,
    content: req.app.locals.description,
  });
};

export const googleLogin = (req, res, next) => {
  const profileCookie = req.cookies['profile'];

  if (profileCookie) {
    res.clearCookie('profile');
    res.redirect(profileCookie);
  } else {
    res.redirect('/');
  }
};

export const facebookLogin = (req, res, next) => {
  const profileCookie = req.cookies['profile'];

  if (profileCookie) {
    res.clearCookie('profile');
    res.redirect(profileCookie);
  } else {
    res.redirect('/');
  }
};

export const githubLogin = (req, res, next) => {
  const profileCookie = req.cookies['profile'];

  if (profileCookie) {
    res.clearCookie('profile');
    res.redirect(profileCookie);
  } else {
    res.redirect('/');
  }
};

export const sessionStatus = (req, res, next) => {
  res.send({
    user: req.user,
  });
};
