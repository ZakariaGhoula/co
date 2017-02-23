import React, { Component } from 'react';
import {Text,View,ScrollView,Image,StyleSheet,TextInput,TouchableHighlight,Dimensions} from 'react-native';

import NavigationBar from 'react-native-navbar';

import Icon from 'react-native-vector-icons/Ionicons';
import MenuItem from './MenuItem';
import Newsfeed from './../newsfeed/Newsfeed';
import {Actions} from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import * as SessionActions    from './../../actions/SessionActions';
import { connect }            from 'react-redux';
class Menu extends React.Component {
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
    componentWillUpdate(nextProps, nextState){
       if(this.props.user!=null && nextProps.user==null){
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

        Actions.newsfeed()
        //Actions.pop();
        // this.setState({isOpen: !this.state.isOpen});
    }

    render() {


        var leftButtonConfig =
            (<Icon.Button name="ios-close" size={30} marginLeft={10} color="#000" backgroundColor="#fff"
                          onPress={this.menuLeft.bind(this)}/>)
        var titleConfig = <Text style={{fontSize:14,color:"#000"}}>Mon Compte</Text>
        var titleConfig =
                <Image
                    source={require('./../../img/logo/cookout-co.png')}
                />
            ;
        /*{
            tintColor: '#398797',
            title: (this.props.title != null ? this.props.title.trim() : "Mon compte")
        };*/
        var styles = StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: '#ccd1b5',
            }
        });
        /* <MenuItem title={'Mes recettes'} icon={'ios-list'} action={'myrecipes'} last={true} alone={false}/>
         <Text style={{fontSize:13,color:"#81898c",marginLeft:15,marginTop:10}}>Connecté en tant
         que {(this.props.user != null && typeof this.props.user.last_name !== "undefined" && this.props.user.last_name !== "null") ? this.props.user.email : null}</Text>*/
        return (
            <View style={{flex:1,backgroundColor:"#f6f7f9"}}>

                <NavigationBar
                    style={{height:36,  borderColor: '#c7c7c7',  borderBottomWidth: 1}}
                    leftButton={leftButtonConfig}
                    title={titleConfig}
                    tintColor={"#fff"}/>
                <ScrollView style={{flex:1,paddingTop:13,backgroundColor:"transparent"}}>
                    <MenuItem title={'Ajouter une recette'} icon={'ios-add'} action={'addrecipe'} last={true}
                              alone={true}/>


                    <MenuItem title={'Mon Cookbook'} icon={'ios-book'} action={'myrecipes'} last={false} alone={true}/>
                    <MenuItem title={'Mon réseau'} icon={'ios-contacts'} action={'mynetwork'} last={true}
                              alone={false}/>

                    <MenuItem title={'Les produits de saison'} icon={'ios-basket'} action={'seasonproducts'} last={true}
                              alone={true}/>

                    <MenuItem title={'Paramètres'} icon={'ios-cog'} action={'settingmenu'} last={true} alone={true}/>

                    <MenuItem title={'À propos'} icon={null} action={'about'} last={false} alone={true}/>
                    <MenuItem title={"Déconnexion"} icon={null} logout={this.logout.bind(this)} action={null}
                              disconnect={true} last={true}
                              alone={false}/>

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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);