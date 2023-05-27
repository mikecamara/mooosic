import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: 'Introduction',
    content: 'Detailed introduction here...',
  },
  {
    title: 'Data We Collect',
    content: 'Information about the data collected here...',
  },
  // ... add more sections as required
];

function PrivacyPolicy(): JSX.Element {
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
    section: { title: string; content: string },
    _: number,
    isActive: boolean
  ) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
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
});

export default PrivacyPolicy;
