export const Comment = {
  author: async (parent, args, context, info) => {
    return await context.db.User.findById(parent.author);
  },
};
