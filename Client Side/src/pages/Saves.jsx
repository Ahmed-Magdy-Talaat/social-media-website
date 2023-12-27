import { useQuery } from "@tanstack/react-query";
import PostCard from "../Components/_root/shared/PostCard";
import UserContext from "../Contexts/User/UserContext";
import { useContext, useEffect, useState } from "react";
import { getSaves } from "../API/Saves";

function Saves() {
  //
  const { user, setUser } = useContext(UserContext);
  const queryKey = ["savedPosts", user.id];

  const { data: posts, isLoading } = useQuery({
    queryKey,
    queryFn: getSaves,
  });
  // console.log(posts);
  return (
    <div className="flex flex-1 w-full">
      <div className="home-container">
        <div className="home-posts">
          <div className="max-w-5xl flex flex-start gap-3 justify-start w-full">
            <img src="/assets/icons/saved.svg" width={36} height={37} />
            <h2 className="h3-bold md:h2-bold text-left w-full">Saves</h2>
          </div>
          {!posts ? (
            <p>No Saved Posts</p>
          ) : (
            <div className="flex flex-col gap-9">
              {posts
                .filter((post) =>
                  user.saves.find((id) => id.toString() === post.post._id)
                )
                .map((post) => (
                  <PostCard key={post.post._id} post={post.post} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Saves;
