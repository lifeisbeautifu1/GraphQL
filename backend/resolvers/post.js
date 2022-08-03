export const Post = {
  author: async (parent, args, context, info) => {
    return await context.db.User.findById(parent.author);
  },
  comments: async (parent, args, context, info) => {
    return await context.db.Comment.find({
      post: parent.id,
    }).sort({createdAt: -1});
  },
  likes: async (parent, args, context, info) => {
    return await context.db.User.find({
      _id: {
        $in: parent.likes,
      },
    });
  },
  likesCount: (parent, args, context, info) => {
    return parent.likes.length;
  },
  commentsCount: (parent, args, context, info) => {
    return parent.comments.length;
  },
};
