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
import { ActivityIndicator, Button, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from "@rneui/themed";
import { Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from "@shopify/flash-list";

import styles from '../styles/styles.js';
import PressableOpacity from './PressableOpacity';

import * as Utilities from '../utils/utilities';

export default function FJB({ appConfig, background }) {
    const [codewords, setCodewords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    
    const fetchCodewords = async () => {
        try {
            const resp = await fetch(appConfig.nsaCodewordsURL);
            const data = await resp.json();

            setCodewords(data);
        } catch (error) {
            setFetchError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCodewords();
    }, []);

    const favoritesSeparator = () => {
        return (
            <Divider width={1} color={"cornsilk"}/>
        );
    };

    const renderFavorites = () => {
        if (allFavorites == null) {
            return null;
        }

        return (
            <FlashList
              ItemSeparatorComponent={ favoritesSeparator }
              data={ allFavorites }
              keyExtractor={ (item) => item.id }
              extraData = { selectedInsult }
              estimatedItemSize = { 100 }
              renderItem={ renderInsult }/>
        );
    };

    return (
        <ImageBackground source={ background } resizeMode='cover' style={ styles.backgroundImage }>
          <SafeAreaView style={ styles.favoritesTopView }>
            <StatusBar style="auto"/>
            <InsultsHeader appConfig={ appConfig }/>
            { allFavorites?.length == 0 ?
              <NoFavorites/>
              :
              <Surface elevation={ 4 } style={ styles.favoritesSurface }>
                <View style={ styles.favoritesListView }>
                  { renderFavorites() }
                </View>
              </Surface>
            }
            <View style={ styles.favoritesFooter }>
              <PressableOpacity style={ selectedInsult != null ? styles.favoritesButtons : styles.disabledFavoritesButtons }
                                title={ 'Insult' } onPress={ sendInsult } disabled={ selectedInsult == null }>
                <Text style={ styles.favoritesButtonText }>Insult</Text>
              </PressableOpacity>
              <View style={ styles.spacer }/>
              <PressableOpacity style={ selectedInsult ? styles.favoritesButtons : styles.disabledFavoritesButtons }
                                title={ 'Forget' } onPress={ () => forgetFavorite() } disabled={ selectedInsult == null }>
                <Text style={ styles.favoritesButtonText }>Forget</Text>
              </PressableOpacity>
              <View style={ styles.spacer }/>
              <PressableOpacity style={ styles.favoritesButtons } title={ 'Dismiss' } onPress={ () => setDismiss() }>
                <Text style={ styles.favoritesButtonText }>Dismiss</Text>
              </PressableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
    );
}
