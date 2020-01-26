/**
 * @format
 */

console.disableYellowBox = true;

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/redux/reducers/reducer';

const store = createStore(reducers);

const AppContainer = () =>
    <Provider store={store} >
        <App />
    </Provider>;



AppRegistry.registerComponent(appName, () => AppContainer);
