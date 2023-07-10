// This file contains the code for a somewhat portable top-level menu.

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

import { Text, View } from 'react-native';
import { Drawer } from 'react-native-drawer';

import { Header } from 'Header';
import styles from '../styles/styles.js';

export default function ToplevelMenu() {
    const [drawerVisible, setDrawerVisible] = useState(false);
    
    return (
        <View style={styles.topLevelMenu}>
          <Text style={styles.topLevelHeader}>Willie the Shake</Text>
          <Drawer style={styles.optLevelDrawer} open={menuVisible} type='static' tapToClose={true} openDrawerOffset={0.5}
                  closedDrawerOffset={0} content={<SideMenu/>} onClose={closeDrawer}>
            <View style={styles.topLevelHeader}>
        <Header title='Willie the Shake' toggleDrawer={toggleDrawer}/>
        </View>
    );
}
