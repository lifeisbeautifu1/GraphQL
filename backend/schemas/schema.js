import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
  }

  type Post {
    id: ID!
    author: User!
    body: String!
    likes: [User!]!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    body: String!
    author: User!
  }

  type Mutation {
    register(input: RegisterInput!): User!
    login(input: LoginInput!): User!
    createPost(body: String!): Post!
    deletePost(id: ID!): Post!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }
`;
