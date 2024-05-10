// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

// This component is used to render a page that manages the application settings, independently of
// the device operating system being used.

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
import { ImageBackground, Settings, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list';

import ScalableText from 'react-native-text';

import styles from '../styles/styles.js';

import PressableOpacity from './PressableOpacity';
import FloatingPressable from './FloatingPressable';

export default function SettingsPage({ appConfig, background, setDismiss }) {
    const locations = [];
    const [selectedURL, setSelectedURL] = useState(null);

    useEffect(() => {
        Settings.get('codewordLocations').forEach((item) => locations.push({key: item.name, value: item.url}));
    });

    return (
        <ImageBackground source={ background } resizeMode='cover' style={ styles.backgroundImage }>
          <SafeAreaView edges={['bottom', 'left', 'right']} style={ styles.settingsTopView }>
            <StatusBar style='auto'/>
            <View style={ styles.settingsItemView }>
              <View style={ styles.settingsItems }>
                <ScalableText style={ styles.settingsLabelText }>
                  Codeword Locations:
                </ScalableText>
                <SelectList
                  style={ styles.settingsLocationsDropdown }
                  data={ locations }
                  setSelected={ (val) => setSelectedURL(val) }
                  save={ "value" }
                  search={ false }
                />
              </View>
            </View>
              <View style={ styles.settingsFooter }>
                <PressableOpacity style={ styles.settingsButtons } title={ 'Dismiss' } onPress={ setDismiss }>
                  <Text style={ styles.settingsButtonText }>Dismiss</Text>
                </PressableOpacity>
              </View>
          </SafeAreaView>
        </ImageBackground>
    );
}
