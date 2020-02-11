<template>
  <div class="todoList">
    <h2>Todos</h2>
    <div class="todoInput">
      <input
        type="text"
        placeholder="input your task..."
        v-model.trim="inputText"
      />
      <button @click="addTodo">Add</button>
    </div>
    <ul v-if="selectedTodos.length">
      <li v-for="todo in selectedTodos" :key="todo.id">
        <span :class="{ done: todo.done }" @click="handleClick(todo.id)">{{
          todo.text
        }}</span>
      </li>
    </ul>
    <div v-else>
      <p v-if="selected === 'all'">Oh, it seems you have no tasks now.</p>
      <p v-if="selected === 'undone'">
        Wow! You have done all tasks! Congrats!
      </p>
      <p v-if="selected === 'done'">Hmm... You should start some tasks.</p>
    </div>
    <div v-if="doneTodoLength">
      <button @click="deleteTodo">
        Delete done todo{{ doneTodoLength > 1 ? "s" : "" }}.
      </button>
    </div>
    <dl v-if="selected === 'all'">
      <dt>All todos:</dt>
      <dd>{{ todoLength }}</dd>
    </dl>
    <dl v-if="selected === 'undone'">
      <dt>Undone todos:</dt>
      <dd>{{ undoneTodoLength }}</dd>
    </dl>
    <dl v-if="selected === 'done'">
      <dt>done todos:</dt>
      <dd>{{ doneTodoLength }}</dd>
    </dl>
    <ul class="filter-button">
      <li><button @click="visibilityFilter('all')">all</button></li>
      <li><button @click="visibilityFilter('done')">done</button></li>
      <li><button @click="visibilityFilter('undone')">undone</button></li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TodoList",
  data() {
    return {
      inputText: "",
      selected: "all",
      todos: []
    };
  },
  computed: {
    todoLength() {
      return this.todos.length;
    },
    doneTodos() {
      return this.todos.filter(todo => todo.done);
    },
    undoneTodos() {
      return this.todos.filter(todo => !todo.done);
    },
    doneTodoLength() {
      return this.doneTodos.length;
    },
    undoneTodoLength() {
      return this.undoneTodos.length;
    },
    selectedTodos() {
      switch (this.selected) {
        case "undone":
          return this.undoneTodos;
        case "done":
          return this.doneTodos;
        default:
          return this.todos;
      }
    }
  },
  methods: {
    handleClick(id) {
      const todo = this.todos.find(todo => todo.id === id);
      todo.done = !todo.done;
    },
    addTodo() {
      this.todos.push({
        id: this.todos.length + 1,
        text: this.inputText,
        done: false
      });
      this.inputText = "";
    },
    deleteTodo() {
      this.todos = this.undoneTodos;
    },
    visibilityFilter(value) {
      this.selected = value;
    },
    fetchTodos() {
      axios.get("http://localhost:3000/todos").then(res => {
        console.log(res);
        this.todos = res.data;
      });
    }
  },
  created() {
    this.fetchTodos();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.todoList {
  box-shadow: 0 0 5px #ccc;
  padding: 10px 30px;
}
.todoInput {
  display: flex;
  width: 100%;

  button {
    width: 30%;
  }
}
input {
  font-size: 16px;
  width: 70%;
  padding: 8px;
}
button {
  font-size: 16px;
  background: #eee;
  border: 1px solid #ddd;
  padding: 8px;
}
ul {
  padding-left: 25px;
}
li {
  margin: 10px 0;
}
li {
  user-select: none;
}
.done {
  cursor: pointer;
  text-decoration: line-through;
}
dl {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
}
dd {
  font-size: 24px;
  margin-left: 10px;
  font-weight: bold;
}
.filter-button {
  display: flex;
  justify-content: center;
  padding: 0;
  list-style: none;
  font-size: 16px;

  li {
    margin-right: 16px;
  }

  button {
    width: 80px;
  }
}
</style>
