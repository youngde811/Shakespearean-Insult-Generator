// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

// This file contains various utility functions.

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

import * as Clipboard from 'expo-clipboard';

export function writeClipboard(text) {
    const copyText = async () => {
        await Clipboard.setStringAsync(text);
    };

    copyText();
};

export function findLongestInsult(insults) {
    var item = insults.reduce((a, b) => {
        return a.insult.length > b.insult.length ? a : b;
    });

    return item.insult.length;
};

// Not quite sure about this algorithm I found. I'll need to research it; lots of new Date creation...

export function _thisSeason() {
    var today = Date.now();
    var year = today.getFullYear();
    
    var seasons = [
        { name: 'Spring', date: new Date(year, 2, (year % 4 === 0) ? 19 : 20).getTime() },
        { name: 'Summer', date: new Date(year, 5, (year % 4 === 0) ? 20 : 21).getTime() },
        { name: 'Autumn', date: new Date(year, 8, (year % 4 === 0) ? 22 : 23).getTime() },
        { name: 'Winter', date: new Date(year, 11, (year % 4 === 0) ? 20 : 21).getTime() }
    ];

    return seasons.filter(({ date }) => date <= today).slice(-1)[0] || {name: "Winter"};
}

// I don't really care about soltices, equinoxes, hemispheres (no one outside the U.S. is using this app), etc.
// Just nice and simple for now.

export function thisSeason() {
    const northernSeasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
    const southernSeasons = ['Summer', 'Autumn', 'Winter', 'Spring'];

    var today = new Date();

    return [northernSeasons[Math.floor((today.getMonth() / 12 * 4)) % 4], today.getFullYear()];
}
