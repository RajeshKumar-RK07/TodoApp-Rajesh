import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/todo';

export const getTodos = () => axios.get(API_URL);
export const createTodo = (todo) => axios.post(API_URL, todo);
export const updateTodo = (id, todo) => axios.put(`${API_URL}/${id}`, todo);
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
export const searchTodos = (keyword) => axios.get(`${API_URL}/search?keyword=${keyword}`);
export const getByCategory = (category) => axios.get(`${API_URL}/category/${category}`);