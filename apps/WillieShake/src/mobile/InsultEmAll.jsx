
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

import { FlatList, Text, View } from 'react-native';
import { Divider } from "@rneui/themed";

import styles from '../styles/styles.js';

const insults = require('../../assets/data/insults.json');

export default function InsultEmAll() {
    const renderInsult = ({insult}) => (
        <Text style={styles.insultText}>
          {insult}
        </Text>
    );

    const insultHeader = () => {
        return (
            <View>
              <Text style={styles.insultHeader}>
                Shakespeare Hates You
              </Text>
              <Divider orientation="vertical" width={6}/>
            </View>
        );
    };

    const insultSeparator = () => {
        return (
            <Divider width={1} color={"white"}/>
        );
    };
        
    return (
        <View style={styles.insultTopView}>
          <FlatList
            ListHeaderComponent={insultHeader}
            ItemSeparatorComponent={insultSeparator}
            data={insults.insults}
            renderItem={renderInsult}/>
        </View>
    );
}
