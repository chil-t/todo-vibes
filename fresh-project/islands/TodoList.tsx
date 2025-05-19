import { useSignal } from "@preact/signals";
import { useCallback, useEffect } from "preact/hooks";
import { Todo, type TodoItem } from "../components/Todo.tsx";
import { Button } from "../components/Button.tsx";

type FilterStatus = "all" | "active" | "completed";

export default function TodoList() {
  const todos = useSignal<TodoItem[]>([]);
  const newTodoText = useSignal("");
  const filterStatus = useSignal<FilterStatus>("all");
  
  // Load todos from localStorage on initial render
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
        todos.value = JSON.parse(savedTodos);
      }
    } catch (e) {
      console.error("Failed to load todos from localStorage:", e);
    }
  }, []);
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos.value));
    } catch (e) {
      console.error("Failed to save todos to localStorage:", e);
    }
  }, [todos.value]);

  const addTodo = useCallback(() => {
    if (newTodoText.value.trim() === "") return;
    
    todos.value = [
      ...todos.value,
      {
        id: crypto.randomUUID(),
        text: newTodoText.value.trim(),
        completed: false,
      },
    ];
    newTodoText.value = "";
  }, []);

  const toggleTodo = useCallback((id: string) => {
    todos.value = todos.value.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  }, []);

  const clearCompleted = useCallback(() => {
    todos.value = todos.value.filter((todo) => !todo.completed);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // Get filtered todos based on current filter status
  const filteredTodos = () => {
    switch (filterStatus.value) {
      case "active":
        return todos.value.filter(todo => !todo.completed);
      case "completed":
        return todos.value.filter(todo => todo.completed);
      default:
        return todos.value;
    }
  };

  return (
    <div class="max-w-lg mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6 text-center">Todo App</h1>
      
      <div class="flex gap-2 mb-6">
        <input
          type="text"
          value={newTodoText.value}
          onInput={(e) => newTodoText.value = (e.target as HTMLInputElement).value}
          onKeyDown={handleKeyDown}
          placeholder="Add a new todo..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button 
          onClick={addTodo}
          class="px-4 py-2 bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
        >
          Add
        </Button>
      </div>

      {todos.value.length > 0 && (
        <div class="flex justify-center mb-6 space-x-2">
          <Button 
            onClick={() => filterStatus.value = "all"}
            class={`px-3 py-1 ${filterStatus.value === "all" ? "bg-blue-500 text-white border-blue-500" : ""}`}
          >
            All
          </Button>
          <Button 
            onClick={() => filterStatus.value = "active"}
            class={`px-3 py-1 ${filterStatus.value === "active" ? "bg-blue-500 text-white border-blue-500" : ""}`}
          >
            Active
          </Button>
          <Button 
            onClick={() => filterStatus.value = "completed"}
            class={`px-3 py-1 ${filterStatus.value === "completed" ? "bg-blue-500 text-white border-blue-500" : ""}`}
          >
            Completed
          </Button>
        </div>
      )}

      <div class="space-y-2">
        {todos.value.length === 0 ? (
          <p class="text-center text-gray-500 py-4">No todos yet. Add one above!</p>
        ) : filteredTodos().length === 0 ? (
          <p class="text-center text-gray-500 py-4">No {filterStatus.value} todos found.</p>
        ) : (
          filteredTodos().map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>

      {todos.value.length > 0 && (
        <div class="mt-6 flex justify-between items-center text-sm text-gray-600">
          <p>
            {todos.value.filter(t => t.completed).length} of {todos.value.length} tasks completed
          </p>
          {todos.value.some(t => t.completed) && (
            <Button
              onClick={clearCompleted}
              class="px-3 py-1 text-red-500 border-red-500 hover:bg-red-50"
            >
              Clear Completed
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
