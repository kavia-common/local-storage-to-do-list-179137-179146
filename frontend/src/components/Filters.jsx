import React from "react";

/**
 * PUBLIC_INTERFACE
 * Filters component
 * Renders filter tabs (All/Active/Completed) and a Clear Completed action.
 *
 * Props:
 * - filter: 'all' | 'active' | 'completed'
 * - setFilter(next)
 * - activeCount: number
 * - hasCompleted: boolean
 * - onClearCompleted(): void
 */
export default function Filters({ filter, setFilter, activeCount, hasCompleted, onClearCompleted }) {
  const itemsLeft = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;

  return (
    <div className="filters-bar" role="region" aria-label="Todo filters and actions">
      <span className="items-left" aria-live="polite">
        {itemsLeft}
      </span>
      <div className="filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
          aria-label="Show all todos"
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
          aria-pressed={filter === "active"}
          aria-label="Show active todos"
        >
          Active
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
          aria-pressed={filter === "completed"}
          aria-label="Show completed todos"
        >
          Completed
        </button>
      </div>
      <button
        className="btn btn-ghost"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
        aria-disabled={!hasCompleted}
        aria-label="Clear completed todos"
        title="Clear completed"
      >
        Clear Completed
      </button>
    </div>
  );
}
