import { Link } from "react-router-dom";
import LikesAndSaves from "./LikesAndSaves";

function PostsGridList({ posts }) {
  // console.log(posts);
  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post._id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            <div className="flex items-center justify-start gap-2 flex-1">
              <img
                src={
                  post.creator.imageUrl ||
                  "/assets/icons/profile-placeholder.svg"
                }
                alt="creator"
                className="w-8 h-8 rounded-full"
              />
              <p className="line-clamp-1">{post.creator.name}</p>
            </div>

            <LikesAndSaves post={post} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PostsGridList;
