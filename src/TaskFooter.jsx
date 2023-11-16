import React from 'react';

function TaskFooter({ remainingTasks }) {
    return (
        // Contenedor del pie de la tarea, alineado en columna y ocupando todo el ancho
        <div className="task-footer d-flex flex-column align-items-start w-100">
            {/* Línea horizontal que separa el pie de la tarea del contenido anterior */}
            <hr className="w-100 mb-1" />
            {/* Texto que muestra la cantidad de tareas restantes */}
            <p>{remainingTasks} {remainingTasks === 1 ? 'item' : 'items'} left</p>
        </div>
    );
}

export default TaskFooter;



