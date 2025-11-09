/**
 * WelcomeScreen - First screen users see
 * Simple, clean introduction to Debt Destroyer
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors, ColorScheme, spacing} from '../theme';
import {APP_NAME, APP_TAGLINE, CURRENT_PHASE, PHASE_STATUS} from '../constants';
import {Button} from '../components';
import {RootStackParamList} from '../types';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

export const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const colorScheme = useColorScheme() as ColorScheme;
  const isDark = colorScheme === 'dark';

  const handleGetStarted = () => {
    navigation.navigate('Onboarding');
  };

  const handleSkipToApp = () => {
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: colors.background[colorScheme]},
      ]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background[colorScheme]}
      />

      <View style={styles.content}>
        {/* App Title */}
        <Text style={[styles.title, {color: colors.primary}]}>
          {APP_NAME}
        </Text>

        {/* Tagline */}
        <Text
          style={[
            styles.tagline,
            {color: colors.text.secondary[colorScheme]},
          ]}>
          {APP_TAGLINE}
        </Text>

        {/* Feature Highlights */}
        <View style={styles.featuresContainer}>
          <FeatureItem
            emoji="🎯"
            text="Debt Snowball Strategy"
            colorScheme={colorScheme}
          />
          <FeatureItem
            emoji="🔥"
            text="Daily Habit Loop"
            colorScheme={colorScheme}
          />
          <FeatureItem
            emoji="👥"
            text="Companion Mode for Couples"
            colorScheme={colorScheme}
          />
        </View>

        {/* Get Started Button */}
        <Button
          title="Get Started"
          onPress={handleGetStarted}
          variant="primary"
          size="large"
          fullWidth
          style={styles.button}
        />

        {/* Skip to App (for testing) */}
        <Button
          title="Skip to App"
          onPress={handleSkipToApp}
          variant="text"
          size="medium"
          fullWidth
          style={styles.skipButton}
        />

        {/* Status */}
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.statusText,
              {color: colors.text.secondary[colorScheme]},
            ]}>
            {CURRENT_PHASE}
          </Text>
          <Text style={[styles.statusBadge, {color: colors.success}]}>
            ✓ {PHASE_STATUS}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

interface FeatureItemProps {
  emoji: string;
  text: string;
  colorScheme: ColorScheme;
}

const FeatureItem = ({emoji, text, colorScheme}: FeatureItemProps) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureEmoji}>{emoji}</Text>
    <Text
      style={[
        styles.featureText,
        {color: colors.text.primary[colorScheme]},
      ]}>
      {text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    fontFamily: 'HelveticaNeue-Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'HelveticaNeue',
    marginBottom: 48,
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  button: {
    width: '100%',
    marginBottom: spacing.sm,
  },
  skipButton: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  featureEmoji: {
    fontSize: 28,
    fontFamily: 'HelveticaNeue',
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'HelveticaNeue-Medium',
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 32,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'HelveticaNeue',
    marginBottom: 8,
  },
  statusBadge: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'HelveticaNeue-Medium',
  },
});
