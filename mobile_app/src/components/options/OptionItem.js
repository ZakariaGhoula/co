import React, { Component } from 'react';
import {Text,View,StyleSheet,TouchableHighlight,Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Notifications from './Notifications';
import About from './About';
import UpdatePassword from './UpdatePassword';
import UpdateLocale from './UpdateLocale';
export default class OptionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            close: true
        }

        this.handlePress = this.handlePress.bind(this);

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
        nextState.close !== this.state.close || (this.props.locale!=null && (nextProps.locale!==this.props.locale)))
    }

    handlePress() {
        this.setState({close: !this.state.close})
    }

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
        var bloc_to_show_under = null;
        if (this.props.bloc_under == 1 && !this.state.close) {
            bloc_to_show_under = <Notifications />
        }if (this.props.bloc_under == 2 && !this.state.close) {
            bloc_to_show_under = <UpdatePassword />
        }if (this.props.bloc_under == 3 && !this.state.close) {
            bloc_to_show_under = <UpdateLocale />
        }

        if (this.props.bloc_under == 4 && !this.state.close) {
            bloc_to_show_under = <About />
        }

        var icon_menu = (this.props.icon && this.props.icon != null && this.props.icon != "") ? (
            <View style={{marginRight:15}}><Icon name={this.props.icon} size={26} marginLeft={10} marginLeft={30}
                                                 color="#000"/></View>) : null;
        var next = (this.state.close) ? (
            <Icon name="ios-arrow-down"
                  size={24}
                  marginLeft={10}
                  color="#fff"/> ) : <Icon name="ios-arrow-up"
                                           size={24}
                                           marginLeft={10}
                                           color="#fff"/>;


        var locale_to_show = (this.props.locale != null) ? this.props.locale : null;
        return (


            <View style={{flex:1}}>
                <TouchableHighlight underlayColor='transparent' style={styles.link}
                                    onPress={this.handlePress.bind(this)}>
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.text}>{this.props.title}</Text>

                        </View>
                        {locale_to_show != null &&
                        <View style={styles.TextViewLocale}>
                            <Text style={styles.textlocale}>{locale_to_show}</Text>

                        </View>
                        }
                        <View style={styles.NextView}>
                            {next}
                        </View>
                    </View>
                </TouchableHighlight>
                {bloc_to_show_under}
            </View>

        );
    }
}