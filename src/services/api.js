import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const getItems = () => axios.get(`${BASE_API_URL}/items`);
export const createItem = (item) => axios.post(`${BASE_API_URL}/items`, item);
export const updateItem = (id, item) => axios.put(`${BASE_API_URL}/items/${id}`, item);
export const deleteItem = (id) => axios.delete(`${BASE_API_URL}/items/${id}`);


export const generateDescription = (itemName) => 
    axios.get(`${BASE_API_URL}/LLM/generate-description`, { params: { itemName } });
