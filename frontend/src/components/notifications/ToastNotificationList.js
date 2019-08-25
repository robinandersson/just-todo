import React from 'react';

import ToastNotification from './ToastNotification';

const ToastNotificationList = ({
  removeToast,
  notifications,
  fixedPosition = 'top',
}) => {
  if (!Array.isArray(notifications) || !notifications.length) return null;

  const handleRemoveToast = i => () => removeToast(i);

  const oppositePosition = fixedPosition === 'top' ? 'bottom' : 'top';

  return (
    <div
      className={`fixed ${fixedPosition}-1/24 ${oppositePosition}-auto left-1/12 sm:left-1/6 right-1/12 sm:right-1/6`}
    >
      {notifications.map((notification, index) => {
        if (!notification) return null;

        const { type, heading, message } = notification;

        return (
          <ToastNotification
            key={index}
            handleRemove={handleRemoveToast(index)}
            type={type}
            heading={heading}
            message={message}
            className="opacity-90"
          />
        );
      })}
    </div>
  );
};

export default ToastNotificationList;
