import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../mutations/postMutations';
import { GET_POSTS } from '../queries/postQueries';
import { ICreatePostData, ICreatePostVars } from '../interfaces';

const PostForm = () => {
  const [body, setBody] = useState('');

  const [createPost, { error }] = useMutation<ICreatePostData, ICreatePostVars>(
    CREATE_POST,
    {
      variables: {
        body,
      },
      onError: (error) => console.log(error),
      update: (cache, { data }) => {
        const { posts } = cache.readQuery({ query: GET_POSTS })!;
        cache.writeQuery({
          query: GET_POSTS,
          data: { posts: [data?.createPost, ...posts] },
        });
        //     const data: any = proxy.readQuery({ query: GET_POSTS });
        //     let newPosts = [result.data?.createPost, ...data.posts];
        //     const newData = { ...data, posts: newPosts };
        //     proxy.writeQuery({ query: GET_POSTS, data: newData });
      },
      //   refetchQueries: [{ query: GET_POSTS }],
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost();
    setBody('');
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Create Post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Post body..."
            className={`p-2 border border-gray-300 rounded ${
              error && 'bg-red-100 placeholder:text-red-500 border-red-500'
            }`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-400 text-white rounded self-start py-2 px-4 hover:bg-blue-400/90"
          >
            Submit
          </button>
        </form>
        {error && (
          <div className="rounded shadow p-4 text-red-500 border-[0.5px] bg-red-100 border-red-500">
            <ul className="flex flex-col gap-2 text-sm list-disc pl-4">
              <li className="font-semibold">
                {error.graphQLErrors[0].message}
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default PostForm;
