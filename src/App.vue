<template>
  <div id="app">
    <h1>Todo App</h1>
    <TodoList />
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";

export default {
  name: "app",
  components: {
    TodoList
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Raleway:100,300,400,700&display=swap");
#app {
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  margin: 60px auto 0;
  width: 60%;
}
h1 {
  font-weight: 300;
  text-align: center;
  margin-bottom: 50px;
}
</style>
