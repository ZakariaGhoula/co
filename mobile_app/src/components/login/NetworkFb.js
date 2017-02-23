import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableHighlight, Dimensions, TouchableOpacity} from 'react-native';

import {Actions} from 'react-native-redux-router';

import {bindActionCreators} from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import {connect}            from 'react-redux';
import LoadingOverlay from 'react-native-loading-overlay';
import {FBLoginManager} from 'react-native-facebook-login';
import Icon from 'react-native-vector-icons/Ionicons';
import Storage from 'react-native-storage';
class NetworkFb extends React.Component {
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
        || nextProps.network_fb !== this.props.network_fb
        || nextProps.facebook_network !== this.props.facebook_network
        || nextProps.data_fb !== this.props.data_fb)
    }

    componentWillUpdate(nextProps, nextState) {


        if (nextProps.data_fb != null && nextProps.data_fb != this.props.data_fb) {

            this.props.actions.updateUserFacebook(nextProps.token, nextProps.data_fb.uid);


        }
        if (nextProps.network_fb != null && nextProps.network_fb != this.props.network_fb && !nextProps.isRequesting)
            this.props.actions.retrieveFacebookNetwork(nextProps.token, nextProps.network_fb);

        if (nextProps.facebook_network != null && nextProps.facebook_network != this.props.facebook_network && !nextProps.isRequesting){
            Actions.facebookFriends();
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
                var api_friends = `https://graph.facebook.com/v2.6/${id_user}/friends?fields=installed,id,name,email,first_name,last_name,locale&redirect=false&access_token=${token}`;

                _this.props.actions.callAPiFB(api);
                _this.props.actions.callNetworkFb(api_friends);
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


        return (


            <View style={{flex: 1,}}><TouchableOpacity style={{
                flex: 1,
                paddingLeft: 15,
                paddingRight: 15,
                height: 50,
                justifyContent: "center",
            }} onPress={this.facebookLogin.bind(this)}><View style={{
                justifyContent: "center",
                borderBottomWidth: 1,
                borderColor: "#c7c7c7",
                flex: 6,
                height: 50,
                flexDirection: 'row'
            } }><View
                style={{justifyContent: "center", flex: 1, height: 50} }><Image style={{marginTop: 0, width: 24}}
                                                                                resizeMode={"contain"}
                                                                                source={require('image!./../../img/network/facebook.png')}/></View><View
                style={{
                    justifyContent: "center",

                    flex: 5,
                    height: 50
                }}><Text style={{fontFamily: 'Guardi-Roman', fontSize: 14}}>Mes amis Facebook</Text></View><View
                style={{
                    justifyContent: "center",

                    flex: 1,
                    alignItems: "center",
                    height: 50
                }}><Icon name="ios-arrow-forward" size={24}

                         color="#000"/></View></View></TouchableOpacity></View>

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
    network_fb: state.session.network_fb,
    facebook_network: state.session.facebook_network,

    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkFb);
