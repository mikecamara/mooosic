import { StyleSheet } from 'react-native';

const colors = {
  white: '#fff',
  darkGrey: '#5c5c5c',
  red: '#ff0000',
};

const AppStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.darkGrey,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    color: colors.red,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppStyles;
