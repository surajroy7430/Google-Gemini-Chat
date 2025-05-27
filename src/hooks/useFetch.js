import { useCallback, useState } from "react";
import axios from "axios";

const useFetch = (url, options = {}) => {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  let fetchData = useCallback(
    async (body = null) => {
      setLoading(true);
      setError(null);

      for (let i = 0; i < 2; i++) {
        // retry logic
        try {
          let res = await axios({
            url,
            method: options.method || "POST",
            headers: {
              "Content-Type": "application/json",
              ...(options.headers || {}),
            },
            data: body || null,
            ...options,
          });

          setData(res.data);
          return res.data;
        } catch (error) {
          setError(error.message);
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      }
    },
    [url, options]
  );
  return { fetchData, data, loading, error };
};

export default useFetch;
