import React from 'react';

import ToastNotification from './ToastNotification';

const ToastNotificationList = ({ removeToast, notifications }) => {
  if (!Array.isArray(notifications) || !notifications.length) return null;

  const handleRemove = i => () => removeToast(i);

  return (
    <div className="fixed top-1/24 bottom-auto left-1/12 sm:left-1/6 right-1/12 sm:right-1/6">
      {notifications.map((notification, index) => {
        if (!notification) return null;

        const { type, message } = notification;

        return (
          <ToastNotification
            key={index}
            index={index}
            handleRemove={handleRemove(index)}
            type={type}
            message={message}
          />
        );
      })}
    </div>
  );
};

export default ToastNotificationList;
