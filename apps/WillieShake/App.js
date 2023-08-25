// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

// This file contains the entry point for our WillieShake app.

// MIT License

// Copyright (c) 2023 David Young

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
// Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
// WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';

import { Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons';

import { setJSExceptionHandler } from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';

import InsultPage from './src/mobile/InsultPage';
import About from './src/mobile/About';

import styles from 'src/styles/styles.js';

const appConfig = require("./assets/appconfig.json");

const Drawer = createDrawerNavigator();

function InsultPageScreen() {
    return (
        <InsultPage appConfig={ appConfig }/>
    );
}

function AboutPageScreen() {
    return (
        <About appConfig={ appConfig }/>
    );
}

export default function App() {
    const masterErrorHandler = (e, isFatal) => {
        if (isFatal) {
            Alert.alert(
                'Unexpected exception occurred',
                `
                Error: ${ (isFatal) ? 'Fatal: ' : '' } ${ e.name } ${ e.message }

                Please restart your WillieShake app!
                `,
                [{ text: 'Restart', onPress: () => { RNRestart.Restart(); } }]
            );
        } else {
            console.log('WillieShake: exception: ' + e);
        }
    };

    setJSExceptionHandler(masterErrorHandler);

    return (
          <SafeAreaProvider>
            <NavigationContainer>
              <Drawer.Navigator
                drawerType="front"
                initialRouteName="InsultPage"
                drawerContentOptions={ styles.drawerContent }
                >
                <Drawer.Screen
                  key="InsultPage"
                  name="InsultPage"
                  options={{ drawerIcon: ({ focused })=><MaterialCommunityIcons
                                                          name="face-profile"
                                                          size={ 24 }
                                                          color={ focused ? "#e91e63" : "black" }
                                                        />
                           }}
                  component={ InsultPageScreen }
                />
                <Drawer.Screen
                  key="AboutPage"
                  name="AboutPage"
                  options={{ drawerIcon: ({ focused })=><Feather
                                                          name="settings"
                                                          size={ 24 }
                                                          color={ focused ? "#e91e63" : "black" }
                                                        />
                           }}
                  component={ AboutPageScreen }
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
    );
}
