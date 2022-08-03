import { IPost } from '../interfaces';
import { FaComments } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { DeleteButton, LikeButton } from './';
import { useAppSelector } from '../hooks';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="border border-gray-300 rounded shadow p-2 hover:shadow-lg flex flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold capitalize">{post.author.username}</h1>
            <h1 className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(+post.createdAt), {
                addSuffix: true,
              })}
            </h1>
          </div>
          <div className="h-12 w-12">
            <img
              className="object-cover"
              src="https://semantic-ui.com/images/avatar2/large/matthew.png"
              alt="post author"
            />
          </div>
        </div>
        <div className="border-b-gray-300 border-b my-2 pb-2">
          <div className="text-gray-500">
            <p>{post.body}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LikeButton post={post} />
          <Link to={`/posts/${post.id}`}>
            <button className="text-blue-500 text-lg flex items-center border rounded border-blue-500 hover:border-[1.5px] transition duration-300">
              <span className="py-2 pl-4 pr-8 ">
                <FaComments className="text-blue-500 transition duration-300 hover:scale-125" />
              </span>
              <span className="p-2 px-3 leading-[18px] border-l border-blue-500   ">
                {post.commentsCount}
              </span>
            </button>
          </Link>
          {user && post.author.id === user.id && <DeleteButton post={post} />}
        </div>
      </div>
    </motion.div>
  );
};

export default Post;
