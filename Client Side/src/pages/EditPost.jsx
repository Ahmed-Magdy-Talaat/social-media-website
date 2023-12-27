import { getPostById } from "../API/Posts";
import PostForm from "../Components/Forms/PostForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EditPost() {
  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState({
    caption: "",
    imageUrl: "",
    tags: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResult = await getPostById(id);
        // console.log(postResult);
        const { caption, tags, imageUrl } = postResult;
        setPost({ caption, tags: tags.join(","), imageUrl });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);


  return (
    <div className="flex flex-1">
      <div className="common-container ">
        <div className="max-w-5xl flex flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/add-post.svg" width={36} height={37} />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>
        <PostForm initialValues={post} action="update" />
      </div>
    </div>
  );
}

export default EditPost;
