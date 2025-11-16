/**
 * OnboardingPaywallScreen
 * Handles Screens 37-38: Subscription Tier Selection
 * Shows pricing options after demonstrating value (insights)
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {colors, typography, spacing} from '../../theme';
import {Button, GradientCard} from '../../components';
import {OnboardingProgress} from '../../components/onboarding';
import {useOnboardingStore} from '../../stores/onboardingStore';
import {
  CheckCircleIcon,
  SparklesIcon,
  RocketLaunchIcon,
} from 'react-native-heroicons/solid';

// ============================================================================
// Types
// ============================================================================

export interface OnboardingPaywallScreenProps {
  onContinue: () => void;
  onSkipTrial?: () => void; // For "Maybe Later" option
}

type SubscriptionTier = 'free' | 'monthly' | 'annual' | 'lifetime';

interface TierFeature {
  text: string;
  included: boolean;
}

interface TierConfig {
  id: SubscriptionTier;
  name: string;
  price: string;
  priceSubtext?: string;
  badge?: string;
  badgeColor?: string;
  features: TierFeature[];
  ctaText: string;
  highlighted?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export const OnboardingPaywallScreen: React.FC<
  OnboardingPaywallScreenProps
> = ({onContinue, onSkipTrial}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);

  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('annual');
  const markStepComplete = useOnboardingStore(state => state.markStepComplete);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ============================================================================
  // Tier Configurations
  // ============================================================================

  const tiers: TierConfig[] = [
    {
      id: 'free',
      name: 'Free Trial',
      price: 'Free',
      priceSubtext: '7 days, then $9.99/mo',
      features: [
        {text: 'Unlimited debt tracking', included: true},
        {text: 'Snowball debt payoff plan', included: true},
        {text: 'Basic expense logging', included: true},
        {text: 'Progress tracking & streaks', included: true},
        {text: 'AI insights & coaching', included: false},
        {text: 'Advanced analytics', included: false},
        {text: 'Custom debt strategies', included: false},
        {text: 'Export reports', included: false},
      ],
      ctaText: 'Start Free Trial',
    },
    {
      id: 'monthly',
      name: 'Monthly Pro',
      price: '$9.99',
      priceSubtext: 'per month',
      features: [
        {text: 'Everything in Free, plus:', included: true},
        {text: 'AI insights & personalized coaching', included: true},
        {text: 'Advanced analytics & projections', included: true},
        {text: 'Custom debt payoff strategies', included: true},
        {text: 'Export financial reports', included: true},
        {text: 'Priority support', included: true},
        {text: 'Ad-free experience', included: true},
        {text: 'Unlimited goal tracking', included: true},
      ],
      ctaText: 'Subscribe Monthly',
    },
    {
      id: 'annual',
      name: 'Annual Pro',
      price: '$79.99',
      priceSubtext: 'per year (save 33%)',
      badge: 'BEST VALUE',
      badgeColor: colors.success,
      features: [
        {text: 'Everything in Monthly Pro, plus:', included: true},
        {text: 'Save $40/year vs monthly', included: true},
        {text: 'Early access to new features', included: true},
        {text: 'Premium support', included: true},
        {text: 'Family sharing (coming soon)', included: true},
      ],
      ctaText: 'Subscribe Annually',
      highlighted: true,
    },
    {
      id: 'lifetime',
      name: 'Lifetime Pro',
      price: '$199.99',
      priceSubtext: 'one-time payment',
      badge: 'UNLIMITED',
      badgeColor: colors.accent,
      features: [
        {text: 'Everything in Annual Pro, plus:', included: true},
        {text: 'Lifetime access to all features', included: true},
        {text: 'All future updates included', included: true},
        {text: 'VIP support & feature requests', included: true},
        {text: 'Exclusive lifetime member perks', included: true},
      ],
      ctaText: 'Buy Lifetime Access',
    },
  ];

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleContinue = () => {
    markStepComplete('paywall_selection');
    // TODO: Integrate with actual payment provider (RevenueCat, Stripe, etc.)
    console.log('Selected tier:', selectedTier);
    onContinue();
  };

  const handleSkip = () => {
    if (onSkipTrial) {
      onSkipTrial();
    } else {
      // Default to free tier and continue
      setSelectedTier('free');
      handleContinue();
    }
  };

  // ============================================================================
  // Render Helpers
  // ============================================================================

  const renderTierCard = (tier: TierConfig) => {
    const isSelected = selectedTier === tier.id;

    return (
      <TouchableOpacity
        key={tier.id}
        activeOpacity={0.7}
        onPress={() => setSelectedTier(tier.id)}>
        <View
          style={[
            styles.tierCard,
            isSelected && styles.tierCardSelected,
            tier.highlighted && styles.tierCardHighlighted,
          ]}>
          {/* Badge */}
          {tier.badge && (
            <View
              style={[
                styles.badge,
                {backgroundColor: tier.badgeColor || colors.primary},
              ]}>
              <Text style={styles.badgeText}>{tier.badge}</Text>
            </View>
          )}

          {/* Header */}
          <View style={styles.tierHeader}>
            <Text style={styles.tierName}>{tier.name}</Text>
            <Text style={styles.tierPrice}>{tier.price}</Text>
            {tier.priceSubtext && (
              <Text style={styles.tierPriceSubtext}>{tier.priceSubtext}</Text>
            )}
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            {tier.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                {feature.included ? (
                  <CheckCircleIcon
                    size={20}
                    color={tier.highlighted ? colors.success : colors.primary}
                  />
                ) : (
                  <View style={styles.featureIconPlaceholder} />
                )}
                <Text
                  style={[
                    styles.featureText,
                    !feature.included && styles.featureTextDisabled,
                  ]}>
                  {feature.text}
                </Text>
              </View>
            ))}
          </View>

          {/* Selection Indicator */}
          {isSelected && (
            <View style={styles.selectedIndicator}>
              <CheckCircleIcon size={24} color={colors.success} />
              <Text style={styles.selectedText}>Selected</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const selectedTierConfig = tiers.find(t => t.id === selectedTier);

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View style={styles.container}>
      {/* Progress */}
      <OnboardingProgress current={37} total={43} showPercentage={false} />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          }}>
          {/* Header */}
          <View style={styles.header}>
            <SparklesIcon size={56} color={colors.primary} />
            <Text style={styles.title}>Choose Your Plan</Text>
            <Text style={styles.subtitle}>
              Unlock your full debt-freedom potential
            </Text>
          </View>

          {/* Social Proof */}
          <GradientCard
            baseColor={colors.primary}
            useGradient={true}
            style={styles.proofCard}>
            <RocketLaunchIcon size={32} color="#FFFFFF" />
            <Text style={styles.proofText}>
              Join 10,000+ people who've paid off over $50M in debt using Debt
              Destroyer
            </Text>
          </GradientCard>

          {/* Tier Cards */}
          <View style={styles.tiersContainer}>
            {tiers.map(tier => renderTierCard(tier))}
          </View>

          {/* CTA */}
          <View style={styles.actions}>
            <Button
              title={selectedTierConfig?.ctaText || 'Continue'}
              variant="primary"
              size="large"
              onPress={handleContinue}
              fullWidth
            />

            {/* Skip Option */}
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipText}>Maybe later</Text>
            </TouchableOpacity>
          </View>

          {/* Legal Fine Print */}
          <Text style={styles.legalText}>
            Subscriptions auto-renew unless canceled. Cancel anytime in account
            settings. Terms apply.
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const getStyles = (isDark: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? colors.background.dark : colors.background.light,
    } as ViewStyle,

    scrollView: {
      flex: 1,
    } as ViewStyle,

    scrollContent: {
      paddingHorizontal: spacing.screenPadding,
      paddingTop: spacing.md,
      paddingBottom: spacing.xl * 2,
    } as ViewStyle,

    header: {
      alignItems: 'center',
      marginBottom: spacing.lg,
    } as ViewStyle,

    title: {
      ...typography.styles.largeTitle,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      textAlign: 'center',
      marginTop: spacing.md,
      marginBottom: spacing.sm,
    } as TextStyle,

    subtitle: {
      ...typography.styles.body,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      textAlign: 'center',
    } as TextStyle,

    proofCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      padding: spacing.md,
      marginBottom: spacing.xl,
    } as ViewStyle,

    proofText: {
      ...typography.styles.callout,
      color: '#FFFFFF',
      flex: 1,
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.callout,
    } as TextStyle,

    tiersContainer: {
      gap: spacing.md,
      marginBottom: spacing.xl,
    } as ViewStyle,

    tierCard: {
      backgroundColor: isDark ? colors.surface.dark : colors.surface.light,
      borderRadius: spacing.radius.lg,
      padding: spacing.lg,
      borderWidth: 2,
      borderColor: isDark ? colors.border.dark : colors.border.light,
    } as ViewStyle,

    tierCardSelected: {
      borderColor: colors.success,
      borderWidth: 2,
    } as ViewStyle,

    tierCardHighlighted: {
      borderColor: colors.primary,
      borderWidth: 2,
    } as ViewStyle,

    badge: {
      position: 'absolute',
      top: -12,
      right: spacing.md,
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs / 2,
      borderRadius: spacing.radius.full,
    } as ViewStyle,

    badgeText: {
      ...typography.styles.caption2,
      color: '#FFFFFF',
      fontWeight: typography.fontWeight.bold,
      letterSpacing: 0.5,
    } as TextStyle,

    tierHeader: {
      alignItems: 'center',
      marginBottom: spacing.md,
      paddingTop: spacing.xs,
    } as ViewStyle,

    tierName: {
      ...typography.styles.title2,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      fontWeight: typography.fontWeight.bold,
      marginBottom: spacing.xs,
    } as TextStyle,

    tierPrice: {
      ...typography.styles.largeTitle,
      color: colors.primary,
      fontWeight: typography.fontWeight.bold,
    } as TextStyle,

    tierPriceSubtext: {
      ...typography.styles.footnote,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
    } as TextStyle,

    featuresContainer: {
      gap: spacing.sm,
      marginBottom: spacing.md,
    } as ViewStyle,

    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    } as ViewStyle,

    featureIconPlaceholder: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: isDark ? colors.border.dark : colors.border.light,
    } as ViewStyle,

    featureText: {
      ...typography.styles.callout,
      color: isDark ? colors.text.primary.dark : colors.text.primary.light,
      flex: 1,
    } as TextStyle,

    featureTextDisabled: {
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      opacity: 0.5,
    } as TextStyle,

    selectedIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xs,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: isDark ? colors.border.dark : colors.border.light,
    } as ViewStyle,

    selectedText: {
      ...typography.styles.callout,
      color: colors.success,
      fontWeight: typography.fontWeight.semibold,
    } as TextStyle,

    actions: {
      gap: spacing.md,
      marginBottom: spacing.md,
    } as ViewStyle,

    skipButton: {
      paddingVertical: spacing.sm,
      alignItems: 'center',
    } as ViewStyle,

    skipText: {
      ...typography.styles.callout,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
    } as TextStyle,

    legalText: {
      ...typography.styles.caption2,
      color: isDark ? colors.text.secondary.dark : colors.text.secondary.light,
      textAlign: 'center',
      lineHeight: typography.lineHeight.normal * typography.fontSize.caption2,
      opacity: 0.7,
    } as TextStyle,
  });
};

// ============================================================================
// Exports
// ============================================================================

export default OnboardingPaywallScreen;
