import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

console.log(URL);
const classificationsApi = axios.create({
  baseURL: `${URL}/api/classifications`,
});

export const getClassifications = () => classificationsApi.get("/");

export const getClassification = (id) => classificationsApi.get(`/${id}/`);

export const createClassification = (classification) => classificationsApi.post("/", classification);

export const updateClassification = (id, classification) => classificationsApi.patch(`/${id}/` , classification);

export const deleteClassification = (id) => classificationsApi.delete(`/${id}/`);