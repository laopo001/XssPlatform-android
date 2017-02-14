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
    ScrollView,
    InteractionManager
} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button, Header, Title, Badge, Grid, Col,Row} from 'native-base';
import { connect } from 'dva/mobile';
import moment from 'moment';
class Page3 extends Component {
    state = {
        index: 1,
        page_size: 10,
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch({
                type: 'xss/Get_one_project_xss',
                payload: {
                    id: this.props.id,
                    index: this.state.index,
                    size: this.state.page_size
                }
            });
        });
    }
    render() {
       // console.log(this.props.xss)
        var list = this.props.xss.one_project_xss.items.map((x, index) => {
            return <ListItem key={index} button onPress={() => {
                console.log("123")
            } }>
            <Grid > 
                <Row>
                <Col style={styles.row}>
                    <Text   style={styles.text}>IP:  </Text><Text style={styles.text}>{x.IP_address}</Text>
 
                </Col>
                <Col style={styles.row}>
                     <Text   style={styles.text}>添加时间:  </Text><Text style={styles.text}>{moment(new Date(x.createTime)).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </Col>
                </Row>
            </Grid>
                 
                
            </ListItem>
        })
        return (
            <Container >

                <View>
                    <Header >
                        <Button transparent onPress={() => {
                            this.props.navigator.pop()
                        } }>
                            <Icon name='ios-arrow-back' />
                        </Button>

                        <Title style={{ alignSelf: 'center' }}>{this.props.projectName}项目</Title>

                        <Button transparent>
                            <Icon name='ios-menu' />
                        </Button>

                    </Header>
                    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.contentContainer}>
                        <List>

                            
                            {list}
                           
                        </List>
                      </ScrollView>
                </View>
            </Container>
        );
    }
}

  var styles = StyleSheet.create({
    contentContainer: {
      paddingVertical: 5
    },
    text:{
         fontSize: 12
    },
    row:{
        flexDirection:"row"
    }
  });
function mapStateToProps({users, xss}) {
    return { users, xss };
}
Page3 = connect(mapStateToProps)(Page3);
export default Page3;