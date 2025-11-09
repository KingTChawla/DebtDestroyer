/**
 * Settings Screen
 * App settings and preferences
 */

import React from 'react';
import {View, Text, StyleSheet, useColorScheme, ScrollView} from 'react-native';
import {colors, spacing, typography} from '../theme';
import {Card} from '../components';

export const SettingsScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? colors.background.dark
            : colors.background.light,
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

      <Card style={styles.card}>
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
      </Card>

      <Card style={styles.card}>
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
      </Card>

      <Card style={styles.card}>
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
      </Card>
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
  cardText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing.xs,
  },
  cardSubtext: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
  },
});
