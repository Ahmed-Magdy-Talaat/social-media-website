import { Link } from "react-router-dom";
import LikesAndSaves from "./LikesAndSaves";
import { useContext } from "react";
import UserContext from "../../../Contexts/User/UserContext";

function PostsGridList({ profile, posts }) {
  const { user } = useContext(UserContext);
  // console.log(posts);
  return (
    <ul className="grid-container gap-5">
      {posts.map((post) => (
        <li key={post._id} className="relative min-w-72 h-80">
          <Link to={`/posts/${post._id}`} className="grid-post_link">
            <img
              src={post.image.url}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user flex items-center">
            <div className="flex items-center mt-4 justify-start gap-2 flex-1">
              <img
                src={
                  post.creator.image
                    ? post.creator.image.url
                    : "/assets/icons/profile-placeholder.svg"
                }
                alt="creator"
                className="w-8 h-8 rounded-full"
              />
              <p className="line-clamp-1">{post.creator.userName}</p>
            </div>

            <LikesAndSaves post={post} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PostsGridList;
