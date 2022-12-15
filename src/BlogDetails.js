import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import useAxios from "./useAxios";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  const {
    data: blog,
    isPending,
    error,
  } = useAxios(`https://jsonplaceholder.typicode.com/posts/${id}`);

  const handleClick = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${blog.id}`)
      .then(() => {
        history.push("/");
      });
    console.log(`Blog has been deleted (id: ${id})`);
  };

  const editClick = () => {
    history.push(`/edit/${blog.id}`);
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by user with id: {blog.userId}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>Delete</button>
          <button className="edit-btn" onClick={editClick}>
            Edit
          </button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
