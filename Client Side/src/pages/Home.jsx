import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../API/Posts";
import PostCard from "../Components/_root/shared/PostCard";
function Home() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["getAllposts"],
    queryFn: getAllPosts,
  });

  // console.log(posts);

  return (
    <div className="flex flex-1 w-full">
      <div className="home-container">
        <div className="home-posts">
          <div className="max-w-5xl flex flex-start gap-3 justify-start w-full">
            <img src="/assets/icons/home.svg" width={36} height={37} />
            <h2 className="h3-bold md:h2-bold text-left w-full">HomeFeeds</h2>
          </div>
          {isLoading && !posts ? (
            <p>Loading....</p>
          ) : (
            <div className="flex flex-col gap-9">
              {posts.map((post) => {
                return <PostCard post={post} key={post._id} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
