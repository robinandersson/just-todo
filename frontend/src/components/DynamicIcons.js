import React, { useEffect, useRef } from 'react';

import Icon from './Icon';
import { usePrevious, useForceUpdate } from '../utils/stateHooks';
import { concatClassNames } from '../utils/classNames';

const DynamicIcon = ({
  icon,
  className,
  isVisible = true,
  alwaysOccupySpace = false,
}) => {
  if (!isVisible && !alwaysOccupySpace) return null;

  const opacity = isVisible ? 'opacity-100' : 'opacity-0';
  const css = concatClassNames(className, opacity);

  return <Icon icon={icon} className={css} />;
};

const LoadingIcon = ({ isVisible = true, alwaysOccupySpace = false }) => (
  <DynamicIcon
    icon="cog"
    className="ml-2 text-white transition mode--instant spin"
    isVisible={isVisible}
    alwaysOccupySpace={alwaysOccupySpace}
  />
);

const SuccessIcon = ({ isVisible = true, alwaysOccupySpace = false }) => (
  <DynamicIcon
    icon="check"
    className="ml-2 text-white transition mode--instant"
    isVisible={isVisible}
    alwaysOccupySpace={alwaysOccupySpace}
  />
);

const FailureIcon = ({ isVisible = true, alwaysOccupySpace = false }) => (
  <DynamicIcon
    icon="cross"
    className="ml-2 text-white transition mode--instant"
    isVisible={isVisible}
    alwaysOccupySpace={alwaysOccupySpace}
  />
);

// TODO: Redo using 'status' prop instead (e.g. ['loading', 'success', 'failure'])
const DynamicLoadingOutcomeIcon = ({
  isLoading,
  isSuccessful,
  alwaysOccupySpace = false,
  autoHideTimer = 2500,
}) => {
  const previousStatus = usePrevious(isLoading);
  const forceUpdate = useForceUpdate();
  const timerRef = useRef();

  // clean up timeout (observe the curry – clear occurs on unmount)
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Show loading icon if loading or wasn't previously loading (i.e. current state can't be success or failure).
  // Let LoadingIcon determine if it should occupy space regardless.
  if (isLoading || !previousStatus) {
    return (
      <LoadingIcon
        isVisible={isLoading}
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
    <SuccessIcon isVisible={true} alwaysOccupySpace={alwaysOccupySpace} />
  ) : (
    <FailureIcon isVisible={true} alwaysOccupySpace={alwaysOccupySpace} />
  );
};

export { LoadingIcon, SuccessIcon, FailureIcon, DynamicLoadingOutcomeIcon };
