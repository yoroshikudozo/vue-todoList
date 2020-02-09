import { shallowMount } from "@vue/test-utils";
import TodoList from "@/components/TodoList.vue";

describe("TodoList.vue", () => {
  it("renders title", () => {
    const wrapper = shallowMount(TodoList);
    expect(wrapper.find("h2").text()).toMatch("Todos");
  });
  it("renders todos", () => {
    const wrapper = shallowMount(TodoList);
    expect(
      wrapper
        .find(".todoList")
        .find("ul")
        .findAll("li").length
    ).toBe(3);
  });
});
