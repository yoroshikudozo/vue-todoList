import axios from "axios";

const endpoint = "http://localhost:3000/todos";

export const fetchTodos = () => axios.get(endpoint);
export const createTodo = todo => axios.post(endpoint, todo);
