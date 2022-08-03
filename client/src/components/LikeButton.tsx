import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useAppSelector } from '../hooks';
import { FaHeart } from 'react-icons/fa';
import { IPost, ILikePostData, ILikePostVars } from '../interfaces';
import { LIKE_POST } from '../mutations/postMutations';

interface LikeButtonProps {
  post: IPost;
}

const LikeButton: React.FC<LikeButtonProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);

  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    user && post.likes.find((u) => u.id === user?.id)
      ? setIsLiked(true)
      : setIsLiked(false);
  }, [user, post.likes]);
  const navigate = useNavigate();
  const [likePost] = useMutation<ILikePostData, ILikePostVars>(LIKE_POST, {
    variables: {
      postId: post.id,
    },
  });
  return (
    <button
      onClick={() => {
        user ? likePost() : navigate('/login');
      }}
      className={`text-teal-500 text-lg flex items-center border border-teal-500 transition duration-200 hover:border-[1.5px] rounded ${
        isLiked ? 'bg-teal-500' : 'bg-white'
      }`}
    >
      <span className="py-2 pl-4 pr-8 ">
        <FaHeart
          className={`transition duration-300 hover:scale-125 ${
            isLiked ? 'text-white ' : 'text-teal-500'
          }`}
        />
      </span>
      <span
        className={`p-2 px-3  border border-l-teal-500 leading-[18px] ${
          isLiked
            ? 'text-white border-teal-500 border-l-white'
            : 'text-teal-500 '
        }`}
      >
        {post.likesCount}
      </span>
    </button>
  );
};

export default LikeButton;
