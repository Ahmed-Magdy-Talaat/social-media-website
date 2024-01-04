import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../Contexts/User/UserContext";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { useCallback, useContext, useEffect, useState } from "react";
import { updateUser } from "../API/User";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [file, setFile] = useState([]);

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required("Caption is required"),
  });

  const initialValues = {
    photo: null,
    Name: user.Name,
    userName: user.userName,
    email: user.email,
    bio: user.bio || "",
    imageUrl: user.imageUrl,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await updateUser(values);
      navigate(`/profile/${user._id}`);
      window.location.reload();
    },
  });

  if (!user) {
    return (
      <div className="flex-center w-full h-full">
        <p>loading ...</p>
      </div>
    );
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      formik.setFieldValue("photo", acceptedFiles[0]);
      formik.setFieldValue("imageUrl", URL.createObjectURL(acceptedFiles[0]));
    },
    [file, formik]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className=""
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          initialValues={initialValues}
          className="flex flex-col gap-7 w-full mt-4 max-w-5xl"
        >
          <div className="flex flex-row gap-5 items-center">
            <div {...getRootProps()}>
              <input className="cursor-pointer" {...getInputProps()} />
              <img
                src={
                  formik.values.imageUrl ||
                  `/assets/icons/profile-placeholder.svg`
                }
                width={80}
                alt="photo"
                className="rounded-full"
              />
            </div>
            <div className="h3 md:h2 text-lg"> Add Profile Picture</div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="shad-form_label text-xl" htmlFor="name">
              Name
            </label>
            <input
              id="Name"
              name="Name"
              className=" bg-dark-2  px-3 focus:outline-none shad-input rounded-lg custom-scrollbar"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Name}
            />
            {formik.touched.Name && formik.errors.Name && (
              <div className="text-center text-violet-500">
                {formik.errors.Name}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="shad-form_label text-xl" htmlFor="userName">
              username
            </label>
            <input
              id="userName"
              name="userName"
              className=" bg-dark-2 text-light-3 py-2 px-3 focus:outline-none shad-input rounded-lg custom-scrollbar"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              disabled
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="shad-form_label text-xl" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              className=" bg-dark-2 text-light-3  rounded-lg py-5 px-3 focus:outline-none shad-input custom-scrollbar"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              disabled
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-center text-violet-500">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xl shad-form_label" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className=" bg-dark-2 py-5 px-3 focus:outline-none shad-textarea custom-scrollbar"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bio}
            />
            {formik.touched.bio && formik.errors.bio && (
              <div className="text-center text-violet-500">
                {formik.errors.bio}
              </div>
            )}
          </div>

          <div className="flex gap-4 items-center justify-end">
            <button
              type="button"
              className="bg-dark-3  whitespace-nowrap text-xl py-2 px-3 rounded-lg"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="shad-button_primary whitespace-nowrap text-lg py-2 px-3 rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
