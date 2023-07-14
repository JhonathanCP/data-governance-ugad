import axios from "axios";

const URL =
    process.env.NODE_ENV === "production"
        ? import.meta.env.VITE_BACKEND_URL
        : "http://localhost:8000";

console.log(URL);
const processesApi = axios.create({
    baseURL: `${URL}/api`,
});

export const getProcesses = () => processesApi.get("/processes/");

export const getProcess = (id) => processesApi.get(`/processes/${id}/`);

export const createProcess = (process) => processesApi.post("/processes/", process);

export const updateProcess = (id, process) => processesApi.patch(`/processes/${id}/` , process);

export const deleteProcess = (id) => processesApi.delete(`/processes/${id}/`);

export const addEntryTable = (id, table) => processesApi.patch(`/add-inputTable/${id}/`, table);

export const removeEntryTable = (id, table) => processesApi.patch(`/remove-inputTable/${id}/`, table);

export const addOutputTable = (id, table) => processesApi.patch(`/add-outputTable/${id}/`, table);

export const removeOutputTable = (id, table) => processesApi.patch(`/remove-outputTable/${id}/`, table);