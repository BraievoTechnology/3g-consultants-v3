// import axios from "axios";
// const api = axios.create({
//   baseURL: "http://localhost:3000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// export default api;

import axios from "axios";
const api = axios.create({
  baseURL: "https://3g-consultants-v2.vercel.app/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
