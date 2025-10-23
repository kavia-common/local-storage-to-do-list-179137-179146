import React, { useState, useEffect, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * TodoItem component
 * Renders a single todo with toggle, inline edit, and delete actions.
 *
 * Props:
 * - todo: { id: string, text: string, completed: boolean }
 * - onToggle(id)
 * - onDelete(id)
 * - onEdit(id, newText)
 */
export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    setDraft(todo.text);
  }, [todo.text]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (trimmed.length === 0) {
      // If cleared, delete the todo
      onDelete(todo.id);
    } else if (trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setDraft(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-left">
        <input
          id={`toggle-${todo.id}`}
          className="todo-checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark "${todo.text}" as ${todo.completed ? "active" : "completed"}`}
        />
        {isEditing ? (
          <form onSubmit={handleSubmit} className="edit-form">
            <input
              ref={inputRef}
              className="todo-input-edit"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Edit todo text"
            />
            <button type="submit" className="btn btn-primary" aria-label="Save edit">
              Save
            </button>
          </form>
        ) : (
          <label
            htmlFor={`toggle-${todo.id}`}
            className="todo-text"
            onDoubleClick={() => setIsEditing(true)}
            role="button"
            aria-label={`Todo: ${todo.text}. Double click to edit.`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsEditing(true);
            }}
          >
            {todo.text}
          </label>
        )}
      </div>
      <div className="todo-actions">
        {!isEditing && (
          <button
            className="icon-btn"
            onClick={() => setIsEditing(true)}
            aria-label={`Edit "${todo.text}"`}
            title="Edit"
          >
            ✏️
          </button>
        )}
        <button
          className="icon-btn danger"
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete "${todo.text}"`}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
