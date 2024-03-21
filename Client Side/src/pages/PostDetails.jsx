import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../Contexts/User/UserContext";
import { deletePost, getPostById } from "../API/Posts";
import { formatDate } from "../utils";
import { useContext, useEffect, useState } from "react";
import LikesAndSaves from "../Components/_root/shared/LikesAndSaves";

function PostDetails() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="post_details-container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="post_details-card">
          <img
            src={post?.image.url}
            alt="creator"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <div className="flex items-center gap-3">
                <Link to={`/profile/${post.creator?._id}`}>
                  <img
                    src={
                      post.creator.image
                        ? post.creator.image.url
                        : "/assets/icons/profile-placeholder.svg"
                    }
                    className="rounded-full w-12 lg:h-12"
                    alt="creator"
                  />
                </Link>

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post.creator?.Name}
                  </p>
                  <p className="subtle-semibold lg:small-regular">
                    {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex flex-row gap-3">
                {user?._id === post.creator?._id && (
                  <Link to={`/update-post/${post._id}`}>
                    <img
                      src="/assets/icons/edit.svg"
                      alt="editPost"
                      width={25}
                    />
                  </Link>
                )}

                <div className="flex-center gap-4">
                  {user?._id === post.creator?._id && (
                  <img
                    className="cursor-pointer"
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                    onClick={handleDelete}
                  />)}
                </div>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag, index) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <LikesAndSaves post={post} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
