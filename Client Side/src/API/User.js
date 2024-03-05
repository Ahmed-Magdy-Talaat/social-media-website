import axios from "axios";
import toast from "react-hot-toast";
import { BaseUrl } from "./BaseUrl";

export const getUserData = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${BaseUrl}/users`, {
      headers: {
        authenication: `${token}`,
      },
    });

    return response.data.user;
  } catch (err) {
    console.error("Error fetching user data:", err);
    throw err;
  }
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${BaseUrl}/users/all`, {
      headers: {
        authenication: `${token}`,
      },
    });

    return response.data.data.users;
  } catch (err) {
    console.error("Error fetching user data:", err);
    throw err;
  }
};

export const getUserById = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${BaseUrl}/users/${id}`, {
      headers: {
        authenication: `${token}`,
      },
    });

    return response.data.user;
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    throw err;
  }
};

export const updateUser = async (values) => {
  const token = localStorage.getItem("token");
  const { Name, photo, bio } = values;
  const user = {
    Name,
    bio,
    photo,
  };
  console.log(values);

  try {
    const response = await axios.put(`${BaseUrl}/users`, user, {
      headers: {
        "Content-Type": "multipart/form-data",
        authenication: `${token}`,
      },
    });

    toast.success("User updated successfully", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    // console.log(response);
  } catch (err) {
    console.error("Error updating user:", err.response?.data);
  }
};
