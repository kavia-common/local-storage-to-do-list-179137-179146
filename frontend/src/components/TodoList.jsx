import React from "react";
import TodoItem from "./TodoItem";

/**
 * PUBLIC_INTERFACE
 * TodoList component
 * Renders list of todos or an empty state message.
 *
 * Props:
 * - todos: Array<{ id: string, text: string, completed: boolean }>
 * - onToggle(id)
 * - onDelete(id)
 * - onEdit(id, newText)
 */
export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (!todos || todos.length === 0) {
    return (
      <div className="empty-state" role="status" aria-live="polite">
        <p>No todos yet. Add your first task above!</p>
      </div>
    );
  }
  return (
    <ul className="todo-list" role="list" aria-label="Todo items">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
}
