import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    ToastAndroid,
    Text
} from 'react-native';
import { Container, Content, List, ListItem, InputGroup,Button, Input, Icon, Picker,  Header, Title,  Grid, Col, Row } from 'native-base';
//import { Badge,Button} from 'antd-mobile';
export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            page_size: 10
        };
    }


    change() {
        this.props.change(this.state.index, this.state.page_size)
    }
    render() {
        var button1;
        if (this.state.index === 1) {
            button1 = <Button disabled ><Icon name='ios-arrow-back' /><Text>上一页</Text></Button>;
        } else {
            button1 = <Button onPress={() => {
                this.setState({
                    index: this.state.index - 1
                }, () => {
                    this.change();
                })
            }} ><Icon name='ios-arrow-back' /><Text>上一页</Text></Button>;
        }
        var button2;

        if (this.state.index * this.state.page_size >= this.props.total) {
            button2 = <Button disabled iconRight ><Text>下一页</Text><Icon name='ios-arrow-forward' /></Button>;
        } else {
            button2 = <Button iconRight  onPress={() => {
                this.setState({
                    index: this.state.index + 1
                }, () => {
                    this.change();
                })
            }} ><Text>下一页</Text><Icon name='ios-arrow-forward' /></Button>;
        }
        return(
            <View style={{flexDirection :"row",alignSelf :"center"}}>
                {
                    button1
                }

                {
                    button2
                }
            </View>
        );
    }
}
Pagination.propTypes  = {
    change: React.PropTypes.func,
    total: React.PropTypes.number
}

