import React, { Component } from 'react';
import {Text,View,StyleSheet,TouchableHighlight,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-redux-router';

import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';
import LoadingOverlay from 'react-native-loading-overlay';
import { FBLoginManager} from 'react-native-facebook-login';

import Storage from 'react-native-storage';
class ButtonFb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
        }
        this.facebookLogin = this.facebookLogin.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.pressed !== this.state.pressed
        || nextProps.isRequesting !== this.props.isRequesting
        || nextProps.isAuthenticated !== this.props.isAuthenticated
        || nextProps.user !== this.props.user
        || nextProps.form_skiped !== this.props.form_skiped
        || nextProps.data_fb !== this.props.data_fb)
    }

    componentWillUpdate(nextProps, nextState) {


        if (this.props.data_fb != nextProps.data_fb && nextProps.user == null && nextState.pressed && !nextProps.isAuthenticated && !nextProps.isRequesting) {



            this.props.actions.loginFbUser(nextProps.data_fb);
        }
        else if (nextProps.isAuthenticated) {
            if (nextProps.form_skiped == 0) {
                storage.save({
                    key: 'loginState',   // Note: Do not use underscore("_") in key!
                    rawData: {
                        from: 'Cookout',
                        userid: nextProps.user_id,
                        token: nextProps.token,
                        form_skiped: 0
                    },

                    // if not specified, the defaultExpires will be applied instead.
                    // if set to null, then it will never expire.
                    expires: null
                });


                Actions.nextForm();
            }
            else if (nextProps.form_skiped == 1) {
                storage.save({
                    key: 'loginState',   // Note: Do not use underscore("_") in key!
                    rawData: {
                        from: 'Cookout',
                        userid: nextProps.user_id,
                        token: nextProps.token,
                        form_skiped: 1
                    },

                    // if not specified, the defaultExpires will be applied instead.
                    // if set to null, then it will never expire.
                    expires: null
                });

                Actions.moncookout();
            }

        }


    }

    facebookLogin(e, r) {
        var _this = this;
        this.setState({pressed: !this.state.pressed})
        FBLoginManager.loginWithPermissions(["email", "user_friends"], function (error, data) {
            if (!error) {
                console.log("Login data: ", data);


                var id_user = data.credentials.userId;
                var token = data.credentials.token;

                var api = `https://graph.facebook.com/v2.6/${id_user}/?fields=id,name,email,first_name,last_name,locale,location,birthday,age_range,gender,picture.height(200)&redirect=false&access_token=${token}`;
                _this.props.actions.callAPiFB(api);
            } else {
                console.log("Error: ", data);
                _this.setState({pressed: !_this.state.pressed})
            }
        });


    }


    render() {

        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var w_btn = width - (width * 0.25);
        var styles = StyleSheet.create({
            btn: {
                paddingTop: 10,
                paddingBottom: 10,
                flex: 1,
                width: w_btn,
                backgroundColor: (this.state.pressed) ? "#fdaa69" : '#dbd0cd',
                borderColor: '#b8b0aa',
                borderWidth: 1,
                alignItems: "center",
                justifyContent: 'center',
                borderRadius: 8,
                opacity: 1,
                marginBottom: 15

            }, secondViewFacebook: {
                flexDirection: 'row',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch'

            },
            txt_btn: {
                color: (this.state.pressed) ? "#fff" : '#000',
                fontSize: 15,
            }

        });

        var bloc_to_show = null;
        ;
        return (


            <View style={{flex:1, }}>
                <TouchableHighlight underlayColor='transparent' style={styles.btn}
                                    onPress={this.facebookLogin.bind(this)}>
                    <View style={styles.secondViewFacebook}>
                        <Icon name="facebook" size={18} style={{marginRight:10}}
                              color={(this.state.pressed) ? "#fff" : '#000'}/>
                        <Text style={styles.txt_btn}>{this.props.title}</Text>
                    </View>
                </TouchableHighlight>
                {this.props.isRequesting && this.state.pressed &&
                <View style={{flex:1,justifyContent:'center',width:null,height:null,marginTop:15,marginBottom:15}}>
                    <LoadingOverlay visible={true} text=""/>
                </View>
                }
            </View>

        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.session.isAuthenticated,
    token: state.session.token,
    user_id: state.session.user_id,
    user: state.session.user,
    statusText: state.session.statusText,
    redirect: state.session.redirect,
    form_skiped: state.session.form_skiped,
    activated: state.session.activated,
    data_fb: state.session.data_fb,

    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonFb);
