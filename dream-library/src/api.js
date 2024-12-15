import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5162/api" // Update to match your backend URL
});

export const getDreams = (userId) => api.get(`/dreams/${userId}`);
export const addDream = (dream) => api.post("/dreams", dream);
export const updateDream = (dreamId, dream) =>
  api.put(`/dreams/${dreamId}`, dream);
export const deleteDream = (dreamId) => api.delete(`/dreams/${dreamId}`);
