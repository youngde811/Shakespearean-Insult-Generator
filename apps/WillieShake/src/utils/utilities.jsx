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

// thisSeason() considers transition days within each month, but only works for the Northern
// Hemisphere. At some point I'll do the Southern as well.

export function thisSeason() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
                  "November", "December"];
    
    var seasons = {
        "January": ["Winter"],
        "February": ["Winter"],
        "March": ["Winter", "Spring"],
        "April": ["Spring"],
        "May": ["Spring"],
        "June": ("Spring", "Summer"),
        "July": ["Summer"],
        "August": ["Summer"],
        "September": ["Summer", "Autumn"],
        "October": ["Autumn"],
        "November": ["Autumn"],
        "December": ["Autumn", "Winter"]
    };

    var transitions = new Map();

    transitions.set(["Winter", "Spring"], 21);
    transitions.set(["Spring", "Summer"], 21);
    transitions.set(["Summer", "Autumn"], 23);
    transitions.set(["Autumn", "Winter"], 21);

    var today = new Date();
    var month = months[today.getMonth()];
    var stuple = seasons[month];

    var transition = stuple in transitions ? transitions[stuple] : 99;
    
    return [stuple[today.getDay() <= transition ? 1 : 0], today.getFullYear()];
}

// All of the icon names here map directly to the Material Community Icons set.

export function getSeasonalIcon(season) {
    const iconMap = { "Spring": "cross", "Summer": "beach", "Autumn": "halloween", "Winter": "forest-outline" };
    
    return iconMap[season];
}
