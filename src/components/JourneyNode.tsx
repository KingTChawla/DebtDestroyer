/**
 * JourneyNode Component
 * Visual connection node between goals with upward progression line
 */

import React from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
import {GoalState} from '../types';
import {colors, spacing, shadows} from '../theme';
import {getColor, emeraldShadow, sapphireNight} from '../theme/colorsLibrary';
import {
  CheckCircleIcon,
  HomeIcon,
  FlagIcon,
  ShieldCheckIcon,
} from 'react-native-heroicons/solid';

interface JourneyNodeProps {
  state: GoalState;
  icon?: string;
  showConnectorAbove?: boolean;
  showConnectorBelow?: boolean;
}

export const JourneyNode: React.FC<JourneyNodeProps> = ({
  state,
  icon = 'home',
  showConnectorAbove = false,
  showConnectorBelow = false,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getStateColor = (state: GoalState): string => {
    switch (state) {
      case 'achieved':
        return getColor(emeraldShadow, isDark);
      case 'active':
        return getColor(sapphireNight, isDark);
      case 'future':
        return isDark ? '#555555' : '#CCCCCC';
      default:
        return isDark ? '#555555' : '#CCCCCC';
    }
  };

  const getIconComponent = () => {
    const stateColor = getStateColor(state);
    const iconSize = 24;
    const iconColor = state === 'future' ? '#999999' : '#FFFFFF';

    switch (icon) {
      case 'home':
        return <HomeIcon size={iconSize} color={iconColor} />;
      case 'flag':
        return <FlagIcon size={iconSize} color={iconColor} />;
      case 'shield-check':
        return <ShieldCheckIcon size={iconSize} color={iconColor} />;
      case 'check':
        return <CheckCircleIcon size={iconSize} color={iconColor} />;
      default:
        return <CheckCircleIcon size={iconSize} color={iconColor} />;
    }
  };

  const stateColor = getStateColor(state);

  return (
    <View style={styles.container}>
      {/* Connector Line Above */}
      {showConnectorAbove && (
        <View
          style={[
            styles.connectorLine,
            {
              backgroundColor: stateColor,
              bottom: '50%',
            },
          ]}
        />
      )}

      {/* Node Circle */}
      <View
        style={[
          styles.nodeCircle,
          {
            backgroundColor: stateColor,
            borderColor: stateColor,
          },
          state === 'active' && shadows.lg,
        ]}>
        {getIconComponent()}
      </View>

      {/* Connector Line Below */}
      {showConnectorBelow && (
        <View
          style={[
            styles.connectorLine,
            {
              backgroundColor: stateColor,
              top: '50%',
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'relative',
    minHeight: 80,
  },
  nodeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    zIndex: 2,
  },
  connectorLine: {
    position: 'absolute',
    width: 4,
    height: 40,
    left: '50%',
    marginLeft: -2,
    zIndex: 1,
  },
});
