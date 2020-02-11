import axios from "axios";

const endpoint = "http://localhost:3000/todos";

export const fetchTodos = () => axios.get(endpoint);
export const createTodo = todo => axios.post(endpoint, todo);
export const deleteTodo = id => axios.delete(`${endpoint}/${id}`);
export const deleteTodos = async ids => {
  for (const id of ids) {
    await deleteTodo(id);
  }
};
