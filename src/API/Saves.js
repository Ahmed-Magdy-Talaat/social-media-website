import axios from "axios";
import toast from "react-hot-toast";
import { BaseUrl } from "./BaseUrl";

export const updateSavedPost = async (postId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${BaseUrl}/saves/?id=${postId}`,
      {},
      {
        headers: {
          authorization: `${token}`,
        },
      }
    );

    console.log(response.data.data);

    toast.success(response.data.data.message, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } catch (err) {
    console.error(err.response?.data?.message || "An error occurred");
  }
};

export const getSaves = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${BaseUrl}/saves`, {
      headers: {
        authorization: `${token}`,
      },
    });

    // console.log(response.data.data.posts);
    return response.data.data.posts;
  } catch (err) {
    console.error(err.response?.data?.message || "An error occurred");
    return [];
  }
};
