// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

// This component renders the insult page itself.

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
import { ActivityIndicator, Image, ImageBackground, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';

import InsultEmAll from './InsultEmAll';
import InsultsHeader from './InsultsHeader';

import * as SplashScreen from 'expo-splash-screen';

import * as Utilities from '../utils/utilities';
import styles from '../styles/styles.js';

const insults = require('../../assets/data/insults.json');

SplashScreen.preventAutoHideAsync();

export default function WillieShakeInsults({ appConfig, background, season, year }) {
    const [insultData, setInsultData] = useState([]);
    const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded] = useFonts({
        'Inter-Black': require('../../assets/fonts/Inter-Black.otf')
    });

    useEffect(() => {
        async function prepare() {
            setInsultData(insults.insults);
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
            setAppIsReady(true);
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ImageBackground source={ background } resizeMode='cover' style={ styles.backgroundImage }>
          <View style={[{ paddingTop: 0 }, styles.appTopView]} onLayout={ onLayoutRootView }>
            <StatusBar style="auto"/>
            <ActivityIndicator animating={ !appIsReady } size='large' color='#3b63b3'/>
            <InsultsHeader appConfig={ appConfig } season={ season } year={ year }/>
            <View style={ styles.insultPageView }>
              { insultData.length > 0 ? 
                <InsultEmAll insults={ insultData } appConfig={ appConfig } season={ season }/>
                :
                null }
            </View>
          </View>
        </ImageBackground>
    );
}
