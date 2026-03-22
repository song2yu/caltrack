import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const CalorieRing = ({ intake = 0, goal = 2000, burned = 0, size = 200 }) => {
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;

  const progress = Math.min(intake / goal, 1);
  const progressOffset = circumference - progress * circumference;

  const net = intake - burned;
  const remaining = Math.max(goal - intake, 0);

  // Arc using SVG Path for rounded ends
  const getArcPath = (percent) => {
    const angle = percent * 360;
    const startAngle = -90; // Start from top
    const endAngle = startAngle + angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    if (percent >= 1) {
      // Full circle
      return `M ${cx} ${cy - radius} A ${radius} ${radius} 0 1 1 ${cx - 0.01} ${cy - radius} Z`;
    }

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  const isOverGoal = intake > goal;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background track */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress arc */}
        {progress > 0 && (
          <Path
            d={getArcPath(Math.min(progress, 0.9999))}
            stroke={isOverGoal ? '#FF7043' : '#4CAF50'}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
          />
        )}
      </Svg>
      {/* Center text */}
      <View style={styles.center}>
        <Text style={[styles.intakeNum, { color: isOverGoal ? '#FF7043' : '#4CAF50' }]}>
          {Math.round(intake)}
        </Text>
        <Text style={styles.intakeLabel}>千卡已摄入</Text>
        <View style={styles.divider} />
        <Text style={styles.remainLabel}>
          {isOverGoal ? '已超出' : '剩余'}{' '}
          <Text style={[styles.remainNum, { color: isOverGoal ? '#FF7043' : '#333' }]}>
            {isOverGoal ? Math.round(intake - goal) : Math.round(remaining)}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intakeNum: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  intakeLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 6,
  },
  remainLabel: {
    fontSize: 12,
    color: '#757575',
  },
  remainNum: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CalorieRing;
