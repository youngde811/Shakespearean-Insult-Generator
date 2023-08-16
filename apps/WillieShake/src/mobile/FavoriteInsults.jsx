// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

// This component is used to render the "favorite insults" page. There's some code replication here
// from the InsultEmAll component, and I might refactor later. For now, this component retrieves favorite
// insults using AsyncStorage.

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

import { Button, FlatList, ImageBackground, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from "@rneui/themed";
import { Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as Linking from 'expo-linking';

import styles from '../styles/styles.js';
import PressableOpacity from './PressableOpacity';
import NoFavorites from './NoFavorites';

import AsyncStorage from '@react-native-async-storage/async-storage';

import './Globals';

import * as Utilities from '../utils/utilities';

export default function FavoriteInsults({ appConfig, background, setDismiss }) {
    const [selectedInsult, setSelectedInsult] = useState(null);
    const [allFavorites, setAllFavorites] = useState(null);

    const retrieveFavoritesUsingKeys = async(keys) => {
        let favorites = [];
        let len = keys.length;

        for (var i = 0; i < len; i++) {
            let key = keys[i];
            let insult = await AsyncStorage.getItem(key);

            favorites.push(JSON.parse(insult));
        }

        return favorites;
    };

    const fetchFavorites = async () => {
        let keys = [];
        let favorites = [];
        
        keys = await AsyncStorage.getAllKeys();
        favorites = await retrieveFavoritesUsingKeys(keys);

        setAllFavorites(favorites.length > 0 ? favorites : []);
    };

    const insultSelect = (item) => {
        if (item.insult === selectedInsult?.insult) {
            setSelectedInsult(null);
        } else {
            setSelectedInsult(item);
            Utilities.writeClipboard(item.insult);
        };
    };

    const renderInsult = ({item}) => {
        return (
            <View style={ styles.insultItemContainer }>
              <PressableOpacity style={ null } onPress={ () => insultSelect(item) }>
                <Text style={ item === selectedInsult ? styles.insultSelectedText : styles.insultText }>
                  { item.insult }
                </Text>
              </PressableOpacity>
            </View>
        );
    };

    const favoritesSeparator = () => {
        return (
            <Divider width={1} color={"cornsilk"}/>
        );
    };

    const sendInsult = () => {
        if (selectedInsult) {
            Linking.openURL(global.smstag + selectedInsult.insult);
        }
    };

    const forgetFavorite = async () => {
        if (selectedInsult) {
            let key = global.keyPrefix + selectedInsult.id;

            await AsyncStorage.removeItem(key);

            setSelectedInsult(null);
            fetchFavorites();
        }
    };

    useEffect (() => {
        fetchFavorites();
    }, []);

    const renderFavorites = () => {
        if (allFavorites == null) {
            return null;
        }

        return (
            <FlatList
              ItemSeparatorComponent={ favoritesSeparator }
              data={ allFavorites }
              keyExtractor={ (item) => item.id }
              renderItem={ renderInsult }/>
        );
    };

    return (
        <SafeAreaView style={ styles.favoritesTopView }>
          <Modal animationType='fade' presentationStyle='formSheet'>
            <ImageBackground source={ background } resizeMode='cover' style={ styles.backgroundImage }>
              <View style={ styles.favoritesHeadingView }>
                <Text style={ styles.favoritesHeading }>
                  { appConfig.names.favoritesTitle }
                </Text>
              </View>
              { allFavorites?.length == 0 && ( <NoFavorites/> )}
              <Surface elevation={ 4 } style={ styles.favoritesSurface }>
                <View style={ styles.favoritesListView }>
                  { renderFavorites() }
                </View>
              </Surface>
            </ImageBackground>
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
          </Modal>
        </SafeAreaView>
    );
}
