/**
 * Settings Screen
 * App settings and preferences
 */

import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {colors, spacing, typography} from '../theme';
import {GradientCard, Button} from '../components';
import {useTheme} from '../contexts';

// Background colors for subtle gradient cards
const cardBaseColors = {
  light: colors.background.light,
  dark: colors.background.dark,
};
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from 'react-native-heroicons/solid';

export const SettingsScreen: React.FC = () => {
  const {theme, isDark, setTheme, toggleTheme} = useTheme();

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.background.dark : colors.background.light,
        },
      ]}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: isDark
                ? colors.text.primary.dark
                : colors.text.primary.light,
            },
          ]}>
          Settings
        </Text>
      </View>

      {/* Theme Toggle Section */}
      <GradientCard
        baseColor={isDark ? cardBaseColors.dark : cardBaseColors.light}
        useGradient={false}
        style={styles.card}>
        <View style={styles.settingHeader}>
          <Text
            style={[
              styles.cardText,
              {
                color: isDark
                  ? colors.text.primary.dark
                  : colors.text.primary.light,
              },
            ]}>
            Appearance
          </Text>
        </View>

        <Text
          style={[
            styles.cardSubtext,
            {
              color: isDark
                ? colors.text.secondary.dark
                : colors.text.secondary.light,
            },
          ]}>
          Choose your preferred theme
        </Text>

        <View style={styles.themeOptions}>
          <TouchableOpacity
            style={[
              styles.themeOption,
              {
                backgroundColor: isDark ? cardBaseColors.dark : cardBaseColors.light,
                borderColor: theme === 'light'
                  ? colors.primary
                  : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
              },
            ]}
            onPress={() => setTheme('light')}>
            <SunIcon
              size={24}
              color={theme === 'light' ? colors.primary : (isDark ? colors.text.secondary.dark : colors.text.secondary.light)}
            />
            <Text
              style={[
                styles.themeOptionText,
                {
                  color: theme === 'light' ? colors.primary : (isDark ? colors.text.primary.dark : colors.text.primary.light),
                },
              ]}>
              Light
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeOption,
              {
                backgroundColor: isDark ? cardBaseColors.dark : cardBaseColors.light,
                borderColor: theme === 'dark'
                  ? colors.primary
                  : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
              },
            ]}
            onPress={() => setTheme('dark')}>
            <MoonIcon
              size={24}
              color={theme === 'dark' ? colors.primary : (isDark ? colors.text.secondary.dark : colors.text.secondary.light)}
            />
            <Text
              style={[
                styles.themeOptionText,
                {
                  color: theme === 'dark' ? colors.primary : (isDark ? colors.text.primary.dark : colors.text.primary.light),
                },
              ]}>
              Dark
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeOption,
              {
                backgroundColor: isDark ? cardBaseColors.dark : cardBaseColors.light,
                borderColor: theme === 'system'
                  ? colors.primary
                  : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
              },
            ]}
            onPress={() => setTheme('system')}>
            <ComputerDesktopIcon
              size={24}
              color={theme === 'system' ? colors.primary : (isDark ? colors.text.secondary.dark : colors.text.secondary.light)}
            />
            <Text
              style={[
                styles.themeOptionText,
                {
                  color: theme === 'system' ? colors.primary : (isDark ? colors.text.primary.dark : colors.text.primary.light),
                },
              ]}>
              System
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.currentThemeText,
            {
              color: isDark
                ? colors.text.secondary.dark
                : colors.text.secondary.light,
            },
          ]}>
          Current: {theme === 'system' ? `System (${isDark ? 'Dark' : 'Light'})` : theme.charAt(0).toUpperCase() + theme.slice(1)} mode
        </Text>
      </GradientCard>

      <GradientCard
        baseColor={isDark ? cardBaseColors.dark : cardBaseColors.light}
        useGradient={false}
        style={styles.card}>
        <Text
          style={[
            styles.cardText,
            {
              color: isDark
                ? colors.text.primary.dark
                : colors.text.primary.light,
            },
          ]}>
          Account Settings
        </Text>
        <Text
          style={[
            styles.cardSubtext,
            {
              color: isDark
                ? colors.text.secondary.dark
                : colors.text.secondary.light,
            },
          ]}>
          Manage your profile and preferences
        </Text>
      </GradientCard>

      <GradientCard
        baseColor={isDark ? cardBaseColors.dark : cardBaseColors.light}
        useGradient={false}
        style={styles.card}>
        <Text
          style={[
            styles.cardText,
            {
              color: isDark
                ? colors.text.primary.dark
                : colors.text.primary.light,
            },
          ]}>
          Notifications
        </Text>
        <Text
          style={[
            styles.cardSubtext,
            {
              color: isDark
                ? colors.text.secondary.dark
                : colors.text.secondary.light,
            },
          ]}>
          Control your notification preferences
        </Text>
      </GradientCard>

      <GradientCard
        baseColor={isDark ? cardBaseColors.dark : cardBaseColors.light}
        useGradient={false}
        style={styles.card}>
        <Text
          style={[
            styles.cardText,
            {
              color: isDark
                ? colors.text.primary.dark
                : colors.text.primary.light,
            },
          ]}>
          Privacy & Security
        </Text>
        <Text
          style={[
            styles.cardSubtext,
            {
              color: isDark
                ? colors.text.secondary.dark
                : colors.text.secondary.light,
            },
          ]}>
          Manage your data and security settings
        </Text>
      </GradientCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.screenPadding,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
  },
  card: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.md,
  },
  settingHeader: {
    marginBottom: spacing.sm,
  },
  cardText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing.xs,
  },
  cardSubtext: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    marginBottom: spacing.md,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  themeOption: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: spacing.radius.md,
    borderWidth: 2,
  },
  themeOptionText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.medium,
    marginTop: spacing.xs,
  },
  currentThemeText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
