import React, { useState } from 'react';
import { Plus, AlertCircle, CheckCircle } from 'lucide-react';

const TaskForm = ({ onAddTask, isLoading }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validateTitle = (val) => {
    if (!val.trim()) {
      return 'Task title is required';
    }
    if (val.trim().length > 200) {
      return 'Title must be less than 200 characters';
    }
    return '';
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (touched) {
      setError(validateTitle(val));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateTitle(title));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    const validationError = validateTitle(title);
    if (validationError) {
      setError(validationError);
      return;
    }

    onAddTask(title);
    setTitle('');
    setError('');
    setTouched(false);
  };

  const charCount = title.length;
  const charLimit = 200;
  const charPercentage = (charCount / charLimit) * 100;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="What needs to be done? 📝"
              value={title}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              maxLength={200}
              className={`w-full px-5 py-4 border-2 rounded-xl transition-all focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400 ${
                error && touched
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              }`}
            />
            {charCount > charLimit * 0.8 && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                {charCount}/{charLimit}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="px-7 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add Task
              </>
            )}
          </button>
        </div>

        {/* Character count bar */}
        {charCount > 0 && (
          <div className="mt-3 space-y-1">
            <div className="text-xs text-gray-500 text-right">
              {charCount}/{charLimit} characters
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div
                className={`h-1 transition-all ${
                  charPercentage > 90
                    ? 'bg-red-500'
                    : charPercentage > 70
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(charPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && touched && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Success hint */}
      {!error && title.trim() && touched && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-green-700 text-sm font-medium">Ready to add task</p>
        </div>
      )}
    </form>
  );
};

export default TaskForm;
