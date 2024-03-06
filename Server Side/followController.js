import Followship from "../Models/Followship.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const handleFollower = asyncHandler(async (req, res) => {
  const { follower, followed } = req.body;

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
});

export const getAllFollowersAndFollowing = asyncHandler(
  async (req, res, next) => {
    const { id } = req.query;

    const followers = (await Followship.find({ followed: id })) || [];
    const following = (await Followship.find({ follower: id })) || [];
    const noOfFollowers = followers.length;
    const noOfFollowing = following.length;

    res.status(200).json({
      status: "success",
      data: { followers, following, noOfFollowers, noOfFollowing },
    });
  }
);

export const checkFollowing = asyncHandler(async (req, res, next) => {
  const { follower, followed } = req.body;
  const isMatch = await Followship.findOne({ follower, followed });
  console.log(isMatch);
  res.status(200).json({
    status: "success",
    data: { follow: isMatch ? true : false },
  });
});
