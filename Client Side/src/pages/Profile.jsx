import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById, getUserData } from "../API/User";
import UserContext from "../Contexts/User/UserContext";
import { getPostsForUser } from "../API/Posts";
import PostsGridList from "../Components/_root/shared/PostsGridList";
import {
  checkFollow,
  getAllFollowersAndFollowing,
  handleFollow,
} from "../API/Follow";
import Loader from "react-js-loader";

const StatBlock = ({ value, label }) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

function Profile() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsFollowing(true);

      try {
        // console.log("in");

        // Fetch user data
        const userData = await getUserById(id);
        setProfile(userData);

        // Fetch posts data
        const postsData = await getPostsForUser(id);
        setPosts(postsData);

        // Fetch followers and following details
        const followDetails = await getAllFollowersAndFollowing(id);

        // Check if data._id is available
        if (userData._id) {
          // If available, make the checkFollow call
          const followCheck = await checkFollow(user._id, userData._id);
          setIsFollowing(followCheck);
          setFollowers(followDetails.noOfFollowers);
          setFollowing(followDetails.noOfFollowing);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, user._id]); // Include dependencies from the outer scope if needed

  const handleFollowship = async () => {
    if (isFollowing) setFollowers((a) => a - 1);
    else setFollowers((a) => a + 1);
    setIsFollowing((prev) => !prev);
    await handleFollow(user._id, profile._id);
  };
  return isLoading ? (
    <div className={"item"}>
      <Loader type="spinner-default" title={"spinner-default"} size={100} />
    </div>
  ) : (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7 w-full">
          <img
            src={
              (profile.image && profile.image.url) ||
              "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-30 lg:w-30 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {profile.Name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{profile.userName}
              </p>
            </div>
            <div className="flex gap-8 mt-6 items-start justify-start xl:justify-start flex-wrap z-20">
              <StatBlock value={posts.length} label="Posts" />
              <StatBlock value={followers} label="Followers" />
              <StatBlock value={following} label="Following" />
            </div>
          </div>
          <div className="flex justify-center gap-4">
            {user._id === profile._id ? (
              // Render this link when user._id is equal to profile._id
              <Link
                to={`/update-profile/${profile._id}`}
                className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg"
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            ) : (
              <div onClick={handleFollowship}>
                {!isFollowing ? (
                  <div className="h-12 bg-primary-500 cursor-pointer px-5 text-light-1 flex-center gap-2 rounded-lg">
                    <img
                      src="/assets/icons/follow.svg"
                      className="invert-white"
                      alt="follow"
                    />
                    <p className="flex whitespace-nowrap small-medium ">
                      Follow
                    </p>
                  </div>
                ) : (
                  <div className="h-12 bg-dark-4 cursor-pointer px-5 text-light-1 flex-center gap-2 rounded-lg">
                    <img
                      src="/assets/icons/follow.svg"
                      className="invert-white"
                      alt="follow"
                    />
                    <p className="flex whitespace-nowrap small-medium ">
                      Following
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <PostsGridList profile={profile} posts={posts} />
      </div>
    </div>
  );
}

export default Profile;
