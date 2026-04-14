import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { taskService } from '../services/auth';

const DashboardPage = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch tasks on component mount and when filter changes
  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError('');
    try {
      const filterParam = filter === 'all' ? null : filter;
      const response = await taskService.getAllTasks(filterParam);
      setTasks(response.data.tasks);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (title) => {
    try {
      const response = await taskService.addTask(title);
      setTasks([response.data.task, ...tasks]);
      setSuccessMessage('Task added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const response = await taskService.updateTask(taskId, { completed });
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? response.data.task : task
        )
      );
      setSuccessMessage(
        completed ? 'Task marked as completed!' : 'Task marked as pending!'
      );
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      setSuccessMessage('Task deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const handleEditTask = async (taskId, newTitle) => {
    try {
      const response = await taskService.updateTask(taskId, { title: newTitle });
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? response.data.task : task
        )
      );
      setSuccessMessage('Task updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error editing task:', err);
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Organize your tasks and boost productivity
          </p>
        </section>

        {successMessage && (
          <div className="success-alert">
            {successMessage}
          </div>
        )}

        {error && <div className="error-alert">{error}</div>}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl font-bold text-blue-500 mb-2">
              {stats.total}
            </div>
            <div className="text-gray-600 font-medium">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl font-bold text-green-500 mb-2">
              {stats.completed}
            </div>
            <div className="text-gray-600 font-medium">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl font-bold text-orange-500 mb-2">
              {stats.pending}
            </div>
            <div className="text-gray-600 font-medium">Pending</div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>
          <TaskForm onAddTask={handleAddTask} isLoading={isLoading} />
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'pending'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'completed'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            isLoading={isLoading}
          />
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
