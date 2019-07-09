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
};

const Icon = ({ symbol = 'exclamation', className, size = '1x' }) => {
  const faIcon = typeof symbol === 'string' ? symbolMap[symbol] : symbol;

  return <FontAwesomeIcon icon={faIcon} className={className} size={size} />;
};

export default Icon;
