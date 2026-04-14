import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, Circle, Filter } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { TaskListSkeleton } from '../components/SkeletonLoading';
import { taskService } from '../services/auth';
import { toastService } from '../services/toast';

const DashboardPage = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const filterParam = filter === 'all' ? null : filter;
      const response = await taskService.getAllTasks(filterParam);
      setTasks(response.data.tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      toastService.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (title) => {
    try {
      const response = await taskService.addTask(title);
      setTasks([response.data.task, ...tasks]);
      toastService.success('Task created successfully');
    } catch (err) {
      console.error('Error adding task:', err);
      const errorMsg = err.response?.data?.errors?.title || err.response?.data?.message || 'Failed to add task';
      toastService.error(errorMsg);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    const originalTasks = tasks;
    // Optimistic update
    setTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, completed: !completed } : task
      )
    );

    try {
      const response = await taskService.updateTask(taskId, { completed: !completed });
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? response.data.task : task
        )
      );
      toastService.success(!completed ? 'Task completed! 🎉' : 'Task marked as pending');
    } catch (err) {
      // Revert optimistic update
      setTasks(originalTasks);
      console.error('Error updating task:', err);
      toastService.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    const originalTasks = tasks;
    // Optimistic update
    setTasks(tasks.filter((task) => task._id !== taskId));

    try {
      await taskService.deleteTask(taskId);
      toastService.success('Task deleted');
    } catch (err) {
      // Revert optimistic update
      setTasks(originalTasks);
      console.error('Error deleting task:', err);
      toastService.error('Failed to delete task');
    }
  };

  const handleEditTask = async (taskId, newTitle) => {
    const originalTasks = tasks;
    // Optimistic update
    setTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, title: newTitle } : task
      )
    );

    try {
      const response = await taskService.updateTask(taskId, { title: newTitle });
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? response.data.task : task
        )
      );
      toastService.success('Task updated');
    } catch (err) {
      // Revert optimistic update
      setTasks(originalTasks);
      console.error('Error editing task:', err);
      const errorMsg = err.response?.data?.errors?.title || err.response?.data?.message || 'Failed to update task';
      toastService.error(errorMsg);
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  const completionRate = tasks.length > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Stay organized and boost your productivity today
              </p>
            </div>
            <div className="text-right hidden md:block">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">
                <span className="text-white text-xl font-bold">{completionRate}%</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">Completion Rate</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Total Tasks</p>
                <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <Circle className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Completed</p>
                <p className="text-4xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Pending</p>
                <p className="text-4xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                <Filter className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        </section>

        {/* Add New Task Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Task</h2>
          <TaskForm onAddTask={handleAddTask} isLoading={isLoading} />
        </section>

        {/* Tasks Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
            <div className="flex gap-3 flex-wrap">
              {['all', 'pending', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                    filter === f
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <TaskListSkeleton count={3} />
          ) : (
            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              isLoading={false}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
