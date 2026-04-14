import React from 'react';

export const TaskSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-h-20 animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="w-6 h-6 bg-gray-300 rounded mt-1 flex-shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="space-x-2 flex">
          <div className="w-10 h-10 bg-gray-300 rounded"></div>
          <div className="w-10 h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const TaskListSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <TaskSkeleton key={index} />
      ))}
    </div>
  );
};

export const FormSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 animate-pulse">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="h-10 bg-gray-400 rounded w-full"></div>
      </div>
    </div>
  );
};
