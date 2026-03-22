import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polyline, Circle, Line, Text as SvgText } from 'react-native-svg';

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

  // Sort data by date ascending
  const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));

  const weights = sorted.map(d => d.weight);
  const minW = Math.floor(Math.min(...weights)) - 1;
  const maxW = Math.ceil(Math.max(...weights)) + 1;
  const rangeW = maxW - minW || 1;

  const chartInnerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const chartInnerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const getX = (index) => {
    if (sorted.length === 1) return PADDING.left + chartInnerWidth / 2;
    return PADDING.left + (index / (sorted.length - 1)) * chartInnerWidth;
  };

  const getY = (weight) => {
    return PADDING.top + chartInnerHeight - ((weight - minW) / rangeW) * chartInnerHeight;
  };

  const points = sorted.map((d, i) => `${getX(i)},${getY(d.weight)}`).join(' ');

  // Y-axis labels (4 gridlines)
  const yLabels = [];
  for (let i = 0; i <= 4; i++) {
    const val = minW + (rangeW * i) / 4;
    const y = getY(val);
    yLabels.push({ val: val.toFixed(1), y });
  }

  // X-axis labels: show first, middle, last
  const xLabels = [];
  if (sorted.length >= 1) {
    const indices = sorted.length === 1
      ? [0]
      : sorted.length === 2
      ? [0, 1]
      : [0, Math.floor((sorted.length - 1) / 2), sorted.length - 1];

    indices.forEach(i => {
      const dateStr = sorted[i].date;
      const parts = dateStr.split('-');
      xLabels.push({
        label: `${parts[1]}/${parts[2]}`,
        x: getX(i),
      });
    });
  }

  return (
    <View style={styles.container}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        {/* Grid lines */}
        {yLabels.map((label, i) => (
          <React.Fragment key={i}>
            <Line
              x1={PADDING.left}
              y1={label.y}
              x2={CHART_WIDTH - PADDING.right}
              y2={label.y}
              stroke="#F0F0F0"
              strokeWidth={1}
            />
            <SvgText
              x={PADDING.left - 6}
              y={label.y + 4}
              textAnchor="end"
              fontSize={10}
              fill="#9E9E9E"
            >
              {label.val}
            </SvgText>
          </React.Fragment>
        ))}

        {/* X-axis labels */}
        {xLabels.map((label, i) => (
          <SvgText
            key={i}
            x={label.x}
            y={CHART_HEIGHT - 6}
            textAnchor="middle"
            fontSize={10}
            fill="#9E9E9E"
          >
            {label.label}
          </SvgText>
        ))}

        {/* Line */}
        {sorted.length > 1 && (
          <Polyline
            points={points}
            fill="none"
            stroke="#4CAF50"
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}

        {/* Data points */}
        {sorted.map((d, i) => (
          <Circle
            key={i}
            cx={getX(i)}
            cy={getY(d.weight)}
            r={4}
            fill="#4CAF50"
            stroke="#FFFFFF"
            strokeWidth={2}
          />
        ))}
      </Svg>

      {/* Legend */}
      {sorted.length > 0 && (
        <View style={styles.legend}>
          <Text style={styles.legendText}>
            最低: <Text style={styles.legendNum}>{Math.min(...weights).toFixed(1)} kg</Text>
          </Text>
          <Text style={styles.legendText}>
            最高: <Text style={styles.legendNum}>{Math.max(...weights).toFixed(1)} kg</Text>
          </Text>
          <Text style={styles.legendText}>
            最新: <Text style={[styles.legendNum, { color: '#4CAF50' }]}>
              {sorted[sorted.length - 1].weight.toFixed(1)} kg
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  empty: {
    height: CHART_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  emptyHint: {
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 4,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  legendText: {
    fontSize: 12,
    color: '#757575',
  },
  legendNum: {
    fontWeight: '600',
    color: '#333',
  },
});

export default WeightChart;
