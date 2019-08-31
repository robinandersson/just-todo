import React, { useState, useContext } from 'react';
import NotificationHub from '../components/notifications/NotificationHub';

/*
 * The NotificationCenterContext provides access to push and remove "global" notifications,
 * as well as the notifications themselves.
 *
 * The actual presentation is handled by the NotificationHub component.
 */
const NotificationCenterContext = React.createContext();

const NotificationCenterProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  /* Function removes the notification by deleting it's reference in the notifications array.
   *
   * Observe, the notification array will keep expanding during a users session. Could probably be improved, e.g. by
   * removing array entry entirely - but this would require handling changing notification components' keys, etc.
   */
  const removeNotification = index =>
    setNotifications(prevNotifications => {
      const arr = [...prevNotifications];
      delete arr[index];
      return arr;
    });

  const pushNotification = notification =>
    setNotifications(prevNotifications => [...prevNotifications, notification]);

  // render the notification presenter (NotificationHub) alongside the consumer's children
  return (
    <NotificationCenterContext.Provider
      value={{
        notifications,
        pushNotification,
        removeNotification,
      }}
    >
      {children}
      <NotificationHub />
    </NotificationCenterContext.Provider>
  );
};

const NotificationCenterConsumer = NotificationCenterContext.Consumer;

// wrap a component, turning it nto a NotificationCenterContext consumer - supplying it with a 'notificationCenter' prop
const withNotificationCenter = Component => props => (
  <NotificationCenterConsumer>
    {context => <Component notificationCenter={context} {...props} />}
  </NotificationCenterConsumer>
);

// returns a hook for accessing the NotificationCenterContext
const useNotificationCenter = () => useContext(NotificationCenterContext);

export {
  NotificationCenterProvider,
  NotificationCenterConsumer,
  withNotificationCenter, // HOC for easy use with class components
  useNotificationCenter, // hook for easy use with functional components
};
