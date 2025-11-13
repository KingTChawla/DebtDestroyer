/**
 * Goals & Challenges Screen
 * Active Play Mode - Gamified engagement with two tabs: Challenges and Goals
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {colors, spacing, typography} from '../theme';
import {useTheme} from '../contexts';
import {
  SegmentedControl,
  StreakBanner,
  DailyChallengeCard,
  ExtendedChallengeCard,
  MilestoneBanner,
  JourneyNode,
  QuestGoalCard,
  JourneyHeader,
} from '../components';
import {
  mockDailyChallenges,
  mockExtendedChallenges,
  mockStreakData,
} from '../data/mockChallenges';
import {mockGoals, mockMilestoneData} from '../data/mockGoals';
import {TouchableOpacity} from 'react-native';

export const GoalsChallengesScreen: React.FC = () => {
  const {isDark} = useTheme();
  const [selectedTab, setSelectedTab] = useState(0); // 0 = Challenges, 1 = Goals
  const [challengeFilter, setChallengeFilter] = useState<'weekly' | 'monthly'>('weekly');

  const styles = getStyles(isDark);

  const renderChallengesTab = () => {
    const filteredChallenges = mockExtendedChallenges.filter(
      c => c.type === challengeFilter
    );

    return (
      <View style={styles.tabContent}>
        {/* Streak Banner */}
        <StreakBanner
          currentStreak={mockStreakData.currentStreak}
          onViewProgress={() => console.log('View Progress')}
        />

        {/* Daily Focus Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Daily Focus
          </Text>

          <View style={styles.dailyGrid}>
            {mockDailyChallenges.map((challenge, index) => (
              <View key={challenge.id} style={styles.dailyGridItem}>
                <DailyChallengeCard
                  challenge={challenge}
                  onPress={() => console.log('Challenge pressed:', challenge.title)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Extended Challenges Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitleInline}>
              Extended Challenges
            </Text>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => {
                // Toggle between weekly and monthly only
                setChallengeFilter(challengeFilter === 'weekly' ? 'monthly' : 'weekly');
              }}>
              <Text style={styles.filterText}>
                {challengeFilter.charAt(0).toUpperCase() + challengeFilter.slice(1)} ▼
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.extendedChallengesList}>
            {filteredChallenges.length > 0 ? (
              filteredChallenges.map(challenge => (
                <ExtendedChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onPress={() => console.log('Extended challenge pressed:', challenge.title)}
                />
              ))
            ) : (
              <Text style={styles.emptyText}>
                No {challengeFilter} challenges available
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderGoalsTab = () => {
    // Sort goals: future (bottom) → active (middle) → achieved (top)
    const sortedGoals = [...mockGoals].sort((a, b) => {
      const stateOrder = {future: 0, active: 1, achieved: 2};
      return stateOrder[a.state] - stateOrder[b.state];
    });

    return (
      <View style={styles.tabContent}>
        {/* Sticky Milestones Banner */}
        <MilestoneBanner
          totalGoalsCompleted={mockMilestoneData.totalGoalsCompleted}
          totalAmountSaved={mockMilestoneData.totalAmountSaved}
          onPress={() => console.log('View all milestones')}
        />

        {/* Goals Journey (upward progression) */}
        {sortedGoals.map((goal, index) => (
          <View key={goal.id}>
            {/* Journey Node with connector */}
            <JourneyNode
              state={goal.state}
              icon={goal.icon}
              showConnectorAbove={index > 0}
              showConnectorBelow={index < sortedGoals.length - 1}
            />

            {/* Goal Card */}
            <View style={styles.goalCardContainer}>
              <QuestGoalCard
                goal={goal}
                onPress={() => console.log('Goal pressed:', goal.title)}
              />
            </View>
          </View>
        ))}

        {/* Journey Header (bottom entry point) */}
        <JourneyHeader />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Segmented Control */}
      <SegmentedControl
        segments={['Challenges', 'Goals']}
        selectedIndex={selectedTab}
        onIndexChange={setSelectedTab}
      />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {selectedTab === 0 ? renderChallengesTab() : renderGoalsTab()}
      </ScrollView>
    </View>
  );
};

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? colors.background.dark : colors.background.light,
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    paddingBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    fontWeight: typography.fontWeight.bold,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    color: isDark ? colors.text.primary.dark : colors.text.primary.light,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitleInline: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    fontWeight: typography.fontWeight.bold,
    flex: 1,
    color: isDark ? colors.text.primary.dark : colors.text.primary.light,
  },
  filterButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginLeft: spacing.sm,
  },
  filterText: {
    fontSize: typography.fontSize.subheadline,
    fontFamily: typography.fontFamily.regular,
    color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
  },
  dailyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    marginHorizontal: -spacing.sm / 2, // Negative margin for gap
  },
  dailyGridItem: {
    width: '50%', // 2 items per row
    paddingHorizontal: spacing.sm / 2, // Half gap on each side
    marginBottom: spacing.md,
  },
  extendedChallengesList: {
    paddingHorizontal: spacing.md,
  },
  emptyText: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
    paddingVertical: spacing.xl,
    color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
  },
  goalCardContainer: {
    paddingHorizontal: spacing.md,
  },
});
