import axios from "axios";

const API = "http://localhost:8080/api/cars";

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// ⚠️  Do NOT set Content-Type here — let the browser set it automatically with
//     the correct multipart boundary. Overriding it manually strips the boundary
//     and makes the server unable to parse the request body.
const multipartAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    // Content-Type is intentionally omitted — axios + FormData handles it
  },
});

export const getCars = () => axios.get(API);
export const getMyCars = () => axios.get(`${API}/my`, authHeaders());
export const createCar = (formData) => axios.post(API, formData, multipartAuthHeaders());
export const updateCar = (id, formData) => axios.put(`${API}/${id}`, formData, multipartAuthHeaders());
export const toggleCarAvailability = (id, available) =>
  axios.patch(`${API}/${id}/availability`, { available }, authHeaders());
export const deleteCar = (id) => axios.delete(`${API}/${id}`, authHeaders());

