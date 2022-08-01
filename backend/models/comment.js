import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
