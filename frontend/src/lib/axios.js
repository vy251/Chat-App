const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_URL
    : import.meta.env.VITE_PROD_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL + "/api",
  withCredentials: true,
}); 