import PostForm from "../Components/Forms/PostForm";

function CreatePost() {
  const post = {
    caption: "",
    tags: "",
    photo: null,
    image: {},
  };
  return (
    <div className="flex flex-1">
      <div className="common-container ">
        <div className="max-w-5xl flex flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/gallery-add.svg" width={36} height={37} />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>
        <PostForm initialValues={post} action="create" />
      </div>
    </div>
  );
}

export default CreatePost;
