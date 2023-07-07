
// This file contains stylesheet requirements for our WillieShake app.

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

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    appTopView: {
        flex: 1,
        background: 'white',
        marginHorizontal: 10,
        alignItems: 'stretch',
    },
    insultTopView: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 10,
    },
    insultList: {
        flex: 1,
        paddingBottom: 50,
    },
    insultHeader: {
        fontFamily: 'Inter-Black',
        fontSize: 25,
        paddingBottom: 10,
    },
    insultText: {
        fontSize: 15,
        padding: 2,
        margin: 2,
        color: 'black',
        backgroundColor: 'white',
    },
    insultButton: {
        flex: 1,
        backgroundColor: 'lightseagreen',
        color: 'black',
    },
    insultFooter: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        bottom: 0,
        position: 'absolute',
    },
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 58,
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});

export default styles;
