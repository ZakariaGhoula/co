import React, { Component } from 'react';
import {Text,View,Image,StyleSheet,TextInput,TouchableHighlight,ScrollView} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {LoginButton,AccessToken,LoginManager, GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';

import NavigationBar from 'react-native-navbar';
import moment from 'moment';

import Icon from 'react-native-vector-icons/Ionicons';

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.menuLeft = this.menuLeft.bind(this);

    }


    componentDidMount() {

        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user
        )
    }

    menuLeft(e) {
        Actions.pop();
        // this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        var frLocale = require('moment/locale/fr');

        var styles = StyleSheet.create({
            bg: {
                flex: 1, backgroundColor: "#fff"


            },
            view: {
                flex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                paddingLeft: 40,
                paddingRight: 40,
                paddingBottom: 20,
                paddingTop: 20,
                bottom: 0
            },

            viewBasicInformation: {
                padding: 20,
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderColor: '#c7c7c7',
                marginBottom: 20
            },
            NameLastFist: {
                color: '#000',
                fontSize: 17,
                marginBottom: 7,
                fontWeight:'bold'
            },
            basicText: {
                color: '#3a4750',
                fontSize: 13,
                marginBottom: 7
            }, AboutTitle: {
                color: '#000',
                fontSize: 14,
                fontWeight:'bold',
                marginBottom: 7
            }, aboutText: {
                color: '#3a4750',
                fontSize: 13,
                marginBottom: 7
            },

        });


        var back = APIRoot + "/image/login3.jpg";

        var leftButtonConfig =
            (<Icon.Button name="ios-arrow-round-back" size={26} marginLeft={10} color="#000" backgroundColor="#fff"
                          onPress={this.menuLeft.bind(this)}/>)

        var ButtonConfig =
            (<TouchableHighlight  underlayColor='#fff' style={{height:37,alignSelf: 'center',paddingRight:10,justifyContent: 'center'}}
                                 onPress={function onNext() {
              Actions.customprofile();
                }}>

                <Text style={{fontSize:13,color:"#000"}}>Modifier</Text></TouchableHighlight>);

        var titleConfig =
                <Image
                    source={require('./../../../img/logo/cookout-co.png')}
                />
            ;


        var m = moment.locale('fr');
        var description_basic = null;
        var about = null;
        if (this.props.user != null && typeof this.props.user.last_name !== "undefined" && this.props.user.last_name !== "") {
            description_basic = (   <View style={styles.viewBasicInformation}>
                <Text
                    style={styles.NameLastFist}>{this.props.user.first_name.trim()} {this.props.user.last_name.trim()}</Text>
                {(this.props.user.gender != "") ? (<Text
                    style={styles.basicText}>{(this.props.user.gender.trim() == "female") ? "Femme" : "Homme"}  </Text>) : null}
                {(this.props.user.range_age != "") ? (
                    <Text style={styles.basicText}>{this.props.user.range_age} ans </Text>) : null}
                {(this.props.user.level != "") ? ( <Text style={styles.basicText}>{(this.props.user.level.trim() == 1) ?
                    "Un cuisinier professionnel" : "Un amateur de bonne chair"}  </Text>) : null}

                <Text style={styles.basicText}>Membre
                    depuis {moment(this.props.user.created_at).format('MMMM YYYY')}</Text>
            </View>);
            if (this.props.user != null && typeof this.props.user.last_name !== "undefined" && this.props.user.last_name !== "" && typeof this.props.user.profile !== "undefined" && this.props.user.profile.about !== "") {
                about = (<View style={styles.viewBasicInformation}>
                    <Text style={styles.AboutTitle}> Un peu plus sur moi…</Text>
                    <Text style={styles.aboutText}> {this.props.user.profile.about}</Text>
                </View>);
            }

        }


        if (this.props.user != null && this.props.user.media != null && this.props.user.media.profile_pi != "") {

            var profilePicture = <Image source={{uri:APIRoot+"/images/users/"+this.props.user.media.profile_pi}}
                                        style={{width: null,height:300}}/>

        }
        else if (this.props.user != null && this.props.user.media != null && this.props.user.media.profile_pi == "") {
            var profilePicture = <Image source={require('./../../../img/placeholder/placeholder-green.jpg')} style={{flex:1,width: null,
   }}/>
        }

//  <Image source={require('./../../img/login3.jpg')} style={styles.bg}>
        return (


            <View style={styles.bg}>

                <NavigationBar
                    style={{height:37,  borderColor: '#c7c7c7',  borderBottomWidth: 1}}
                    leftButton={leftButtonConfig}
                    rightButton={ButtonConfig}
                    title={titleConfig}
                    tintColor={"#fff"}/>
                <ScrollView>
                    <View style={{flex:1,backgroundColor:"#dcdfce",paddingTop:12,paddingBottom:12,marginBottom:4}}><Text
                        style={{fontSize: 13,fontWeight:'bold', color: '#000', textAlign: 'center', marginBottom: 0, flex: 1}}>{(this.props.title.trim())}</Text></View>
                    <View style={{flex:1,alignItems: 'stretch',marginBottom:10,}}>
                        {profilePicture}
                    </View>
                    {description_basic}
                    {about}
                </ScrollView>
            </View>


        )
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
