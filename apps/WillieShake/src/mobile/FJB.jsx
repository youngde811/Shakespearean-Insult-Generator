// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

// This component is used to render a page that fetches and renders "codewords" intended specicially to
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

import React, { useEffect, useRef, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, ImageBackground, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from "@shopify/flash-list";

import styles from '../styles/styles.js';

import FetchAPIError from './FetchAPIError';
import PressableOpacity from './PressableOpacity';
import FloatingPressable from './FloatingPressable';

function convertCodeWords(codewords) {
    var json = [];
    var i = 0;

    codewords.forEach((item, index, array) => {
        if (index > 0 && (index % 100) == 0) {
            json.push({"id": i++, "value": "FJB"});
        }

        if (index > 0 && (index % 50) == 0) {
            json.push({"id": i++, "value": "BRANDON"});
        }

        json.push({"id": i++, "value": item});
    });

    return json;
}

function selectCodewordColor() {
    const colors = ["black", "maroon", "darkblue", "darkslateblue", "cadetblue", "coral", "darkgreen", "indigo", "lightslategrey"];

    let index = Math.floor(Math.random() * colors.length);

    return colors[index];
}

function failedRequest(resp) {
    return (resp.status < 200 || resp.status > 299);
}

export default function FJB({ appConfig, background, setDismiss }) {
    const [codewords, setCodewords] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [listVerticalOffset, setListVerticalOffset] = useState(0);

    const listThreshold = 300;
    
    const extractKey = (item) => {
        return item.id;
    };

    const renderCodeWord = ({ item }) => {
        let color = selectCodewordColor();

        return (
            <Text style={[{ color: color }, styles.codeWordText]}>
              { item.value }
            </Text>
        );
    };

    const listRef = useRef(null);

    const scrollToTop = () => {
        listRef.current.scrollToOffset({ offset: 0, animated: true });
    };

    const setVerticalOffset = (event) => {
        setListVerticalOffset(event.nativeEvent.contentOffset.y);
    };
    
    useEffect(() => {
        const fetchCodewords = async () => {
            setIsLoading(true);

            try {
                const resp = await fetch(appConfig.nsaCodewordsURL);

                if (failedRequest(resp)) {
                    throw Error(resp.status);
                }
                
                const data = await resp.json();

                setCodewords(convertCodeWords(data.codewords));
            } catch (error) {
                setFetchError(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!codewords) {
            fetchCodewords();
        }
    });

    return (
        <ImageBackground source={ background } resizeMode='cover' style={ styles.backgroundImage }>
          <SafeAreaView style={ styles.fjbTopView }>
            <StatusBar style="auto"/>
            <View style={ styles.codeWordsView }>
              <Surface elevation={ 4 } style={ styles.codeWordsSurface }>
                <View style={ styles.codeWordsListView }>
                  { isLoading && (
                      <ActivityIndicator color='#009b88' size='small'/>
                  )}
                  { fetchError && (
                      <FetchAPIError error={ fetchError }/>
                  )}
                  { codewords && (
                      <FlashList
                        ref = { listRef }
                        onScroll = { setVerticalOffset }
                        horizontal={ false }
                        data={ codewords }
                        keyExtractor={ extractKey }
                        showsVerticalScrollIndicator={ true }
                        renderItem={ renderCodeWord }
                        estimatedItemSize={ 1000 }
                        numColumns={ 3 }
                      />
                  )}
                  { listVerticalOffset > listThreshold && (
                      <FloatingPressable onPress={ scrollToTop }/>
                  )}
                </View>
              </Surface>
            </View>
            <View style={ styles.codeWordsFooter }>
              <PressableOpacity style={ styles.codeWordsButtons }
                                title={ 'Dismiss' } onPress={ setDismiss }>
                <Text style={ styles.codeWordsButtonText }>Dismiss</Text>
              </PressableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
    );
}
