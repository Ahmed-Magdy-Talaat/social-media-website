import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Link to={`/profile/${user._id}`} className="user-card">
      <img
        src={
          (user.image && user?.image.url) ||
          "/assets/icons/profile-placeholder.svg"
        }
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.Name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.userName}
        </p>
      </div>

      <button
        type="button"
        size="md"
        className="shad-button_primary py-2 rounded-lg px-5"
      >
        Follow
      </button>
    </Link>
  );
};

export default UserCard;
