const striptags = require('striptags');
const { QueryTypes } = require('sequelize');
const Notes = require('../../models/notes.js');
const models = require('../../database.js');
const { model } = require('mongoose');

async function getNotes(req, res) {
  console.log('models: ', models);
  if (!req.user) {
    return res.status(403).end();
  } else if (!req.params.repo) {
    return res.status(400).end();
  }

  const repo = req.params.repo;
  const user = req.user;
  const userId = user.id;

  console.log('repo: ', repo);
  console.log('user: ', user);
  console.log('userId: ', userId);

  try {
    const result = await models.sequelize.query('select * from notes where user_id = ? and repo = ?', {
      replacements: [userId, repo],
      type: QueryTypes.SELECT,
      raw: true,
    });

    console.log('notes: ', result);

    res.status(200).send(result[0]);
  } catch (error) {
    console.log('error: ');
    console.log(error);

    res.status(500).send(error);
  }
}

async function saveNote(req, res) {
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

  try {
    const result = await newNote.save(newNote);

    res.status(200).send(result);
  } catch (error) {
    console.log('error: ');
    console.log(error);
    res.status(403).send(error);
  }
}

async function updateNote(req, res) {
  if (!req.user) {
    res.status(400).end();
  } else if (!req.params.note_id) {
    res.status(403).end();
  }

  const note_id = req.params.note_id;
  const note_text = striptags(req.params.note);

  try {
    const result = await Notes.findByIdAndUpdate(
      {
        _id: note_id,
      },
      {
        $set: {
          text: note_text,
        },
      },
      { new: true },
    );

    res.status(200).json(result);
  } catch (error) {
    console.log('error: ');
    console.log(error);
    res.send(error);
  }
}

async function deleteNote(req, res) {
  if (!req.user) {
    res.status(400).end();
  } else if (!req.params.repo || !req.params.note_id) {
    res.status(403).end();
  }

  const _id = new mongoose.Types.ObjectId(req.params.note_id);

  try {
    const result = await Notes.findByIdAndDelete({
      _id,
    });

    if (result) {
      res.status(200).send({ id: _id });
    }
  } catch (error) {
    console.log('error: ');
    console.log(error);

    res.status(403).send(error);
  }
}

module.exports = {
  getNotes,
  saveNote,
  updateNote,
  deleteNote,
};
