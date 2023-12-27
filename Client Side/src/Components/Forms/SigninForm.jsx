import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import UserContext from "../../Contexts/User/UserContext";
import { BaseUrl } from "../../API/BaseUrl";

function SigninForm() {
  //

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a Valid Email")
      .required("This field is required"),
  });

  const signIn = async (values) => {
    try {
      const response = await axios.post(`${BaseUrl}/auth/login`, values);
      toast.success("User login successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      //
      // console.log(response.data.data.user);
      localStorage.setItem("token", response.data.data.token);
      const token = localStorage.getItem("token");
      setUser(response.data.data.user);
      if (token !== null) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: signIn,
  });

  return (
    <>
      <div className="sm:w-420 flex-center flex-col">
        <img src="assets/images/logo.svg" />
        <h3 className="h3-bold md:h2-bold sm:pt-5">Log in your account</h3>
        <p>Please Enter your Email and Password</p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col mt-4 items-center  md:w-1/2 sm:w-3/4 gap-1"
      >
        <div className="flex flex-col gap-1 justify-center  w-full ">
          <label className="font-bold text-base" htmlFor="Name">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="px-3 py-1 rounded focus:outline-none bg-slate-900"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-sm text-slate-500" role="alert">
              {formik.errors.email}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 justify-center  w-full ">
          <label className="font-bold text-base" htmlFor="Name">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="px-3 py-1 rounded focus:outline-none bg-slate-900"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="text-sm text-slate-500" role="alert">
              {formik.errors.password}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-3/4 rounded"
        >
          Sign in
        </button>

        <p className="text-sm pt-1">
          Create new account ?
          <span
            className=" text-blue-500 cursor-pointer"
            onClick={() => navigate("/sign-up")}
          >
            {" "}
            Sign up
          </span>
        </p>
      </form>
    </>
  );
}

export default SigninForm;
