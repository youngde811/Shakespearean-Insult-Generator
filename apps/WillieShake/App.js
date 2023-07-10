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

import React, { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { PaperProvider } from 'react-native-paper';
import { HStack, Icon, IconButton, MaterialIcons, NativeBaseProvider } from 'native-base';

import * as SplashScreen from 'expo-splash-screen';

import InsultEmAll from './src/mobile/InsultEmAll';
import AppHeader from './src/mobile/AppHeader';

import styles from './src/styles/styles.js';

SplashScreen.preventAutoHideAsync();

function WillieShakeInsults() {
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

    const menuOpen = () => {
        setMenuVisible(true);
    };

    const menuClose = () => {
        setMenuVisible(false);
    };

    const appAbout = () => {
        console.log("appAbout()");
    };

    const appLicense = () => {
        console.log("appLicense()");
    };

    const topMenuPress = () => {
        setMenuVisible(true);
        console.log('topMenuPress()');
    };
    
    return (
        <SafeAreaView style={styles.appTopView} onLayout={onLayoutRootView}>
          <AppHeader/>
          <View style={styles.insultTopView}>
            <InsultEmAll/>
          </View>
          <StatusBar style="auto"/>
        </SafeAreaView>
    );
}

export default function App() {
  return (
      <NativeBaseProvider>
        <WillieShakeInsults/>
      </NativeBaseProvider>
  );
}
