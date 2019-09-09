import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '../components/Icon';
import ToastNotification from '../components/notifications/ToastNotification';

const NotFoundPage = props => (
  <div className="mx-auto text-center min-w min-w-1/2">
    <ToastNotification
      type="error"
      duration={0}
      className="text-left"
      heading={
        <>
          404 Not Found!{' '}
          <span role="img" aria-label="screaming emoji">
            😱
          </span>
        </>
      }
      message={
        <>
          <p>The page you tried to visit does not exist.</p>
        </>
      }
    />
    <p className="mt-12">
      Back to <NavLink to="/">home page</NavLink>
    </p>
  </div>
);

export default NotFoundPage;
