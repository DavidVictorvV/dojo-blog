import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, userId };

    setIsPending(true);

    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        body: blog,
      })
      .then(() => {
        console.log("New blog added");
        console.log(blog);
        setIsPending(false);
        // history.go(-1);
        history.push("/");
      });
  };

  return (
    <div className="text-form create">
      <h2>Add a new blog</h2>
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
        {!isPending && <button>Add blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
};

export default Create;
