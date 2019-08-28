import React from 'react';
import { useSpring, animated } from 'react-spring';

const Donut = ({
  percentage,
  stroke = 'black',
  className = 'w-12 h-12 rotate-270',
}) => {
  const width = 25;
  const height = 25;

  const strokeWidth = 2;
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

const ProgressDonut = ({ stroke, duration, onRest, className }) => {
  const AnimatedDonut = animated(Donut);

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
