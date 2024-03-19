const { QueryTypes } = require('sequelize');
const striptags = require('striptags');
const Notes = require('../../models/notes.js');
const models = require('../../database.js');

async function getNotes(req, res) {
  if (!req.user) {
    return res.status(403).end();
  } else if (!req.params.repo) {
    return res.status(400).end();
  }

  const repo = req.params.repo;
  const user = req.user;
  const userId = user.id;

  try {
    const result = await models.sequelize.query('select * from notes where user_id = ? and repo = ?', {
      replacements: [userId, repo],
      type: QueryTypes.SELECT,
      raw: true,
    });

    res.status(200).send(result);
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
    await models.sequelize.query('update notes set text = ?  where id = ?', {
      replacements: [note_text, note_id],
      type: QueryTypes.UPDATE,
      raw: true,
      returning: true,
    });

    const result = await models.sequelize.query('select * from notes where id = ?', {
      replacements: [note_id],
      type: QueryTypes.SELECT,
      raw: true,
    });

    res.status(200).json(result[0]);
  } catch (error) {
    console.log('error: ');
    console.log(error);
    res.send(error);
  }
}

async function deleteNote(req, res) {
  console.log('req.params: ', req.params);
  if (!req.user) {
    res.status(400).end();
  } else if (!req.params.repo || !req.params.note_id) {
    res.status(403).end();
  }

  const id = req.params.note_id;

  try {
    const result = await models.sequelize.query('delete  from notes where id = ?', {
      replacements: [id],
      type: QueryTypes.DELETE,
      raw: true,
    });

    if (result) {
      res.status(200).send({ id: id });
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
