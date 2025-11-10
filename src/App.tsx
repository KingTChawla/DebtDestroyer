/**
 * Debt Destroyer - Main App Entry Point
 * Phase 1: UI/UX System
 */

import React from 'react';
import {RootNavigator} from './navigation';
import {ThemeProvider} from './contexts';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}

export default App;
