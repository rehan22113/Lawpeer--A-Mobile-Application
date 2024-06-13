import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './Navigate/StackNavigation'
import { PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>

    <PaperProvider>
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
    </PaperProvider>
    </GestureHandlerRootView>
    </Provider>
  )
}

export default App