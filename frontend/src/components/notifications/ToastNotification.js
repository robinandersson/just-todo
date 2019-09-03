import React, { useRef, useEffect } from 'react';

import Icon from '../Icon';
import { withRouter } from 'react-router-dom';

import { concatClassNames } from '../../utils/classNames';
import { ProgressDonut } from '../animations/ProgressDonut';

// defaults for the four base notification types
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

/*
 * A toast notification for displaying status messages to the user.
 *
 * The messages comes in four flavours, each with their own icon, style, and default heading. It can by customized by
 * specifying it's heading (or supplying false to remove heading), message, type, etc. It's message accepts JSX (or
 * defaults a string to be wrapped in a paragraph).
 *
 * The component should be positioned by the parent container (or by supplying styles through className).
 */
const ToastNotification = ({
  className,
  handleRemove,
  type,
  heading = typeMap.heading[type],
  message,
  duration = 4000,
  location,
  // limitTo-array specifies routes the notification should be limited to (unmounts if current route is not in set)
  // Observe! Defaults to initial route in code below (can't use ES6 default param since location-prop changes on each
  // render).
  // Double Observe! If notification is sent after some async process (e.g. login failure), then user may change route
  // before notification is sent (thus changing default limitTo-location). Specifically pass limitTo prop to be sure.
  // Pro Tip! Pass empty array to allow array to stay regardless of route change
  limitTo,
}) => {
  // TODO: Add option to close notification on click.
  // TODO: Expand component to allow notification that doesn't remove itself automatically

  // simplify component usage by wrapping plain strings in paragraphs
  const processedMessage =
    typeof message === 'string' ? <p>{message}</p> : message;
  const symbol = typeMap.symbol[type];
  const { hue, base } = typeMap.color[type];

  const cssColoring = `bg-${hue}-${base}`;
  const initialRouteRef = useRef(location.pathname);

  useEffect(() => {
    // remove notification if accessing route outside it's limits (defaults to limit to current route)
    if (
      limitTo
        ? !limitTo.includes(location.pathname)
        : initialRouteRef.current !== location.pathname
    ) {
      /* Need to put removal handler at the end of js-event queue to avoid possible memory leak stemming from React
      Spring animation trying to update the unmounted component. Shouldn't have to, but simply stopping animation etc.
      doesn't help. (React Spring documentation does not cover this, but a official forum thread has been created by
      yours truly) */
      setTimeout(handleRemove, 0);
    }
  }, [location, limitTo, handleRemove]);

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
      <div className="flex-grow">
        <div className="flex flex-row justify-between">
          {heading && <h2>{heading}</h2>}
          <button
            className="self-center justify-end px-2 py-1 focus:text-blue-600 active:text-blue-600 active:shadow-none active:outline-none hover:text-gray-300 cursor-pointer inline-block focus:outline-none focus:shadow-outline"
            onClick={handleRemove}
          >
            <Icon symbol={'cross'} className="" size="lg" />
          </button>
        </div>
        <div>{processedMessage}</div>
      </div>
    </div>
  );
};

export default withRouter(ToastNotification);
