import React, { useState } from 'react';
import { Trash2, Edit2, Check, X, AlertCircle } from 'lucide-react';

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editError, setEditError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      await onToggleComplete(task._id, task.completed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure? This task will be permanently deleted.')) {
      setIsLoading(true);
      try {
        await onDelete(task._id);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSaveEdit = async () => {
    const trimmedTitle = editedTitle.trim();
    if (!trimmedTitle) {
      setEditError('Task title cannot be empty');
      return;
    }
    if (trimmedTitle.length > 200) {
      setEditError('Title must be less than 200 characters');
      return;
    }
    setEditError('');
    setIsLoading(true);
    try {
      await onEdit(task._id, trimmedTitle);
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setEditError('');
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div
      className={`group rounded-xl border-2 transition-all duration-300 overflow-hidden ${
        task.completed
          ? 'bg-gray-50 border-gray-200 hover:border-gray-300'
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg'
      }`}
    >
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Checkbox */}
          <button
            onClick={handleToggleComplete}
            disabled={isLoading || isEditing}
            className="flex-shrink-0 focus:outline-none transition-transform hover:scale-110"
          >
            <div
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                task.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {task.completed && <Check className="w-4 h-4 text-white" />}
            </div>
          </button>

          {/* Title or Edit Input */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => {
                    setEditedTitle(e.target.value);
                    setEditError('');
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  autoFocus
                  maxLength={200}
                  className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-all ${
                    editError
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-blue-500 focus:ring-blue-200'
                  }`}
                />
                {editError && (
                  <div className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {editError}
                  </div>
                )}
              </div>
            ) : (
              <p
                className={`text-base font-medium transition-all truncate ${
                  task.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-800 group-hover:text-blue-600'
                }`}
              >
                {task.title}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 ml-4 flex-shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                disabled={isLoading}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Save"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isLoading}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Cancel"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100"
                title="Edit"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
