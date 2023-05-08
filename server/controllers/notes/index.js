import cuid from 'cuid';
import striptags from 'striptags';
import mongoose from 'mongoose';
import { Notes } from '../../models/notes';

Notes.init();

export async function getNotes(req, res) {
  if (!req.user) {
    return res.status(403).end();
  } else if (!req.params.repo) {
    return res.status(400).end();
  }

  const repo = req.params.repo;
  const user = req.user;
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const result = await Notes.find({
      user_id: userId,
      repo,
    });

    res.status(200).send(result);
  } catch (error) {
    console.log('error: ');
    console.log(error);

    res.status(500).send(error);
  }
}

export async function saveNote(req, res) {
  if (!req.user) {
    res.status(400).end();
  } else if (!req.params.repo || !req.params.note) {
    res.status(403).end();
  }

  const note = striptags(req.params.note);
  const repo = req.params.repo;
  const userId = new mongoose.Types.ObjectId(req.user._id);

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

export async function updateNote(req, res) {
  if (!req.user) {
    res.status(400).end();
  } else if (!req.params.repo || !req.params.note_id) {
    res.status(403).end();
  }

  const repo = req.params.repo;
  const note_id = req.params.note_id;
  const note_text = striptags(req.params.note);

  try {
    const result = await Notes.updateOne(
      {
        _id: note_id,
        repo,
      },
      {
        $set: {
          note_text,
        },
      },
    );

    res.status(200).send(result);
  } catch (error) {
    console.log('error: ');
    console.log(error);
    res.send(error);
  }
}

export async function deleteNote(req, res) {
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
