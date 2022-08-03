import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
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

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
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
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      author {
        id
        username
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

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      body
      author {
        id
        username
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
