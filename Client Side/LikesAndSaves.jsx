import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../../Contexts/User/UserContext";
import { postLike } from "../../../API/Posts";
import { updateSavedPost } from "../../../API/Saves";

function LikesAndSaves({ post }) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { caption, comments, likes, tags } = post;
  const [liked, setLiked] = useState(Boolean(likes[user._id]));
  const [saved, setSaved] = useState(
    user.saves &&
      user.saves.length > 0 &&
      user.saves.some((id) => id.toString() === post._id)
  );

  const [likesNo, setLikesNo] = useState(0);
  useEffect(() => {
    setLikesNo(Object.keys(likes).length);
  }, []);

  const handleLike = async (id) => {
    setLiked(!liked);
    setLikesNo((prevLikesNo) => (!liked ? prevLikesNo + 1 : prevLikesNo - 1));
    await postLike(id);
  };

  const handleSave = async (postId) => {
    if (saved) {
      const indexToRemove = user.saves.indexOf(postId);
      if (indexToRemove !== -1) {
        const updatedSaves = user.saves.filter((id) => id !== postId);
        setUser({ ...user, saves: updatedSaves });
      }
    } else {
      setUser({ ...user, saves: [...user.saves, postId] });
    }
    setSaved((preSaved) => !preSaved);
    await updateSavedPost(postId);
  };

  return (
    <div className="flex flex-between  pt-4">
      <div className="flex gap-4 mr-6">
        <img
          src={liked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
          width={25}
          onClick={() => handleLike(post._id)}
          alt="like"
        />
        <p>{likesNo}</p>
      </div>
      <div className="flex gap-4">
        <img
          src={saved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          width={25}
          onClick={() => handleSave(post._id)}
          alt="save"
        />
        <img src="/assets/icons/chat.svg" width={25} alt="chat" />
      </div>
    </div>
  );
}

export default LikesAndSaves;
