import React from 'react';

import ToastNotification from './ToastNotification';

/*
 * ToastNotificationList is a container (and presenter) for notifications.
 *
 * It is kept separate from e.g. NotificationHub to allow for reuse in other ways
 * (even though they could be merged and probably decrease complexity as of right now).
 */
const ToastNotificationList = ({
  notifications,
  removeNotification,
  fixedPosition = 'top',
}) => {
  if (!Array.isArray(notifications) || !notifications.length) return null;

  const oppositePosition = fixedPosition === 'top' ? 'bottom' : 'top';
  const handleRemoveNotification = i => () => removeNotification(i); // observe curry

  return (
    <div
      className={`fixed ${fixedPosition}-1/24 ${oppositePosition}-auto left-1/12 right-1/12 md:left-1/8 md:right-1/8 xl:left-1/2 xl:right-0 xl:max-w-4xl xl:-translate-x-1/2`}
    >
      {notifications.map((notification, index) => {
        if (!notification) return null;

        // explicit declaration for brevity's sake (instead of simply spreading notification object)
        const { type, heading, message, duration } = notification;

        return (
          <ToastNotification
            key={index}
            handleRemove={handleRemoveNotification(index)}
            type={type}
            heading={heading}
            message={message}
            duration={duration}
            className="opacity-90"
          />
        );
      })}
    </div>
  );
};

export default ToastNotificationList;
