import React from 'react';

import Icon from '../Icon';

import { concatClassNames } from '../../utils/classNames';
import { ProgressDonut } from '../animations/ProgressDonut';

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
  duration = 4000,
}) => {
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
      <div className="mr-8 ml-4 text-4xl flex items-center justify-center">
        <Icon symbol={symbol} />
        <ProgressDonut
          duration={duration}
          onRest={handleRemove} // trigger removal when animation ends
          stroke="white"
          className="w-12 h-12 rotate-270 absolute"
        />
      </div>
      <div>
        {heading && <h2>{heading}</h2>}
        <div>{processedMessage}</div>
      </div>
    </div>
  );
};

export default ToastNotification;
