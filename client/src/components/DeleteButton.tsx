import { FaTrash } from 'react-icons/fa';
import { IComment, IPost } from '../interfaces';
import { useMutation } from '@apollo/client';
import { DELETE_POST, DELETE_COMMENT } from '../mutations/postMutations';
import { GET_POSTS } from '../queries/postQueries';
// import { IDeletePostData, IDeletePostVars } from '../interfaces';

interface DeleteButtonProps {
  post?: IPost;
  comment?: IComment;
  callback?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  post,
  callback,
  comment,
}) => {
  const mutation = comment ? DELETE_COMMENT : DELETE_POST;
  const [deletePostOrComment] = useMutation(mutation, {
    variables: {
      postId: post?.id!,
      commentId: comment?.id!,
    },
    update: (cache) => {
      if (!comment) {
        const { posts } = cache.readQuery({ query: GET_POSTS })!;
        cache.writeQuery({
          query: GET_POSTS,
          data: { posts: posts.filter((p: any) => post?.id !== p.id) },
        });
        callback && callback();
      }
    },
  });
  return (
    <button
      className="ml-auto bg-red-500 hover:bg-red-500/90 text-white p-2 rounded shadow relative delete-btn"
      onClick={() => deletePostOrComment()}
    >
      <FaTrash />
      <span className=" text-xs text-gray-600 absolute  -right-2 -top-11 p-2 rounded  bg-gray-100 invisible tooltip-text">
        Delete
      </span>
    </button>
  );
};

export default DeleteButton;
