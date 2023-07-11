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

import React, { useCallback, useEffect, useState, useLayoutEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { NativeBaseProvider } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons/MaterialIcons';
import { HeaderButtons, HeaderButtonsProvider, HeaderButton, Item, HiddenItem, OverflowMenu, HeaderButtonProps } from 'react-navigation-header-buttons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as SplashScreen from 'expo-splash-screen';

import InsultEmAll from './src/mobile/InsultEmAll';
import styles from './src/styles/styles.js';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const MaterialHeaderButton = ({ props }) => (
    <HeaderButton IconComponent={ MaterialIcons } iconSize={ 23 } { ...props }/>
);

function WillieShakeInsults({ navigation }) {
    const [menuVisible, setMenuVisible] = useState(false);

    const [fontsLoaded] = useFonts({
        'Inter-Black': require('./assets/fonts/Inter-Black.otf')
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const aboutApp = () => {
        console.log('aboutApp()');
    };

    const aboutLicense = () => {
        console.log('aboutLicense()');
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Willie the Shake',
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={ MaterialHeaderButton }>
                  <OverflowMenu OverflowIcon={({ color }) => (
                      <MaterialIcons name='more-horiz' size={ 23 } color={ color }/>
                  )}>
                    <HiddenItem title='About' onPress={ aboutApp }/>
                    <HiddenItem title='License' onPress={ aboutLicense }/>
                  </OverflowMenu>
                </HeaderButtons>
            )
        });
    }, [navigation]);

    return (
        <SafeAreaView style={ styles.appTopView } onLayout={ onLayoutRootView }>
          <View style={ styles.insultTopView }>
            <InsultEmAll/>
          </View>
          <StatusBar style="auto"/>
        </SafeAreaView>
    );
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={ WillieShakeInsults }/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
