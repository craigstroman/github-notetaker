import { Router } from 'express';
import passport from 'passport';
import { facebookLogin, googleLogin, login, logout, main, sessionStatus } from '../controllers/main/index';
import { dashboard, settings } from '../controllers/dashboard/index';
import { deleteNote, findReposWithNotes, getNotes, saveNote, updateNote } from '../controllers/notes/index';
import { getProfile, getRepos } from '../controllers/github/index';
import { loggedIn } from '../util/index';

const router = new Router();

router.route('/').get(main);

router.route('/login').get(login);

router.route('/settings').get(settings);

router.route('/logout').get(logout);

router.route('/dashboard').get(dashboard);

router.route('/profile/:username').get(main);


/**
 * Google auth routes.
 */
router.route('/auth/google').get(passport.authenticate('google', { scope : ['profile', 'email'] }));

router.route('/auth/google/callback').get(passport.authenticate('google'), googleLogin);

/**
 * Facebook auth routes.
 */

router.route('/auth/facebook').get(passport.authenticate('facebook', { scope: 'email' }));

router.route('/auth/facebook/callback').get(passport.authenticate('facebook'), facebookLogin);


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
router.route('/api/notes/:repo/:note_id/:note').put(loggedIn, updateNote);

// Delete a note
router.route('/api/notes/:repo/:note_id').delete(loggedIn, deleteNote);


export default router;
