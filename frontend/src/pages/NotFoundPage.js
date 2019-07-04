import React from 'react';

const NotFoundPage = props => {
  return (
    <div className="container mx-auto p-10 shadow bg-red-350 border-8 border-red-500 text-red-600">
      <h1 className="text-2xl">404 Not Found!</h1>
      <p className="">The page you tried to visit does not exist <span role="img" aria-label="screaming emoji">😱</span></p>
    </div>
  )
}

export default NotFoundPage;