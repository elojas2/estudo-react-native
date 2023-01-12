
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native'; 
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from '@components/Loading';

import theme from './src/theme'

import { Routes } from './src/routes'

export default function App() {

  //Vê se carregou as fontes
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />

      { fontsLoaded ? <Routes/> : <Loading/> }
        
    </ThemeProvider>
    
  );
}

