// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

// This file contains the code for our WillieShake main insult page.

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

import React, { useRef, useState } from 'react';

import { Animated, Button, Clipboard, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from "@rneui/themed";
import { Surface } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Linking from 'expo-linking';

import styles from '../styles/styles.js';
import PressableOpacity from './PressableOpacity';
import FloatingPressable from './FloatingPressable';
import TouchableIcon from './TouchableIcon';
import EmbeddedWebView from './EmbeddedWebView';

import './Globals';

import * as Utilities from '../utils/utilities';

export default function InsultEmAll({ insults, appConfig }) {
    const [selectedInsult, setSelectedInsult] = useState(null);
    const [favoriteAdded, setFavoriteAdded] = useState(false);
    const [listVerticalOffset, setListVerticalOffset] = useState(0);
    const [easterEgg, setEasterEgg] = useState(null);

    const listThreshold = 300;
    const animation = useRef(new Animated.Value(0)).current;

    const insultSelect = (item) => {
        if (item.insult === selectedInsult) {
            setSelectedInsult(null);
        } else {
            setSelectedInsult(item.insult);
            Utilities.writeClipboard(item.insult);
        };
    };

    const showEasterEgg = (item) => {
        setEasterEgg(item.url);
    };
    
    const renderInsult = ({item}) => {
        return (
            <View style={ styles.insultItemContainer }>
              <PressableOpacity style={ null } onPress={ () => insultSelect(item) }
                                onLongPress={ () => storeFavorite(item) } delayLongPress={ 500 }>
                <Text style={ item.insult == selectedInsult ? styles.insultSelectedText : styles.insultText }>
                  { item.insult }
                </Text>
              </PressableOpacity>
              <TouchableIcon visible={ item.url.length > 0 } onPress={ () => showEasterEgg(item) }/>
            </View>
        );
    };

    const insultSeparator = () => {
        return (
            <Divider width={1} color={"cornsilk"}/>
        );
    };

    const sendInsult = () => {
        if (selectedInsult) {
            Linking.openURL(global.smstag  + selectedInsult);
        }
    };

    const cancelInsult = () => {
        setSelectedInsult(null);
    };

    const storeFavorite = async (item) => {
        let key = global.keyPrefix + item.id;
        
        await AsyncStorage.setItem(key, JSON.stringify(item));

        setFavoriteAdded(true);
    };

    const animateFavoriteAdded = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start((state) => { setFavoriteAdded(false); });
    };

    const notifyFavoriteAdded = () => {
        animateFavoriteAdded();

        return (
            <Animated.Text style={{ opacity: animation, fontSize: 12, color: 'maroon' }}>
              Favorite added!
            </Animated.Text>
        );
    };

    const listRef = useRef(null);

    const scrollToTop = () => {
        listRef.current.scrollToOffset({ offset: 0, animated: true });
    };

    return (
        <View style={ styles.insultTopView }>
          <View style={ styles.hatesYou }>
            <Text style={ styles.hatesYou }>
              { appConfig.names.insultTitle }
            </Text>
          </View>
          <View style={ styles.insultSurfaceParent }>
            <Surface elevation={ 4 } style={ styles.insultSurface }>
              { favoriteAdded && notifyFavoriteAdded() }
              <FlatList
                ref = { listRef }
                ItemSeparatorComponent={ insultSeparator }
                onScroll = { (event) =>  setListVerticalOffset(event.nativeEvent.contentOffset.y) }
                data={ insults }
                keyExtractor={ (item) => item.id }
                renderItem={ renderInsult }/>
              { listVerticalOffset > listThreshold && (
                  <FloatingPressable onPress={ scrollToTop }/>
              )}
            </Surface>
          </View>
          <View style={ styles.insultFooter }>
            <PressableOpacity style={ styles.insultButtons } title={ 'Insult' } onPress={ sendInsult }>
              <Text style={ styles.insultButtonText }>Insult</Text>
            </PressableOpacity>
            <View style={ styles.spacer }/>
            <PressableOpacity style={ styles.insultButtons } title={ 'Be Nice' } onPress={ cancelInsult }>
              <Text style={ styles.insultButtonText }>Be Nice</Text>
            </PressableOpacity>
          </View>
          { easterEgg != null ? <EmbeddedWebView webPage={ easterEgg } setDismiss={ () => setEasterEgg(null) }/> : null }
        </View>
    );
}
