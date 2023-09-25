import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Send a request to check the username and password
    // against the database.
    const response = await fetch(
      "https://cloud-kitchen-9d689-default-rtdb.firebaseio.com/Login.json"
    );

    const data = await response.json();

    if (data[username] === password) {
      onLogin(username);
    } else {
      // Handle failed login here.
      console.log("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
