import React, { Component } from 'react';
import {Text,View,StyleSheet,TouchableHighlight,Dimensions} from 'react-native';
import {Actions} from 'react-native-redux-router';
import Icon from 'react-native-vector-icons/Ionicons';

import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';

 class OptionItemLogout extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }


    shouldComponentUpdate(nextProps, nextState) {
        return ( nextProps.user !== this.props.user   )
    }



     logout() {
         this.props.actions.logout(this.props.token);
         this.props.loginOut();

      //   Actions.login();
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
            },
            text: {
                fontFamily: 'OratorStd',
                fontSize: 13,
                lineHeight: 15,
                textAlign: "left",
                backgroundColor: "transparent",
                color: "#808183",
                width:210,
                textDecorationLine:"underline"
           }
        });




        return (


            <View style={{flex:1}}>
                <TouchableHighlight underlayColor='transparent' onPress={this.logout.bind(this)}  style={styles.link} >
                    <View style={styles.linkView}>
                        <View style={styles.TextView}>
                            <Text style={styles.text}>{this.props.title}</Text>
                        </View>

                    </View>
                </TouchableHighlight>
            </View>

        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    statusText: state.session.statusText,
    user: state.session.user
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionItemLogout);
