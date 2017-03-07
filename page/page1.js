import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    //Text,
    View,
    DrawerLayoutAndroid,
    Image,
    ListView,
    BackAndroid,
    AsyncStorage,
    Alert
} from 'react-native';

import dva, { connect } from 'dva/mobile';
import users from '../models/users';
import { Popup, List, InputItem, Switch } from 'antd-mobile';
const Item = List.Item;
import { createForm } from 'rc-form';
import { Container, Content, InputGroup, Input, Icon, Button, Header, Left, Right, Body, Title, Text } from 'native-base';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'root',
            password: 'adgjmptw',
            remember: true
        };
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'users/checkLogin'
        });
        AsyncStorage.getItem('RememberPW').then((result) => {
            if (result == '1') {
                AsyncStorage.getItem('FormValue').then((result) => {
                 //   console.warn(result);
                    var FormValue=JSON.parse(result);
                    this.props.form.setFields({userName:{value:FormValue.userName},password:{value:FormValue.password}})
                })
            }else{
                this.setState({remember:false})
            }
        })
        BackAndroid.addEventListener('hardwareBackPress', () => {
            //   console.log("exit") 
            const routers = this.props.navigator.getCurrentRoutes();
            if (routers.length > 2) {
                this.props.navigator.pop();
                return true;
            } else {
                var b = Alert.alert(
                    '提示',
                    '是否确定退出',
                    [
                        { text: '确定', onPress: () => BackAndroid.exitApp() },
                        { text: '关闭', onPress: () => { } },
                    ]
                )
                return true;
            }
        });
    }
    onSubmit = () => {
        this.props.form.validateFields({ force: true }, (error) => {
            if (!error) {
                var form = this.props.form.getFieldsValue()
               //  console.log(form)
                if (this.state.remember) {
                    AsyncStorage.setItem('RememberPW', '1').then(() => {
                        AsyncStorage.setItem('FormValue', JSON.stringify(form))
                    })
                }else{ AsyncStorage.setItem('RememberPW', '0')}
                this.props.dispatch({
                    type: 'users/login',
                    payload: { userObj: form, navigator: this.props.navigator }
                });
                // console.warn(JSON.stringify(this.props.form.getFieldsValue()));
            }
        });
    }
    validateAccount = (rule, value, callback) => {
     
        if (value && value.length >= 4) {
            callback();
        } else {
            callback(new Error('帐号至少4个字符'));
        }
    }
    render() {
        var navigationView = (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Image source={{ uri: 'http://img.hb.aicdn.com/735afbfa2f6fee24d1a10e1a22b23c63f707ea82281c3-ajdFRe_fw658' }} style={{ height: 200 }} />
                <View style={{
                    height: 56,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 20,
                }}>
                    <Text>test</Text>
                </View>
            </View>
        );
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                ref={(drawer) => { this.drawer = drawer; }}
                renderNavigationView={() => navigationView}
            >
                <Container>
                    <Content >
                        <Header>
                            <Left>
                                <Button onPress={() => {

                                    this.drawer.openDrawer();
                                }} transparent>
                                    <Icon name='ios-menu' />
                                </Button>
                            </Left>
                            <Body >
                                <Title>平台</Title>
                            </Body>
                            <Right />


                        </Header>
                        <List renderHeader={() => '登录'}
                            renderFooter={() => getFieldError('userName') && getFieldError('userName').join(',')}
                        >
                            <InputItem
                                {...getFieldProps('userName', {
                                    rules: [
                                        { required: true, message: '请输入帐号' },
                                        { validator: this.validateAccount },
                                    ],
                                }) }
                                clear
                                error={!!getFieldError('userName')}
                                onErrorClick={() => {
                                    alert(getFieldError('userName').join('、'));
                                }}
                                placeholder="请输入账号"
                            >帐号</InputItem>
                            <InputItem  {...getFieldProps('password') } placeholder="请输入密码" type="password">
                                密码
                            </InputItem>
                            <Item extra={<Switch checked={this.state.remember} onChange={(value) => { this.setState({ remember: value }) }} />}
                            >记住密码</Item>
                        </List>
                        <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }} onPress={this.onSubmit}><Text>登录</Text><Icon name='ios-arrow-forward' /></Button>
                        {/*<List style={{ paddingRight: 15 }}>
                            <ListItem>
                                <InputGroup >
                                    <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                                    <Input onChangeText={(text) => { this.setState({ userName: text }) }} placeholder="用户名" />
                                </InputGroup>
                            </ListItem>
                            <ListItem>
                                <InputGroup>
                                    <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                                    <Input onChangeText={(text) => { this.setState({ password: text }) }} placeholder="密码" secureTextEntry={true} />
                                </InputGroup>
                            </ListItem>
                        </List>*/}
                        {/*<Button iconRight onPress={() => {

                            this.props.dispatch({
                                type: 'users/login',
                                payload: { userObj: { userName: this.state.userName, password: this.state.password }, navigator: this.props.navigator }
                            });
                            //this.props.navigator.push({name:'page2'})
                        }} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                            <Text>登录</Text>
                            <Icon name='ios-arrow-forward' />
                        </Button>*/}


                    </Content>
                </Container>
            </DrawerLayoutAndroid>
        );
    }
}

App = createForm()(App);
function mapStateToProps({ users }) {
    return { users };
}

App = connect(mapStateToProps)(App);

export default App;