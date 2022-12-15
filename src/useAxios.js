import axios from "axios";
import { useState, useEffect } from "react";

const useAxios = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortConst = new AbortController();

    setTimeout(() => {
      axios
        .get(url)
        .then((res) => {
          if (res.status !== 200) {
            throw Error("An error ocurred");
          } else {
            setData(res.data);
            setIsPending(false);
            setError(null);
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setError(err.message);
            setIsPending(false);
          }
        });
    }, 1000);

    return () => abortConst.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useAxios;
