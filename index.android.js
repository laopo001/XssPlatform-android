/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    //Text,
    View,
    DrawerLayoutAndroid,
    Image,
    ListView
} from 'react-native';

import dva, { connect } from 'dva/mobile';
import users from './models/users';
import xss from './models/xss';

import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button, Header, Title } from 'native-base';
const Item = Picker.Item;

import myTheme from './Themes/light';
import MyNavigation from './page/Navigator'
const app = dva();
app.model(users);
app.model(xss);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onValueChange(value) {
        this.setState({
            selected1: value,
        });
    }
    render() {

        return (
           <MyNavigation />
        );
    }
}

app.router(() => <App />);

AppRegistry.registerComponent('myapp', () => app.start());


