import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,TextInput,TouchableHighlight,Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-redux-router';

export default class CustomProfileInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(val) {
        this.props.actionFired(val);
    }

    render() {

        var styles = StyleSheet.create({
            link: {
                flex: 1,
                height: 45,
                paddingLeft: 15,

                marginBottom: (this.props.last) ? 15 : 0,
                backgroundColor: '#fff',
                borderColor: '#c7c7c7',
                borderTopWidth: (this.props.alone) ? 1 : 0,
                borderBottomWidth: (this.props.last) ? 1 : 0
            },
            linkView: {
                flexDirection: 'row',
                flex: 1,
                height: 40,
                alignItems: 'center',
            },
            TextView: {
                flexDirection: 'row',
                flex: 0.4,
                marginLeft: 0,
                height: 40,
                alignItems: 'center',
                borderBottomWidth: (this.props.last) ? 0 : 1,
                borderColor: '#c7c7c7',
            },

            NextView: {
                height: 40,
                borderBottomWidth: (this.props.last) ? 0 : 1,
                borderColor: '#c7c7c7',
                alignItems: 'center',
                flexDirection: 'row',
                paddingRight: 15,
                flex: 1,
            },
            text: {
                color: '#3a4750',

            },
            input:{height: 40, paddingRight:10, flex:1,  fontSize:14, textAlign: 'right' ,  color: '#3a4750'}

        });

        var icon_menu = (this.props.icon && this.props.icon != null && this.props.icon != "") ? (
            <View style={{marginRight:15}}><Icon name={this.props.icon} size={26} marginLeft={10} marginLeft={30}
                                                 color="#398797"/></View>) : null;
        var next = (this.props.action && this.props.action != null && this.props.action != "") ? (
            <Icon name="ios-arrow-forward" size={24}
                  marginLeft={10}
                  color="#398797"/> ) : null;

        return (
            <View style={{flex:1}}>


                <View style={styles.link}>
                    <View style={styles.linkView}>
                        {icon_menu}
                        <View style={styles.TextView}>
                            <Text style={styles.text}>{this.props.title}</Text>

                        </View>
                        <View style={styles.NextView}>
                            <TextInput
                                style={styles.input}
                                onChangeText={this.handleChange.bind(this)} defaultValue={this.props.val}/>
                        </View></View>

                </View>
            </View>
        );
    }
}