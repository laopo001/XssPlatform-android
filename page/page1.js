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
    Alert
} from 'react-native';

import dva, { connect } from 'dva/mobile';
import users from '../models/users';


import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button, Header, Title } from 'native-base';
const Item = Picker.Item;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'root',
            password: 'adgjmptw'
        };
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'users/checkLogin'
        });
        BackAndroid.addEventListener('hardwareBackPress',() => {  
            console.log("exit") 
            const routers = this.props.navigator.getCurrentRoutes();  
            if(routers.length>1){
                this.props.navigator.pop();
                return true;
            }else{
                var b=Alert.alert(
                    '提示',
                    '是否确定退出',
                    [
                        {text: '确定', onPress: () =>BackAndroid.exitApp()},
                        {text: '关闭', onPress: () => {}},
                    ]
                )
                return true;
            }
        });  
    }
    onValueChange(value) {
        this.setState({
            selected1: value,
        });
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
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                ref={(drawer) => { this.drawer = drawer; } }
                renderNavigationView={() => navigationView}
                >
                <Container>
                    <Content >
                        <Header>
                            <Button onPress={() => { this.drawer.openDrawer(); } } transparent>
                                <Icon name='ios-menu' />
                            </Button>
                            <Title >平台</Title>
                        </Header>
                        <List style={{paddingRight:15}}>
                            <ListItem>
                                <InputGroup >
                                    <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                                    <Input onChangeText={(text) => {  this.setState({ userName: text }) } } placeholder="用户名" />
                                </InputGroup>
                            </ListItem>
                            <ListItem>
                                <InputGroup>
                                    <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                                    <Input onChangeText={(text) => { this.setState({ password: text }) } } placeholder="密码" secureTextEntry={true} />
                                </InputGroup>
                            </ListItem>
                        </List>
                        <Button iconRight style={{width:200}}  onPress={() => {
                            this.props.dispatch({
                                type: 'users/login',
                                payload: { userObj: { userName: this.state.userName, password: this.state.password },navigator:this.props.navigator }
                            });
                            //this.props.navigator.push({name:'page2'})
                        } } style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                            登录
                            <Icon name='ios-arrow-forward' />
                        </Button>
                        
                    </Content>
                </Container>
            </DrawerLayoutAndroid>
        );
    }
}
function mapStateToProps({users}) {
    return { users };
}

App = connect(mapStateToProps)(App);

export default App;