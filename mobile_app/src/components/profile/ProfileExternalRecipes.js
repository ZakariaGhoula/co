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
import ProfileExternalRecipesItem from './ProfileExternalRecipesItem';
class ProfileExternalRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.menuLeft = this.menuLeft.bind(this);

    }


    componentDidMount() {

        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
        if (this.props.user_external == null) {
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
        Actions.profileext({id_user_external: this.props.id_user_external, textSearch: this.props.textSearch});
        // this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        var frLocale = require('moment/locale/fr');

        var styles = StyleSheet.create({
            bg: {
                flex: 1, backgroundColor: "#f6f7f9"


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
                color: '#3a4750',
                fontSize: 20,
                marginBottom: 7
            },
            basicText: {
                color: '#3a4750',
                fontSize: 15,
                marginBottom: 7
            }, AboutTitle: {
                color: '#3a4750',
                fontSize: 16,
                marginBottom: 7
            }, aboutText: {
                color: '#3a4750',
                fontSize: 14,
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

                <Text style={{fontSize:14,color:"#000"}}>Modifier</Text></TouchableHighlight>);

        var titleConfig = <Text style={{fontSize:14,color:"#000"}}>{(this.props.title_recipe.trim())}</Text>;

        var to_show = <GiftedSpinner />;

        if (this.props.list_recipes != null && this.props.user_external != null) {
            if (typeof this.props.list_recipes[0] !== "undefined") {
                var to_show = null;

                var array_recipes = [];

                for (var i in this.props.list_recipes) {
                    array_recipes.push(this.props.list_recipes[i]);
                }
                to_show = <View
                    style={{borderColor: '#c7c7c7',borderBottomWidth:1,borderTopWidth:1}}>

                    {array_recipes.map(function (recipe, index) {

                        var access = ((this.props.actions_visitor.in_his_network == 1 && recipe.statut == 2) || recipe.statut == 3)

                        return (<ProfileExternalRecipesItem
                            id_user_external={this.props.id_user_external}
                            textSearch={this.props.textSearch}
                            recipe={recipe}
                            access={access}
                            title_recipe={this.props.title_recipe}
                            private={recipe.statut == 1}
                            semiprivate={recipe.statut == 2}
                            public={recipe.statut == 3} key={index}/>)
                    }, this)}</View>;
            }


        }
        return (


            <View style={styles.bg}>

                <NavigationBar
                    style={{height:37,  borderColor: '#c7c7c7',  borderBottomWidth: 1}}
                    leftButton={leftButtonConfig}
                    title={titleConfig}
                    tintColor={"#fff"}/>
                <ScrollView>
                    {to_show}
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileExternalRecipes);
