import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  mathQuestionText: {
    fontSize: 16,
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
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
