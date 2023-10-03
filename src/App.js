import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const loginAPI = "https://darkshot-server.onrender.com/api/user/login";
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(loginAPI, {
      method: "post",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          alert("Cookie set");
        } else {
          // Handle invalid credentials or other errors
          alert(data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.log({ error: error.message });
      });
  };
  return (
    <>
      <div>
        <p>Login</p>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={username || ""}
            onChange={handleUsername}
          />
          <br />
          <input
            type="password"
            placeholder="Enter password"
            value={password || ""}
            onChange={handlePassword}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default App;
