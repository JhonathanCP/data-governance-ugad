import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

console.log(URL);
const entitiesApi = axios.create({
  baseURL: `${URL}/api/entities`,
});

export const getEntities = () => entitiesApi.get("/");

export const getEntity = (id) => entitiesApi.get(`/${id}/`);

export const createEntity = (entity) => entitiesApi.post("/", entity);

export const updateEntity = (id, entity) => entitiesApi.put(`/${id}/` , entity);

export const deleteEntity = (id) => entitiesApi.delete(`/${id}/`);

export const getTableInfo = () => entitiesApi.get("/table-info/");

export const getColumnInfo = () => entitiesApi.get("/column-info/");