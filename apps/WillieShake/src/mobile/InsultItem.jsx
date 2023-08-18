// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

// This component offers a memoized implementation of our FlatList insult items.

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

import React, { memo, useRef, useState } from 'react';

import { Animated, Button, Clipboard, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from "@rneui/themed";
import { Surface } from 'react-native-paper';

import PressableOpacity from './PressableOpacity';
import TouchableIcon from './TouchableIcon';

import styles from '../styles/styles.js';

const InsultItem = (props) => {
    return (
        <View style={ styles.insultItemContainer }>
          <PressableOpacity style={ null } onPress={ () => props.insultSelect(props.item) }
                            onLongPress={ () => props.storeFavorite(props.item) } delayLongPress={ 500 }>
            <Text style={ props.item.insult == props.selectedInsult ? styles.insultSelectedText : styles.insultText }>
              { props.item.insult }
            </Text>
          </PressableOpacity>
          <TouchableIcon visible={ props.item.url.length > 0 } onPress={ () => props.showEasterEgg(props.item) }/>
        </View>
    );
};

export default memo(InsultItem);
