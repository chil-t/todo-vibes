import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoProps {
  todo: TodoItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function Todo({ todo, onToggle, onDelete }: TodoProps) {
  return (
    <div class="flex items-center justify-between p-4 mb-2 border border-gray-300 rounded shadow-sm">
      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          class="w-5 h-5 cursor-pointer"
          disabled={!IS_BROWSER}
        />
        <span class={`text-lg ${todo.completed ? "line-through text-gray-500" : ""}`}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        class="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
        disabled={!IS_BROWSER}
      >
        Delete
      </button>
    </div>
  );
}
