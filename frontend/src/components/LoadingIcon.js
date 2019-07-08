import React, { useEffect, useRef } from 'react';

import Icon from './Icon';

const LoadingIcon = ({ isLoading, alwaysOccupySpace }) => {
  // determine if node should be completely removed
  if (!isLoading && !alwaysOccupySpace) return null;

  return (
    <Icon
      icon="cog"
      css={`ml-2 text-white transition mode--instant spin ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};

export default LoadingIcon;
