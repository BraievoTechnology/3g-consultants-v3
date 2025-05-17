// import axios from "axios";
// const api = axios.create({
//   baseURL: "http://localhost:3000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// export default api;

/*
import axios from "axios";
const api = axios.create({
  baseURL: "https://3g-consultants-v3-git-main-braievotechnologys-projects.vercel.app/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
*/

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // for Vite projects
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;