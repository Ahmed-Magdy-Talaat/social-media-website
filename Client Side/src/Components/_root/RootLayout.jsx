import Topbar from "./shared/Topbar";
import LeftSidebar from "./shared/LeftSidebar";
import { Navigate, Outlet } from "react-router-dom";
import BottomBar from "./shared/BottomBar";
import { getUserData } from "../../API/User";
import { useContext, useEffect } from "react";
import UserContext from "../../Contexts/User/UserContext";

function RootLayout() {
  const { setUser, user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      setUser(userData);
      console.log(userData);
    };
    if (token) {
      fetchData();
    }
  }, [token, setUser]);

  return token ? (
    <div className=" w-98 overflow-x-hidden">
      <Topbar />
      <div className="w-full flex flex-row gap-0 md:flex overflow-x-hidden">
        <div className="md:min-w-[270px] sm:w-0">
          <LeftSidebar />
        </div>
        <div className="flex flex-1 h-full mb-10 overflow-x-hidden">
          <Outlet />
        </div>
        <BottomBar />
      </div>
    </div>
  ) : (
    <Navigate to="/sign-in" />
  );
}

export default RootLayout;
