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
import { RootStackParamList } from '../../App'; // replace '../App' with the correct path to your App.tsx file

const SECTIONS = [
  {
    title: 'Introduction',
    content:
      'We are committed to respecting your privacy and protecting your personal data. This Privacy Policy describes how we handle and protect your personal data in connection with the app, in our capacity as data controllers. Please read this Privacy Policy to understand our practices.',
  },
  {
    title: 'Data We Collect',
    content:
      'We may collect data such as your name, email address, and device information when you use our app. We also use cookies and similar technologies to collect data about your interaction with our app.',
  },
  {
    title: 'How We Use Your Data',
    content:
      'We use the data we collect to provide, improve, and personalize our services. This includes using data to understand how you use our app and to research and develop new features.',
  },
  {
    title: 'How We Share Your Data',
    content:
      'We do not share your personal data with third parties without your consent, except in certain circumstances required by law or necessary to provide our services.',
  },
  {
    title: 'Your Rights and Choices',
    content:
      'You have rights to access and control your personal data. This includes the ability to update, retrieve, and delete your data.',
  },
  {
    title: 'How We Protect Your Data',
    content:
      'We implement appropriate security measures to protect your personal data from unauthorized access, use, or disclosure.',
  },
  {
    title: "Children's Privacy",
    content:
      'Our app is not directed to children under the age of 13. We do not knowingly collect personal data from children under 13.',
  },
  {
    title: 'Links to Other Websites',
    content:
      'Our app may contain links to other websites. This Privacy Policy does not apply to these websites, and we recommend reviewing their privacy policies.',
  },
  {
    title: 'Changes to Our Privacy Policy',
    content:
      'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy in our app.',
  },
  {
    title: 'How to Contact Us',
    content:
      'If you have any questions or concerns about our Privacy Policy, please contact us.',
    hasLink: true,
  },
];

type PrivacyPolicyProps = StackScreenProps<RootStackParamList, 'PrivacyPolicy'>;

function PrivacyPolicy({ navigation }: PrivacyPolicyProps): React.ReactNode {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  contactButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  contactButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default PrivacyPolicy;
