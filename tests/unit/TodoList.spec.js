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
    it("todoInput and works correctly", () => {
      const wrapper = factory();
      const todos = [
        { id: 1, text: "todo1", done: true },
        { id: 2, text: "todo2", done: false },
        { id: 3, text: "todo3", done: false }
      ];
      wrapper.setData({ todos });
      wrapper.find(".todoInput input").setValue("todo");
      wrapper.find(".todoInput button").trigger("click");
      expect(wrapper.vm.todos[3]).toEqual({ id: 4, text: "todo", done: false });
    });
  });

  describe("methods", () => {
    it("addTodo", () => {
      const wrapper = factory();
      const todos = [
        { id: 1, text: "todo1", done: true },
        { id: 2, text: "todo2", done: false },
        { id: 3, text: "todo3", done: false }
      ];
      wrapper.setData({ inputText: "todo" });
      wrapper.setData({ todos });

      const todo = { id: 4, text: "todo", done: false };

      wrapper.vm.addTodo();
      expect(wrapper.vm.todos[3]).toEqual(todo);
    });
    it("deleteTodo", () => {
      const wrapper = factory();
      const todos = [
        { id: 1, text: "todo1", done: true },
        { id: 2, text: "todo2", done: false },
        { id: 3, text: "todo3", done: false }
      ];
      wrapper.setData({ todos });

      wrapper.vm.deleteTodo();
      expect(wrapper.vm.todos.length).toBe(2);
    });
  });

  describe("computed", () => {
    it("doneTodos", () => {
      const todos = [
        { id: 1, text: "todo1", done: true },
        { id: 2, text: "todo2", done: false },
        { id: 3, text: "todo3", done: false }
      ];
      const doneTodos = TodoList.computed.doneTodos.call({ todos });
      const result = [todos[0]];
      expect(doneTodos).toEqual(result);
    });
    it("undoneTodos", () => {
      const todos = [
        { id: 1, text: "todo1", done: true },
        { id: 2, text: "todo2", done: false },
        { id: 3, text: "todo3", done: false }
      ];
      const undoneTodos = TodoList.computed.undoneTodos.call({ todos });
      const result = [todos[1], todos[2]];
      expect(undoneTodos).toEqual(result);
    });
    it("selectedTodos", () => {
      const todos = [
        { id: 1, text: "todo1", done: true },
        { id: 2, text: "todo2", done: false },
        { id: 3, text: "todo3", done: false }
      ];
      expect(TodoList.computed.selectedTodos.call({ todos })).toEqual(todos);
    });
    it("selectedTodos updating correctly ('done')", () => {
      const wrapper = factory();
      const todos = [
        { id: 1, text: "todo1", done: true },
        { id: 2, text: "todo2", done: false },
        { id: 3, text: "todo3", done: false }
      ];
      wrapper.setData({ todos });
      wrapper.setData({ selected: "done" });

      const result = [todos[0]];

      expect(wrapper.vm.selectedTodos).toEqual(result);
    });
    it("selectedTodos updating correctly ('undone')", () => {
      const wrapper = factory();
      const todos = [
        { id: 1, text: "todo1", done: true },
        { id: 2, text: "todo2", done: false },
        { id: 3, text: "todo3", done: false }
      ];
      wrapper.setData({ todos });
      wrapper.setData({ selected: "undone" });

      const result = [todos[1], todos[2]];

      expect(wrapper.vm.selectedTodos).toEqual(result);
    });
  });
});
