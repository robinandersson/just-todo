import React, { useRef, useEffect } from 'react';

import Icon from '../Icon';

import { concatClassNames } from '../../utils/classNames';

const typeMap = {
  symbol: {
    success: 'checkCircle',
    warning: 'exclamationTriangle',
    error: 'crossCircle',
  },
  color: {
    success: { hue: 'green', base: 300 },
    warning: { hue: 'yellow', base: 300 },
    error: { hue: 'red', base: 300 },
  },
};

const ToastNotification = ({
  className,
  handleRemove,
  fixed = 'top',
  type,
  message,
  duration = 2500,
}) => {
  const removalTimer = useRef();
  // clean up timeout (observe the curry – clear occurs on unmount)
  useEffect(() => () => clearTimeout(removalTimer.current), []);

  // only show toast for [duration] milliseconds
  removalTimer.current = setTimeout(() => handleRemove(false), duration);

  const symbol = typeMap.symbol[type];
  const { hue, base } = typeMap.color[type];

  const cssColoring = `bg-${hue}-${base}`;
  const fixedPositioning =
    fixed && `fixed ${fixed}-1/12 left-1/6 right-1/6 p-10`;

  return (
    <div
      className={concatClassNames(
        className,
        cssColoring,
        fixedPositioning,
        'shadow-lg'
      )}
    >
      <div>
        <Icon symbol={symbol} />
      </div>
      <p>{message}</p>
    </div>
  );
};

export default ToastNotification;
