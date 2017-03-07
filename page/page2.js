/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    InteractionManager
} from 'react-native';
import { Container, Content, InputGroup, Input, Icon, Picker, Button, Header, Left, Right, Body, Title } from 'native-base';
import { List, Badge, ActivityIndicator } from 'antd-mobile';
import { connect } from 'dva/mobile';
import myTheme from '../Themes/light';
const Item = List.Item;


class Page2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'xss/update',
            payload: { loading: true }
        });
        InteractionManager.runAfterInteractions(() => {

            this.props.dispatch({
                type: 'users/checkLogin'
            });
            this.props.dispatch({
                type: 'xss/GET_XSS_project'
            });
            //  this.setState({ animating: false })
        });
    }
    render() {
        // console.log(this)
        var list = this.props.xss.XSS_projects.map((x, index) => {
            //    console.warn(this.props.xss.XSS_projects.length)
            return <Item key={index} wrap extra={<Badge text={x.cout} overflowCount={999999} />} onClick={() => {
                this.props.navigator.push({
                    name: 'page3', params: {
                        projectName: x.xssProjectName,
                        id: x.id
                    }
                })
            }}>
                <Text >{x.xssProjectName}</Text>
            </Item>
        })
        return (
            <Container >


                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            //  this.props.navigator.pop()
                        }}>
                            <Icon name='ios-menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>平台</Title>
                    </Body>
                    <Right />

                </Header>
                <Content>
                    <List renderHeader={() => '我的项目'}>
                        {list}
                    </List>

                </Content>
                <ActivityIndicator
                    toast
                    text="正在加载"
                    animating={this.props.xss.loading}
                />
            </Container>
        );
    }
}

function mapStateToProps({ users, xss }) {
    return { users, xss };
}
Page2 = connect(mapStateToProps)(Page2);
export default Page2;