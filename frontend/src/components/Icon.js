import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faLock,
  faCog,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  exclamationCircle: faExclamationCircle,
  cog: faCog,
  check: faCheck,
  lock: faLock,
  cross: faTimes,
};

const Icon = ({ icon = 'exclamationCircle', className, size = '1x' }) => {
  const faIcon = typeof icon === 'string' ? iconMap[icon] : icon;

  return <FontAwesomeIcon icon={faIcon} className={className} size={size} />;
};

export default Icon;
