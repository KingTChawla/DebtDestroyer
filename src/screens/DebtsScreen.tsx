/**
 * Debts Screen
 * List of all debts with snowball order
 */

import React from 'react';
import {View, Text, StyleSheet, useColorScheme, ScrollView} from 'react-native';
import {colors, spacing, typography} from '../theme';
import {Card, Button} from '../components';

export const DebtsScreen: React.FC = () => {
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
          My Debts
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: isDark
                ? colors.text.secondary.dark
                : colors.text.secondary.light,
            },
          ]}>
          Track and manage all your debts
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
          No debts added yet
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
          Add your first debt to start your debt-free journey
        </Text>
      </Card>

      <Button
        title="Add Debt"
        onPress={() => console.log('Add debt')}
        variant="primary"
        style={styles.button}
      />
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
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
  },
  card: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.md,
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  cardText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  cardSubtext: {
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: spacing.screenPadding,
  },
});
