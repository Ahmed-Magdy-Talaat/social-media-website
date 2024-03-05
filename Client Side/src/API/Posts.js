import axios from "axios";
import toast from "react-hot-toast";
import { BaseUrl } from "./BaseUrl.js";

export const createPost = async (values) => {
  const token = localStorage.getItem("token");
  console.log(values);
  try {
    await axios.post(`${BaseUrl}/posts`, values, {
      headers: {
        authenication: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Post created successfully", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } catch (err) {
    console.log(err.response?.data);
  }
};

export const updatePost = async (values, postId) => {
  const token = localStorage.getItem("token");

  try {
    await axios.put(`${BaseUrl}/posts/${postId}`, values, {
      headers: {
        authenication: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Post updated successfully", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } catch (err) {
    console.log(err.response?.data);
  }
};

export const getAllPosts = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${BaseUrl}/posts/`, {
      headers: {
        authenication: `${token}`,
      },
    });

    return response.data.data.posts;
  } catch (err) {
    console.log(err.response?.data);
  }
};

export const postLike = async (id) => {
  const token = localStorage.getItem("token");

  try {
    await axios.patch(
      `${BaseUrl}/posts/?id=${id}`,
      {},
      {
        headers: {
          authenication: `${token}`,
        },
      }
    );
  } catch (err) {
    console.log(err.response?.data);
  }
};

export const getPostById = async (postId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${BaseUrl}/posts/search/?id=${postId}`, {
      headers: {
        authenication: `${token}`,
      },
    });

    return response.data.data.post;
  } catch (err) {
    console.log(err.response?.data);
  }
};

export const deletePost = async (postId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(`${BaseUrl}/posts/${postId}`, {
      headers: {
        authenication: `${token}`,
      },
    });

    console.log(response.data); // Log the response for debugging
    toast.success(response.data.data.message, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } catch (err) {
    console.error(err.response?.data.message); // Log the error message
    toast.error("Error deleting post", {
      style: {
        borderRadius: "10px",
        background: "#ff3333",
        color: "#fff",
      },
    });
  }
};

export const getPostsForUser = async (userId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${BaseUrl}/posts/user/?userId=${userId}`,
      {
        headers: {
          authenication: `${token}`,
        },
      }
    );

    return response.data.data.posts;
  } catch (err) {
    console.log(err.response?.data);
  }
};
