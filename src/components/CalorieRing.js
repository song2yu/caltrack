import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CalorieRing({ intake = 0, goal = 2000, burned = 0, size = 200 }) {
  const net = intake - burned;
  const pct = Math.min(net / goal, 1);
  const remaining = Math.max(goal - net, 0);

  // Draw arc using rotated View segments
  const strokeWidth = size * 0.08;
  const r = (size - strokeWidth) / 2;
  const segments = 36;
  const filled = Math.round(pct * segments);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Arc segments */}
      <View style={{ position: 'absolute', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        {Array.from({ length: segments }).map((_, i) => {
          const angle = (i / segments) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = size / 2 + r * Math.cos(rad) - strokeWidth / 2;
          const y = size / 2 + r * Math.sin(rad) - strokeWidth / 2;
          const isActive = i < filled;
          return (
            <View
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: strokeWidth,
                height: strokeWidth,
                borderRadius: strokeWidth / 2,
                backgroundColor: isActive
                  ? net > goal ? '#FF5252' : '#69F0AE'
                  : 'rgba(255,255,255,0.15)',
              }}
            />
          );
        })}
      </View>

      {/* Center text */}
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: size * 0.18, fontWeight: 'bold', color: '#FFFFFF' }}>
          {Math.round(net)}
        </Text>
        <Text style={{ fontSize: size * 0.07, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
          千卡
        </Text>
        <Text style={{ fontSize: size * 0.065, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
          剩余 {Math.round(remaining)}
        </Text>
      </View>
    </View>
  );
}
