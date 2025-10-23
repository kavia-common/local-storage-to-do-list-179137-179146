import React, { useMemo, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
import { useLocalStorage } from "./hooks/useLocalStorage";

// Utilities
const STORAGE_KEY = "todoApp.todos";

// PUBLIC_INTERFACE
export default function App() {
  /**
   * App - A localStorage-backed Todo app.
   * Features:
   * - Add, edit, toggle complete, delete
   * - Filters: All/Active/Completed
   * - Clear completed
   * - Persistent state via localStorage
   * - Accessible controls and labels
   */
  const [todos, setTodos] = useLocalStorage(STORAGE_KEY, [], 50);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'

  const handleAdd = () => {
    const text = input.trim();
    if (!text) return;
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (id, text) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);
  const hasCompleted = useMemo(() => todos.some((t) => t.completed), [todos]);

  return (
    <div className="app-shell">
      <main className="card" role="application" aria-label="Todo application">
        <header className="header">
          <h1 className="title">Tasks</h1>
          <p className="subtitle">Stay organized with your day-to-day todos.</p>
        </header>

        <section className="input-row" aria-label="Add new todo">
          <input
            className="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            aria-label="Todo input"
          />
          <button className="btn" onClick={handleAdd} aria-label="Add todo">
            Add
          </button>
        </section>

        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />

        <Filters
          filter={filter}
          setFilter={setFilter}
          activeCount={activeCount}
          hasCompleted={hasCompleted}
          onClearCompleted={clearCompleted}
        />
      </main>
    </div>
  );
}
