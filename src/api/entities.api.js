import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

console.log(URL);
const entitiesApi = axios.create({
  baseURL: `${URL}/api`,
});

export const getEntities = () => entitiesApi.get("/entities/");

export const getEntity = (id) => entitiesApi.get(`/entities/${id}/`);

export const createEntity = (entity) => entitiesApi.post("/entities/", entity);

export const updateEntity = (id, entity) => entitiesApi.put(`/entities/${id}/` , entity);

export const deleteEntity = (id) => entitiesApi.delete(`/entities/${id}/`);

export const getTableInfo = (id) => entitiesApi.get(`/table-info/${id}/`);

export const getColumnInfo = (id) => entitiesApi.get(`/column-info/${id}/`);