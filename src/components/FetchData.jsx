import React, { useState, useEffect } from "react";

export default function FetchData({ url, setData, useContent = true }) {
  useEffect(() => {
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
  }, [url, setData, useContent]);

  return null;
}