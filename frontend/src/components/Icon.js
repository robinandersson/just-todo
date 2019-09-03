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
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

// symbolmap used to gather all used icons and to solidify icon-id's in case icon library is exchanged
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
  exclamationCircle: faExclamationCircle,
};

/*
 * Icon component, actual svg-icon specified through symbol prop
 * - either pass in string corresponding to symbolMap above or pass in vailid fortawesome svg
 *
 * Change color by passing in color-css property (text-[color] in tailwindcss).
 */
const Icon = ({ symbol = 'exclamation', size, onClick, className }) => {
  const faIcon = typeof symbol === 'string' ? symbolMap[symbol] : symbol;

  return (
    <FontAwesomeIcon
      icon={faIcon}
      size={size}
      onClick={onClick}
      className={className}
    />
  );
};

export default Icon;
