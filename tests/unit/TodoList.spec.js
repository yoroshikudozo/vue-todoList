import { shallowMount } from "@vue/test-utils";
import TodoList from "@/components/TodoList.vue";

function factory(options) {
  return shallowMount(TodoList, options);
}

describe("TodoList.vue", () => {
  describe("renders", () => {
    it("title", () => {
      const wrapper = factory();
      expect(wrapper.find("h2").text()).toMatch("Todos");
    });
    it("todos", () => {
      const wrapper = factory();
      expect(
        wrapper
          .find(".todoList")
          .find("ul")
          .findAll("li").length
      ).toBe(3);
    });
  });

  describe("methods", () => {
    it("addTodo", () => {
      const wrapper = factory();
      wrapper.setData({ inputText: "todo" });

      const todo = { id: 4, text: "todo", done: false };

      wrapper.vm.addTodo();
      expect(wrapper.vm.todos[3]).toEqual(todo);
    });
    it("deleteTodo", () => {
      const wrapper = factory();
      wrapper.vm.deleteTodo();
      expect(wrapper.vm.todos.length).toBe(2);
    });
  });

  describe("computed", () => {
    const todos = [
      { id: 1, text: "todo1", done: true },
      { id: 2, text: "todo2", done: false },
      { id: 3, text: "todo3", done: false }
    ];
    it("doneTodos", () => {
      const doneTodos = TodoList.computed.doneTodos.call({ todos });
      const result = [todos[0]];
      expect(doneTodos).toEqual(result);
    });
    it("undoneTodos", () => {
      const undoneTodos = TodoList.computed.undoneTodos.call({ todos });
      const result = [todos[1], todos[2]];
      expect(undoneTodos).toEqual(result);
    });
    it("selectedTodos", () => {
      expect(TodoList.computed.selectedTodos.call({ todos })).toEqual(todos);
    });
    it("selectedTodos updating correctly ('done')", () => {
      const wrapper = factory();
      wrapper.setData({ todos });
      wrapper.setData({ selected: "done" });

      const result = [todos[0]];

      expect(wrapper.vm.selectedTodos).toEqual(result);
    });
    it("selectedTodos updating correctly ('undone')", () => {
      const wrapper = factory();
      wrapper.setData({ todos });
      wrapper.setData({ selected: "undone" });

      const result = [todos[1], todos[2]];

      expect(wrapper.vm.selectedTodos).toEqual(result);
    });
  });
});
