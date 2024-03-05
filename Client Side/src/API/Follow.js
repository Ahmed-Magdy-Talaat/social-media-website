import axios from "axios";
import toast from "react-hot-toast";
import { BaseUrl } from "./BaseUrl.js";

// Retrieve all followers and following for a given user
export const getAllFollowersAndFollowing = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${BaseUrl}/follow/?id=${id}`, {
      headers: {
        authenication: `${token}`,
      },
    });

    return response.data.data;
  } catch (err) {
    // Log the error message if available
    console.log(err.response?.message);
  }
};

// Check if a user is following another user
export const checkFollow = async (followerId, followedId) => {
  const token = localStorage.getItem("token");
  const data = { follower: followerId, followed: followedId };

  try {
    const response = await axios.post(`${BaseUrl}/follow/check`, data, {
      headers: {
        authenication: `${token}`,
      },
    });

    return response.data.data.follow;
  } catch (err) {
    // Log the error message if available
    console.log(err.response?.message);
    return false;
  }
};

// Handle the follow operation
export const handleFollow = async (followerId, followedId) => {
  const token = localStorage.getItem("token");
  const data = { follower: followerId, followed: followedId };

  try {
    const response = await axios.post(`${BaseUrl}/follow`, data, {
      headers: {
        authenication: `${token}`,
      },
    });

    // Display a success toast with the response message
    toast.success(response.data.data.message, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    return response.data.data.follow;
  } catch (err) {
    console.log(err.response?.message);
    return false;
  }
};
