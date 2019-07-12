import React from 'react';

import ToastNotification from './ToastNotification';

const ToastNotificationList = ({ removeToast, notifications }) => {
  if (!Array.isArray(notifications) || !notifications.length) return null;

  const handleRemove = i => () => removeToast(i);

  return (
    <div className="fixed bottom-1/12 top-auto left-1/6 right-1/6 p-10">
      {notifications.map((notification, index) => {
        if (!notification) return null;

        const { type, message } = notification;

        return (
          <ToastNotification
            key={index}
            index={index}
            handleRemove={handleRemove(index)}
            fixed={false}
            type={type}
            message={message}
          />
        );
      })}
    </div>
  );
};

export default ToastNotificationList;
