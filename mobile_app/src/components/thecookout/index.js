import React, { Component } from 'react';
import {Dimensions,Text,View,Image,StyleSheet,TextInput,TouchableHighlight,TouchableOpacity,ScrollView} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as RecipeActions    from './../../actions/RecipeActions';


import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
import * as VisitorActions    from './../../actions/VisitorActions';
import { connect }            from 'react-redux';


import Loading from './../default/Loading'
import LoadingOverlay from 'react-native-loading-overlay';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import MenuTab from './../default/MenuTab';
import ShowBasics from './showBasics';
import ShowFollower from './showFollower';
import MyRecipes from './myrecipes';
import ShowLevel from './showLevel';
import Follow from './follow';
import _ from "underscore";


class TheCookout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.menuLeft = this.menuLeft.bind(this);
    }

    componentWillMount() {
        let tracker1 = new GoogleAnalyticsTracker('UA-87778327-1');
        tracker1.trackScreenView('Le CookOut (externe) Page');


        if (typeof this.props.id_user_external !== "undefined" && this.props.id_user_external !== null && this.props.user !== null && this.props.id_user_external == this.props.user.id) {

            Actions.moncookout();
        }

    }

    componentDidMount() {


        if (this.props.id_user_external != null) {
            this.props.actions_visitor.retrieveProfileVisitor(this.props.token, this.props.id_user_external);
            this.props.actions_visitor.retrieveVisitorNetwork(this.props.token, this.props.id_user_external);
        }


    }


    componentWillUpdate(nextProps, nextState) {

    }

    componentWillUnmount(nextProps, nextState) {
        this.props.actions_visitor.destroyVisitor();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user ||
            nextProps.user_external !== this.props.user_external
            || nextProps.network_visitor !== this.props.network_visitor
        )
    }

    menuLeft(e) {
        Actions.pop();
    }

    render() {
        var w = Dimensions.get('window');
        var width = w.width;
        var height = w.height;
        var padding = ((width * 0.06) );
        var styles = StyleSheet.create({
            bg: {
                flex: 1, backgroundColor: "#fff"
            },
            navbar: {
                borderColor: '#c7c7c7',
                backgroundColor: "#ffffff",


                borderBottomWidth: 1,
            },
            updateProfileLink: {
                flex: 1
            },
            updateProfileLinkText: {
                flex: 1,
                textAlign: "center",
                textDecorationLine: "underline",
                fontFamily: 'OratorStd',
                fontSize: 13
            }
        });

        var titleConfig = <Image style={{marginBottom:2,width:92}} resizeMode={"contain"} source={require('image!./../../img/season/logo.png')}/>;
        var leftButtonConfig = <TouchableOpacity style={{marginTop:15,marginLeft:10}} onPress={this.menuLeft}><Image
            source={require('image!./../../img/moncookout/back.png')}/></TouchableOpacity>

        if ((  this.props.user_external == null || this.props.network_visitor == null)) {
            return (
                <View style={styles.bg}>
                    <Loading/>
                    <Image source={require('image!./../../img/background/default/tapis.png')}
                           style={{flex:1,height:null,width:null}}>
                        <NavigationBar
                            style={styles.navbar}
                            title={titleConfig}
                            leftButton={leftButtonConfig}
                            tintColor={"#fff"}/>
                        <View style={{flex:1,justifyContent:'center',width:null,height:null}}>

                        </View>
                        <View style={{position:"absolute",bottom:0,left:0,right:0}}>
                            <MenuTab option_back={this.props.name} page={this.props.name}/>
                        </View>
                    </Image>
                </View>)
        }
        return (
            <View style={styles.bg}>
                {this.props.isRequesting && <Loading/>}
                <Image source={require('image!./../../img/background/default/tapis.png')}
                       style={{flex:1,height:null,width:null}}>

                    <NavigationBar
                        style={styles.navbar}
                        title={titleConfig}
                        leftButton={leftButtonConfig}

                        tintColor={"#fff"}/>
                    <ScrollView style={{paddingTop:10}}>
                        <View
                            style={{justifyContent:'flex-start',flex:1,flexDirection: 'row',paddingLeft:padding,paddingRight:padding}}>
                            <View
                                style={{ flex:0.4,flexDirection: 'column',backgroundColor:"transparent"}}>
                                <View
                                >
                                    {this.props.user_external != null && <ShowBasics user={this.props.user_external}/>}
                                    {this.props.network_visitor != null &&
                                    <Follow follow={this.props.network_visitor.followers} id_user={this.props.user.id}
                                            id_user_external={this.props.user_external.id}/>}
                                </View>
                            </View>
                            <View style={{flex:0.6,flexDirection: 'column'}}>
                                {this.props.user_external != null && this.props.network_visitor != null &&
                                <ShowFollower id_user={this.props.user_external.id}
                                              my_recipes={this.props.user_external.recipes}
                                              my_network={this.props.network_visitor}/>}

                                {this.props.user_external != null && typeof this.props.user_external.recipes !== "undefined" &&
                                <ShowLevel my_recipes={this.props.user_external.recipes}/>}


                            </View>
                        </View>
                        {this.props.user_external.recipes != null && this.props.user_external != null &&
                        <MyRecipes user={this.props.user_external} my_recipes={this.props.user_external.recipes}/>}

                    </ScrollView>
                    <View style={{position:"absolute",bottom:0,left:0,right:0}}>
                        <MenuTab option_back={this.props.name} page={this.props.name}/>
                    </View>
                </Image>
            </
                View >
        )
    }
}
/*      */
const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    statusText: state.session.statusText,
    user: state.session.user,
    user_external: state.visitor.profile_visitor,
    network_visitor: state.visitor.network_visitor,
    isRequesting: state.loading.shown,

});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),
    actions_recipe: bindActionCreators(RecipeActions, dispatch),

    actions_visitor: bindActionCreators(VisitorActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TheCookout);
