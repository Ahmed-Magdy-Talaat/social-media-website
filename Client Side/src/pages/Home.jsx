import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../API/Posts";
import PostCard from "../Components/_root/shared/PostCard";
import { getAllUsers } from "../API/User";
import UserCard from "../Components/_root/shared/UserCard";
import Loader from "react-js-loader";
function Home() {
  const { data: posts, isLoading: isPostsLoading } = useQuery({
    queryKey: ["getAllposts"],
    queryFn: getAllPosts,
  });
  const { data: creators, isLoading: isUserLoading } = useQuery({
    queryKey: ["getAllusers"],
    queryFn: getAllUsers,
  });
  // console.log(posts);

  return (
    <>
      <div className="flex flex-1 ">
        <div className="home-container">
          <div className="home-posts">
            <div className="max-w-5xl flex flex-start gap-3 justify-start w-full">
              <img src="/assets/icons/home.svg" width={36} height={37} />
              <h2 className="h3-bold md:h2-bold text-left w-full">HomeFeeds</h2>
            </div>
            {isPostsLoading && !posts ? (
              <div className={"item"}>
                <Loader type="spinner-default" size={100} />
              </div>
            ) : (
              <div className="flex flex-col gap-9">
                {posts.map((post) => {
                  return <PostCard post={post} key={post._id} />;
                })}
              </div>
            )}
          </div>
        </div>
        <div className="home-creators">
          <div className="mt-5 fixed w-60 h-screen overflow-scroll custom-scrollbar">
            <h3 className="h3-bold text-light-1 ml-5 mb-3">Top Creators</h3>
            {isUserLoading && !creators ? (
              <Loader type="spinner-default" size={70} />
            ) : (
              <ul className="grid 2xl:grid-cols-2 gap-6">
                {creators?.map((creator) => (
                  <li key={creator?._id}>
                    <UserCard user={creator} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
