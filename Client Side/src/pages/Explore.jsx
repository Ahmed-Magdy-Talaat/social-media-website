import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllPosts } from "../API/Posts";
import PostsGridList from "../Components/_root/shared/PostsGridList";
import Loader from "react-js-loader";
function Explore() {
  const [searchValue, setSearchValue] = useState("");
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["explorePosts"], queryFn: getAllPosts });
  // console.log(posts);

  return (
    <div className="explore-container mx-8">
      <div className="explore_inner-container w-full">
        <div className="flex flex-row gap-5 w-full mb-5">
          <img src="/assets/icons/posts.svg" width={35} alt="explore" />
          <h2 className="h3-bold md:h2-bold ">Explore Posts</h2>
        </div>
        <div className="flex px-4 gap-5 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-5 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="flex flex-row flex-wrap">
        {isLoading ? (
          <Loader type="spinner-default" size={100} />
        ) : (
          <PostsGridList posts={posts} />
        )}
      </div>
    </div>
  );
}

export default Explore;
