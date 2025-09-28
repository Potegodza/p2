import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const currentUser = async (token) => await axios.post(`${API_URL}/api/current-user`, {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const currentAdmin = async (token) => {
    return await axios.post(`${API_URL}/api/current-admin`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}