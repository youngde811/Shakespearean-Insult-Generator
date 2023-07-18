// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

// This file contains the code for a Pressable-derived component that offers animation for press
// and release actions.

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

import { Animated, Pressable } from 'react-native';

export default function PressableOpacity({ children, ...props }) {
    const animation = useRef(new Animated.Value(1)).current;
    // const animated = new Animated.Value(1);

    const fadeIn = () => {
        Animated.timing(animation, {
            toValue: 0.1,
            duration: 100,
            useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    return (
        <Pressable onPressIn={ fadeIn } onPressOut={ fadeOut } { ...props }>
          <Animated.View style={{ opacity: animation }}>
            { children }
          </Animated.View>
        </Pressable>
    );
};
