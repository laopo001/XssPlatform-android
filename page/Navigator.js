import React, { Component } from 'react';
import {
    Navigator
} from 'react-native';
import JPushModule from 'jpush-react-native';
import Page1 from './page1'
import Page2 from './page2'
import Page3 from './page3'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
       
    }
    render() {
        return (
            <Navigator
                initialRoute={{ name: 'page1', index: 0 }}
                configureScene={(route, routeStack) => {
                    return Navigator.SceneConfigs.HorizontalSwipeJump
                }}
                renderScene={(route, navigator) => {

                    switch (route.name) {
                        case 'page1':
                            return (<Page1 {...route.params} navigator={navigator} />);
                        case 'page2':
                            return (<Page2 {...route.params} navigator={navigator} />);
                        case 'page3':
                            return (<Page3 {...route.params} navigator={navigator} />);
                    }
                }}
            />
        );
    }
}

