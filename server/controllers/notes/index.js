import cuid from 'cuid';
import striptags from 'striptags';

const models = require('../../models/index');
const Notes = models.default.Notes;

export function getNotes(req, res) {
  if (!req.user) {
    return res.status(403).end();
  } else if (!req.params.repo) {
    return res.status(400).end();
  }

  const repo = req.params.repo;
  const user = req.user;
  const userId = user.id;

  Notes.findAll({
    where: {
      user_id: userId,
      repo,
    },
    raw: true,
  })
    .then((notes) => {
      res.status(200).send({ notes });
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          error: err,
        })
        .end();
    });
}

export function saveNote(req, res) {
  if (!req.user) {
    res.status(400).end();
  } else if (!req.params.repo || !req.params.note) {
    res.status(403).end();
  }

  const note = striptags(req.params.note);
  const repo = req.params.repo;
  const userId = req.user.id;

  const newNote = new Notes({
    text: note,
    repo,
    user_id: userId,
  });

  newNote
    .save()
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          error: err,
        })
        .end();
    });
}

export function updateNote(req, res) {
  if (!req.user) {
    res.status(400).end();
  } else if (!req.params.repo || !req.params.note_id) {
    res.status(403).end();
  }

  const repo = req.params.repo;
  const note_id = req.params.note_id;
  const note_text = striptags(req.params.note);

  Notes.update({ _id: note_id }, { $set: { text: note_text } }, function (err, result) {
    if (err) {
      console.log('Error updating object: ' + err);
      res.send({ error: 'An error has occurred' });
    } else {
      res.send({ success: true });
    }
  });
}

export function deleteNote(req, res) {
  if (!req.user) {
    res.status(400).end();
  } else if (!req.params.repo || !req.params.note_id) {
    res.status(403).end();
  }

  const repo = req.params.repo;
  const note_id = req.params.note_id;

  Notes.destroy({
    where: {
      id: note_id,
    },
  })
    .then((result) => {
      if (result) {
        res.status(200).send({ id: parseInt(note_id) });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          error: err,
        })
        .end();
    });
}
