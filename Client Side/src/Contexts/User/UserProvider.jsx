import { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  //

  const [user, setUser] = useState({
    Name: "",
    userName: "",
    email: "",
    password: "",
    imageUrl: "",
    imageId: "",
    bio: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
