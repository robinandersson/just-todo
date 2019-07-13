import React, { useRef, useEffect } from 'react';

import Icon from '../Icon';

import { concatClassNames } from '../../utils/classNames';

const typeMap = {
  header: {
    success: 'Success!',
    warning: 'Warning',
    error: 'Error!',
  },
  symbol: {
    success: 'checkCircle',
    warning: 'exclamationTriangle',
    error: 'crossCircle',
  },
  color: {
    success: { hue: 'green', base: 400 },
    warning: { hue: 'orange', base: 400 },
    error: { hue: 'red', base: 400 },
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

  const header = typeMap.header[type];
  const symbol = typeMap.symbol[type];
  const { hue, base } = typeMap.color[type];

  const cssColoring = `bg-${hue}-${base}`;
  const fixedPositioning =
    fixed && `fixed ${fixed}-1/12 left-1/6 right-1/6 p-8`;

  return (
    <div
      className={concatClassNames(
        className,
        cssColoring,
        fixedPositioning,
        'shadow-2xl rounded flex flex-row p-6 text-white mt-4'
      )}
    >
      <div className="pr-8 pl-4 text-4xl flex content-center items-center">
        <Icon symbol={symbol} />
      </div>
      <div>
        <h2>{header}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ToastNotification;
