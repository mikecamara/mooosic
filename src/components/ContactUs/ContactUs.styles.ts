import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#F6F7FB',
  },
  input: {
    height: 50,
    borderColor: '#E4E7EB',
    borderWidth: 2,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
  mathQuestionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  goBackButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  goBackButtonText: {
    color: '#2196F3',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  inputError: {
    height: 50,
    borderColor: 'red',
    borderWidth: 2,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: '#FFFFFF',
    fontSize: 18,
  },
});
