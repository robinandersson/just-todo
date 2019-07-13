import React from 'react';

import Icon from '../components/Icon';

const NotFoundPage = props => {
  return (
    <div className="mx-auto shadow bg-red-400 rounded shadow-2xl w-4/6 flex flex-row p-6 text-white">
      <div className="pr-8 pl-4 text-4xl flex content-center items-center">
        <Icon symbol="crossCircle" />
      </div>
      <div>
        <h2 className="text-2xl">404 Not Found!</h2>
        <p>
          The page you tried to visit does not exist{' '}
          <span role="img" aria-label="screaming emoji">
            😱
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
