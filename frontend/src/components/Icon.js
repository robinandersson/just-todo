import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faLock,
  faCog,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

const symbolMap = {
  exclamationCircle: faExclamationCircle,
  cog: faCog,
  check: faCheck,
  lock: faLock,
  cross: faTimes,
};

const Icon = ({ symbol = 'exclamationCircle', className, size = '1x' }) => {
  const faIcon = typeof symbol === 'string' ? symbolMap[symbol] : symbol;

  return <FontAwesomeIcon icon={faIcon} className={className} size={size} />;
};

export default Icon;
