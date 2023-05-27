import { StyleSheet } from 'react-native';

const colors = {
  darkGray: '#2C2C2C',
  lightGray: '#4A4A4A',
  white: '#fff',
};

const AppStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  mainContent: {
    flex: 1,
    width: '100%',
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  mediaPlayer: {
    position: 'absolute',
    bottom: 75,
    width: '100%',
    // Other styles as necessary for your design...
  },
});

export default AppStyles;
