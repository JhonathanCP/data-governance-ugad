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

export const getEntitiesByName = (name) => entitiesApi.get(`/entity-by-name/${name}/`);

export const getEntitiesByType = (id) => entitiesApi.get(`/entities-by-type/${id}/`);

export const getEntitiesByClassification = (id) => entitiesApi.get(`/entities-by-classification/${id}/`);

export const getEntity = (id) => entitiesApi.get(`/entities/${id}/`);

export const createEntity = (entity) => entitiesApi.post("/entities/", entity);

export const updateEntity = (id, entity) => entitiesApi.patch(`/entities/${id}/` , entity);

export const deleteEntity = (id) => entitiesApi.delete(`/entities/${id}/`);

export const getTableInfo = (id) => entitiesApi.get(`/table-info/${id}/`);

export const getColumnInfo = (id) => entitiesApi.get(`/column-info/${id}/`);

export const addClassification = (id, classification) => entitiesApi.patch(`/add-classification/${id}/`, classification);

export const removeClassification = (id, classification) => entitiesApi.patch(`/remove-classification/${id}/`, classification);