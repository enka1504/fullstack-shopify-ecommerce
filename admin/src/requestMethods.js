import axios from "axios";
const BASEURL = "http://localhost:5000/api";
// const BASEURL = "https://127.0.0.1:5000/api";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjc2NDliMzkwMTA1OGZkNThhZWUyMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2ODYzMDU5NCwiZXhwIjoxNjY4ODAzMzk0fQ.epr3DXPVtX4nNJr8cYIQt2F5eakuk6xmgHcZTtPdd8I";
const TOKEN = currentUser?.accessToken;
//console.log(TOKEN)
export const publicRequest = axios.create({
  baseURL: BASEURL,
});
export const userRequest = axios.create({
  baseURL: BASEURL,
  headers: { token: `Bearer ${TOKEN}` },
});
