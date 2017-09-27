import mongoose from 'mongoose';
import findOrCreate from 'mongoose-find-or-create';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  token: String,
  email: String,
  name: String,
  picture: String,
  provider: String,
},{
  timestamps: true,
});

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

export default User;
