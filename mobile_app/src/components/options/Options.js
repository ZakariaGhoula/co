import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,TouchableHighlight,Dimensions} from 'react-native';
import {Actions} from 'react-native-redux-router';
import {DEFAULT_LNG,OPTIONS_LANGUE} from './../../constants/config';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';
import MenuTab from './../default/MenuTab';
import Icon from 'react-native-vector-icons/Ionicons';
import OptionItem from './OptionItem';
import OptionItemOnOff from './OptionItemOnOff';
import OptionItemLogout from './OptionItemLogout';
import OptionItemVote from './OptionItemVote';
import _ from 'underscore';

import LoadingOverlay from 'react-native-loading-overlay';

import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginOut: false
        }
        this.loginOut = this.loginOut.bind(this);
    }

    componentWillMount() {

        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('Options Page');

    }
    componentDidMount() {
        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
    }

    componentWillUpdate(nextProps, nextState) {

        if (nextProps.user == null && nextState.isLoginOut) {

            Actions.login();
        }

    }


    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.isLoginOut !== nextState.isLoginOut
        || ( this.props.user !== nextProps.user)
        || ( this.props.isRequesting !== nextProps.isRequesting)
        || (this.props.user != null && (typeof nextProps.user !== "undefined" &&
           nextProps.user !== null && typeof nextProps.user.locale !== "undefined" && typeof this.props.user.locale !== "undefined" && this.props.user.locale !== nextProps.user.locale)))
    }

    loginOut() {
        this.setState({isLoginOut: true});
//        Actions.login();
    }

    render() {
        var w = Dimensions.get('window');
        var styles = StyleSheet.create({
            bg: {
                height: w.height,
                backgroundColor: '#fff',
            },
            titleList: {
                paddingTop: 5,
                paddingBottom: 15,
                fontSize: 15,
                fontWeight: 'bold',
                paddingLeft: 10,
                textAlign: 'center',
                backgroundColor: 'transparent',
                color: "#2b301c"
            },
            imgSeason: {
                marginTop: 0, alignItems: 'center', width: 80, height: 60,
            }
        });
        var back_route = this.props.route.passProps.option_back;
        //--langue
        var lng = (this.props.user !== null && typeof this.props.user !=="undefined" && typeof this.props.user.locale  !="undefined") ? this.props.user.locale : DEFAULT_LNG;
        var lng_final = null;
        lng_final = _.filter(OPTIONS_LANGUE, function (el) {
            return (el["value"] == lng);
        })

        lng_final = typeof lng_final[0] !== "undefined" ? lng_final[0].label : "français";

        if (this.state.isLoginOut) {
            return (
                <View style={styles.bg}>
                    <Image source={require('image!./../../img/background/options/black-artichaut.png')}
                           style={{flex:1,height:null,width:null}}>
                        <View style={{height:55,marginTop:20,alignItems:"center",justifyContent:'center'}}>
                            <View style={{height:55,marginTop:20,alignItems:"center",justifyContent:'center'}}>
                                <Image source={require('image!./../../img/options/logo.png')}/>
                            </View>
                        </View>
                        <View style={{flex:1,justifyContent:'center',width:null,height:null}}>
                            <LoadingOverlay visible={true} text=""/>
                        </View>
                    </Image>
                </View>)
        }
        /*
         <TouchableHighlight
         underlayColor='transparent'
         onPress={()=> (Actions.moncookout())}
         style={{position:"absolute",backgroundColor:"transparent",top:20,left:20}}>
         <Icon name="ios-close" size={50} color="#ededed" backgroundColor="transparent"/>
         </TouchableHighlight><OptionItem title={'Notifications'} data={this.props.user.notification} bloc_under={1}
         last={false}
         alone={true}/>
         <OptionItem title={"Modifier la langue de l'application"} bloc_under={3}
         locale={lng_final!=null?lng_final:null} last={false}
         alone={true}/>
         <OptionItemOnOff title={"Passer toutes mes recettes en offline / online"} last={false}
         alone={true}/>
         <Text style={{paddingLeft:23,backgroundColor:"transparent",color:"#fff", fontFamily: 'OratorStd',
         fontSize: 11,marginTop:20,
         lineHeight: 15,
         textAlign: "left"}}>©CookOut 2016</Text>
         */
        return (
            <View style={styles.bg}>
                <Image source={require('image!./../../img/background/options/black-artichaut.png')}
                       style={{flex:1,height:null,width:null}}>
                    <View style={{height:55,marginTop:20,alignItems:"center",justifyContent:'center'}}>
                        <Image source={require('image!./../../img/options/logo.png')}/>
                    </View>



                    <ScrollView
                        automaticallyAdjustContentInsets={false}
                        bounces={false}>

                        <View>
                            {this.props.user !== null &&
                                <View>

                            {(this.props.user != null && this.props.user.provider != "facebook") ? (
                                <OptionItem title={'Changer de mot de passe'} bloc_under={2} last={false}
                                            alone={true}/>) : null}


                                    <OptionItemVote title={"Noter l'application"}  last={false}
                                                      alone={true}/>
                            <OptionItem title={'À propos / Contact'} bloc_under={4} last={false}
                                        alone={true}/>
                                    </View>}
                            <OptionItemLogout title={'Déconnexion'} loginOut={this.loginOut.bind(this)} last={true}
                                              alone={true}/>
                        </View>

                    </ScrollView>
                </Image>
                <View style={{position:"absolute",bottom:0,left:0,right:0}}>
                    <MenuTab option_back={this.props.name} page={this.props.name}/>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    statusText: state.session.statusText,
    user: state.session.user,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);