// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

// This component is used to render a page that fetchs and renders "codewords" intended specicially to
// annoy the useless NSA.

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
import { ActivityIndicator, Button, ImageBackground, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from "@shopify/flash-list";

import styles from '../styles/styles.js';

import FetchAPIError from './FetchAPIError';
import PressableOpacity from './PressableOpacity';

function LoadingIndicator() {
    return (
        <ActivityIndicator color='#009b88' size='large'/>
    );
};

export default function FJB({ appConfig, background }) {
    const [codewords, setCodewords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    
    const fetchCodewords = async () => {
        setIsLoading(true);
        
        try {
            const resp = await fetch(appConfig.nsaCodewordsURL);
            const data = await resp.json();

            setCodewords(data.codewords);
            console.log(JSON.stringify(codewords, null, 4));
        } catch (error) {
            setFetchError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCodewords();
    }, []);

    const renderFavorites = () => {
        return (
            <FlashList
              horizontal={ false }
              data={ codewords }
              numColumns={ 3 }
              estimatedItemSize = { 500 }
            />
        );
    };

    return (
        <ImageBackground source={ background } resizeMode='cover' style={ styles.backgroundImage }>
          <SafeAreaView style={ styles.fjbTopView }>
            <StatusBar style="auto"/>
            <View style={ styles.codeWordsView }>
              <Surface elevation={ 4 } style={ styles.codeWordsSurface }>
                <View style={ styles.codeWordsListView }>
                  { isLoading ?
                    LoadingIndicator()
                    : fetchError ?
                    <FetchAPIError error={ fetchError }/>
                    : renderFavorites()
                  }
                </View>
              </Surface>
            </View>
          </SafeAreaView>
        </ImageBackground>
    );
}
