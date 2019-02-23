import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.credentials),
    signup: credentials =>
      axios.post("/api/users", { credentials }).then(res => res.data.credentials)
  },
  news: {
    fetchAll: () => axios.get("/api/v1/getitems").then(res => res.data),
    create: (userrating, guidObject) => axios.post("/api/v1/getitems/"+guidObject, userrating ).then(res => res.data),
    fetchBestItems: () => axios.get("/api/v1/getitems/bestrated").then(res => res.data)

  }
};
