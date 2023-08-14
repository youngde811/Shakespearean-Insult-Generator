// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

// This file provides a custom component that renders a touchable icon which responds to
// presses.

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

import { View } from 'react-native';
import { IconButton } from '@react-native-material/core';
import { Spacer } from '@react-native-material/core';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import styles from '../styles/styles.js';

export default function TouchableIcon({ props, visible, onPress }) {
    if (visible) {
        return (
            <IconButton
              icon={ props => <EvilIcons name="unlock" size={ 10 } { ...props }/>} onPress={ () => onPress() }
              { ...props }/>
        );
    } else {
        return (<Spacer/>);
    }
};
