import React, { useState, useEffect } from "react";
import { Button } from "./Button";

export function BlogList() {
  const [data, setData] = useState(null);
  const [addedPosts, setAddedPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const storedPosts = localStorage.getItem("addedPosts");
    if (storedPosts) {
      setAddedPosts(JSON.parse(storedPosts));
    }
  }, []);

  const addData = () => {
    const newPost = {
      title: title,
      content: content,
    };
    setAddedPosts((prevPosts) => [...prevPosts, newPost]);
    localStorage.setItem("addedPosts", JSON.stringify([...addedPosts, newPost]));
    alert("Post added succesfully");
  };
  const deleteTask = (index) => {
    alert("Delete succesfully");
    const newAddedPosts = [...addedPosts];
    newAddedPosts.splice(index, 1);
    setAddedPosts(newAddedPosts);
    localStorage.setItem("addedPosts", JSON.stringify(newAddedPosts));
  };
  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((products) => setData(products.posts))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return <div style={{ textAlign: "left" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "0px 20px" }}>
      <h1
        style={{
          textAlign: "left",
          paddingBottom: "20px",
          borderBottom: "1px solid rgb(220,220,220)",
        }}
      >
        My Blog
      </h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          paddingBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Masukkan judul artikel"
          style={{
            padding: "15px",
            borderRadius: "4px",
            border: "1px solid rgb(220,220,220)",
          }}
          id="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="textarea"
          placeholder="Masukkan konten artikel"
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid rgb(220,220,220)",
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <Button
          text="Add post"
          color="white"
          bgcolor="rgb(59 130 246)"
          border="none"
          padding="10px"
          width="100%"
          bdradius="6px"
          onClick={addData}
        />
      </form>
      <hr />
      {Array.isArray(addedPosts) && (
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "20px",
            paddingTop: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {addedPosts.map((post, index) => (
            <div
              key={index}
              style={{
                border: "2px solid rgb(220,220,220)",
                width: "30%",
                textAlign: "left",
                padding: "10px",
              }}
            >
              <h3>{post.title}</h3>
              <button
                key={index}
                style={{
                  backgroundColor: "white",
                  border: "2px solid rgb(220,220,220)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                }}
              >
                Default
              </button>
              <hr />
              <p>{post.content}</p>
              <hr />
              <div style={{ display: "flex", gap: "4px" }}>
                <span>Dilihat: </span>
                <span>Disukai:</span>
                <span>Tidak Disukai:</span>
                <button
                  onClick={() => deleteTask(index)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "20px",
          paddingTop: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[...data].map((item, index) => (
          <div
            key={index}
            style={{
              border: "2px solid rgb(220,220,220)",
              width: "30%",
              textAlign: "left",
              padding: "10px",
            }}
          >
            <h3>{item.title}</h3>
            {item.tags && (
              <div style={{ display: "flex", gap: "8px" }}>
                {item.tags.map((tag, index) => (
                  <button
                    key={index}
                    style={{
                      backgroundColor: "white",
                      border: "2px solid rgb(220,220,220)",
                      borderRadius: "4px",
                      padding: "4px 8px",
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
            <hr />
            <p>{item.body}</p>
            <hr />
            <div style={{ display: "flex", gap: "4px" }}>
              <span>Dilihat: {item.views}</span>
              <span>Disukai: {item.likes}</span>
              <span>Tidak Disukai: {item.dislikes}</span>
              <button
                onClick={() => deleteTask(index)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
