import React, { useState, useEffect, useCallback, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { createPost, updatePost } from "../../API/Posts";
import UserContext from "../../Contexts/User/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const PostForm = ({ initialValues, action }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [act] = useState(action);
  const { user } = useContext(UserContext);
  const [pictUrl, setPictUrl] = useState(initialValues.imageUrl);
  const [file, setFile] = useState([]);

  const validationSchema = Yup.object().shape({
    caption: Yup.string().required("Caption is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      caption: initialValues.caption || "",
      imageUrl: initialValues.imageUrl,
      photo: initialValues.photo || null,
      bio: initialValues.bio || "",
      tags: initialValues.tags || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const tagsArray = values.tags.split(",").map((tag) => tag.trim());
      const formData = new FormData();
      formData.append("caption", values.caption);
      formData.append("tags",tagsArray||[]);
      formData.append("photo", values.photo);
      formData.append("bio", values.bio);
      formData.append("creator", user?._id);
      formData.append("_id", id);
      if (act === "create") {
        await createPost(formData);
      } else {
        await updatePost(formData, id);
      }
      navigate("/");
    },
  });

  const onDrop = useCallback(
    (acceptedFiles, fileRejections, event) => {
      setFile(acceptedFiles);
      formik.setFieldValue("photo", acceptedFiles[0]);
      formik.setFieldValue("imageUrl", URL.createObjectURL(acceptedFiles[0]));
    },
    [formik]
  );

  useEffect(() => {
    setPictUrl(formik.values.imageUrl);
  }, [formik.values.imageUrl]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".jpg, .jpeg, .png, .svg", // Specify accepted file types
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="flex flex-col gap-5">
        <label className="h4-bold md:h3-bold text-lg" htmlFor="caption">
          Caption
        </label>
        <textarea
          id="caption"
          name="caption"
          className="bg-dark-2 py-5 px-3 focus:outline-none shad-textarea custom-scrollbar"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.caption}
        />
        {formik.touched.caption && formik.errors.caption && (
          <div className="text-center text-violet-500">
            {formik.errors.caption}
          </div>
        )}
      </div>

      <div className="h4-bold md:h3-bold text-lg my-5">Add Picture </div>
      <div className="bg-dark-2 flex flex-col cursor-pointer rounded-lg my-5">
        <div {...getRootProps()}>
          <div>
            <input className="cursor-pointer" {...getInputProps()} />
            {pictUrl ? (
              <div>
                <div className="flex flex-1 justify-center p-5 lg:p-12 w-full">
                  <img src={pictUrl} alt="photo" />
                </div>
                <p className="file_uploader-label">
                  Click or Drag photo to replace
                </p>
              </div>
            ) : (
              <div className="file_uploader-box">
                <img
                  src="/assets/icons/file-upload.svg"
                  width={96}
                  height={77}
                  alt="file-upload"
                />
                <h3 className="text-light-2 base-medium mt-4">
                  Drag photo here
                </h3>
                <p className="text-light-4 small-regular mb-6">SVG, PNJ, JPG</p>

                <button
                  type="button"
                  className="shad-button_dark_4 flex flex-col justify-center items-center rounded-lg"
                >
                  Select from device
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <label className="h4-bold md:h3-bold text-lg" htmlFor="tags">
          Tags{" "}
          <span className="text-sm mx-3"> ( each tag separated by , )</span>
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          placeholder="ex: adventure, travel"
          className="bg-dark-2 py-3 px-3 focus:outline-none rounded-lg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.tags}
        />
        {formik.touched.tags && formik.errors.tags && (
          <div>{formik.errors.tags}</div>
        )}
      </div>

      <div className="flex flex-row gap-5 mt-5 mb-14 justify-end items-center ">
        <button
          type="submit"
          className="shad-button_primary whitespace-nowrap text-lg py-2 px-3 rounded-lg"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="shad_button_dark_4 bg-dark-2 py-2 px-3 text-lg rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;
