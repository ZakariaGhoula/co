import React, { Component } from 'react';
import {Dimensions,Text,View,Image,StyleSheet,TextInput,TouchableHighlight,ScrollView,RefreshControl} from 'react-native';
import {APIRoot} from './../../constants/config_path';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import * as RecipeActions    from './../../actions/RecipeActions';
import { connect }            from 'react-redux';

import GiftedSpinner from 'react-native-gifted-spinner';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import MenuTab from './../default/MenuTab';
import ShowBasics from './showBasics';
import ShowFollower from './showFollower';
import MyRecipes from './myrecipes';
import _ from "underscore";


class UpdateMoncookout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
        }
        this.menuLeft = this.menuLeft.bind(this);
        this.refreshing = this.refreshing.bind(this);
    }

    componentWillMount() {
        if (typeof this.props.last_recipe !== "undefined" && this.props.last_recipe !== null && this.props.my_recipes !== null) {
            this.props.actions_recipe.retrieveMyRecipesRefresh(this.props.token);
            Actions.myrecipe({recipe: this.props.last_recipe})
        }
        if (typeof this.props.from_delete !== "undefined" && this.props.from_delete) {

            this.props.actions_recipe.retrieveMyRecipesRefresh(this.props.token);
        }
    }

    componentDidMount() {


        if (this.props.user == null) {
            this.props.actions.retrieveDataRequest(this.props.token);
        }
        if (this.props.token != null) {
            if (this.props.my_recipes == null)
                this.props.actions_recipe.retrieveMyRecipes(this.props.token);
            if (this.props.my_network == null)
                this.props.actions.retrieveMyNetwork(this.props.token);
        }


    }

    componentWillUnmount(nextProps, nextState) {
        this.props.actions.destroy_cookout();
        // this.props.actions_recipe.destroy_cookout();
    }


    componentWillUpdate(nextProps, nextState) {


        if (nextState.isRefreshing && nextProps.my_recipes != null) {


            this.setState({isRefreshing: false})
        }
        /*if (nextProps.token != null && nextProps.user!==null) {
         nextProps.actions_recipe.retrieveMyRecipes(nextProps.token);
         nextProps.actions.retrieveMyNetwork(nextProps.token);
         }*/
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.user !== this.props.user ||
            nextState.isRefreshing !== this.state.isRefreshing ||
            nextProps.isRequesting !== this.props.isRequesting ||
            nextProps.my_recipes !== this.props.my_recipes ||
            nextProps.my_network !== this.props.my_network
        )
    }

    menuLeft(e) {
        Actions.pop();
    }

    refreshing(e) {
        this.setState({isRefreshing: true});
        this.props.actions_recipe.retrieveMyRecipesRefresh(this.props.token);
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

                shadowColor: "#c7c7c7",
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                    height: 3,
                    width: 0
                },
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
        var titleConfig = <Image style={{marginBottom:8}} source={require('image!./../../img/season/logo.png')}/>;
        if ((this.props.user == null || this.props.my_recipes == null || this.props.isRequesting)) {
            return (
                <View style={styles.bg}>
                    <NavigationBar
                        style={styles.navbar}
                        title={titleConfig}
                        tintColor={"#fff"}/>
                    <View style={{flex:1,justifyContent:'center',width:null,height:null}}>
                        <GiftedSpinner style={{marginTop:0}}/>
                    </View>
                    <View style={{position:"absolute",bottom:0,left:0,right:0}}>
                        <MenuTab option_back={this.props.name} page={this.props.name}/>
                    </View>
                </View>)
        }
        return (
            <View style={styles.bg}>
                <NavigationBar
                    style={styles.navbar}
                    title={titleConfig}
                    tintColor={"#fff"}/>
                <ScrollView

                    refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refreshing}
            tintColor="#aaaa"
            title="Chargement..."
            titleColor="#aaa"
            colors={['#aaaa', '#ccc', '#aaa']}
            progressBackgroundColor="#000"
            backgroundColor="transparent"
            onSubmitEditing={
    this.handleClick.bind(this)
  }
          />
        }
                    style={{paddingTop:10}}>
                    <View
                        style={{justifyContent:'flex-start',flex:1,flexDirection: 'row',paddingLeft:padding,paddingRight:padding}}>
                        {this.props.user != null && <ShowBasics user={this.props.user}/>}
                        <View style={{flex:0.6,flexDirection: 'column'}}>
                            {this.props.my_recipes != null
                            && this.props.user != null
                            && this.props.my_network != null &&
                            <ShowFollower id_user={this.props.user.id} my_recipes={this.props.my_recipes}
                                          my_network={this.props.my_network}/>}
                            { this.props.user != null &&
                            <TouchableHighlight
                                style={styles.updateProfileLink}
                                underlayColor='transparent'>
                                <Text
                                    style={styles.updateProfileLinkText}>Enregistrer les modifications
                                    </Text></TouchableHighlight>}
                        </View>
                    </View>
                    {this.props.my_recipes != null && this.props.user != null &&
                    <MyRecipes user={this.props.user} my_recipes={this.props.my_recipes}/>}
                </ScrollView>
                <View style={{position:"absolute",bottom:0,left:0,right:0}}>
                    <MenuTab option_back={this.props.name} page={this.props.name}/>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    token: state.session.token,
    statusText: state.session.statusText,
    user: state.session.user,
    my_recipes: state.recipe.my_recipes,
    my_network: state.session.my_network,
    isRequesting: state.loading.shown
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch),
    actions_recipe: bindActionCreators(RecipeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMoncookout);
