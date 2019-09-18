import React, { useEffect, useRef } from 'react';

import Icon from './Icon';

import { usePrevious, useForceUpdate } from '../../utils/stateHooks';
import { concatClassNames } from '../../utils/classNames';

const DynamicIcon = ({
  symbol,
  className,
  isVisible = true,
  alwaysOccupySpace = false,
  ...props
}) => {
  if (!isVisible && !alwaysOccupySpace) return null;

  const opacity = isVisible ? 'opacity-100' : 'opacity-0';
  const css = concatClassNames(className, opacity);

  return <Icon symbol={symbol} className={css} {...props} />;
};

const LoadingIcon = ({
  className,
  isVisible = true,
  alwaysOccupySpace = false,
  ...props
}) => (
  <DynamicIcon
    symbol="cog"
    className={concatClassNames('ml-2 transition animate-spin', className)}
    isVisible={isVisible}
    alwaysOccupySpace={alwaysOccupySpace}
    {...props}
  />
);

const SuccessIcon = ({
  className,
  isVisible = true,
  alwaysOccupySpace = false,
  ...props
}) => (
  <DynamicIcon
    symbol="check"
    className={concatClassNames('ml-2 transition animate-instant', className)}
    isVisible={isVisible}
    alwaysOccupySpace={alwaysOccupySpace}
    {...props}
  />
);

const FailureIcon = ({
  className,
  isVisible = true,
  alwaysOccupySpace = false,
  ...props
}) => (
  <DynamicIcon
    symbol="cross"
    className={concatClassNames('ml-2 transition animate-instant', className)}
    isVisible={isVisible}
    alwaysOccupySpace={alwaysOccupySpace}
    {...props}
  />
);

// TODO: Redo using 'status' prop instead (e.g. ['loading', 'success', 'failure'])
// TODO: Refactor component to be more general/dynamic - e.g. accept different icons as props
const DynamicLoadingOutcomeIcon = ({
  isLoading,
  isSuccessful,
  alwaysOccupySpace = false,
  autoHideTimer = 2500,
  css = {},
  className,
}) => {
  const previousLoadingStatus = usePrevious(isLoading);
  const forceUpdate = useForceUpdate();
  const timerRef = useRef();

  const { loadingCSS, successCSS, failureCSS } = css;

  // clean up timeout (observe the curry – clear occurs on unmount)
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Show loading icon if loading or wasn't previously loading (i.e. current state can't be success or failure).
  // Let LoadingIcon determine if it should occupy space regardless.
  if (isLoading || !previousLoadingStatus) {
    return (
      <LoadingIcon
        className={concatClassNames(className, loadingCSS)}
        isVisible={!!isLoading} // need explicit boolean, otherwise LoadingIcon defaults prop to true
        alwaysOccupySpace={alwaysOccupySpace}
      />
    );
  }

  if (autoHideTimer > 0) {
    timerRef.current = setTimeout(() => {
      forceUpdate();
    }, autoHideTimer);
  }

  return isSuccessful ? (
    <SuccessIcon
      className={concatClassNames(className, successCSS)}
      isVisible={true}
      alwaysOccupySpace={alwaysOccupySpace}
    />
  ) : (
    <FailureIcon
      className={concatClassNames(className, failureCSS)}
      isVisible={true}
      alwaysOccupySpace={alwaysOccupySpace}
    />
  );
};

export { LoadingIcon, SuccessIcon, FailureIcon, DynamicLoadingOutcomeIcon };
