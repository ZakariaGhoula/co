import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,TextInput,TouchableHighlight,Dimensions} from 'react-native';

import NavigationBar from 'react-native-navbar';

import Icon from 'react-native-vector-icons/Ionicons';
import SettingMenuItem from './SettingMenuItem';
import Newsfeed from './../newsfeed/Newsfeed';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';

class SettingsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.menuLeft = this.menuLeft.bind(this);
        this.logout = this.logout.bind(this);


    }

    componentDidMount() {
        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.user != null && nextProps.user == null) {
            Actions.login();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user
        )
    }

    logout() {
        this.props.actions.logout(this.props.token);

    }



    menuLeft(e) {

        Actions.menu()
        //Actions.pop();
        // this.setState({isOpen: !this.state.isOpen});
    }

    render() {

        var leftButtonConfig =
            (<Icon.Button name="ios-arrow-round-back" size={26} marginLeft={10} color="#000" backgroundColor="#fff"
                          onPress={this.menuLeft.bind(this)}/>)
        var titleConfig = <Text style={{color:"#000",fontSize:14}}>{ this.props.title.trim()}</Text>;

        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: '#398797',


            }
        });
        return (
            <View style={{flex:1,backgroundColor:"#f6f7f9"}}>

                <NavigationBar
                    style={{height:37,  borderColor: '#c7c7c7',  borderBottomWidth: 1}}
                    leftButton={leftButtonConfig}
                    title={titleConfig}
                    tintColor={"#fff"}/>
                <ScrollView style={{flex:1,paddingTop:13}}>
                    <SettingMenuItem title={'Mon profil'} icon={'ios-contact'} action={'myprofile'} last={true}
                                     alone={true}/>
                    {(this.props.user != null && this.props.user.provider != "facebook") ? (
                        <SettingMenuItem title={'Changer de mot de passe'} icon={'ios-settings'}
                                         action={'settingpassword'} last={true} alone={true}/>) : null}

                    <SettingMenuItem title={'Notification'} icon={'ios-notifications'} action={'notification'}
                                     last={true} alone={true}/>


                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMenu);