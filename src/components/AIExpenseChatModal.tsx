/**
 * AI Expense Chat Modal
 * Full-screen modal for conversational expense logging
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
  KeyboardEvent,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {XMarkIcon} from 'react-native-heroicons/solid';
import {colors} from '../theme';
import {useTheme} from '../contexts';
import {ChatBubble} from './ChatBubble';
import {ChatInputBar} from './ChatInputBar';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MODAL_TOP_POSITION = SCREEN_HEIGHT * 0.2; // Modal starts 20% from top

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  isItalic?: boolean;
  isBold?: boolean;
}

interface AIExpenseChatModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AIExpenseChatModal: React.FC<AIExpenseChatModalProps> = ({
  visible,
  onClose,
}) => {
  const {isDark} = useTheme();
  const styles = getStyles(isDark);

  // Mock data matching the screenshots
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey Alex! Have you spent anything today?',
      isUser: false,
    },
    {
      id: '2',
      text: 'I spent 200 at target',
      isUser: true,
    },
    {
      id: '3',
      text: 'Was any of it on essentials like groceries?',
      isUser: false,
    },
    {
      id: '4',
      text: '50 was on groceries, the rest was spent on a mirror and a coffee mug. The mirror was a 100.',
      isUser: true,
    },
    {
      id: '5',
      text: "Let's add that to today's expenses!",
      isUser: false,
    },
    {
      id: '6',
      text: 'Reminder: You have $550 left for groceries this month and $20 for any extra expenses!',
      isUser: false,
      isItalic: true,
    },
    {
      id: '7',
      text: 'Target Groceries, Mirror and Coffee Mug added to expenses!',
      isUser: false,
      isBold: true,
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [remainingBudget, setRemainingBudget] = useState(1800);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShow = (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    };

    const keyboardWillHide = () => {
      setKeyboardHeight(0);
    };

    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showListener = Keyboard.addListener(showEvent, keyboardWillShow);
    const hideListener = Keyboard.addListener(hideEvent, keyboardWillHide);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        isUser: true,
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleVoicePress = () => {
    console.log('Voice input pressed');
    // TODO: Implement voice input
  };

  // Calculate dynamic heights and position
  const headerHeight = 80; // Approximate header height
  const inputBarHeight = 80; // Approximate input bar height

  // When keyboard is open, move modal to top (0%), otherwise 20% from top
  const modalTopPosition = keyboardHeight > 0 ? 0 : MODAL_TOP_POSITION;

  const availableHeight = SCREEN_HEIGHT - modalTopPosition - keyboardHeight;
  const chatAreaHeight = availableHeight - headerHeight - inputBarHeight;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        {/* Semi-transparent background overlay - Fixed position */}
        <TouchableOpacity
          style={styles.blurContainer}
          activeOpacity={1}
          onPress={onClose}>
          <View style={[styles.overlayBackground, {backgroundColor: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)'}]} />
        </TouchableOpacity>

        {/* Chat Modal Container - Dynamic position based on keyboard */}
        <View style={[styles.modalContainer, {top: modalTopPosition}]}>
          {/* Header with Date Badge - Fixed at top of modal */}
          <View style={styles.headerContainer}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>Today</Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              activeOpacity={0.7}
              accessibilityLabel="Close chat"
              accessibilityHint="Close AI expense chat">
              <XMarkIcon size={24} color={isDark ? '#FFFFFF' : '#1A1A1A'} />
            </TouchableOpacity>
          </View>

          {/* Chat Messages - Dynamic height based on keyboard */}
          <ScrollView
            style={[styles.messagesContainer, {height: chatAreaHeight}]}
            contentContainerStyle={styles.messagesContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {messages.map(message => (
              <ChatBubble
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                isItalic={message.isItalic}
                isBold={message.isBold}
              />
            ))}
            {/* Bottom padding to prevent last message being hidden */}
            <View style={{height: 20}} />
          </ScrollView>

          {/* Floating Input Bar - Positioned above keyboard */}
          <SafeAreaView edges={['bottom']} style={styles.inputBarContainer}>
            <ChatInputBar
              remainingBudget={remainingBudget}
              onVoicePress={handleVoicePress}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSubmit={handleSend}
            />
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
    },
    blurContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    overlayBackground: {
      flex: 1,
    },
    modalContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDark ? colors.background.dark : colors.background.light,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: -4},
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 16,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 12,
      position: 'relative',
    },
    dateBadge: {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : '#FFFFFF',
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    dateBadgeText: {
      fontFamily: 'HelveticaNeue-Bold',
      fontSize: 17, // Headline
      fontWeight: '700',
      color: isDark ? '#FFFFFF' : '#1A1A1A',
    },
    closeButton: {
      position: 'absolute',
      right: 16,
      top: 16,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    messagesContainer: {
      // Height is set dynamically in the component
    },
    messagesContent: {
      paddingVertical: 8,
      paddingBottom: 20,
    },
    inputBarContainer: {
      backgroundColor: 'transparent',
    },
  });
