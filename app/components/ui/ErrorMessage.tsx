'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded relative mb-4" role="alert">
      <div className="flex items-center">
        <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
