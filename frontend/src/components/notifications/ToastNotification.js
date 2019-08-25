import React, { useRef, useEffect } from 'react';

import Icon from '../Icon';

import { concatClassNames } from '../../utils/classNames';

const typeMap = {
  heading: {
    success: 'Success!',
    warning: 'Warning',
    error: 'Error!',
    info: 'Information',
  },
  symbol: {
    success: 'checkCircle',
    warning: 'exclamationTriangle',
    error: 'crossCircle',
    info: 'exclamationCircle',
  },
  color: {
    success: { hue: 'green', base: 400 },
    warning: { hue: 'orange', base: 400 },
    error: { hue: 'red', base: 400 },
    info: { hue: 'blue', base: 400 },
  },
};

const ToastNotification = ({
  className,
  handleRemove,
  type,
  heading = typeMap.heading[type],
  message,
  duration = 3000,
}) => {
  const removalTimer = useRef();
  // clean up timeout (observe the curry – i.e. clear occurs on unmount)
  useEffect(() => () => clearTimeout(removalTimer.current), []);

  // only show toast for [duration] milliseconds
  removalTimer.current = setTimeout(handleRemove, duration);

  // simplify component usage by wrapping plain strings in paragraphs
  const processedMessage =
    typeof message === 'string' ? <p>{message}</p> : message;
  const symbol = typeMap.symbol[type];
  const { hue, base } = typeMap.color[type];

  const cssColoring = `bg-${hue}-${base}`;

  return (
    <div
      className={concatClassNames(
        className,
        cssColoring,
        'shadow-2xl rounded flex flex-row p-6 text-white mt-4'
      )}
    >
      <div className="pr-8 pl-4 text-4xl flex content-center items-center">
        <Icon symbol={symbol} />
      </div>
      <div>
        {heading && <h2>{heading}</h2>}
        <div>{processedMessage}</div>
      </div>
    </div>
  );
};

export default ToastNotification;
