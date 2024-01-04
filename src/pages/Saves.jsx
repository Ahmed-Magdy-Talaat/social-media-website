import { useQuery } from "@tanstack/react-query";
import PostCard from "../Components/_root/shared/PostCard";
import UserContext from "../Contexts/User/UserContext";
import { useContext, useEffect, useState } from "react";
import { getSaves } from "../API/Saves";
import { getAllUsers } from "../API/User";
import UserCard from "../Components/_root/shared/UserCard";
import Loader from "react-js-loader";
function Saves() {
  //
  const { user, setUser } = useContext(UserContext);
  const queryKey = ["savedPosts", user.id];

  const { data: saves, isLoading: isSavesLoading } = useQuery({
    queryKey,
    queryFn: getSaves,
  });

  const { data: creators, isLoading: isUserLoading } = useQuery({
    queryKey: ["getAllusers"],
    queryFn: getAllUsers,
  });
  console.log(saves);
  return (
    <div className="flex flex-1 w-full">
      <div className="home-container">
        <div className="home-posts">
          <div className="max-w-5xl flex flex-start gap-3 justify-start w-full">
            <img src="/assets/icons/saved.svg" width={36} height={37} />
            <h2 className="h3-bold md:h2-bold text-left w-full">Saves</h2>
          </div>
          {isSavesLoading ? (
            <Loader type="spinner-default" size={100} />
          ) : (
            <div className="flex flex-col gap-9">
              {saves &&
                saves
                  .filter((save) =>
                    user.saves.find((id) => id.toString() === save.post._id)
                  )
                  .map((save) => (
                    <PostCard key={save.post._id} post={save.post} />
                  ))}
            </div>
          )}
        </div>
      </div>

      <div className="home-creators ">
        <div className="fixed w-56">
          <h3 className="h3-bold text-light-1 mb-5">Top Creators</h3>
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
  );
}

export default Saves;
