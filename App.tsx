import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import Assessment from './src/components/Assessment';

const theme = {
  colors: {
    primary: '#2196F3',
    accent: '#FF9800',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    onSurface: '#000000',
    disabled: '#BDBDBD',
    placeholder: '#757575',
    backdrop: '#000000',
    onBackground: '#000000',
    notification: '#F44336',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Assessment />
      </PaperProvider>
    </SafeAreaProvider>
  );
}