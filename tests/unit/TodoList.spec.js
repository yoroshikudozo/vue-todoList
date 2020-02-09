import { shallowMount } from "@vue/test-utils";
import TodoList from "@/components/TodoList.vue";

describe("TodoList.vue", () => {
  describe("renders", () => {
    it("title", () => {
      const wrapper = shallowMount(TodoList);
      expect(wrapper.find("h2").text()).toMatch("Todos");
    });
    it("todos", () => {
      const wrapper = shallowMount(TodoList);
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
      const wrapper = shallowMount(TodoList);
      wrapper.setData({ inputText: "todo" });

      const todo = { id: 4, text: "todo", done: false };

      wrapper.vm.addTodo();
      expect(wrapper.vm.todos[3]).toEqual(todo);
    });
    it("deleteTodo", () => {
      const wrapper = shallowMount(TodoList);
      wrapper.vm.deleteTodo();
      expect(wrapper.vm.todos.length).toBe(2);
    });
  });

  describe("computed", () => {
    it("doneTodos", () => {
      const wrapper = shallowMount(TodoList);
      expect(wrapper.vm.doneTodos).toEqual([wrapper.vm.todos[0]]);
    });
    it("undoneTodos", () => {
      const wrapper = shallowMount(TodoList);
      expect(wrapper.vm.undoneTodos).toEqual([
        wrapper.vm.todos[1],
        wrapper.vm.todos[2]
      ]);
    });
    it("selectedTodos", () => {
      const wrapper = shallowMount(TodoList);
      wrapper.setData({ selected: "done" });
      expect(wrapper.vm.selectedTodos).toEqual(wrapper.vm.doneTodos);
    });
  });
});
