import { StyleSheet } from 'react-native';

const colors = {
  white: '#fff',
  darkGrey: '#5c5c5c',
  red: '#ff0000',
};

const AppStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: colors.darkGrey,
    paddingBottom: 20,
    paddingTop: 40,
  },
  text: {
    color: colors.red,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AppStyles;
