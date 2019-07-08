import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCog } from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  cog: faCog,
  lock: faLock,
};

const Icon = ({ icon, css, size }) => {
  const faIcon = typeof icon === 'string' ? iconMap[icon] : icon;

  return (
    <FontAwesomeIcon
      icon={faIcon}
      className={`transition mode--instant spin${css ? ' ' + css : ''}`}
      size={size || '1x'}
    />
  );
};

export default Icon;
