import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl mb-4 text-center">404 - Page Not Found</h1>
      <p className="text-xl mb-4 text-center">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="text-base text-blue-500 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
