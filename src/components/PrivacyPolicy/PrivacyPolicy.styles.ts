// PrivacyPolicy.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6F7FB',
  },
  header: {
    backgroundColor: '#E4E7EB',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
  },
  contentText: {
    fontSize: 18,
    color: '#000',
  },
  contactButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
  },
  contactButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default styles;
