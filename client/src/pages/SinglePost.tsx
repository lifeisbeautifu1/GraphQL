import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import {
  IPostData,
  IPostVars,
  ICreateCommentData,
  ICreateCommentVars,
} from '../interfaces';
import { GET_POST } from '../queries/postQueries';
import { CREATE_COMMENT } from '../mutations/postMutations';
import { LikeButton, DeleteButton } from '../components';
import { FaComments } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

const SinglePost = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const { data, loading } = useQuery<IPostData, IPostVars>(GET_POST, {
    variables: {
      id: id!,
    },
  });
  const { user } = useAppSelector((state) => state.user);
  const callback = () => navigate('/');
  const [comment, setComment] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment();
    inputRef?.current?.blur();
  };
  const [createComment] = useMutation<ICreateCommentData, ICreateCommentVars>(
    CREATE_COMMENT,
    {
      variables: {
        postId: data?.post.id!,
        body: comment,
      },
      update: (cache, result) => {
        setComment('');
      },
    }
  );
  if (loading) {
    return <div>loading...</div>;
  }
  const { post } = data!;
  return (
    <div className="mt-12">
      <div className="flex flex-col items-center lg:flex-row gap-4 lg:items-start">
        <div className="w-1/5 m-auto lg:self-start lg:m-0">
          <img
            className="object-cover"
            src="https://semantic-ui.com/images/avatar2/large/matthew.png"
            alt="post author"
          />
        </div>
        <div className="w-4/5 flex flex-col gap-4 mb-10">
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
            </div>
            <div className="border-b-gray-300 border-b my-2 pb-2">
              <div className="text-gray-500">
                <p>{post.body}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LikeButton post={post} />
              <div className="text-blue-500 text-lg flex items-center border rounded border-blue-500 hover:border-[1.5px] transition duration-300">
                <button className="py-2 pl-4 pr-8 ">
                  <FaComments className="text-blue-500 transition duration-300 hover:scale-125" />
                </button>
                <button className="p-2 px-3 leading-[18px] border-l border-blue-500   ">
                  {post.commentsCount}
                </button>
              </div>
              {user && post.author.id === user.id && (
                <DeleteButton post={post} callback={callback} />
              )}
            </div>
          </div>
          {user && (
            <div className="border border-gray-300 rounded shadow p-4 flex flex-col gap-2">
              <h1 className="text-lg font-bold">Post comment</h1>
              <form className="flex" onSubmit={handleSubmit}>
                <input
                  className="w-2/3 lg:w-4/5 border rounded-tl rounded-bl shadow p-2 outline-none"
                  type="text"
                  value={comment}
                  ref={inputRef}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={comment.trim() === ''}
                  className="w-1/3 lg:w-1/5 py-2 px-5 bg-teal-400 text-white rounded-tr rounded-br hover:bg-teal-400/90"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          {post?.comments.map((c) => (
            <div
              className="border p-4 border-gray-300 shadow rounded flex flex-col gap-2"
              key={c.id}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="font-bold">{c.author.username}</h1>
                  <h2 className="text-sm text-gray-400 ">
                    {formatDistanceToNow(new Date(+c.createdAt), {
                      addSuffix: true,
                    })}
                  </h2>
                </div>
                {user && user.id === c.author.id && (
                  <DeleteButton comment={c} post={post} />
                )}
              </div>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
