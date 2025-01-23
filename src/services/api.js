import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/items';


export const getItems = () => axios.get(API_URL);
export const createItem = (item) => axios.post(API_URL, item);
export const updateItem = (id, item) => axios.put(`${API_URL}/${id}`, item);
export const deleteItem = (id) => axios.delete(`${API_URL}/${id}`);
