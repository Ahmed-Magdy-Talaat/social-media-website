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
      // console.log(userData);
    };
    fetchData();
  }, []);

  return token ? (
    <div className="w-screen">
      <Topbar />
      <div className="w-98 flex flex-row gap-0 md:flex">
        <div className="md:min-w-[270px] sm:w-0 overflow-x-hidden">
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
