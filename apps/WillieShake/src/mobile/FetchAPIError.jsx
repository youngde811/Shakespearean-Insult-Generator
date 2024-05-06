// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

// This component is used to render a View and Text whenever there are no favorites saved.

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

import { Text, View } from 'react-native';

import ScalableText from 'react-native-text';

import styles from '../styles/styles.js';

export default function FetchAPIError({ error }) {
    return (
        <View style={ styles.fetchErrorView }>
          <ScalableText style={ styles.fetchErrorText }>
            Sadly, we could not retrieve the cool NSA error codes.
          </ScalableText>
          <ScalableText style={ styles.fetchErrorText }>
            Why Not: { error.message }
          </ScalableText>
        </View>
    );
};
