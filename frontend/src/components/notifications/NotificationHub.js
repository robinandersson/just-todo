import React from 'react';

import ToastNotificationList from './ToastNotificationList';
import { NotificationCenterContext } from '../../contexts/notification-context';

/* The NotificationHub component presents all 'global' notificaions
 * (although there's just one type atm). It is supplied with data and functionality by the NotificationCenterContext.
 *
 * Think of NotificationHub as a container for several notification types (e.g. several ToastNotificationLists),
 * even though there are currently only one such type/list
 */
// TODO: expand with more types of notifications, modals, etc.
const NotificationHub = () => (
  <NotificationCenterContext.Consumer>
    {NotificationCenterContext => (
      <ToastNotificationList {...NotificationCenterContext} />
    )}
  </NotificationCenterContext.Consumer>
);

export default NotificationHub;
