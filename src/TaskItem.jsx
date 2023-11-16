import React from 'react';
import TaskFooter from './TaskFooter';

const TaskItem = ({ task, index, hoveredIndex, onDelete, onMouseEnter, onMouseLeave, isLast, remainingTasks }) => {
  // Maneja el clic en el icono de eliminar
  const handleDeleteClick = () => {
    onDelete(index);
  };

  // Renderiza el icono de eliminación cuando el índice está en foco
  const renderDeleteIcon = () => {
    if (hoveredIndex === index) {
      return (
        <span
          className="badge badge-danger badge-pill delete-icon"
          onClick={handleDeleteClick}
          dangerouslySetInnerHTML={{ __html: '<i class="fas fa-xmark"></i>' }}
        />
      );
    }
    return null;
  };

  // Renderiza el elemento de tarea
  return (
    <li
      className={`task-card list-group-item ${hoveredIndex === index ? 'hovered' : ''}`}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
    >
      <div className="d-flex justify-content-between align-items-center w-100">
        <span>{task.label}</span>
        <div>
          {renderDeleteIcon()}
        </div>
      </div>
      {isLast && <TaskFooter remainingTasks={remainingTasks} />}
    </li>
  );
};

export default TaskItem;












