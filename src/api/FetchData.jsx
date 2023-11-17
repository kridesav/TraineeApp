import React, { useState, useEffect } from "react";

export default function FetchData({ url, setData, useContent = true }) {
  const [reload, setReload] = useState(false);

  const fetchData = () => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then(response => response.json())
      .then(data => setData(useContent ? data.content : data))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchData();
  }, [url, setData, useContent, reload]);

  return fetchData;
}