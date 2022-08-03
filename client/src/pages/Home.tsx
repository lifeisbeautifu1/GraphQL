import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../queries/postQueries';
import { useAppSelector } from '../hooks';
import { IPostsData, IPostsVars } from '../interfaces';
import { Post, PostForm } from '../components';

const Home = () => {
  const { data, loading, error } = useQuery<IPostsData, IPostsVars>(GET_POSTS);
  const { user } = useAppSelector((state) => state.user);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>something went wrong</div>;
  }
  return (
    <div>
      <h1 className="text-2xl p-8 font-bold text-center w-full">
        Recent Posts
      </h1>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {user && <PostForm />}
        {data?.posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
