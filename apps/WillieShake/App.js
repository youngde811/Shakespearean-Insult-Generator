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

import { Alert, TouchableOpacity, View} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Entypo, Feather } from '@expo/vector-icons';

import { setJSExceptionHandler } from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';

import InsultPage from './src/mobile/InsultPage';
import About from './src/mobile/About';

import styles from './src/styles/styles.js';

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

function Header({ screen }) {
    const navigation = useNavigation();

    return (
        <View style={ styles.navigationHeader }>
          <TouchableOpacity onPress={ () => navigation.toggleDrawer() }>
            <Entypo name="menu" size={ 24 } color="black"/>
          </TouchableOpacity>
          <View>
            <Text>{ screen }</Text>
          </View>
        </View>
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

    const screensMap = [
        { "name": "InsultPage", "icon": "face-profile" },
        { "name": "AboutPage", "icon": "settings" }
    ];

    setJSExceptionHandler(masterErrorHandler);

    return (
          <SafeAreaProvider>
            <NavigationContainer>
              <Drawer.Navigator
                drawerType="front"
                initialRouteName="InsultPage"
                screenOptions={ styles.drawerContent }
                >
                {
                    screensMap.map(item => <Drawer.Screen
                                             key={ item.name }
                                             name={ item.name }
                                             options={{ drawerIcon: ({ focused }) =>
                                                 <Feather name={ item.icon } size={ 24 } color={focused ? "#e91e63" : "black" }
                                                 />
                                                 ,
                                                 headerShown: true,
                                                 header: ({ scene }) => {
                                                     const { options } = scene.descriptor;
                                                     const title =
                                                           options.headerTitle !== undefined
                                                           ? options.headerTitle
                                                           : options.title !== undefined
                                                           ? options.title
                                                           : scene.route.name;

                                                     return (
                                                         <Header screen={ title }/>
                                                     );
                                                 }
                                             }}
                                             component={
                                                 item.name === 'InsultPage' ? InsultPageScreen : AboutPageScreen
                                             }
                                           />
                                  )
                }
              </Drawer.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
    );
}
