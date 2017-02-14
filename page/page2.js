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
  InteractionManager
} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button, Header, Title ,Badge} from 'native-base';
import  { connect } from 'dva/mobile';
import myTheme from '../Themes/light';
 class Page2 extends Component {
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.props.dispatch({
            type: 'users/checkLogin'
        });
        this.props.dispatch({
            type: 'xss/GET_XSS_project'
        });
      });
    }
    render() {
      // console.log(this)
      var list=this.props.xss.XSS_projects.map((x,index)=>{
        return  <ListItem key={index} button onPress={()=>{
            this.props.navigator.push({name:'page3',params:{  
                    projectName:x.xssProjectName,
                    id:x.id
                }})
        }}>
                    <Text>{x.xssProjectName}</Text>
                    <Badge info>{x.cout}</Badge>
               </ListItem>
      })
      return (
                <Container >

                  <Content>
                     <Header >
                      <Button transparent onPress={()=>{
                        this.props.navigator.pop()
                      }}>
                          <Icon name='ios-arrow-back' />
                      </Button>

                      <Title style={{alignSelf: 'center'}}>平台</Title>

                      <Button transparent>
                          <Icon name='ios-menu' />
                      </Button>

                    </Header>

                 <List>
                        <ListItem itemDivider>
                            <Text>我的项目</Text>
                        </ListItem>
                        {list}
                  </List>
                 </Content>
                </Container>
      );
  }
}

function mapStateToProps({users, xss}) {
    return { users, xss };
}
Page2 = connect(mapStateToProps)(Page2);
export default Page2;