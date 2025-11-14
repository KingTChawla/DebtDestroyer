/**
 * Chat Bubble Component
 * Used for AI and user messages in expense chat
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, typography} from '../theme';
import {useTheme} from '../contexts';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  isItalic?: boolean;
  isBold?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser,
  isItalic = false,
  isBold = false,
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <Text
          style={[
            styles.text,
            isUser ? styles.userText : styles.aiText,
            isItalic && styles.italicText,
            isBold && styles.boldText,
          ]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginVertical: 8,
      paddingHorizontal: 16,
    },
    aiContainer: {
      justifyContent: 'flex-start',
    },
    userContainer: {
      justifyContent: 'flex-end',
    },
    bubble: {
      maxWidth: '80%',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    aiBubble: {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF',
      borderBottomLeftRadius: 4,
    },
    userBubble: {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : '#FFFFFF',
      borderBottomRightRadius: 4,
    },
    text: {
      fontFamily: 'HelveticaNeue',
      fontSize: 17, // Body text
      lineHeight: 22,
      letterSpacing: -0.085, // -0.5%
    },
    aiText: {
      color: isDark ? '#FFFFFF' : '#1A1A1A',
    },
    userText: {
      color: isDark ? '#FFFFFF' : '#1A1A1A',
    },
    italicText: {
      fontFamily: 'HelveticaNeue-Light',
      fontSize: 15, // Subheadline
      fontStyle: 'italic',
      color: isDark ? '#B8B8B8' : '#666666',
      lineHeight: 20,
    },
    boldText: {
      fontFamily: 'HelveticaNeue-Bold',
      fontWeight: '700',
    },
  });
