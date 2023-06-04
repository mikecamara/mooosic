import React, { useContext } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { RootStackParamList } from '../../types/RootStackParamList.ts';
import { NavigationProp } from '@react-navigation/native';
import SECTIONS from '../../data/sectionsPrivacyPolicy.json';
import styles from './PrivacyPolicy.styles.ts';
import { ThemeContext } from '../../contexts/ThemeContext';
import stylesDark from './PrivacyPolicyDark.styles.ts';

type PrivacyPolicyNavigationProp = NavigationProp<
  RootStackParamList,
  'PrivacyPolicy'
>;

interface PrivacyPolicyProps {
  navigation: PrivacyPolicyNavigationProp;
}
const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ navigation }) => {
  const [activeSections, setActiveSections] = React.useState<number[]>([]);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const renderHeader = (
    section: { title: string; content: string },
    _: number,
    isActive: boolean
  ) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (
    section: { title: string; content: string; hasLink?: boolean },
    _: number,
    isActive: boolean
  ) => {
    return (
      <View style={isDark ? stylesDark.content : styles.content}>
        <Text style={isDark ? stylesDark.contentText : styles.contentText}>
          {section.content}
        </Text>
        {section.hasLink && (
          <TouchableOpacity
            style={isDark ? stylesDark.contactButton : styles.contactButton}
            onPress={() => navigation.navigate('ContactUs')}
          >
            <Text
              style={
                isDark ? stylesDark.contactButtonText : styles.contactButtonText
              }
            >
              Contact Us
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      style={isDark ? stylesDark.container : styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={setActiveSections}
      />
    </ScrollView>
  );
};

export default PrivacyPolicy;
