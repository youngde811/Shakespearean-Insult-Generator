
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
    drawerContent: {
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 10 },
    },
    navigationHeaderText: {
        color: 'black',
        fontFamily: 'Inter-Black',
        fontSize: 15,
    },
    headerTextView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    headerSubtitle: {
        fontSize: 12,
        fontStyle: 'italic',
        color: 'cadetblue',
    },
    appTopView: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 4,
        alignItems: 'stretch',
    },
    appBar: {
        backgroundColor: 'cadetblue',
        borderRadius: 10,
    },
    appBarSubtitle: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    insultPageView: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 8,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
    },
    insultTopView: {
        position: 'absolute',
        top: 0,
        marginTop: 8,
        height: '100%',
        width: '100%',
        alignItems: 'stretch',
    },
    backgroundImage: {
        flex: 1,
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
    insultItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    insultText: {
        fontSize: 15,
        padding: 2,
        margin: 4,
        color: 'black',
    },
    insultSelectedText: {
        fontSize: 15,
        padding: 2,
        margin: 4,
        color: 'maroon',
        fontWeight: 'bold',
    },
    insultButtons: {
        alignItems: 'center',
        borderRadius: 10,
        elevation: 3,
        padding: 4,
        backgroundColor: 'cadetblue',
        borderColor: '#fff',
    },
    insultButtonText: {
        color: 'white',
        fontSize: 16,
    },
    disabledInsultButtons: {
        alignItems: 'center',
        borderRadius: 10,
        elevation: 3,
        padding: 4,
        backgroundColor: 'lightgrey',
        borderColor: '#fff',
    },
    insultFooter: {
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: '10%',
        alignItems: 'stretch',
        position: 'absolute',
    },
    insultSelected: {
        backgroundColor: 'cadetblue',
    },
    insultSurfaceParent: {
        flex: 1,
        justifyContent: 'stretch',
        paddingBottom: '20%',
        width: '100%',
    },
    insultSurface: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'stretch',
        borderRadius: 10,
    },
    listHeaderView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'cadetblue',
    },
    listHeaderSeason: {
        color: 'black',
        fontSize: 14,
    },
    listHeaderTyrannis: {
        color: 'black',
        fontSize: 12,
        fontStyle: 'italic',
    },
    flatList: {
        flexGrow: 1,
        height: '100%',
        width: '100%',
        flexDirection: 'column',
    },
    favoritesList: {
        flexGrow: 1,
        height: '100%',
        width: '100%',
        flexDirection: 'column',
    },
    insultList: {
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
    },
    favoriteInsultsSurface: {
        flex: 1,
        paddingBottom: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    hatesYou: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    hatesYouText: {
        color: 'teal',
        fontSize: 25,
        fontWeight: 'bold',
    },
    spacer: {
        width: 10,
    },
    webViewTop: {
        flex: 1,
        height: '90%',
    },
    webView: {
        flex: 0,
        height: '90%',
    },
    webFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '8%',
        bottom: 0,
        position: 'absolute',
    },
    webButtons: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 3,
        padding: 4,
        marginLeft: '4%',
        marginRight: '4%',
        backgroundColor: 'cadetblue',
        borderColor: '#fff',
    },
    webText: {
        color: 'white',
        fontSize: 16,
    },
    favoritesTopView: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 10,
        marginHorizontal: 10,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    favoritesHeadingView: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    favoritesHeading: {
        fontWeight: 'bold',
        color: 'teal',
        fontSize: 25,
        marginTop: 20,
    },
    favoritesSurface: {
        alignItems: 'stretch',
        borderRadius: 10,
        marginTop: '5%',
        marginLeft: 4,
        marginRight: 4,
    },
    favoritesListView: {

    },
    favoritesFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '8%',
        bottom: 0,
        position: 'absolute',
    },
    favoritesButtons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 3,
        padding: 4,
        marginLeft: '4%',
        marginRight: '4%',
        backgroundColor: 'cadetblue',
        borderColor: '#fff',
    },
    favoritesButtonText: {
        color: 'white',
        fontSize: 16,
    },
    disabledFavoritesButtons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 3,
        padding: 4,
        marginLeft: '4%',
        marginRight: '4%',
        backgroundColor: 'lightgrey',
        borderColor: '#fff',
    },
    noFavoritesView: {
        flex: 1,
        alignmentDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    noFavoritesText: {
        alignItems: 'center',
        fontWeight: 'bold',
        color: 'maroon',
        fontSize: 20,
        paddingBottom: 10,
    },
    floatingPressable: {
        backgroundColor: 'teal',
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    touchableIconView: {
        position: 'absolute',
        right: 0,
        marginLeft: 2,
    },
    touchableIconSpacerView: {
        position: 'absolute',
        right: 0,
        marginLeft: 2,
    },
    aboutPage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    aboutPageText: {
        fontSize: 16,
        fontWeight: '700'
    },
});

export default styles;
