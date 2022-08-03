import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      body
      createdAt
      author {
        username
        id
      }
      likesCount
      likes {
        id
      }
      commentsCount
      comments {
        author {
          id
          username
        }
        body

        id
        createdAt
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      body
      createdAt
      author {
        username
        id
      }
      likesCount
      likes {
        id
      }
      commentsCount
      comments {
        author {
          id
          username
        }
        id
        createdAt
        body
      }
    }
  }
`;
