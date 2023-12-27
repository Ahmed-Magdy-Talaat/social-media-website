import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      {localStorage.getItem("token") !== null ? (
        <Navigate to="/" />
      ) : (
        <>
          <div className="flex flex-row">
            <section className="flex flex-1 justify-center flex-col items-center py-5">
              <Outlet />
            </section>
            <div className="w-1/2 hidden xl:block">
              <img
                src="/assets/images/side-img.svg"
                className=" w-full  object-cover h-screen bg-no-repeat"
              ></img>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AuthLayout;
