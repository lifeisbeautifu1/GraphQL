export interface IUser {
  id: string;
  username: string;
  email: string;
  token: string;
}

export interface IErrors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  general: string;
}

export interface IPost {
  id: string;
  body: string;
  author: IUser;
  likes: IUser[];
  comments: IComment[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export interface IComment {
  id: string;
  body: string;
  author: IUser;
  createdAt: string;
}

export interface IPostsData {
  posts: IPost[];
}

export interface IPostsVars {}

export interface IRegisterUserData {
  register: IUser;
}

export interface IRegisterUserVars {
  input: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export interface ILoginUserData {
  login: IUser;
}

export interface ILoginUserVars {
  input: {
    username: string;
    password: string;
  };
}

export interface ICreatePostData {
  createPost: IPost;
}

export interface ICreatePostVars {
  body: string;
}

export interface IDeletePostData {
  deletePost: boolean;
}

export interface IDeletePostVars {
  postId: string;
}
export interface ILikePostData {
  likePost: IPost;
}

export interface ILikePostVars {
  postId: string;
}

export interface IPostData {
  post: IPost;
}

export interface IPostVars {
  id: string;
}

export interface ICreateCommentData {
  createComment: IPost;
}

export interface ICreateCommentVars {
  postId: string;
  body: string;
}

export interface IDeleteCommentData {
  deleteComment: IPost;
}

export interface IDeleteCommentVars {
  postId: string;
  commentId: string;
}
