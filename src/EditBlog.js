import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useAxios from "./useAxios";

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [isPendingL, setIsPending] = useState(true);
  const history = useHistory();

  const {
    data: blog,
    isPending,
    error,
  } = useAxios(`https://jsonplaceholder.typicode.com/posts/${id}`);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setUserId(blog.userId);
      setIsPending(false);
    }
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        body: {
          id: id,
          title: title,
          body: body,
          userId: userId,
        },
      })
      .then(() => {
        console.log("Blog has been edited");
        setIsPending(false);
        history.push("/");
      });
  };

  return (
    <div className="edit text-form">
      {error && <div>{error}</div>}
      <h2>Edit blog:</h2>
      {isPending && <div>Getting data...</div>}
      {!isPending && (
        <form onSubmit={handleSubmit}>
          <label>Blog title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <label>Blog body:</label>

          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <label>Blog userId:</label>
          <input
            type="text"
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          ></input>

          {!isPendingL && <button>Edit blog</button>}
          {isPendingL && <button disabled>Saving blog...</button>}
        </form>
      )}
    </div>
  );
};

export default EditBlog;
