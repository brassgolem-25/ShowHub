import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  email:{
    type: String,
    required:true,
  },
  googleOauthId: {
    type: String,
    required: false,
    unique: true,
    sparse: true, // Allows this field to be unique but also nullable
  },
  metaId: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  appleId: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  mobileNumber: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
