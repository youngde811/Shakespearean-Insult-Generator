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

import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { AppBar, HStack, IconButton, Button } from "@react-native-material/core";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import * as SplashScreen from 'expo-splash-screen';
import * as Linking from 'expo-linking';

import InsultEmAll from './src/mobile/InsultEmAll';

import styles from './src/styles/styles.js';

const appTitle = "Willie the Shake";
const appSubtitle = "Vos Sugere";
const projectURL = "https://github.com/youngde811/willie-the-shake";

const backgroundImage = require("./assets/images/willie.png");

SplashScreen.preventAutoHideAsync();

function WillieShakeInsults() {
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

    const showProject = () => {
        Linking.openURL(projectURL);
    };

    const showAbout = () => {
        console.log('showAbout');
    };
    
    return (
        <ImageBackground source={ backgroundImage } resizeMode='cover' style={ styles.backgroundImage }>
          <SafeAreaView style={[{ paddingTop: 10 }, styles.appTopView]} onLayout={ onLayoutRootView }>
            <StatusBar style="auto"/>
            <AppBar title={ appTitle } subtitle={ appSubtitle } style={ styles.appBar } transparent={ true } trailing={ props => (
                <HStack>
                  <IconButton
                    icon={ props => <Icon name="github" { ...props }/>} onPress={ showProject }
                    { ...props }/>
                  <IconButton
                    icon={ props => <Icon name="file" { ...props }/>} onPress={ showAbout }
                    { ...props }/>
                </HStack>
            )}/>
            <View style={ styles.insultTopView }>
              <InsultEmAll/>
            </View>
          </SafeAreaView>
        </ImageBackground>
    );
}

export default function App() {
  return (
      <SafeAreaProvider>
        <WillieShakeInsults/>
      </SafeAreaProvider>
  );
}
