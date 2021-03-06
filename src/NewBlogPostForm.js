import React from "react";
import axios from "axios";
import { useState } from "react";

import { Link, useHistory } from "react-router-dom";

axios.defaults.headers.common = {
  "Content-Type": "application/json",
};

export default function NewBlogPostForms() {
  const history = useHistory();
  console.log(history);
  const [newPost, setNewPost] = useState();
  const [token, setToken] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const handleChange = (e) => {
    console.log(
      `Changing newPost.${e.target.name} value to: ${e.target.value}`
    );
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };
  const handleToken = (e) => {
    setToken(e.target.value);
    console.log(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://expressful-blog-backend.herokuapp.com/blogPosts/create",
        newPost,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.status === 401) {
          console.log("Invalid credentials! Couldn't create new blogpost");
          alert("Invalid credentials. No post created");
        } else {
          setIsSuccess(true);
          setIsCreated(true);
          // <Link to={`/article/${res.data[0].content_id}`}>Click</Link>;
          console.log("Successfully created a new blogpost!");
        }
      })
      .catch((error) => {
        console.log("Invalid credentials! Couldn't create new blogpost");
        alert("Invalid credentials. No post created");

        console.error(error);
      });
  };

  return (
    <div className=" d-flex flex-row justify-content-center mt-5 ">
      {isSuccess && (
        <>
          <img
            src="https://i.giphy.com/media/3oz8xYfQd5358zpL0s/giphy.webp"
            alt="creation"
          ></img>
          <Link>Click here to see your post</Link>
        </>
      )}

      {!isCreated && (
        <form onSubmit={handleSubmit} className="d-flex flex-column  w-50">
          <div className="input-group justify-content-center mb-3 w-50">
            <label className="input-group-text " id="basic-addon1" for="tken">
              Optimist Token
            </label>
            <input
              onChange={handleToken}
              type="text"
              name="token"
              class="form-control"
              placeholder="Are you an optimist?"
              aria-label="title"
              aria-describedby="basic-addon1"
            />
          </div>
          <h5>Create a new post!</h5>
          <div className="input-group mb-3">
            <label className="input-group-text " id="basic-addon1" for="title">
              Title
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="title"
              class="form-control"
              placeholder="Insert a title"
              aria-label="title"
              aria-describedby="basic-addon1"
            />
          </div>

          <div class="input-group mb-3">
            <label
              className="input-group-text"
              id="basic-addon1"
              for="mediaUrl"
            >
              Media Url
            </label>
            <input
              onChange={handleChange}
              name="media_url"
              type="text"
              class="form-control"
              placeholder="Paste media url"
              aria-label="Media Url"
              aria-describedby="basic-addon2"
            />
          </div>

          <div className="input-group mb-3">
            <label className="input-group-text " id="basic-addon1" for="author">
              Author's Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="author"
              class="form-control"
              placeholder="Insert the author name"
              aria-label="title"
              aria-describedby="basic-addon1"
            />
          </div>

          <div class="input-group mb-3">
            <label className="input-group-text" for="tags">
              Choose available tags
            </label>
            <select onChange={handleChange} id="tags" name="tags">
              <option value="energy">energy</option>
              <option value="environment">environment</option>
              <option value="gender">gender</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text " id="basic-addon1" for="title">
              Source News
            </label>
            <input
              onChange={handleChange}
              type="url"
              name="source_url"
              class="form-control"
              placeholder="Insert a source news url"
              aria-label="title"
              aria-describedby="basic-addon1"
            />
          </div>

          <div class="input-group">
            <span class="input-group-text">Post Content</span>
            <textarea
              onChange={handleChange}
              name="body"
              class="form-control"
              rows="10"
              aria-label="Post Content"
            ></textarea>
          </div>

          <div>
            <button class="btn btn-outline-primary mt-4">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
}
