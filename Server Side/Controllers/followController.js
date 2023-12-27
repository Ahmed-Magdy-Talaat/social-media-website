import Followship from "../Models/Followship.js";
import { handleError } from "./shared/sharedFunctions.js";

export const handleFollower = async (req, res) => {
  const { follower, followed } = req.body;
  try {
    const exist = await Followship.find({ follower, followed });

    if (!exist.length) {
      //
      const followship = new Followship({ follower, followed });
      const newFollowShip = await followship.save();

      if (newFollowShip) {
        res.status(200).json({
          status: "success",
          data: {
            followship: newFollowShip,
            message: "You have become a follower",
            follow: true,
          },
        });
      } else {
        res.status(400).json({
          status: "fail",
          message: "A problem has occured",
        });
      }
    } else {
      //
      const deleted = await Followship.deleteOne({ follower, followed });
      if (deleted) {
        res.status(200).json({
          status: "success",
          data: { message: "You are not a follower any more", follow: false },
        });
      } else {
        res.status(200).json({
          status: "fail",
          message: "This Followship not found",
        });
      }
    }
  } catch (err) {
    handleError(res, err);
  }
};

export const getAllFollowersAndFollowing = async (req, res) => {
  const { id } = req.query;

  try {
    const followers = (await Followship.find({ followed: id })) || [];
    const following = (await Followship.find({ follower: id })) || [];
    const noOfFollowers = followers.length;
    const noOfFollowing = following.length;

    res.status(200).json({
      status: "success",
      data: { followers, following, noOfFollowers, noOfFollowing },
    });
  } catch (err) {
    handleError(res, err);
  }
};

export const checkFollowing = async (req, res) => {
  const { follwoer, followed } = req.body;
  try {
    const isMatch = await Followship.find({ follwoer, followed });

    res.status(200).json({
      status: "success",
      data: { follow: isMatch.length ? true : false },
    });
  } catch (err) {
    handleError(res, err);
  }
};
