import { Todo, useTodoStore } from "@/stores/todoStore";
import { useEffect, useRef } from "react";
import TdodoItem from "./TodoItem";
import { useTodoPersistStore } from "@/stores/persistTodoStore";
import TodoItemPersist from "./TodoItemPersist";

const TodoBodyPersist = () => {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const todos = useTodoPersistStore((state) => state.todos);
  const count = useTodoPersistStore((state) => state.count);
  const addTodoToStore = useTodoPersistStore((state) => state.addTodo);

  useEffect(() => {
    // Fix issues for nextjs
    useTodoPersistStore.persist.rehydrate();
  }, []);

  const addTodo = () => {
    addTodoToStore({
      id: todos.length + 1,
      description: descriptionRef.current?.value || ""
    } as Todo);
    const description = descriptionRef.current?.value;
    if (description) {
      todos
      if (descriptionRef.current) {
        descriptionRef.current.value = "";
      }
    }
  }

  return (

    <div className="todo-body">
      <h1>Todo List ({count()})</h1>
      <div className="container">
        {
          todos.length === 0 ? <h3>No Data</h3> :
            todos.map((todo, idx) => (
              <TodoItemPersist idx={idx} />
            ))
        }
      </div>
      <div className="todo-action">
        <textarea ref={descriptionRef} rows={10} placeholder="Add Todo" />
        <button onClick={addTodo}>Add</button>
      </div>
    </div>
  );
}

export default TodoBodyPersist;