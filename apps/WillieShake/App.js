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
import FJB from './src/mobile/FJB';
import EmbeddedWebView from './src/mobile/EmbeddedWebView';

import * as Utilities from './src/utils/utilities';
import './src/mobile/Globals.js';
import styles from './src/styles/styles.js';

const appConfig = require("./assets/appconfig.json");
const backgroundImage = require("./assets/images/willie.png");

const initialRoute = "Available Insults";

function InsultsMainPage() {
    return (
        <InsultPage appConfig={ appConfig } background={ backgroundImage }/>
    );
}

function FavoritesMainPage() {
    const navigation = useNavigation();
    
    return (
        <FavoriteInsults appConfig={ appConfig } background={ backgroundImage } setDismiss={ () => navigation.jumpTo(initialRoute) }/>
    );
}

function BuckleyMainPage() {
    const navigation = useNavigation();
    
    return (
        <EmbeddedWebView webPage={ appConfig.wikiPage } setDismiss={ () => navigation.jumpTo(initialRoute) }/>
    );
}

function AboutMainPage() {
    const navigation = useNavigation();

    return (
        <EmbeddedWebView webPage={ appConfig.changeLog } setDismiss={ () => navigation.jumpTo(initialRoute) }/>
    );
}

function FJBMainPage() {
    const navigation = useNavigation();

    return (
        <FJB appConfig={ appConfig } background={ backgroundImage }/>
    );
}

const Drawer = createDrawerNavigator();

const screens = [
    {
        key: "AvailableInsults",
        title: initialRoute,
        iconName: "list",
        component: InsultsMainPage,
    },
    {
        key: "FavoritesMainPage",
        title: "Favorite Insults",
        iconName: "heart-outlined",
        component: FavoritesMainPage
    },
    {
        key: "BuckleyMainPage",
        title: "Lord Buckley",
        iconName: "man",
        component: BuckleyMainPage
    },
    {
        key: "AnnoyNSAMainPage",
        title: "Annoy the NSA",
        iconName, "man",
        component: FJBMainPage,
    },
    {
        key: "AboutMainPage",
        title: "About the App",
        iconName: "info",
        component: AboutMainPage
    },
];

export default function App() {
    const [season, year] = Utilities.thisSeason();

    global.season = season;
    global.year = year;

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
                initialRouteName={ initialRoute }
                backBehavior="history"
                screenOptions={{
                    headerShown: true,
                    unmountOnBlur: true,
                    drawerType: "back",
                    itemStyle: { marginVertical: 10 },
                    drawerStyle: {
                        backgroundColor: "aliceblue"
                    }
                }}
              >
                { screens.map(drawer => 
                    <Drawer.Screen
                      key={ drawer.key }
                      name={ drawer.title }
                      component={ drawer.component }
                      options={{
                          drawerIcon: ({ focused, color, size }) => (
                              <Entypo name={ drawer.iconName } size={ 24 } color={ focused ? { color } : "black" }/>
                          ),
                          headerStyle: {
                              backgroundColor: 'aliceblue',
                          },
                      }}
                    />
                )}
              </Drawer.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
    );
}
