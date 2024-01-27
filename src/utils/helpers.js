import axios from "axios";

export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
  }

  return ["all", ...new Set(unique)];
};

const axiosInstance = axios.create();
const TOKEN_KEY = "token";

axiosInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return request;
});
export default axiosInstance;
