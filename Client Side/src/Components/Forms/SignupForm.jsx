import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BaseUrl } from "../../API/BaseUrl";

function SignupForm() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [isLoading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    Name: Yup.string()
      .min(3, "Your Name must be at least 3 chracters")
      .required("This field is required"),
    userName: Yup.string()
      .min(3, "Your User Name must be at least 3 chracters")
      .required("This field is required "),
    email: Yup.string()
      .email("Enter a Valid Email")
      .required("This field is required"),

    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        "Password ahould contain at least one uppercase and lowercase character"
      )
      .matches(/\d/, "Password should contain at least one number")
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        "Password should contain at least one special character"
      ),
  });

  async function signUp(values) {
    console.log("hello");
    setLoading(true);

    try {
      const response = await axios.post(`${BaseUrl}/auth/register`, values);
      toast.success("Email Created Successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        }, // Corrected this line
      });

      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      Name: "",
      userName: "",
      email: "",
      password: "",
      imageUrl: "",
      imageId: "",
      bio: "",
      saves: [],
    },
    validationSchema,
    onSubmit: (values) => signUp(values),
  });

  return (
    <>
      <div>{msg}</div>
      <div className="sm:w-420 flex-center flex-col">
        <img src="assets/images/logo.svg" className="w-100 " />
        <h3 className="h3-bold md:h2-bold sm:pt-5">Create new account</h3>
        <p>To use Snapgram, please enter your details</p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col mt-4 items-center  md:w-1/2 sm:w-3/4 gap-1"
      >
        <div className="flex flex-col gap-1 justify-center  w-full ">
          <label className="font-bold text-base" htmlFor="Name">
            Name
          </label>
          <input
            type="text"
            name="Name"
            className="px-3 py-1 rounded focus:outline-none bg-slate-900"
            value={formik.values.Name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.Name && formik.touched.Name && (
            <div className="text-sm text-slate-500" role="alert">
              {formik.errors.Name}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 justify-center  w-full ">
          <label className="font-bold text-base" htmlFor="userName">
            Username
          </label>
          <input
            type="text"
            name="userName"
            className="px-3 py-1 rounded focus:outline-none bg-slate-900"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.userName && formik.touched.userName && (
            <div className="text-sm text-slate-500" role="alert">
              {formik.errors.userName}
            </div>
          )}
        </div>

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
        {!isLoading ? (
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-3/4 rounded">
            Sign Up
          </button>
        ) : (
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-3/4 rounded"
          >
            Loading...
          </button>
        )}
        <p className="text-sm pt-1">
          Already have an account ?
          <span
            className=" text-blue-500 cursor-pointer"
            onClick={() => navigate("/sign-in")}
          >
            {" "}
            Log in
          </span>
        </p>
      </form>
    </>
  );
}

export default SignupForm;
