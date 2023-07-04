import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

console.log(URL);
const entityTypesApi = axios.create({
  baseURL: `${URL}/api/entitytypes`,
  
});

export const getEntityTypes = () => entityTypesApi.get("/");

export const getEntityType = (id) => entityTypesApi.get(`/${id}/`);

export const createEntityType = (entityType) => entityTypesApi.post("/", entityType);

export const updateEntityType = (id, entityType) => entityTypesApi.patch(`/${id}/` , entityType);

export const deleteEntityType = (id) => entityTypesApi.delete(`/${id}/`);