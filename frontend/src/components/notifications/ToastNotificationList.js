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
      className={`fixed ${fixedPosition}-1/24 ${oppositePosition}-auto left-1/12 right-1/12 md:left-1/8 md:right-1/8 xl:left-1/2 xl:right-0 xl:max-w-4xl xl:-translate-x-1/2`}
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
