import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Todo } from "./todoStore";

type TodoPersistStore = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (idx: number, description: string) => void;
  removeTodo: (idx: number) => void;
  toggleTodo: (idx: number) => void;
  clearAllTodos: () => void;
  count: () => number;
};

export const useTodoPersistStore = create<TodoPersistStore>()(
  persist(
    immer((set, get) => ({
      todos: [],

      addTodo: (todo: Todo) =>
        set((state) => {
          state.todos.push(todo); // Mutating safely with immer
        }),

      editTodo: (idx: number, description: string) =>
        set((state) => {
          if (state.todos[idx]) {
            state.todos[idx].description = description;
          }
        }),

      removeTodo: (idx: number) =>
        set((state) => {
          state.todos.splice(idx, 1); // Safe mutation
        }),

      toggleTodo: (idx: number) =>
        set((state) => {
          if (state.todos[idx]) {
            state.todos[idx].completed = !state.todos[idx].completed;
          }
        }),

      clearAllTodos: () =>
        set((state) => {
          state.todos = [];
        }),

      count: () => get().todos.length,
    })),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);
