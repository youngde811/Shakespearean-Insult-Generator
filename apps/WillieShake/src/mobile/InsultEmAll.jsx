
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

import React, { useState } from 'react';
import { Button, FlatList, Linking, ListItem, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from "@rneui/themed";

import styles from '../styles/styles.js';

const insults = require('../../assets/data/insults.json');

export default function InsultEmAll() {
    const [selectedInsult, setSelectedInsult] = useState(null);

    const sendInsult = (insult) => {

    };

    const insultSelect = (item) => {
        if (item.insult === selectedInsult) {
            setSelectedInsult(null);
        } else {
            setSelectedInsult(item.insult);
        };
    };

    const renderInsult = ({item}) => {
        return (
            <TouchableOpacity style={item.insult === selectedInsult ? styles.insultSelected : null} onPress={() => insultSelect(item)}>
              <Text style={styles.insultText}>
                {item.insult}
              </Text>
            </TouchableOpacity>
        );
    };

    const insultHeader = () => {
        return (
            <View style={styles.insultTopView}>
              <Text style={styles.insultHeader}>
                Shakespeare Hates You
              </Text>
              <Divider orientation="vertical" width={6}/>
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
            console.log('Send insult: ' + selectedInsult);
        }
    };

    const cancelInsult = () => {
        setSelectedInsult(null);
    };
    
    return (
        <View style={styles.insultTopView}>
          <View style={styles.insultList}>
            <FlatList
              ListHeaderComponent={insultHeader}
              ItemSeparatorComponent={insultSeparator}
              data={insults.insults}
              keyExtractor={(item) => item.id}
              renderItem={renderInsult}/>
          </View>
          <View style={styles.insultFooter}>
            <Pressable style={styles.insultButtons} title={'Insult'} onPress={sendInsult}>
              <Text style={styles.insultButtonText}>Insult</Text>
            </Pressable>
            <View style={styles.spacer}/>
            <Pressable style={styles.insultButtons} title={'Cancel'} onPress={cancelInsult}>
              <Text style={styles.insultButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
    );
}
