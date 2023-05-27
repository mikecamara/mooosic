import React from 'react';
import ProviderWrapper from './ProviderWrapper';
import { ThemeProvider } from './contexts/ThemeContext.tsx';

/**
 * The main App component.
 *
 * @returns {JSX.Element} - The rendered App component.
 */
function App(): JSX.Element {
  return (
    <ThemeProvider>
      <ProviderWrapper />
    </ThemeProvider>
  );
}

export default App;
