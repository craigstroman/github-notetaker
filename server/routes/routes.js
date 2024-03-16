const express = require('express');
const passport = require('passport');
const {
  facebookLogin,
  googleLogin,
  githubLogin,
  login,
  logout,
  main,
  sessionStatus,
} = require('../controllers/main/index.js');
const { dashboard, settings, updateUserInfo } = require('../controllers/dashboard/index.js');
const { deleteNote, getNotes, saveNote, updateNote } = require('../controllers/notes/index.js');
const { getProfile, getRepos } = require('../controllers/github/index.js');
const { loggedIn } = require('../util/index.js');

const router = express.Router();

router.route('/').get(main);

router.route('/login').get(login);

router.route('/settings').get(settings);

router.route('/update-user-info').post(updateUserInfo);

router.route('/logout').get(logout);

router.route('/dashboard').get(dashboard);

router.route('/profile/:username').get(main);

/**
 * Google auth routes.
 */
router.route('/auth/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/auth/google/callback').get(passport.authenticate('google'), googleLogin);

/**
 * Facebook auth routes.
 */

router.route('/auth/facebook').get(passport.authenticate('facebook', { scope: 'email' }));

router.route('/auth/facebook/callback').get(passport.authenticate('facebook'), facebookLogin);

/**
 * GitHub auth routes.
 */
router.route('/auth/github').get(passport.authenticate('github', { scope: 'user:email' }));

router.route('/auth/github/callback').get(passport.authenticate('github'), githubLogin);

/**
 * GitHub user profile API
 */

router.route('/api/profile/:username').get(getProfile);

router.route('/api/repos/:username/:page_number?/:page_size?').get(getRepos);

/**
 * Notes api
 */

router.route('/api/sessionStatus').get(loggedIn, sessionStatus);

// Notes for a particular repo
router.route('/api/notes/:repo').get(loggedIn, getNotes);

// New note
router.route('/api/notes/:repo/:note').post(loggedIn, saveNote);

// Update note
router.route('/api/notes/:note_id/:note').put(loggedIn, updateNote);

// Delete a note
router.route('/api/notes/:repo/:note_id').delete(loggedIn, deleteNote);

module.exports.routes = router;
