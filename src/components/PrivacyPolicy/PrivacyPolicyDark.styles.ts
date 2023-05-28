// PrivacyPolicyDark.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#2c2c2c',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    padding: 15,
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    marginBottom: 15,
  },
  contentText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  contactButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
  },
  contactButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default styles;
