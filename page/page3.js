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
    ToastAndroid,
    InteractionManager,
    Modal,
    Text
} from 'react-native';
import Pagination from '../Component/Pagination'
import Check_one_XSS_result from '../Component/Check_one_XSS_result'
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Picker, Button, Header, Left, Right, Body, Title, Badge, Grid, Col, Row } from 'native-base';
import { connect } from 'dva/mobile';
import moment from 'moment';
import { Popup, ActivityIndicator } from 'antd-mobile';

class Page3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    select(index = 1, page_size = 10) {
        this.props.dispatch({
            type: 'xss/Get_one_project_xss',
            payload: {
                id: this.props.id,
                index: index,
                size: page_size
            }
        });
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'xss/update',
            payload: { loading: true }
        });
        InteractionManager.runAfterInteractions(() => {
            this.select();
        });
    }
    render() {



        var list = this.props.xss.one_project_xss.items.map((x, index) => {
            var temp = "{}";
            for (var i in x) {
                if (i == 'info') {
                    temp = x[i];

                }
            }
            Object.assign(x, JSON.parse(temp))

            return <ListItem key={index} button onPress={() => {
                Popup.show(<Check_one_XSS_result xss={Object.assign({}, this.props.xss, { Check_one_XSS_result_obj: x ,onClose:()=>{
                        Popup.hide();
                    }})} />, { animationType: 'slide-up', maskClosable: true, onMaskClose: () => { Popup.hide() } })
                {/*this.props.dispatch({
                    type: 'xss/update',
                    payload: { Check_one_XSS_result_obj: x, Check_one_XSS_result_Model: true }
                })*/}
            }}>
                <Grid >
                    <Row>
                        <Col style={styles.row}>
                            <Text style={styles.text}>IP:  </Text><Text style={styles.text}>{x.IP_address}</Text>

                        </Col>
                        <Col style={styles.row}>
                            <Text style={styles.text}>添加时间:  </Text><Text style={styles.text}>{moment(new Date(x.createTime)).format('YYYY-MM-DD HH:mm:ss')}</Text>
                        </Col>
                    </Row>
                </Grid>


            </ListItem>
        })
        return (
            <Container >


                <Header >
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.navigator.pop()
                        }}>
                            <Icon name='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ alignSelf: 'center' }}>{this.props.projectName}项目</Title>
                    </Body>
                    <Right />

                </Header>
                <Content>
                    <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.contentContainer}>
                        <List>

                            {list}

                        </List>
                    </ScrollView>

                    {/*<Pagination total={this.props.xss.one_project_xss.count} current={1} onChange={(index, page_size) => {
                        console.warn(JSON.stringify(index))
                        //this.select(index, page_size)
                    }}
                        prevText={<View><Icon type="left" />上一步</View>}
                        nextText={<View>下一步<Icon type="right" /></View>}
                    />*/}
                    <Pagination total={this.props.xss.one_project_xss.count} change={(index, page_size) => {
                        this.select(index, page_size)
                    }} />

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

var styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 5
    },
    text: {
        fontSize: 12
    },
    row: {
        flexDirection: "row"
    }
});
function mapStateToProps({ users, xss }) {
    return { users, xss };
}
Page3 = connect(mapStateToProps)(Page3);
export default Page3;