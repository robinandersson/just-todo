import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamation,
  faExclamationTriangle,
  faLock,
  faCog,
  faCheck,
  faCheckCircle,
  faTimes,
  faTimesCircle,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

const symbolMap = {
  exclamation: faExclamation,
  exclamationTriangle: faExclamationTriangle,
  cog: faCog,
  check: faCheck,
  checkCircle: faCheckCircle,
  lock: faLock,
  cross: faTimes,
  crossCircle: faTimesCircle,
  userCircle: faUserCircle,
};

const Icon = ({ symbol = 'exclamation', className, size }) => {
  const faIcon = typeof symbol === 'string' ? symbolMap[symbol] : symbol;

  return <FontAwesomeIcon icon={faIcon} className={className} size={size} />;
};

export default Icon;
