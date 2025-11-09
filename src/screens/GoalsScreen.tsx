/**
 * Goals & Challenges Screen
 * Active Play Mode - Gamified engagement with progress tracking
 */

import React from 'react';
import {View, Text, StyleSheet, useColorScheme, ScrollView} from 'react-native';
import {colors, spacing, typography, shadows} from '../theme';
import {Card, GoalCard, ChallengeCard, Badge, Button} from '../components';
import {
  mockGoals,
  mockUserChallenges,
  mockUserProgress,
  mockBadges,
} from '../services/mockData';
import {FireIcon} from 'react-native-heroicons/solid';

export const GoalsScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const activeGoals = mockGoals.filter(g => g.status === 'active');
  const activeChallenges = mockUserChallenges.filter(c => c.status === 'active');
  const unlockedBadges = mockBadges.filter(b => b.unlockedAt);
  const lockedBadges = mockBadges.filter(b => !b.unlockedAt);

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
      {/* XP & Level Card */}
      <View style={styles.section}>
        <Card style={styles.xpCard} variant="elevated">
          <View style={styles.xpHeader}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Level {mockUserProgress.level}</Text>
            </View>
            <View style={styles.xpInfo}>
              <Text
                style={[
                  styles.xpLabel,
                  {
                    color: isDark
                      ? colors.text.secondary.dark
                      : colors.text.secondary.light,
                  },
                ]}>
                Experience Points
              </Text>
              <Text
                style={[
                  styles.xpValue,
                  {
                    color: isDark
                      ? colors.text.primary.dark
                      : colors.text.primary.light,
                  },
                ]}>
                {mockUserProgress.xp} / {mockUserProgress.xpToNextLevel}
              </Text>
            </View>
          </View>
          <View style={styles.xpBarContainer}>
            <View style={styles.xpBar}>
              <View
                style={[
                  styles.xpBarFill,
                  {
                    width: `${
                      (mockUserProgress.xp / mockUserProgress.xpToNextLevel) *
                      100
                    }%`,
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.streakContainer}>
            <View style={styles.streakRow}>
              <FireIcon size={20} color={colors.warning} />
              <Text style={styles.streakText}>
                {mockUserProgress.currentStreak} Day Streak
              </Text>
            </View>
            <Text
              style={[
                styles.streakSubtext,
                {
                  color: isDark
                    ? colors.text.secondary.dark
                    : colors.text.secondary.light,
                },
              ]}>
              Best: {mockUserProgress.longestStreak} days
            </Text>
          </View>
        </Card>
      </View>

      {/* Active Goals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: isDark
                  ? colors.text.primary.dark
                  : colors.text.primary.light,
              },
            ]}>
            Your Goals ({activeGoals.length})
          </Text>
          <Button
            title="+ New Goal"
            onPress={() => console.log('New Goal')}
            variant="text"
            size="small"
          />
        </View>
        {activeGoals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onPress={() => console.log('Goal pressed:', goal.id)}
          />
        ))}
      </View>

      {/* Active Challenges */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDark
                ? colors.text.primary.dark
                : colors.text.primary.light,
            },
          ]}>
          Active Challenges ({activeChallenges.length})
        </Text>
        {activeChallenges.map(challenge => (
          <ChallengeCard
            key={challenge.id}
            userChallenge={challenge}
            onPress={() => console.log('Challenge pressed:', challenge.id)}
          />
        ))}
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDark
                ? colors.text.primary.dark
                : colors.text.primary.light,
            },
          ]}>
          Achievements
        </Text>
        <Card style={styles.badgesCard}>
          <Text
            style={[
              styles.badgesSubtitle,
              {
                color: isDark
                  ? colors.text.secondary.dark
                  : colors.text.secondary.light,
              },
            ]}>
            Unlocked ({unlockedBadges.length} of {mockBadges.length})
          </Text>
          <View style={styles.badgesGrid}>
            {mockBadges.map(badge => (
              <Badge
                key={badge.id}
                icon={badge.icon}
                label={badge.name}
                unlocked={!!badge.unlockedAt}
                size="medium"
              />
            ))}
          </View>
        </Card>
      </View>

      {/* Stats Card */}
      <View style={[styles.section, styles.lastSection]}>
        <Card style={styles.statsCard}>
          <Text
            style={[
              styles.statsTitle,
              {
                color: isDark
                  ? colors.text.primary.dark
                  : colors.text.primary.light,
              },
            ]}>
            Your Stats
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: colors.success}]}>
                {mockUserProgress.totalDebtsCompleted}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {
                    color: isDark
                      ? colors.text.secondary.dark
                      : colors.text.secondary.light,
                  },
                ]}>
                Debts Paid Off
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: colors.primary}]}>
                {unlockedBadges.length}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {
                    color: isDark
                      ? colors.text.secondary.dark
                      : colors.text.secondary.light,
                  },
                ]}>
                Badges Earned
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, {color: colors.accent}]}>
                {mockUserProgress.level}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {
                    color: isDark
                      ? colors.text.secondary.dark
                      : colors.text.secondary.light,
                  },
                ]}>
                Current Level
              </Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.screenPadding,
    marginTop: spacing.lg,
  },
  lastSection: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    marginBottom: spacing.md,
  },

  // XP Card
  xpCard: {
    padding: spacing.lg,
  },
  xpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  levelBadge: {
    backgroundColor: colors.primary,
    borderRadius: spacing.radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.md,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
  },
  xpInfo: {
    flex: 1,
  },
  xpLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    marginBottom: spacing.xs / 2,
  },
  xpValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
  },
  xpBarContainer: {
    marginBottom: spacing.md,
  },
  xpBar: {
    height: 12,
    backgroundColor: colors.border.light,
    borderRadius: spacing.radius.full,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: spacing.radius.full,
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  streakText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    color: colors.warning,
  },
  streakSubtext: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
  },

  // Badges
  badgesCard: {
    padding: spacing.lg,
  },
  badgesSubtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    marginBottom: spacing.md,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-around',
  },

  // Stats
  statsCard: {
    padding: spacing.lg,
  },
  statsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
  },
  bottomPadding: {
    height: spacing.xl,
  },
});
