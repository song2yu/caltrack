import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 48;
const CHART_HEIGHT = 180;
const PADDING = { top: 20, right: 16, bottom: 40, left: 44 };

const WeightChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>暂无体重数据</Text>
        <Text style={styles.emptyHint}>开始记录您的体重趋势</Text>
      </View>
    );
  }

  const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
  const weights = sorted.map(d => parseFloat(d.weight));
  const minW = Math.floor(Math.min(...weights)) - 1;
  const maxW = Math.ceil(Math.max(...weights)) + 1;
  const rangeW = maxW - minW || 1;

  const innerW = CHART_WIDTH - PADDING.left - PADDING.right;
  const innerH = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const getX = (i) => sorted.length === 1
    ? PADDING.left + innerW / 2
    : PADDING.left + (i / (sorted.length - 1)) * innerW;

  const getPct = (w) => 1 - (w - minW) / rangeW;

  // Y-axis labels
  const yLabels = [0, 0.25, 0.5, 0.75, 1].map(pct => ({
    val: (maxW - pct * rangeW).toFixed(1),
    pct,
  }));

  // X-axis labels: first, middle, last
  const xIndices = sorted.length <= 1 ? [0]
    : sorted.length === 2 ? [0, 1]
    : [0, Math.floor((sorted.length - 1) / 2), sorted.length - 1];

  return (
    <View style={styles.container}>
      {/* Chart area */}
      <View style={{ width: CHART_WIDTH, height: CHART_HEIGHT }}>

        {/* Y-axis labels + grid lines */}
        {yLabels.map((l, i) => (
          <View key={i} style={{
            position: 'absolute',
            top: PADDING.top + l.pct * innerH - 7,
            left: 0,
            width: CHART_WIDTH,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text style={styles.axisLabel}>{l.val}</Text>
            <View style={styles.gridLine} />
          </View>
        ))}

        {/* Data points and connecting lines */}
        {sorted.map((d, i) => {
          const x = getX(i);
          const pct = getPct(parseFloat(d.weight));
          const y = PADDING.top + pct * innerH;

          // Line to next point
          const nextLine = i < sorted.length - 1 ? (() => {
            const nx = getX(i + 1);
            const ny = PADDING.top + getPct(parseFloat(sorted[i + 1].weight)) * innerH;
            const dx = nx - x;
            const dy = ny - y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            return { len, angle, x, y };
          })() : null;

          return (
            <React.Fragment key={i}>
              {nextLine && (
                <View style={{
                  position: 'absolute',
                  left: nextLine.x,
                  top: nextLine.y,
                  width: nextLine.len,
                  height: 2.5,
                  backgroundColor: '#4CAF50',
                  transformOrigin: 'left center',
                  transform: [{ rotate: `${nextLine.angle}deg` }],
                }} />
              )}
              <View style={{
                position: 'absolute',
                left: x - 5,
                top: y - 5,
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: '#4CAF50',
                borderWidth: 2,
                borderColor: '#fff',
              }} />
            </React.Fragment>
          );
        })}

        {/* X-axis labels */}
        {xIndices.map(i => {
          const parts = sorted[i].date.split('-');
          return (
            <Text key={i} style={[styles.axisLabel, {
              position: 'absolute',
              bottom: 4,
              left: getX(i) - 16,
              width: 32,
              textAlign: 'center',
            }]}>
              {`${parts[1]}/${parts[2]}`}
            </Text>
          );
        })}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendText}>
          最低: <Text style={styles.legendNum}>{Math.min(...weights).toFixed(1)} kg</Text>
        </Text>
        <Text style={styles.legendText}>
          最高: <Text style={styles.legendNum}>{Math.max(...weights).toFixed(1)} kg</Text>
        </Text>
        <Text style={styles.legendText}>
          最新: <Text style={[styles.legendNum, { color: '#4CAF50' }]}>
            {weights[weights.length - 1].toFixed(1)} kg
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  empty: {
    height: CHART_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { fontSize: 16, color: '#9E9E9E' },
  emptyHint: { fontSize: 12, color: '#BDBDBD', marginTop: 4 },
  axisLabel: { fontSize: 10, color: '#9E9E9E', width: 36, textAlign: 'right', marginRight: 4 },
  gridLine: { flex: 1, height: 1, backgroundColor: '#F0F0F0' },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  legendText: { fontSize: 12, color: '#757575' },
  legendNum: { fontWeight: '600', color: '#333' },
});

export default WeightChart;
