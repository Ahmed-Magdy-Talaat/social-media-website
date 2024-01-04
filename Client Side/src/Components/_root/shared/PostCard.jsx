import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../../Contexts/User/UserContext";
import { formatDate } from "../../../utils";
import LikesAndSaves from "./LikesAndSaves";
import { getUserById } from "../../../API/User";

function PostCard({ post }) {
  const { caption, imageUrl, tags } = post;
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="post-card">
        <div className="flex flex-between pb-5">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${post.creator._id}`}>
              <img
                src={
                  post.creator.imageUrl ||
                  "/assets/icons/profile-placeholder.svg"
                }
                className="rounded-full w-12 lg:h-12"
                alt="creator"
              />
            </Link>
            <div className="flex flex-col">
              <p className="base-medium lg:body-bold text-light-1">
                {post.creator.Name}
              </p>
              <p className="subtle-semibold lg:small-regular">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          {user._id === post.creator._id && (
            <Link to={`/update-post/${post._id}`}>
              <img src="/assets/icons/edit.svg" alt="editPost" width={25} />
            </Link>
          )}
        </div>
        <div className="flex flex-col mb-1 ">
          <p className="small-medium lg:base-medium pt-3">{caption}</p>
          <ul className="flex gap-1 pt-3">
            {tags.map((tag) => {
              return (
                <p
                  key={tag}
                  className="text-light-3 small-medium lg:base-medium"
                >
                  #{tag}
                </p>
              );
            })}
          </ul>
        </div>
        <img src={imageUrl} className="post_card-img pt-3" />
        <LikesAndSaves post={post} />
      </div>
    </>
  );
}

export default PostCard;
