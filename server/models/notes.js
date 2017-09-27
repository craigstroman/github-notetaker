import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const notesSchema = new Schema({
  _id: String,
  text: String,
  repo: String,
  user: String
},{
  timestamps: true,
});

export default mongoose.model('Notes', notesSchema);
