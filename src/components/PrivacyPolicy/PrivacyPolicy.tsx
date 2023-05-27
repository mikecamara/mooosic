import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList.ts';
import { NavigationProp } from '@react-navigation/native';
import SECTIONS from '../../data/sectionsPrivacyPolicy.json';
import styles from './PrivacyPolicy.styles.ts';

type PrivacyPolicyNavigationProp = NavigationProp<
  RootStackParamList,
  'PrivacyPolicy'
>;

interface PrivacyPolicyProps {
  navigation: PrivacyPolicyNavigationProp;
}
const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ navigation }) => {
  const [activeSections, setActiveSections] = React.useState<number[]>([]);

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
      <View style={styles.content}>
        <Text>{section.content}</Text>
        {section.hasLink && (
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => navigation.navigate('ContactUs')}
          >
            <Text style={styles.contactButtonText}>Contact Us</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
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
