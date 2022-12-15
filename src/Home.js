import BlogList from "./BlogList";
import useAxios from "./useAxios";

const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useAxios("https://jsonplaceholder.typicode.com/posts");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs!" />}
      {isPending && <div>Loading...</div>}
    </div>
  );
};

export default Home;
