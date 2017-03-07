import React, { Component, PropTypes } from 'react';
import { connect } from 'dva/mobile';
import {
    AppRegistry,
    StyleSheet,
    View,
    ScrollView,
    ToastAndroid,
    InteractionManager,
    Modal,
    Text,
    BackAndroid
} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Picker, Button, Left, Body, Right, Header, Title, Badge, Grid, Col, Row } from 'native-base';
// import {Popup } from 'antd-mobile';


class Check_one_XSS_result extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

    }
    render() {
        //  const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;

        var columns = [];
        columns = columns.concat(this.props.xss.one_project_xss.columns);
        columns.push('IP_address')

        var FormItemArr = columns.map((x, index) => {
            var title, dataIndex;
            var arr = x.split("|");
            if (arr.length == 1) {
                title = x;
                dataIndex = x;
            } else {
                title = arr[1];
                dataIndex = arr[0];
            }


            return <ListItem key={index}>
                <Text >{title}: </Text>
                <Text style={{ fontSize: 14 }}>{this.props.xss.Check_one_XSS_result_obj[dataIndex]}</Text>
            </ListItem>

        })

        return (<List>
            <ListItem itemDivider icon>

                <Left>
                   <Text>查看结果</Text>
                </Left>
                <Body />

                <Right><Button transparent  onPress={()=>{this.props.xss.onClose();}}><Icon style={{fontSize:30}} name="ios-close" /></Button></Right>
            </ListItem>
            {
                FormItemArr
            }

        </List>

        );
    }
};

// Check_one_XSS_result = createForm()(Check_one_XSS_result);
// Check_one_XSS_result = connect(({xss}) => {
//     return { xss };
// })(Check_one_XSS_result);

export default Check_one_XSS_result;
