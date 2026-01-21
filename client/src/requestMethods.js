import axios from "axios";

const BASEURL = "http://localhost:5000/api";

//const BASEURL = "https://shopping-app-backend.onrender.com/api";
// const BASEURL = "https://127.0.0.1:5000/api";

// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;

//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjc2NDliMzkwMTA1OGZkNThhZWUyMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2Nzk5Mzc0MCwiZXhwIjoxNjY4MTY2NTQwfQ.IKqYsAEY1HYujU-pvT-U9qwjevi3G-nMzF9ysau80zs";

const TOKEN = currentUser?.accessToken;
export const publicRequest = axios.create({
  baseURL: BASEURL,
});

export const userRequest = axios.create({
  baseURL: BASEURL,
  headers: { token: `Bearer ${TOKEN}` },
});
