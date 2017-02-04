import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
