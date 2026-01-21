import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();
    login(dispatch, { username, password });
    history.push("/");
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <input
        style={{ marginBottom: "20px", padding: "10px" }}
        placeholder="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        style={{ marginBottom: "20px", padding: "10px" }}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleClick}
        style={{ padding: "10px", width: "10%", cursor: "pointer" }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
