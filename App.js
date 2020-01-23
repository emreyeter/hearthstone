import React, { Component } from 'react'
import { View } from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation";
import Api from './src/api'

import { Home, CardList } from './src/pages'

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer />
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    CardList: CardList,
  },
  {
    initialRouteName: "Home",
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);