import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import TaskItem from './TaskItem';

function Todo() {
  // Estados para almacenar la lista de tareas, la nueva tarea y el índice sobre el que se pasa el mouse
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Funciones de notificación para eventos
  const notifyTaskDeleted = () => toast.error('Tarea Eliminada');
  const notifyAllTasksDeleted = () => toast.warn('Todas las tareas fueron eliminadas');

  // Efecto para cargar la lista desde la API cuando el componente se monta
  useEffect(() => {
    fetchTasks();
  }, []); 

  // Función para obtener las tareas desde la API
  const fetchTasks = () => {
    axios.get('https://playground.4geeks.com/apis/fake/todos/user/cfabbroni')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        // Verifica si el error es porque el usuario no existe
        if (error.response && error.response.data && error.response.data.msg === "The user cfabbroni doesn't exists") {
          // Si el usuario no existe, realiza una solicitud POST para crearlo
          createUser();
        } else {
          // Otro tipo de error
          console.error('Error fetching tasks:', error);
        }
      });
  };

  // Función para crear un nuevo usuario
  const createUser = () => {
    axios.post('https://playground.4geeks.com/apis/fake/todos/user/cfabbroni', [])
      .then(response => {
        console.log('User created successfully:', response);
        // Después de crear el usuario, vuelve a llamar a fetchTasks para obtener las tareas actualizadas
        fetchTasks();
      })
      .catch(error => console.error('Error creating user:', error));
  };

  // Función para sincronizar las tareas con el servidor
  const syncTasksWithServer = (updatedTasks, addedTask) => {
    axios.put('https://playground.4geeks.com/apis/fake/todos/user/cfabbroni', updatedTasks)
      .then(response => {
        console.log(response);
        if (addedTask) {
          notifyTaskAdded(); // Notificar éxito al sincronizar solo cuando se agrega una tarea
        }
      })
      .catch(error => console.error('Error syncing tasks with server:', error));
  };

  // Función de notificación para agregar tarea
  const notifyTaskAdded = () => toast.success('Tarea Agregada');

  // Maneja la adición de una nueva tarea
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const addedTask = { label: newTask.trim(), done: false };
      const updatedTasks = [...tasks, addedTask];
      setTasks(updatedTasks);
      setNewTask('');
      syncTasksWithServer(updatedTasks, addedTask);
    }
  };

  // Maneja la eliminación de una tarea específica
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: true } : task //Cambia el estado de 'done' a 'true'
    );
    setTasks(updatedTasks);
    syncTasksWithServer(updatedTasks);
    notifyTaskDeleted();
  };

  // Maneja la eliminación de todas las tareas
  const handleDeleteAllTasks = () => {
    // Cambia el estado 'done' a true para todas las tareas
    const updatedTasks = tasks.map(task => ({ ...task, done: true }));
    setTasks(updatedTasks);
    syncTasksWithServer(updatedTasks);
    notifyAllTasksDeleted();
  };

  // Maneja el cambio en la entrada de texto
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  // Maneja la pulsación de tecla, agrega una tarea si se presiona Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  // Maneja el evento cuando el mouse entra en un elemento de tarea
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  // Maneja el evento cuando el mouse sale de un elemento de tarea
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Calcula la cantidad de tareas restantes (sin completar)
  const remainingTasks = tasks.filter(task => !task.done).length;

  // Renderiza la aplicación de lista de tareas
  return (
    <div className="container mt-5 text-center bg-light">
      <h1 className="custom-text-color mb-4">todos</h1>

      <input
        type="text"
        className="form-control mb-3"
        placeholder={remainingTasks === 0 ? "No hay tareas, añadir tareas" : null}
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {remainingTasks > 0 && (
        <ul className="list-group text-left">
          {tasks.map((task, index) => (
            task.done ? null : (
              <TaskItem
                key={index}
                task={task}
                index={index}
                hoveredIndex={hoveredIndex}
                onDelete={handleDeleteTask}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                isLast={index === tasks.length - 1}
                remainingTasks={remainingTasks}
              />
            )
          ))}
        </ul>
      )}

      {remainingTasks > 0 && (
        <button className="btn btn-danger mt-3" onClick={handleDeleteAllTasks}>
          Limpiar Todas las Tareas
        </button>
      )}

      <ToastContainer />
    </div>
  );
}

export default Todo;










































