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

import { StatusBar } from 'expo-status-bar';
import { Alert, Text, TouchableOpacity, View} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Entypo, Feather } from '@expo/vector-icons';

import { setJSExceptionHandler } from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';

import InsultPage from './src/mobile/InsultPage';
import FavoriteInsults from './src/mobile/FavoriteInsults';
import EmbeddedWebView from './src/mobile/EmbeddedWebView';
import NavigationHeader from './src/mobile/NavigationHeader';

import styles from './src/styles/styles.js';

const appConfig = require("./assets/appconfig.json");
const backgroundImage = require("./assets/images/willie.png");

function InsultsMainPage() {
    return (
        <InsultPage appConfig={ appConfig } backgroundImage={ backgroundImage }/>
    );
}

function FavoritesMainPage() {
    return (
        <FavoriteInsults appConfig={ appConfig } backgroundImage={ backgroundImage } setDismiss={ () => console.log("Dismiss FavoriteInsults") }/>
    );
}

function BuckleyMainPage() {
    return (
        <EmbeddedWebView webPage={ appConfig.wikiPage } setDismiss={ () => console.log("Dismiss wiki page") }/>
    );
}

function AboutMainPage() {
    return (
        <EmbeddedWebView webPage={ appConfig.changeLog } setDismiss={ () => console.log("Dismiss about page") }/>
    );
}

const Drawer = createDrawerNavigator();

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
                initialRouteName="InsultsMainPage"
                drawerContentOptions={{
                    activeTintColor: '#e91e63',
                    itemStyle: { marginVertical: 10 },
                }}
                >
                <Drawer.Screen
                  key="InsultsMainPage"
                  name="Shakespearean Insults"
                  component={ InsultsMainPage }
                  options={{
                      title: "Shakespearean Insults",
                      drawerIcon: ({ focused, color, size }) => (
                          <Entypo name="list" size={ 24 } color={ focused ? "#e91e63" : "black" }/>
                      ),
                      headerShown: true,
                      header: ({ scene }) => (
                          return (
                              <NavigationHeader screen="Shakespearean Insults"/>
                          );
                    );
                  }}
                />
                <Drawer.Screen
                  key="FavoritesMainPage"
                  name="Favorite Insults"
                  component={ FavoritesMainPage }
                  options={{
                      drawerIcon: ({ focused }) => (
                          <Entypo name="heart-outlined" size={ 24 } color={ focused ? "#e91e63" : "black" }/>
                      ),
                      headerShown: true,
                      header: ({ scene }) => (
                          return (
                              <NavigationHeader screen="Favorite Insults"/>
                          );
                    );
                  }}
                />
                <Drawer.Screen
                  key="BuckleyMainPage"
                  name="Lord Buckley"
                  component={ BuckleyMainPage }
                  options={{
                      drawerIcon: ({ focused }) => (
                          <Entypo name="man" size={ 24 } color={ focused ? "#e91e63" : "black" }/>
                      ),
                      headerShown: true,
                      header: ({ scene }) => (
                          return (
                              <NavigationHeader screen="Lord Buckley"/>
                          );
                    );
                  }}
                />
                <Drawer.Screen
                  key="AboutMainPage"
                  name="About the App"
                  component={ AboutMainPage }
                  options={{
                      drawerIcon: ({ focused }) => (
                          <Entypo name="info" size={ 24 } color={ focused ? "#e91e63" : "black" }/>
                      ),
                      headerShown: true,
                      header: ({ scene }) => (
                          return (
                              <NavigationHeader screen="About the App"/>
                          );
                    );
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
    );
}
