import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';

/*
 * The Donut is just a circle with partially filled stroke - based on the percentage prop (no animation).
 *
 * Use the ProgressDonut for an animating donut.
 */
const Donut = ({
  percentage,
  stroke = 'black',
  width = 25,
  height = 25,
  strokeWidth = 2,
  className = 'w-12 h-12 rotate-270',
}) => {
  /* All these specs and calculations are needed to get the strokeDasharray and strokeDashoffset right (for specifying
   * how filled the circle will be). It's not as easy as one might expect -.- */
  const radius = width / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = circumference * (1 - percentage / 100);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      stroke={stroke}
      strokeDasharray={circumference}
      strokeDashoffset={progress}
      strokeWidth={strokeWidth}
    >
      <title>Progress-Icon</title>
      <circle cx={width / 2} cy={height / 2} r={radius} />
    </svg>
  );
};

/*
 * This is an animating donut (partially filled circle), filling the circle from 0% to 100%, timed by the duration prop.
 *
 * Customize through the props - stroke (color string), duration (ms), onRest (function specifying what should happen
 * when the animation ends (e.g. remove parent element), and className.
 */
const ProgressDonut = ({
  stroke = 'black',
  duration = 4000,
  onRest,
  className,
}) => {
  const AnimatedDonut = useRef(animated(Donut)).current; // needs ref, otherwise bugs galore when updating parent state

  // react spring updates the percentage prop to the Donut component on each render
  const progress = useSpring({
    config: { duration, clamp: true },
    from: { percentage: 0 },
    to: { percentage: 100 },
    onRest,
  });

  return (
    <AnimatedDonut
      percentage={progress.percentage}
      stroke={stroke}
      className={className}
    />
  );
};

export { ProgressDonut };
