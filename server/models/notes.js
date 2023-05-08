import mongoose from 'mongoose';

const NotesSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    repo: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Notes = mongoose.model('Notes', NotesSchema);
