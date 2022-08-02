import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = async function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

const User = mongoose.model('User', UserSchema);


export default User;
