// ContactUsDark.styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#1a1a1a', // Dark background color
  },
  input: {
    height: 50,
    borderColor: '#E4E7EB',
    borderWidth: 2,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: '#2c2c2c', // Slightly lighter than background
    color: '#FFFFFF', // White font color for input text
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
    color: '#FFFFFF', // White color for better contrast on dark background
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
    color: '#FF0000', // Keep the error color red for attention
    marginBottom: 10,
  },
  inputError: {
    height: 50,
    borderColor: '#FF0000', // Keep the error color red for attention
    borderWidth: 2,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: '#2c2c2c', // Same as input background
    fontSize: 18,
  },
});
