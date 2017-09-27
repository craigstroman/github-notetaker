import cuid from 'cuid';
import striptags from 'striptags';
import Notes from '../../models/notes';

export function getNotes(req, res) {
  if (!req.user) {
    return res.status(403).end();
  } else if (!req.params.repo) {
    return res.status(400).end();
  }

  const repoName = req.params.repo;
  const user = req.user;

  Notes.find({
    repo: repoName,
    user,
  }).exec((err, notes) => {
    if (err) {
      res.status(500).send(err).end();
    } else {
      res.send({notes});
    }
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
  const user = req.user;

  const newNote = new Notes({
    _id: cuid(),
    text: note,
    repo,
    user,
  });

  newNote.save()
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status(500).send({
        error: err
      }).end();
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

  Notes.update({ '_id': note_id }, {$set: { 'text': note_text }}, function(err, result){
      if (err) {
          console.log('Error updating object: ' + err);
          res.send({'error':'An error has occurred'});
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

  Notes.findOne({
    _id: note_id,
    repo,
  }).exec((err, note) => {
    Notes.remove(note, (err, obj) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(note);
    });
  });
}


