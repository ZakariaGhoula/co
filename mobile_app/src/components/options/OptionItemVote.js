import React, { Component } from 'react';
import {Text,View,StyleSheet,TouchableHighlight,Dimensions,Linking} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';

export default class OptionItemVote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            close: true
        }
this.handleClick = this.handleClick.bind(this);

    }

    handleClick = (url) => {
        Linking.openURL(url);
/*        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });*/
    };
    render() {

        var styles = StyleSheet.create({
            link: {

                height: 60,
                paddingLeft: 23,
                paddingRight: 15,

                marginBottom: (this.props.last) ? 15 : 0,
                backgroundColor: 'transparent',
                borderColor: '#474849',
                borderTopWidth: (this.props.alone) ? 1 : 0,
                borderBottomWidth: (this.props.last) ? 1 : 0
            },
            linkView: {
                flexDirection: 'row',
                flex: 1,
                height: 60,
                alignItems: 'center',
            },
            TextView: {
                flexDirection: 'row',
                flex: 1,
                marginLeft: 0,
                height: 45,
                alignItems: 'center',
                borderBottomWidth: 0,
                borderColor: '#c7c7c7',

            }, TextViewLocale: {
                flexDirection: 'row',
                marginLeft: 45,
                height: 30,
                alignItems: 'center',
                borderBottomWidth: 0,
                borderColor: '#c7c7c7',
                backgroundColor: "transparent",
                flex: 1,


            },

            NextView: {
                height: 50,
                borderBottomWidth: 0,
                borderColor: '#c7c7c7',
                alignItems: 'center',
                flexDirection: 'row',
                paddingRight: 10,
            },
            text: {
                fontFamily: 'OratorStd',
                fontSize: 13,
                lineHeight: 15,
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#fff",
                width: (this.props.locale != null) ? 160 : 250


            }, textlocale: {
                fontFamily: 'Guardi-Roman',
                fontSize: 13,
                lineHeight: 15,
                textAlign: "center",
                paddingLeft: 15,
                backgroundColor: "transparent",
                color: "#fdaa69",

            }
        });

        var icon_menu = (this.props.icon && this.props.icon != null && this.props.icon != "") ? (
            <View style={{marginRight:15}}><Icon name={this.props.icon} size={26} marginLeft={10} marginLeft={30}
                                                 color="#000"/></View>) : null;
        var next = (this.state.close) ? (
            <Icon name="ios-arrow-forward"
                  size={24}
                  marginLeft={10}
                  color="#fff"/> ) : <Icon name="ios-arrow-right"
                                           size={24}
                                           marginLeft={10}
                                           color="#fff"/>;


        var locale_to_show = (this.props.locale != null) ? this.props.locale : null;
        return (


            <View style={{flex:1}}>
                <TouchableHighlight underlayColor='transparent' style={styles.link}
                                    onPress={this.handleClick.bind(this,'itms://itunes.apple.com/us/app/apple-store/id1136765936?mt=8')}>
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.text}>{this.props.title}</Text>

                        </View>

                        <View style={styles.NextView}>
                            {next}
                        </View>
                    </View>
                </TouchableHighlight>

            </View>)
    }
}

