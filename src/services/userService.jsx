import axios from "axios";

const API = "http://localhost:8080/api/auth";

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getUsers = () =>
  axios.get(`${API}/users`, authHeaders());

export const getCurrentUser = () =>
  axios.get(`${API}/user/me`, authHeaders());

export const updateProfile = (formData) =>
  axios.put(`${API}/user/update`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getAdminStats = () =>
  axios.get("http://localhost:8080/api/public/admin/stats", authHeaders());

export const getNotifications = () =>
  axios.get("http://localhost:8080/api/public/notifications", authHeaders());

export const markNotificationsRead = () =>
  axios.patch("http://localhost:8080/api/public/notifications/mark-read", null, authHeaders());

export const clearNotifications = () =>
  axios.delete("http://localhost:8080/api/public/notifications", authHeaders());
