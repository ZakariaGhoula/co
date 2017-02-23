import React, { Component } from 'react';
import {Text,View,Image,StyleSheet,TextInput,TouchableHighlight,ScrollView} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {LoginButton,AccessToken,LoginManager, GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as VisitorActions    from './../../actions/VisitorActions';
import { connect }            from 'react-redux';

import NavigationBar from 'react-native-navbar';
import moment from 'moment';

import Icon from 'react-native-vector-icons/Ionicons';

import GiftedSpinner from 'react-native-gifted-spinner';
class ProfileExternal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.menuLeft = this.menuLeft.bind(this);

    }


    componentDidMount() {

        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }

        if (this.props.id_user_external != null) {
            this.props.actions_visitor.retrieveProfileVisitor(this.props.token, this.props.id_user_external);
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user
            || nextProps.user_external !== this.props.user_external
        )
    }

    menuLeft(e) {
        Actions.search({textSearch: this.props.textSearch});
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
            (<TouchableHighlight style={{height:37,alignSelf: 'center',paddingRight:10,justifyContent: 'center'}}
                                 onPress={function onNext() {
              Actions.customprofile();
                }}>
                <Text style={{fontSize:14,color:"#398797"}}>Modifier</Text></TouchableHighlight>);

        var titleConfig = {
            tintColor: '#398797',
            title: (this.props.title.trim())
        };
        var titleConfig =
                <Image
                    source={require('./../../../img/logo/cookout-co.png')}
                />
            ;
        var m = moment.locale('fr');
        var description_basic = null;
        var about = null;
        if (this.props.user_external != null && typeof this.props.user_external.last_name !== "undefined" && this.props.user_external.last_name !== "") {
            description_basic = (   <View style={styles.viewBasicInformation}>
                <Text
                    style={styles.NameLastFist}>{this.props.user_external.first_name.trim()} {this.props.user_external.last_name.trim()}</Text>
                {(this.props.user_external.gender != "") ? (<Text
                    style={styles.basicText}>{(this.props.user_external.gender.trim() == "female") ? "Femme" : "Homme"}  </Text>) : null}
                {(this.props.user_external.range_age != "") ? (
                    <Text style={styles.basicText}>{this.props.user_external.range_age} ans </Text>) : null}
                {(this.props.user_external.level != "") ? (
                    <Text style={styles.basicText}>{(this.props.user_external.level == 1) ?
                        "Un cuisinier professionnel" : "Un amateur de bonne chair"}  </Text>) : null}

                <Text style={styles.basicText}>Membre
                    depuis {moment(this.props.user_external.created_at).format('MMMM YYYY')}</Text>
            </View>);
            if (this.props.user_external != null && typeof this.props.user_external.last_name !== "undefined" && this.props.user_external.last_name !== "" && typeof this.props.user_external.profile !== "undefined" && this.props.user_external.profile.about !== "") {
                about = (<View style={styles.viewBasicInformation}>
                    <Text style={styles.AboutTitle}>Un peu plus sur {this.props.user_external.first_name}</Text>
                    <Text style={styles.aboutText}> {this.props.user_external.profile.about}</Text>
                </View>);
            }

        }


        if (this.props.user_external != null && this.props.user_external.media != null && this.props.user_external.media.profile_pi != "") {

            var profilePicture = <Image
                source={{uri:APIRoot+"/images/users/"+this.props.user_external.media.profile_pi}}
                style={{width: null,height:300}}/>

        }
        else if (this.props.user_external != null && this.props.user_external.media != null && this.props.user_external.media.profile_pi == "") {
            var profilePicture = <Image source={require('./../../../img/placeholder/placeholder-green.jpg')} style={{flex:1,width: null,
   }}/>
        }

        var countRecipe = 0;
        if (this.props.user_external != null && this.props.user_external.recipes != null) {
            for (var i in  this.props.user_external.recipes) {
                countRecipe++;
                if (countRecipe > 0) {
                    continue;
                }
            }

        }
        var next =
            <Icon name="ios-arrow-forward" size={24}
                  marginLeft={10}
                  color="#000"/>;
        var listRecette = (this.props.user_external != null && countRecipe > 0) ?
            (<TouchableHighlight  underlayColor='#fff'
                style={{flex:1,padding:13, height:60,backgroundColor:'#fff',borderTopWidth:1,borderBottomWidth:1,    borderColor: '#c7c7c7'}}
                onPress={()=>Actions.profileExternalRecipes({id_user_external:this.props.user_external.id,textSearch: this.props.textSearch,'title_recipe':'Les recettes de '+this.props.user_external.first_name,list_recipes:this.props.user_external.recipes})}>
                <View style={{ flexDirection: 'row',flex: 1, height:50, justifyContent: 'center'}}>
                    <Text style={{ flex:1,alignItems: 'center',  flexDirection: 'row',fontSize:15}}>Les recettes
                        de {this.props.user_external.first_name}</Text>
                    <View style={{ alignItems: 'center',  flexDirection: 'row'}}>
                        {next}</View>
                </View>
            </TouchableHighlight>) : null;


        var ajout = (this.props.user_external != null && this.props.user_external.in_my_network == 0) ?
            (<TouchableHighlight  underlayColor='#ccd1b5'
                style={{flex:1,paddingTop:13, height:45,marginTop:15,backgroundColor:'#ccd1b5',borderTopWidth:1,borderBottomWidth:1,    borderColor: '#c7c7c7'}}
                onPress={()=> (this.props.actions_visitor.addNetwork(this.props.token,this.props.user.id,this.props.user_external.id))}>

                <Text style={{ flex:1,textAlign: 'center', color:"#fff",fontSize:15}}>Ajouter à mon
                    réseau</Text>


            </TouchableHighlight>) : (<TouchableHighlight   underlayColor='#c69d8e'
            style={{flex:1,paddingTop:10,  marginTop:15,height:45,backgroundColor:'#c69d8e',borderTopWidth:1,borderBottomWidth:1,    borderColor: '#c7c7c7'}}
            onPress={()=> (this.props.actions_visitor.removeNetwork(this.props.token,this.props.user.id,this.props.user_external.id))}>
            <View style={{ flexDirection: 'row',flex: 1}}>
                <Text style={{ flex:1,textAlign: 'center',color:"#fff",fontSize:15}}>Retirer de mon
                    réseau</Text>

            </View>
        </TouchableHighlight>);

        return (


            <View style={styles.bg}>

                <NavigationBar
                    style={{height:37,  borderColor: '#c7c7c7',  borderBottomWidth: 1}}
                    leftButton={leftButtonConfig}
                    title={titleConfig}
                    tintColor={"#fff"}/>


                {this.props.user_external != null ? (      <ScrollView>
                    <View style={{flex:1,alignItems: 'stretch',marginBottom:20,}}>
                        {profilePicture}
                    </View>
                    {description_basic}
                    {about}
                    {listRecette}
                    {ajout}
                </ScrollView>) : <GiftedSpinner />}
            </View>


        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    statusText: state.session.statusText,
    user: state.session.user,
    user_external: state.visitor.profile_visitor,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),
    actions_visitor: bindActionCreators(VisitorActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileExternal);
