/**
 * Chat Input Bar Component
 * Bottom input bar with budget tracking and voice input
 */

import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {MicrophoneIcon} from 'react-native-heroicons/solid';
import {colors} from '../theme';
import {useTheme} from '../contexts';

interface ChatInputBarProps {
  remainingBudget: number;
  onVoicePress: () => void;
  inputValue: string;
  onInputChange: (text: string) => void;
  onSubmit: () => void;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  remainingBudget,
  onVoicePress,
  inputValue,
  onInputChange,
  onSubmit,
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        {!inputValue && (
          <Text style={styles.label}>Remaining</Text>
        )}
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={onInputChange}
          placeholder=""
          placeholderTextColor={isDark ? '#666666' : '#999999'}
          returnKeyType="send"
          onSubmitEditing={onSubmit}
          multiline={false}
        />
        <Text style={styles.budget}>${remainingBudget}</Text>
      </View>
      <TouchableOpacity
        style={styles.micButton}
        onPress={onVoicePress}
        activeOpacity={0.7}
        accessibilityLabel="Voice input"
        accessibilityHint="Record voice message">
        <MicrophoneIcon size={24} color={isDark ? '#FFFFFF' : '#1A1A1A'} />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      paddingBottom: Platform.OS === 'ios' ? 24 : 12,
      backgroundColor: 'transparent',
    },
    inputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF',
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 8,
      marginRight: 8,
      minHeight: 40,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 2,
    },
    label: {
      fontFamily: 'HelveticaNeue',
      fontSize: 15, // Subheadline
      color: isDark ? '#B8B8B8' : '#666666',
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontFamily: 'HelveticaNeue',
      fontSize: 17, // Body
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      paddingVertical: 0,
      minHeight: 20,
    },
    budget: {
      fontFamily: 'HelveticaNeue-Bold',
      fontSize: 17, // Headline
      fontWeight: '700',
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      marginLeft: 8,
    },
    micButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 2,
    },
  });
