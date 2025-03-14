import axios from "axios"

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem("token")
      window.location.href = "/admin"
    }
    return Promise.reject(error)
  },
)

// API methods
export const fetchBasicInfo = () => api.get("/basic-info")
export const fetchSkills = () => api.get("/skills")
export const fetchProjects = () => api.get("/projects")
export const fetchServices = () => api.get("/services")
export const fetchTimeline = () => api.get("/timeline")
export const fetchTranslations = () => api.get("/translations")

// Admin API methods
export const login = (credentials) => api.post("/auth/login", credentials)
export const updateBasicInfo = (data) => api.put("/basic-info", data)
export const createSkill = (data) => api.post("/skills", data)
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data)
export const deleteSkill = (id) => api.delete(`/skills/${id}`)
export const createProject = (data) => api.post("/projects", data)
export const updateProject = (id, data) => api.put(`/projects/${id}`, data)
export const deleteProject = (id) => api.delete(`/projects/${id}`)

export default api

