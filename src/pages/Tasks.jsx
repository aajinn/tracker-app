import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles.css';

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask } = useAppContext();
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
    projectId: null
  });
  const [filter, setFilter] = useState('all');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    addTask(newTask);
    setNewTask({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
      projectId: null
    });
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div className="tasks-container">
      <h1>Task Management</h1>
      
      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task Title"
          required
        />
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Task Description"
        />
        <select
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn-primary">Add Task</button>
      </form>

      {/* Task Filters */}
      <div className="task-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={filter === 'in-progress' ? 'active' : ''}
          onClick={() => setFilter('in-progress')}
        >
          In Progress
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.map(task => (
          <div key={task.id} className={`task-card priority-${task.priority}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-meta">
              <span className="due-date">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
              <span className={`priority-badge ${task.priority}`}>
                {task.priority}
              </span>
            </div>
            <div className="task-actions">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button
                className="btn-danger"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
