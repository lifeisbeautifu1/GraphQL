export const Query = {
  users: async (parent, args, context, info) => {
    return await context.db.User.find();
  },
  user: async (parent, args, context, info) => {
    return await context.db.User.findById(args.id);
  },
  posts: async (parent, args, context, info) => {
    return await context.db.Post.find();
  },
  post: async (parent, args, context, info) => {
    return await context.db.Post.findById(args.id);
  },
};
