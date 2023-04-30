import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  profile_id: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model('User', UserSchema);
