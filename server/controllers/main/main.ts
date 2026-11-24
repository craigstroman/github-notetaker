import { Request, Response } from 'express';

export const main = (req: Request, res: Response) => {
  res.render('index', {
    title: req.app.locals.title,
    content: req.app.locals.description,
    javascript: req.app.locals.javascript,
    user: req.user,
    path: req.path,
  });
};

export const login = (req: Request, res: Response) => {
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

export const logout = (req: Request, res: Response) => {
  req.logout();
  req.session.destroy();
  res.render('logout', {
    title: req.app.locals.title,
    content: req.app.locals.description,
  });
};

export const googleLogin = (req: Request, res: Response) => {
  const profileCookie = req.cookies['profile'];

  if (profileCookie) {
    res.clearCookie('profile');
    res.redirect(profileCookie);
  } else {
    res.redirect('/');
  }
};

export const facebookLogin = (req: Request, res: Response) => {
  const profileCookie = req.cookies['profile'];

  if (profileCookie) {
    res.clearCookie('profile');
    res.redirect(profileCookie);
  } else {
    res.redirect('/');
  }
};

export const githubLogin = (req: Request, res: Response) => {
  const profileCookie = req.cookies['profile'];

  if (profileCookie) {
    res.clearCookie('profile');
    res.redirect(profileCookie);
  } else {
    res.redirect('/');
  }
};

export const sessionStatus = (req: Request, res: Response) => {
  res.send({
    user: req.user,
  });
};
